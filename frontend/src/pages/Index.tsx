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
    <h3 className="text-lg font-semibold text-[#4a3b36]">Yasmine S.</h3>
    <p
  style={{
    fontFamily: '"Inconsolata", monospace',
    fontSize: '12px',
    lineHeight: '1.6'
  }}
  className="text-black/90"
>
  thebrunch est une pépite pour les amateurs de pâtisserie fine. Chaque
  création est faite avec des ingrédients de grande qualité, et ça se sent dès
  la première bouchée. Les saveurs sont délicates, bien équilibrées, et les
  textures parfaitement maîtrisées. En plus du talent évident, il y a une vraie
  gentillesse et une passion qui se ressentent dans l’accueil comme dans chaque
  détail.
</p>
  </div>

  {/* CARD 2 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Laura S.</h3>
    <p className="text-[15px] leading-7 text-gray-700 max-w-[330px]">
      J’ai enfin découvert les trompe-l’œil de thebrunch … et quelle magnifique surprise ! Les visuels sont bluffants, les textures parfaitement maîtrisées, et la qualité des produits se ressent à chaque bouchée. Un véritable travail d’orfèvre, aussi beau que bon. Gros coup de cœur pour la pistache, la vanille et la framboise !
    </p>
  </div>

  {/* CARD 3 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Elif B.</h3>
    <p className="text-[15px] leading-7 text-gray-700 max-w-[330px]">
      Un travail minutieux et de qualité, les produits sont frais. Après avoir goûté toute la carte (sucré et salé), je peux affirmer que c’est aussi beau que bon. Tout est excellent, un travail de chef. Les tartes sont dignes d’un grand pâtissier. Bravo et merci !
    </p>
  </div>

  {/* CARD 4 */}
  <div className="flex flex-col items-center text-center gap-4">
    <Quote size={42} className="text-[#4a3b36]" />
    <h3 className="text-lg font-semibold text-[#4a3b36]">Khadija B.</h3>
    <p className="text-[15px] leading-7 text-gray-700 max-w-[330px]">
      Cela fait des années que je suis cette cheffe traiteur, et c’est toujours un plaisir de voir une personne aussi passionnée et talentueuse. Son savoir-faire est indéniable, et chaque création reflète son amour pour la cuisine. Je recommande vivement !
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
