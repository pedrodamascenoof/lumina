import { MapPin, Clock, Instagram, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="relative border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Endereço */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-primary" />
              Localização
            </h3>
            <p className="text-muted-foreground">
              Rua Exemplo, 123<br />
              Aldeota - Fortaleza, CE<br />
              CEP: 60000-000
            </p>
          </div>

          {/* Horário */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Clock className="text-primary" />
              Horário de Atendimento
            </h3>
            <p className="text-muted-foreground">
              Segunda a Sexta: 9h às 20h<br />
              Sábado: 9h às 17h<br />
              Domingo: Fechado
            </p>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              Redes Sociais
            </h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-6 h-6 text-background" />
              </a>
              <a 
                href="https://wa.me/5585999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-6 h-6 text-background" />
              </a>
              <a 
                href="mailto:contato@luminaaldeota.com.br"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Mail className="w-6 h-6 text-background" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm font-display mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Lumina Aldeota – Terapias Alternativas
          </p>
          <p className="text-sm text-muted-foreground italic">
            "Ilumine sua energia, harmonize sua vida."
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Lumina Aldeota. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
