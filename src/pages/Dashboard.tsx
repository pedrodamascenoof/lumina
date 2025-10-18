import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Save, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  is_approved: boolean;
}

interface TherapistProfile {
  id?: string;
  full_name: string;
  specialties: string[];
  description: string;
  avatar_url: string;
  whatsapp: string;
  average_price: number;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [therapist, setTherapist] = useState<TherapistProfile>({
    full_name: "",
    specialties: [],
    description: "",
    avatar_url: "",
    whatsapp: "",
    average_price: 0,
  });
  const [specialtiesInput, setSpecialtiesInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Get profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!profileData?.is_approved) {
      toast({
        title: "Conta pendente",
        description: "Sua conta ainda está aguardando aprovação.",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      navigate("/auth");
      return;
    }

    setProfile(profileData);

    // Get therapist profile if exists
    const { data: therapistData } = await supabase
      .from("therapists")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (therapistData) {
      setTherapist(therapistData);
      setSpecialtiesInput(therapistData.specialties.join(", "));
    } else {
      // Initialize with user's name
      setTherapist(prev => ({ ...prev, full_name: profileData.full_name || "" }));
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSave = async (avatarOverride?: string) => {
    // Ensure we have an authenticated session and use the session user id
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: 'Sessão inválida', description: 'Faça login novamente.', variant: 'destructive' });
      return;
    }

    // block save for users not approved just in case
    if (!profile?.is_approved) {
      toast({ title: 'Conta não aprovada', description: 'Sua conta ainda não foi aprovada. Aguarde ou contate o suporte.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const specialtiesArray = specialtiesInput
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const therapistData = {
        // Use the authenticated user's id to satisfy RLS WITH CHECK (auth.uid() = user_id)
        user_id: session.user.id,
        full_name: therapist.full_name,
        specialties: specialtiesArray,
        description: therapist.description,
        // allow caller to override avatar_url (useful to save immediately after upload)
        avatar_url: avatarOverride ?? therapist.avatar_url,
        whatsapp: therapist.whatsapp,
        average_price: therapist.average_price,
        is_active: true,
      };

      if (therapist.id) {
        // Update existing
        const { error } = await supabase
          .from("therapists")
          .update(therapistData)
          .eq("id", therapist.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from("therapists")
          .insert([therapistData]);

        if (error) throw error;
      }

      toast({
        title: "Perfil salvo!",
        description: "Suas informações foram atualizadas com sucesso.",
      });

      // Reload therapist data
      checkUser();
    } catch (error: any) {
      // Show more detailed PostgREST error info when available (helps debug RLS violations)
      const detail = error?.details ?? error?.message ?? String(error);
      console.error('Erro ao salvar terapeuta:', error);
      toast({
        title: "Erro ao salvar",
        description: detail,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Upload file to Supabase storage and return public URL
  const uploadAvatar = async (file: File) => {
    if (!profile) throw new Error("Usuário não autenticado");
    if (!profile.is_approved) throw new Error('Conta não aprovada: não é possível enviar imagens até a aprovação.');
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-photos/${profile.id}-${Date.now()}.${fileExt}`;
      const bucketName = 'avatars';

      // IMPORTANT: we do NOT create buckets from the browser. Buckets must be
      // created in the Supabase dashboard (or via server-side admin credentials).
      // Attempt upload; if the bucket doesn't exist the API will return an error
      console.log('Tentando upload para', bucketName, '/', fileName);

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Erro detalhado do upload:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        // Most common reason: bucket doesn't exist or is private.
        throw new Error('Não foi possível gerar URL para a imagem. Verifique se o bucket "avatars" existe e está configurado como público no painel do Supabase.');
      }

      console.log('Upload bem sucedido, URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  // Função para redimensionar a imagem
  const resizeImage = async (file: File, maxSizeMB: number = 2): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Primeiro, redimensiona proporcionalmente se a imagem for muito grande
          const MAX_DIMENSION = 1200;
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
              height = Math.round(height * MAX_DIMENSION / width);
              width = MAX_DIMENSION;
            } else {
              width = Math.round(width * MAX_DIMENSION / height);
              height = MAX_DIMENSION;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Não foi possível criar o contexto do canvas'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Começa com qualidade alta e vai reduzindo até atingir o tamanho desejado
          let quality = 0.9;
          const minQuality = 0.1;
          
          const compress = () => {
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const bytes = Math.ceil((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3/4);
            const sizeMB = bytes / (1024 * 1024);
            
            if (sizeMB <= maxSizeMB || quality <= minQuality) {
              // Converte base64 para File
              const byteString = atob(dataUrl.split(',')[1]);
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              
              const resizedFile = new File([ab], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              
              resolve(resizedFile);
            } else {
              quality = Math.max(quality - 0.1, minQuality);
              compress();
            }
          };
          
          compress();
        };
        
        img.onerror = () => {
          reject(new Error('Erro ao carregar a imagem'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Erro ao ler o arquivo'));
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const url = URL.createObjectURL(file);
    setLocalPreview(url);

    try {
      // Redimensiona a imagem se necessário
      const processedFile = await resizeImage(file);
      
      const publicUrl = await uploadAvatar(processedFile);
      // Update therapist state with new avatar URL (do NOT auto-save to DB)
      setTherapist(prev => ({ ...prev, avatar_url: publicUrl || '' }));
      toast({ title: 'Foto enviada', description: 'A foto foi enviada com sucesso. Clique em "Salvar Perfil" para persistir a alteração.' });
    } catch (err: any) {
      let errorMessage = err?.message ?? String(err);
      if (errorMessage.includes('bucket')) {
        errorMessage = 'Erro de configuração do storage: verifique se o bucket "avatars" existe e está público no painel do Supabase.';
      }
      if (errorMessage.includes('Conta não aprovada')) {
        errorMessage = 'Sua conta ainda não foi aprovada. Aguarde aprovação antes de enviar imagens.';
      }

      toast({ 
        title: 'Erro no upload', 
        description: errorMessage, 
        variant: 'destructive' 
      });
      // revert preview
      setLocalPreview(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Painel do Terapeuta
            </h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo(a), {profile?.full_name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('/')}>
              Início
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                <AvatarImage src={localPreview ?? therapist.avatar_url} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl font-display">Meu Perfil de Terapeuta</CardTitle>
                <CardDescription>
                  Configure suas informações que aparecerão na página inicial
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-file-input"
                />
                <label htmlFor="avatar-file-input">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" disabled={uploading}>
                    {uploading ? 'Enviando...' : 'Enviar Foto'}
                  </Button>
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nome Completo *</Label>
              <Input
                id="fullname"
                value={therapist.full_name}
                onChange={(e) => setTherapist({ ...therapist, full_name: e.target.value })}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Especialidades * (separadas por vírgula)</Label>
              <Input
                id="specialties"
                value={specialtiesInput}
                onChange={(e) => setSpecialtiesInput(e.target.value)}
                placeholder="Ex: Massagem Relaxante, Reiki, Drenagem Linfática"
              />
              <p className="text-xs text-muted-foreground">
                Digite suas especialidades separadas por vírgula
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição Profissional (máx. 150 caracteres)</Label>
              <Textarea
                id="description"
                value={therapist.description}
                onChange={(e) => setTherapist({ ...therapist, description: e.target.value.slice(0, 150) })}
                placeholder="Conte um pouco sobre sua experiência e abordagem..."
                maxLength={150}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {therapist.description.length}/150 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">URL da Foto de Perfil</Label>
              <Input
                id="avatar"
                value={therapist.avatar_url}
                onChange={(e) => setTherapist({ ...therapist, avatar_url: e.target.value })}
                placeholder="https://exemplo.com/sua-foto.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (com DDD)</Label>
              <Input
                id="whatsapp"
                value={therapist.whatsapp}
                onChange={(e) => setTherapist({ ...therapist, whatsapp: e.target.value })}
                placeholder="85999999999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor Médio (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={therapist.average_price}
                onChange={(e) => setTherapist({ ...therapist, average_price: parseFloat(e.target.value) || 0 })}
                placeholder="150.00"
              />
            </div>

            <Button onClick={() => void handleSave()} className="w-full btn-hero" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Salvando..." : "Salvar Perfil"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
