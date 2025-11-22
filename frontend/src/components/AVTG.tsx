// components/AVTG.tsx
import { Leaf, Heart, Star } from "lucide-react";

export const AVTG = () => {
  const cards = [
    {
      icon: <Leaf size={50} className="text-[#4a3b36]" />,
      title: "MATIÈRES PREMIÈRES SÉLECTIONNÉES",
      text: `Des ingrédients soigneusement choisis.
Nous sélectionnons les meilleurs produits pour garantir une qualité exceptionnelle à chaque instant.`
    },
    {
      icon: <Heart size={50} className="text-[#4a3b36]" />,
      title: "SAVOIR-FAIRE ARTISANAL",
      text: `Un artisanat fait avec passion et maîtrise.
Chaque création est pensée pour transformer vos moments en souvenirs raffinés et mémorables.`
    },
    {
      icon: <Star size={50} className="text-[#4a3b36]" />,
      title: "SATISFACTION CLIENT",
      text: `Votre satisfaction est au cœur de notre démarche.
Nous faisons en sorte que chaque commande soit une expérience sur-mesure et réussie.`
    },
  ];

  return (
    <section className="py-16 bg-[#fdf6e3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row gap-12 justify-center items-start text-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {card.icon}
            <h3
              className="text-xl font-semibold text-[#4a3b36]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {card.title}
            </h3>
            <p className="text-[#333333] text-base leading-relaxed max-w-xs">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
