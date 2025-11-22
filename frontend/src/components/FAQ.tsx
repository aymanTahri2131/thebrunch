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
  { q: "Pouvons-nous personnaliser notre brunch ?", a: "Absolument. Nous créons des brunchs 100 % sur mesure selon vos goûts, votre thème, votre budget et votre événement." },
  { q: "Avez-vous un minimum de commande ?", a: "Oui, selon les prestations. En général, le minimum est de 8 à 10 personnes." },
  { q: "Quelle quantité de pièces salées prévoir par personne ?", a: `Selon votre type d’événement :\n• Buffet avant un repas : 2 à 4 pièces salées\n• Buffet ou brunch complet : 6 à 9 pièces salées` },
  { q: "Quelle quantité de pièces sucrées prévoir par personne ?", a: `• Petit cocktail : 2 à 3 pièces sucrées\n• Buffet sucré complet : 4 à 6 pièces sucrées` },
  { q: "Pouvez-vous nous aider à choisir les quantités ?", a: "Oui, nous vous conseillons selon le type d’événement, l’heure, le nombre d’invités et vos préférences." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: `• Carte bancaire\n• Virement\n• Espèces\n• Paiement mobile` },
  { q: "Fournissez-vous des factures pour les entreprises ?", a: "Oui, nous pouvons éditer une facture professionnelle." },
  { q: "Proposez-vous vos services pour les mariages ou grands événements ?", a: `Oui, nous réalisons :\n• mariages & brunch du lendemain\n• baptêmes\n• baby-showers\n• événements professionnels\n• séminaires\n• anniversaires\n• réceptions privées` }
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-[#a08f60] mb-12">
        FAQ
      </h2>

      <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2 px-4">
        {faqs.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left font-medium text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${open === index ? "rotate-180 text-[#a08f60]" : ""}`}
              />
            </button>

            <div
              className={`px-6 pb-4 transition-all duration-500 overflow-hidden ${
                open === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
