import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials"; // صححت retours
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Leaf, Heart, Star, Quote } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ReveillonMenu />

      {/* SECTION INFO */}
      <div className="flex flex-col sm:flex-col lg:flex-row w-full items-center justify-center p-12 gap-12 h-auto sm:h-auto lg:h-[350px] bg-[#99771b]/40 text-white">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Leaf size={40} />
          <h2
            className="text-[#4a3b36] font-semibold text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            MATIÈRES PREMIÈRES SÉLECTIONNÉES
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Des ingrédients soigneusement choisis.
            Nous choisissons avec le plus grand soin des ingrédients d’exception afin de vous garantir une qualité irréprochable pour sublimer chacun de vos moments précieux.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Heart size={40} />
          <h2
            className="text-[#4a3b36] font-semibold text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            SAVOIR-FAIRE ARTISANAL
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Un artisanat fait avec passion.
            Un travail artisanal réalisé avec passion et maîtrise, pour transformer vos instants les plus marquants en souvenirs gourmands raffinés et mémorables.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Star size={40} />
          <h2
            className="text-[#4a3b36] font-semibold text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            SATISFACTION CLIENT
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Votre satisfaction au cœur de notre démarche.
            Nous plaçons vos attentes au centre de notre démarche afin de faire de chaque commande une expérience sur-mesure, unique et parfaitement réussie.
          </p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <Testimonials />

      <Realisations />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
