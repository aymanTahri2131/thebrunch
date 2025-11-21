import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Leaf, Heart, Star } from "lucide-react"
import { Quote } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ReveillonMenu />
      <div className="flex flex-col sm:flex-col lg:flex-row w-full items-center justify-center p-12 gap-12 h-auto sm:h-auto lg:h-[350px] bg-[#99771b]/40 text-white">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Leaf size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>MATIÈRES PREMIÈRES SÉLECTIONNÉES</h2>
          <p className="text-center max-w-[400px] text-lg">Nos matières premières sont soigneusement sélectionnées afin de vous offrir la meilleure qualité pour vos plus beaux jours.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Heart size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>SAVOIR-FAIRE ARTISANAL</h2>
          <p className="text-center max-w-[400px] text-lg">Un travail artisanal fait avec amour et savoir-faire, pour transformer vos moments les plus importants en doux souvenirs gourmands.</p>
        
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Star size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>SATISFACTION CLIENT</h2>
          <p className="text-center max-w-[400px] text-lg">Nous plaçons vos besoins et vos retours au cœur de notre démarche, pour faire de chaque commande une expérience unique et réussie.</p>
        
        </div>
      </div>
      --------
    <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-[#a08f60] tracking-wide">
  VOS RETOURS
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-12 lg:px-20 w-full">
  
  {/* CARD 1 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Youssra K.</h3>
    <p
  style={{
    fontFamily: '"Inconsolata", monospace',
    fontSize: '12px',
    lineHeight: '1.6'
  }}
  className="text-black/90"
>
Je suis toujours émerveillé par le talent de cette cheffe. Chaque dessert et plat est une petite œuvre d’art, préparée avec des ingrédients de qualité et une précision incroyable. Un vrai bonheur pour les amateurs de gastronomie !
</p>
  </div>

  {/* CARD 2 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Meryem A.</h3>
      <p
  style={{
    fontFamily: '"Inconsolata", monospace',
    fontSize: '12px',
    lineHeight: '1.6'
  }}
  className="text-black/90"
>
Chaque fois que je goûte ses plats, je suis bluffé par la qualité et la finesse des préparations. Son travail est soigné, élégant et surtout délicieux. Je recommande vivement à tous les gourmands !
      </p>
  </div>

  {/* CARD 3 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Lina A.</h3>
     <p
  style={{
    fontFamily: '"Inconsolata", monospace',
    fontSize: '12px',
    lineHeight: '1.6'
  }}
  className="text-black/90"
>
Les plats et desserts de cette cheffe sont à la fois raffinés et généreux. Chaque création reflète son professionnalisme et sa passion, offrant une expérience gustative inoubliable.     </p>
  </div>

  {/* CARD 4 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Kaoutar Z.</h3>
    <p
  style={{
    fontFamily: '"Inconsolata", monospace',
    fontSize: '12px',
    lineHeight: '1.6'
  }}
  className="text-black/90"
>
Je suis toujours émerveillé par la créativité et le talent de cette cheffe. Ses préparations sont raffinées, gourmandes et réalisées avec des ingrédients de qualité exceptionnelle.    </p>
  </div>

</div>

      <Realisations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
