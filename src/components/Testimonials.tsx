import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ana Paula Silva",
    text: "A experiência no Lumina foi transformadora! Saí renovada após a sessão de Reiki. Ambiente acolhedor e profissionais incríveis.",
    initials: "AP"
  },
  {
    name: "Carlos Eduardo",
    text: "Excelente atendimento! A massoterapia aliviou todas as minhas tensões. Recomendo muito!",
    initials: "CE"
  },
  {
    name: "Marina Costa",
    text: "Lugar perfeito para reconexão. As terapias com cristais me trouxeram um equilíbrio que eu não sentia há anos.",
    initials: "MC"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="glass-card border-border/50 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
