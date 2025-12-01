import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

export const Realisations = () => {
  // Images from local folder - actual project realizations
  const realisations = [
    {
      id: 1,
      title: "Plateau Signature Premium",
      image: "https://i.postimg.cc/8cczc2J3/2.png",
    },
    {
      id: 2,
      title: "Assortiment Gourmand",
      image: "https://i.postimg.cc/SRPNMgCD/3.png",
    },
    {
      id: 3,
      title: "Menu Brunch Élégant",
      image: "https://i.postimg.cc/zvQXgxKd/Captura-de-pantalla-2025-11-06-161444.png",
    },
    {
      id: 4,
      title: "Plateau Prestige",
      image: "/images/Captura de pantalla 2025-11-06 161607.png",
    },
    {
      id: 5,
      title: "Création Traiteur Exclusive",
      image: "/images/Captura de pantalla 2025-11-06 161625.png",
    },
    {
      id: 6,
      title: "Buffet Gastronomique",
      image: "/images/Captura de pantalla 2025-11-06 161642.png",
    },
  ];

  return (
    <section className="p-20 bg-muted/30">
      <div className="w-full">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Nos Réalisations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-unes de nos plus belles créations
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {realisations.map((realisation) => (
              <CarouselItem key={realisation.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden group">
                      <img
                        src={realisation.image}
                        alt={realisation.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-xl font-semibold">
                            {realisation.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4" />
          <CarouselNext className="right-2 md:right-4" />
        </Carousel>
      </div>
    </section>
  );
};
