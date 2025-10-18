import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-therapy.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Terapias alternativas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center pt-20">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
            Equilíbrio, energia e bem-estar para corpo e alma
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 slide-up">
            No coração da Aldeota, um refúgio de terapias alternativas para o seu equilíbrio interior.
          </p>
          <p className="text-lg italic text-secondary mb-12 slide-up" style={{ animationDelay: "0.2s" }}>
            "Ilumine sua energia, harmonize sua vida."
          </p>
          <a href="https://wa.me/5585999999999?text=Olá! Gostaria de agendar uma sessão." target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-hero text-lg px-8 py-6 slide-up" style={{ animationDelay: "0.4s" }}>
              Agende sua sessão
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
