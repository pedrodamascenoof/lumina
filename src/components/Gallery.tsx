import space1 from "@/assets/space-1.jpg";
import space2 from "@/assets/space-2.jpg";
import space3 from "@/assets/space-3.jpg";

const Gallery = () => {
  const images = [
    { src: space1, alt: "Sala de massagem relaxante" },
    { src: space2, alt: "Espaço de meditação e energia" },
    { src: space3, alt: "Lounge de relaxamento" }
  ];

  return (
    <section id="espaco" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nosso Espaço
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground">
            Um ambiente pensado para sua paz e bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="p-6 text-foreground font-display">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
