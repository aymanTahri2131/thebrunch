import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReveillonMenu = () => {
  const [reveillonData, setReveillonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const fetchReveillonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://thebrunchtraiteur-production.up.railway.app/api/reveillon"
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }

        const data = await response.json();
        setReveillonData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReveillonData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#cbb36f]" />
            <p className="text-lg text-muted-foreground">
              Chargement du menu réveillon...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-red-600 mb-2">
              Erreur lors du chargement du menu
            </p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!reveillonData?.plateaux?.length) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">
            Aucun menu réveillon disponible pour le moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reveillon-menu"
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://i.postimg.cc/NFmyJxz3/Chat-GPT-Image-Feb-2-2026-12-25-53-AM.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Carte Menu Ramadan
          </h2>

          <p className="text-lg opacity-90">
            Pour des fêtes gourmandes réussies
          </p>
          <p className="text-lg opacity-90">
            ✨ Pour les dates du 24–25 et 30–31
          </p>
          <p className="text-lg opacity-90">
            Retrait de 🕘14h00 à 🕘18h30
          </p>
          <p className="text-lg opacity-90 mt-2">
            Merci de votre compréhension !
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {reveillonData.plateaux.map((plateau, index) => (
            <Card
              key={plateau._id || index}
              className="overflow-hidden bg-white shadow-2xl rounded-3xl transform transition-all hover:-translate-y-2"
            >
              {/* Premium */}
              {plateau.isPremium && (
                <div className="absolute top-6 right-6 z-20 bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Premium
                </div>
              )}

              {/* Image */}
              <div className="relative h-[32rem]">
                <img
                  src={plateau.image}
                  alt={plateau.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-1/3 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl">
                  <div className="text-3xl font-bold text-gray-800">
                    {plateau.price} €
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    par plateau
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-center mb-4">
                  {plateau.name || plateau.title}
                </h3>

                {plateau.description && (
                  <p className="text-center text-gray-600 mb-6">
                    {plateau.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {plateau.items?.map((item, i) => (
                    <div
                      key={i}
                      className="text-center p-3 bg-gray-50 rounded-xl text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {plateau.lastItem && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl text-sm mb-4">
                    {plateau.lastItem}
                  </div>
                )}

                {plateau.quantity && (
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Pour {plateau.quantity} personnes
                  </p>
                )}

                <Button
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white font-semibold py-3 rounded-xl"
                >
                  Commander <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
