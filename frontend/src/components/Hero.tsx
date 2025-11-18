import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-catering.jpg";
import HeroImage from "../../public/images/hero.png"

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Catering oriental de luxe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <img src={HeroImage} alt="Traiteur Oriental basé à Strasbourg animate-fade-in" className="w-80 mx-auto mb-8" /> 
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto" style={{ fontFamily: '"Inconsolata", monospace' }}>
          Découvrez nos mignardises salées et sucrées ainsi que nos brunchs gourmands : tout est pensé pour émerveiller vos convives et transformer vos moments en de véritables expériences culinaires.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            className="bg-primary hover:bg-primary/90 text-foreground font-semibold px-8"
            asChild
          >
            <Link to="/lunch">Traiteur</Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40 font-semibold px-8 backdrop-blur-sm"
            asChild
          >
            <Link to="/brunch">Brunch</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
