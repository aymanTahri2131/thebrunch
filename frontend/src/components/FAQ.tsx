import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Comment passer commande ?", a: "Vous pouvez commander via le formulaire en ligne, par message ou par téléphone. Nous revenons rapidement vers vous pour confirmer la date, le nombre de personnes et personnaliser votre prestation." },
  { q: "Combien de temps à l’avance dois-je réserver ?", a: `Pour les petits brunchs (moins de 15 personnes), 48–72 h à l’avance suffisent.\nPour les événements (mariages, entreprises, anniversaires…), nous recommandons de réserver 2 à 6 mois à l’avance.` },
  { q: "Demandez-vous un acompte ?", a: "Oui, un acompte peut être demandé en fonction du montant de la prestation. Le solde est à régler au plus tard le jour de l’événement." },
  { q: "L’acompte est-il remboursable ?", a: `L’acompte n’est pas remboursable.\nEn cas d’annulation anticipée, il peut être converti en avoir, valable sur une prochaine commande.` },
  { q: "Proposez-vous la livraison ?", a: "Oui, nous livrons sur Strasbourg et tout le Bas-Rhin. Les frais varient selon la distance et le volume." },
  { q: "Faites-vous l’installation du buffet ?", a: "Oui, nous pouvons installer entièrement votre buffet brunch : mise en place, décoration simple, organisation des pièces. Ce service est optionnel." },
  { q: "Proposez-vous un service sur place ?", a: "Sur demande, nous pouvons mettre à disposition un(e) serveur(se) pour la gestion du buffet ou du service à table." },
  { q: "Vous déplacez-vous en dehors du Bas-Rhin ?", a: "Oui, pour les événements importants. Un supplément déplacement peut s’appliquer." },
  { q: "Proposez-vous des options halal, sans alcool ou végétariennes ?", a: "Oui, nous pouvons adapter l’intégralité du menu à vos besoins : halal, sans alcool, végétarien." },
  { q: "Pouvons-nous personnaliser notre brunch ?", a: "Absolument. Nous créons des brunchs 100 % sur mesure selon vos goûts, votre thème, votre budget et votre événement." }
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-[#fdf6f0] to-[#fffefc]">
      <h2 className="text-center text-5xl md:text-6xl font-extrabold text-[#a08f60] mb-16 tracking-wide">
        Questions Fréquentes
      </h2>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 px-6">
        {faqs.map((item, index) => (
          <div key={index} className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left text-lg md:text-xl font-semibold text-gray-800 hover:text-[#a08f60] transition-colors"
            >
              <span className="flex-1">{item.q}</span>
              <ChevronDown
                className={`h-6 w-6 text-[#a08f60] transition-transform duration-500 ${open === index ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed transition-all duration-500 overflow-hidden ${
                open === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p className="whitespace-pre-line">{item.a}</p>
            </div>

            {/* فاصل ديكور صغير */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#f7d19c] via-[#a08f60] to-[#f7d19c] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
