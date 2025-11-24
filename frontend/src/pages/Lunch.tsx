import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ChefHat, Utensils, Package, Wine, Loader2 } from "lucide-react";

const Lunch = () => {
  const [lunchData, setLunchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  const getIconForCategory = (categoryId) => {
    const iconMap = {
      'mini-burgers': ChefHat,
      'plateaux-gourmands': Package,
      'verrines': Wine,
      'boites-aperitives': Package,
    };
    return iconMap[categoryId] || Utensils;
  };

  useEffect(() => {
    const fetchLunchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/lunch');
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setLunchData(data.data);
        if (data.data?.categories?.length > 0) setActiveTab(data.data.categories[0].id);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement des données lunch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLunchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#cbb36f]" />
            <p className="text-lg text-gray-600">Chargement du menu lunch...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">Erreur lors du chargement du menu</p>
            <p className="text-sm text-gray-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#cbb36f] hover:bg-[#99771b]"
            >
              Réessayer
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categories = lunchData?.categories || [];
  const visibleCategories = categories.slice(0, 3);
  const allCategories = categories;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="relative h-[60vh] mt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/lunch.jpg")' }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Menu Lunch</h1>
          </div>
          <p className="text-sm md:text-base mb-8 text-white/90 max-w-2xl mx-auto" style={{ fontFamily: '"Inconsolata", monospace' }}>
            Découvrez une sélection soigneusement élaborée pour offrir une expérience culinaire généreuse, créative et pleine de saveurs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-6xl mx-auto mb-12 h-auto p-2 bg-accent/10 border border-accent/30 shadow-lg rounded-2xl" style={{ gridTemplateColumns: `repeat(${Math.min(visibleCategories.length, 3)}, 1fr)` }}>
              {visibleCategories.map((category) => {
                const IconComponent = getIconForCategory(category.id);
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-2 p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#cbb36f] data-[state=active]:to-[#99771b] data-[state=active]:text-white rounded-xl transition-all duration-300">
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {allCategories.length > 3 && (
              <div className="text-center mb-8">
                <TabsList className="grid w-full max-w-6xl mx-auto mb-12 h-auto p-2 bg-accent/10 border border-accent/30 shadow-lg rounded-2xl" style={{ gridTemplateColumns: `repeat(${Math.min(visibleCategories.length, 3)}, 1fr)` }}>
                  {allCategories.slice(3).map((category) => {
                    const IconComponent = getIconForCategory(category.id);
                    return (
                      <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-2 p-3 mx-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#cbb36f] data-[state=active]:to-[#99771b] data-[state=active]:text-white rounded-xl transition-all duration-300">
                        <IconComponent className="h-4 w-4" />
                        <span className="text-xs font-medium text-center">{category.name}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
            )}

            {allCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{category.name}</h2>
                  <p className="text-lg text-gray-600">{category.description}</p>
                </div>

                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                  {category.products?.map((product, index) => (
                    <Card key={product._id || index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-bg-accent/30 rounded-2xl">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {(e.target as HTMLImageElement).src = '/images/placeholder.jpg';}}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={`text-white font-bold text-lg px-4 py-2 ${
                            product.isPremium ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b]' : 'bg-gradient-to-r from-green-500 to-emerald-600'
                          }`}>
                            {typeof product.price === 'number' ? product.price.toFixed(2) + ' €' : product.price + ' €'}
                          </Badge>
                        </div>
                        {product.quantity && (
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full text-sm font-medium">{product.quantity}</div>
                          </div>
                        )}
                        {product.isPremium && (
                          <div className="absolute top-4 left-4">
                            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-bold text-gray-800 leading-tight">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>

                {category.plateaux && category.plateaux.length > 0 && (
                  <>
                    <div className="text-center mb-8 mt-16">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Plateaux & Formules</h3>
                      <p className="text-gray-600">Parfaits pour vos événements</p>
                    </div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {category.plateaux.map((plateau, index) => (
                        <Card key={plateau._id || index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 rounded-2xl">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                            <img src={plateau.image} alt={plateau.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {(e.target as HTMLImageElement).src = '/images/placeholder.jpg';}}
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white font-bold text-lg px-4 py-2">
                                {typeof plateau.price === 'number' ? plateau.price.toFixed(2) + ' €' : plateau.price + ' €'}
                              </Badge>
                            </div>
                            <div className="absolute top-4 left-4">
                              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6">
                            <CardHeader className="p-0 mb-4">
                              <CardTitle className="text-xl font-bold text-gray-800 leading-tight">{plateau.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">{plateau.description}</p>
                              {plateau.items && plateau.items.length > 0 && (
                                <div className="space-y-2">
                                  <p className="font-medium text-gray-800 text-sm">Inclus :</p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {plateau.items.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-[#cbb36f] mt-1">•</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-16 rounded-3xl p-8 w-full max-w-6xl bg-accent/10 border border-accent/30 mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-[#99771b] mb-4">Prêt à composer votre commande ?</h3>
            <p className="text-gray-600 mb-6 text-lg">Contactez-nous pour personnaliser votre sélection</p>
            <Button size="lg" className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
              <Link to="/contact">
                <ChefHat className="mr-2 h-5 w-5" />
                Commander maintenant
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lunch;
