export const About = () => {
  return (
    <section className="py-20 bg-background">
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
                Traiteur Oriental basé dans le Bas-Rhin à Strasbourg (67), je
                réponds à tous les besoins.
              </p>
              <p>
                Evénements privés, Evénements professionnels, Fêtes, Mariages,
                Baptêmes...
              </p>
              <p>
                Mignardises sucrées, mignardises salées, Formules, Plateaux à
                composer... tout est là pour vous proposer un Brunch sur mesure
                selon vos goûts et vos envies.
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
                Je prends énormément de soin et de précision dans la fabrication
                de mes créations faites à la main, en y mettant tout mon amour.
              </p>
              <p>
                Que ce soit pour vos fêtes privées, réceptions d'entreprises ou
                mariage, je vous accompagne avec des créations uniques.
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
