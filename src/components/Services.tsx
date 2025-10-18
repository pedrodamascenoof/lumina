import { Sparkles, Wind, Flame, Gem } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Sparkles,
    title: "Massoterapia Relaxante",
    description: "Alívio do estresse e relaxamento profundo através de técnicas de massagem terapêutica.",
    color: "from-primary to-secondary"
  },
  {
    icon: Wind,
    title: "Reiki e Energização",
    description: "Harmonização do campo energético para equilíbrio físico, mental e emocional.",
    color: "from-secondary to-accent"
  },
  {
    icon: Flame,
    title: "Ventosas e Reflexologia",
    description: "Reequilíbrio físico e mental através de técnicas orientais milenares.",
    color: "from-accent to-primary"
  },
  {
    icon: Gem,
    title: "Terapia com Cristais e Aromas",
    description: "Limpeza energética e bem-estar emocional com cristais naturais e aromaterapia.",
    color: "from-primary to-accent"
  }
];

const Services = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nossos Serviços
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground">
            Terapias cuidadosamente selecionadas para sua jornada de bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="glass-card border-border/50 hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-background" />
                </div>
                <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
