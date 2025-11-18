import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Leaf, Heart, Star } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ReveillonMenu />
      <div className="flex flex-col sm:flex-col lg:flex-row w-full items-center justify-center p-12 gap-12 h-[350px] bg-accent/50 text-white">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Leaf sise={32} />
          <h2 className="text-[#4a3b36]">MATIÈRES PREMIÈRES SÉLECTIONNÉES</h2>
          <p className="text-center max-w-[400px]">Nos matières premières sont soigneusement sélectionnées afin de vous offrir la meilleure qualité pour vos plus beaux jours.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Heart sise={32} />
          <h2 className="text-[#4a3b36]">SAVOIR-FAIRE ARTISANAL</h2>
          <p className="text-center max-w-[400px]">Un travail artisanal fait avec amour et savoir-faire, pour transformer vos moments les plus importants en doux souvenirs gourmands.</p>
        
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Star sise={32} />
          <h2 className="text-[#4a3b36]">SATISFACTION CLIENT</h2>
          <p className="text-center max-w-[400px]">Nous plaçons vos besoins et vos retours au cœur de notre démarche, pour faire de chaque commande une expérience unique et réussie.</p>
        
        </div>
      </div>
      <Realisations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
