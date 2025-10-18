import { Sparkles, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sobre o Lumina Aldeota
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Nossa Missão</h3>
            <p className="text-muted-foreground">
              Promover autoconhecimento e equilíbrio emocional através de terapias naturais e integrativas.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Ambiente Acolhedor</h3>
            <p className="text-muted-foreground">
              Um espaço projetado para seu conforto e relaxamento total, onde cada detalhe foi pensado para sua experiência.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Equipe Qualificada</h3>
            <p className="text-muted-foreground">
              Profissionais certificados e experientes, dedicados ao seu bem-estar e transformação pessoal.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-2xl">
          <p className="text-lg leading-relaxed mb-6">
            O <span className="text-primary font-semibold">Lumina Aldeota</span> nasceu do desejo de criar um espaço onde corpo, mente e espírito possam encontrar harmonia. 
            Localizado no coração da Aldeota, oferecemos um refúgio da agitação do dia a dia.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Aqui, cada sessão é uma jornada de reconexão consigo mesmo, utilizando técnicas milenares e modernas 
            para despertar seu potencial de cura e equilíbrio interior.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
