import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Therapist {
  id: string;
  full_name: string;
  specialties: string[];
  description: string;
  avatar_url: string;
  whatsapp: string;
  average_price: number;
}

const Therapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      const { data, error } = await supabase
        .from("therapists")
        .select("*")
        .eq("is_active", true);

      if (!error && data) {
        setTherapists(data);
      }
      setLoading(false);
    };

    fetchTherapists();
  }, []);

  if (loading) {
    return (
      <section id="terapeutas" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Carregando terapeutas...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="terapeutas" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nossos Terapeutas Parceiros
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground">
            Encontre o profissional ideal para sua necessidade
          </p>
        </div>

        {therapists.length === 0 ? (
          <div className="text-center glass-card p-12 rounded-2xl max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Em breve teremos terapeutas parceiros cadastrados. Você é terapeuta? Entre em contato!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapists.map((therapist) => (
              <Card key={therapist.id} className="glass-card border-border/50 hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={therapist.avatar_url} alt={therapist.full_name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary">
                      {therapist.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-display">{therapist.full_name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {therapist.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-secondary/20">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  {therapist.description && (
                    <CardDescription className="text-sm line-clamp-3">
                      {therapist.description}
                    </CardDescription>
                  )}
                  
                  {therapist.average_price && (
                    <p className="text-primary font-semibold">
                      A partir de R$ {therapist.average_price.toFixed(2)}
                    </p>
                  )}
                  
                  {therapist.whatsapp && (
                    <a 
                      href={`https://wa.me/55${therapist.whatsapp.replace(/\D/g, '')}?text=Olá! Vi seu perfil no Lumina Aldeota e gostaria de agendar uma sessão.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full btn-hero">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Entrar em contato
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Therapists;
