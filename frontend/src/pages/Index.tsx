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
  J’ai enfin eu la chance de découvrir les trompe-l’œil de Thebrunch… et quelle merveilleuse surprise ! Les visuels sont incroyablement impressionnants, les textures parfaitement équilibrées, et la qualité des ingrédients se perçoit à chaque bouchée. Un vrai travail d’artisan, aussi délicieux que splendide. Mention spéciale pour la pistache, la vanille et la framboise !.
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
Un travail soigné et de grande qualité, avec des produits toujours frais. Après avoir goûté presque toute la carte, sucrée comme salée, je peux dire que c’est aussi délicieux que visuellement impeccable, voire encore mieux. Tout est excellent, un véritable travail de chef. Les tartes rivalisent avec celles des grands pâtissiers. Bravo et merci !
     </p>
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
Je suis cette cheffe traiteur sur les réseaux sociaux depuis des années, et c’est toujours un plaisir de voir autant de passion et de talent réunis. Son savoir-faire est évident, et chaque création témoigne de son amour pour la cuisine. Elle met un soin remarquable dans chacune de ses prestations, et cela se ressent dans tous ses plats. Je la recommande chaudement !
    </p>
  </div>

</div>

      <Realisations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
