// components/retours.jsx
import { Quote } from "lucide-react";

export const retours = () => {
  return (
    <section>
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
    </section>
  );
};
