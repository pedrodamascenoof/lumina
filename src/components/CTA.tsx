import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-16 rounded-3xl">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Seu momento de reconexão começa aqui
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Agende sua sessão e inicie sua jornada de equilíbrio e bem-estar
          </p>
          <a href="https://wa.me/5585999999999?text=Olá! Gostaria de agendar uma sessão." target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-hero text-lg px-12 py-6">
              Agendar via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
