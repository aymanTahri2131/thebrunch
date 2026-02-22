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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setReveillonData(data.data);
      } catch (err) {
        setError(err.message);
        console.error(
          "Erreur lors du chargement des données réveillon:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReveillonData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#cbb36f]" />
              <p className="text-lg text-muted-foreground">
                Chargement du menu réveillon...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-red-600 mb-4">
                Erreur lors du chargement du menu réveillon
              </p>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!reveillonData?.plateaux || reveillonData.plateaux.length === 0) {
    return (
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Aucun menu réveillon disponible pour le moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reveillon-menu"
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/NFmyJxz3/Chat-GPT-Image-Feb-2-2026-12-25-53-AM.jpg')",
      }}
    >
      {/* Overlay باش تبان الكتابة */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Carte Menu Ramadan
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Un Ftour gourmand, un geste solidaire
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            5€ reversés à une association à la fin du Ramadan pour chaque box vendue
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Bon Ramadan à vous
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {reveillonData.plateaux.map((plateau, index) => (
            <div key={plateau._id || index} className="group relative">
              <Card className="relative overflow-hidden bg-white shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 rounded-3xl">

                {plateau.isPremium && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      <Star className="h-4 w-4" />
                      Premium
                    </div>
                  </div>
                )}

                <div className="relative h-[32rem] overflow-hidden rounded-t-3xl">
                  <img
                    src={plateau.image}
                    alt={plateau.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-1/3">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-2xl">
                      <div className="text-3xl font-bold text-gray-800">
                        {plateau.price} €
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        par plateau
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 bg-white">
                  <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    {plateau.name || plateau.title}
                  </h3>

                  {plateau.description && (
                    <p className="text-gray-600 text-center mb-6">
                      {plateau.description}
                    </p>
                  )}

                  {plateau.items && plateau.items.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {plateau.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center p-3 bg-gray-50 rounded-xl text-sm text-gray-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {plateau.quantity && (
                    <div className="text-center text-sm text-gray-600 mb-4">
                      Pour {plateau.quantity} personnes
                    </div>
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white font-semibold py-3 rounded-xl"
                    onClick={scrollToContact}
                  >
                    Commander
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
