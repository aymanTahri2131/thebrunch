import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Leaf, Heart, Star } from "lucide-react"
import { Heart } from "lucide-react";

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
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-foreground">VOS RETOURS</h2>

<div className="flex flex-col sm:flex-col lg:flex-row w-full items-center justify-center p-12 gap-12 h-auto sm:h-auto lg:h-[350px] bg-[#B8B2B2]/40 text-white">
  <div className="flex flex-col items-center justify-center gap-6 text-center">
    <Heart size={40} />
    <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Khadija B</h2>
    <p className="text-center max-w-[400px] text-lg">
      thebrunch est une pépite pour les amateurs de pâtisserie fine. Chaque création est faite avec des ingrédients de grande qualité, et ça se sent dès la première bouchée. Les saveurs sont délicates, bien équilibrées, et les textures parfaitement maîtrisées. En plus du talent évident, il y a une vraie gentillesse et une passion qui se ressentent dans l’accueil comme dans chaque détail. Un grand merci à thebrunch pour son savoir-faire et sa générosité.
    </p>
  </div>

  <div className="flex flex-col items-center justify-center gap-6 text-center">
    <Heart size={40} />
    <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Lina S</h2>
    <p className="text-center max-w-[400px] text-lg">
      J’ai enfin découvert les trompe-l’œil de thebrunch … et quelle magnifique surprise! Les visuels sont tout simplement bluffants, les jeux de textures parfaitement maîtrisés, et la qualité des produits se ressent à chaque bouchée. Un véritable travail d’orfèvre, aussi beau que bon. Gros coup de cœur pour la pistache, la vanille et la framboise !
    </p>
  </div>

  <div className="flex flex-col items-center justify-center gap-6 text-center">
    <Heart size={40} />
    <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Youssra E</h2>
    <p className="text-center max-w-[400px] text-lg">
      Un travail minutieux et de qualité, les produits sont frais. Après avoir goûté pratiquement toute la carte (sucré et salé), je peux affirmer que c’est aussi beau que bon et même plus que ça. Tout est excellent un vrai travail de chef. Les tartes sont dignes d’un grand chef pâtissier. Bravo et merci !
    </p>
  </div>

  <div className="flex flex-col items-center justify-center gap-6 text-center">
    <Heart size={40} />
    <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Manal K</h2>
    <p className="text-center max-w-[400px] text-lg">
      Cela fait des années que je suis cette cheffe traiteur sur les réseaux sociaux, et c’est toujours un plaisir de voir une personne aussi passionnée et talentueuse. Son savoir-faire est indéniable, et chaque création reflète son amour pour la cuisine. Elle travaille énormément pour offrir des prestations de qualité, et ça se ressent dans chacun de ses plats. Je recommande vivement !
    </p>
  </div>
</div>


      </div>
      <Realisations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
