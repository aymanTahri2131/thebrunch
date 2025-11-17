export const About = () => {
  return (
    <section className="py-20 bg-background" >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          À Propos
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Qui suis-je */}
          <div className="space-y-6 bg-white border border-accent/20 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-primary mb-6">
              Qui suis-je ?
            </h3>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p>
                Diplômée d'un CAP Boulangerie et forte de plus de dix ans d'expérience dans l'artisanat,
                j'ai toujours été guidée par l'amour du goût et du travail bien fait. 
                Ma passion pour la création culinaire m'a naturellement menée vers le métier de traiteur,
                où je peux exprimer toute ma sensibilité et ma créativité.
              
              </p>
              <p>
              J'aime raconter une histoire à travers mes
réalisations et offrir des compositions soignées,
préparées avec la même attention que si elles étaient destinées à mes proches.
              </p>
              <p className="text-sm text-primary pt-4">
                Commandes à récupérer, commandes livrées ou prestation sur place
                avec mise en place de votre évènement et service assuré par nos
                soins (sur devis)
              </p>
            </div>
          </div>

          {/* Ma Philosophie */}
          <div className="space-y-6 bg-white border border-accent/20 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-primary mb-6">
              Ma Philosophie
            </h3>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p>
                Je crois profondément en la cuisine faite avec intention, précision et générosité. 
                Chaque pièce est élaborée avec des produits de qualité, un sens aigu du détail et le désir de créer une expérience gustative unique.
              </p>
              <p>
              J'accorde une attention particulière à la
              présentation, à l'harmonie des saveurs et à la
              satisfaction de mes clients, car pour moi, chaque événement mérite d'être sublimé avec élégance et authenticité.
              </p>
              <p>
                Toutes mes pièces sont préparées de manière artisanale et
                utilisent des produits de qualité soigneusement sélectionnés.
              </p>
              <p className="text-sm text-primary pt-2">
                La présentation est d'une importance capitale afin de créer une
                expérience sensorielle complète pour le plaisir de vos papilles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
