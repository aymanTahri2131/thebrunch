import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
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

      <div className="flex flex-col sm:flex-col lg:flex-row w-full items-center justify-center p-12 gap-12 h-auto sm:h-auto lg:h-[350px] bg-[#99771b]/40 text-white">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Leaf size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
            MATIÈRES PREMIÈRES SÉLECTIONNÉES
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Des ingrédients soigneusement choisis.
            Nous choisissons avec le plus grand soin des ingrédients d’exception afin de vous garantir une qualité irréprochable pour sublimer chacun de vos moments précieux.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Heart size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
            SAVOIR-FAIRE ARTISANAL
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Un artisanat fait avec passion.
            Un travail artisanal réalisé avec passion et maîtrise, pour transformer vos instants les plus marquants en souvenirs gourmands raffinés et mémorables.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Star size={40} />
          <h2 className="text-[#4a3b36] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
            SATISFACTION CLIENT
          </h2>
          <p className="text-center max-w-[400px] text-lg">
            Votre satisfaction au cœur de notre démarche.
            Nous plaçons vos attentes au centre de notre démarche afin de faire de chaque commande une expérience sur-mesure, unique et parfaitement réussie.
          </p>
        </div>
      </div>

      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-[#a08f60] tracking-wide">
        VOS RETOURS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-12 lg:px-20 w-full">

        {/* CARD 1 */}
        <div className="flex flex-col items-center text-center gap-4">
          <Quote size={42} className="text-[#4a3b36]" />
          <h3 className="text-lg font-semibold text-[#4a3b36]">Amélie R</h3>
          <p
            style={{
              fontFamily: '"Inconsolata", monospace',
              fontSize: '12px',
              lineHeight: '1.6'
            }}
            className="text-black/90"
          >
            Nous avons pu goûté au brunch T&A lors d’un événement d’entreprise récemment.
            Et comment vous dire… c’était SUCCULENT ! Des produits frais, des détails dans la présentation, un service de livraison irréprochable.
            Je pense n’avoir jamais mangé d’aussi bon pancakes et egg muffin. Allez-y les yeux fermés.
            Très belle découverte pour ma part.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col items-center text-center gap-4">
          <Quote size={42} className="text-[#4a3b36]" />
          <h3 className="text-lg font-semibold text-[#4a3b36]">Cassandra B</h3>
          <p
            style={{
              fontFamily: '"Inconsolata", monospace',
              fontSize: '12px',
              lineHeight: '1.6'
            }}
            className="text-black/90"
          >
            Un service exceptionnel du début à la fin !
            Nous avons fait appel à The brunch strass pour le baptême de ma fille et tout était parfait.
            La qualité des plats, la présentation : tout a été géré de manière professionnelle.
            Les invités n’ont eu que des compliments à faire sur le buffet, aussi bien pour le goût que pour l’originalité.
            Nous referons appel à ses services sans hésitation !
          </p>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col items-center text-center gap-4">
          <Quote size={42} className="text-[#4a3b36]" />
          <h3 className="text-lg font-semibold text-[#4a3b36]">Ned N</h3>
          <p
            style={{
              fontFamily: '"Inconsolata", monospace',
              fontSize: '12px',
              lineHeight: '1.6'
            }}
            className="text-black/90"
          >
            J’ai donné les clefs de mon mariage en main a une vrai professionnelle,
            et tout était parfait de À à Z. Merci mille fois encore pour votre professionnalisme
            et les douceurs en bouche sans égale. Je recommande les yeux fermés.
          </p>
        </div>

        {/* CARD 4 */}
        <div className="flex flex-col items-center text-center gap-4">
          <Quote size={42} className="text-[#4a3b36]" />
          <h3 className="text-lg font-semibold text-[#4a3b36]">Hanta D</h3>
          <p
            style={{
              fontFamily: '"Inconsolata", monospace',
              fontSize: '12px',
              lineHeight: '1.6'
            }}
            className="text-black/90"
          >
            Ne cherchez pas plus loin. Choisissez ce traiteur.
            Elle nous a fourni une prestation mémorable, délicieuse et rapide pour le lendemain de notre mariage.
            L’ensemble de nos convives ont adoré et certains ont apprécié que les produits soient halal.
            Professionnelle, adorable… elle a compris notre besoin et a répondu avec succès.
            Merci Aziza. Nous n’hésiterons pas à faire appel pour une prochaine fois.
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
