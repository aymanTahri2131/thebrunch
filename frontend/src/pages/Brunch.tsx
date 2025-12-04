import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Users, Package, Apple, Utensils, Check, Clock, Loader2, 
  Cake,
  Wine,
  Croissant,
  Cookie,
  IceCream,
  Pizza,
  Sandwich,
  Salad,
  UtensilsCrossed,
  ChefHat,
  Star
} from "lucide-react";

const Brunch = () => {
  const [brunchData, setBrunchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map des composants d'icônes Lucide React
  const iconComponents = {
    Utensils,
    Package,
    Apple,
    Cake,
    Coffee,
    Wine,
    Croissant,
    Cookie,
    IceCream,
    Pizza,
    Sandwich,
    Salad,
    UtensilsCrossed,
    ChefHat,
    Star,
    Users,
    Clock,
    Check
  };

  // Fonction pour obtenir le composant d'icône depuis le nom
  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Utensils;
  };

  useEffect(() => {
    const fetchBrunchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/brunch');
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Trier les catégories par sortOrder
        if (data.data?.categories) {
          data.data.categories.sort((a, b) => {
            const orderA = a.sortOrder !== undefined ? a.sortOrder : 0;
            const orderB = b.sortOrder !== undefined ? b.sortOrder : 0;
            return orderA - orderB;
          });
        }
        
        setBrunchData(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement des données brunch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrunchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#cbb36f]" />
            <p className="text-lg text-gray-600">Chargement du menu brunch...</p>
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

  const categories = brunchData?.categories || [];

  // Fonction pour diviser le titre sur deux lignes
  const splitCategoryName = (name) => {
    if (name.toLowerCase().includes('planches') || name.toLowerCase().includes('planche')) {
      const regex = /\s+(planches?)/i;
      const match = name.match(regex);
      if (match) {
        const index = match.index;
        return {
          line1: name.substring(0, index).trim(),
          line2: name.substring(index).trim()
        };
      }
    }
    return { line1: name, line2: null };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] mt-20 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/card3.jpg")' }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Menu Brunch
            </h1>
          </div>
          <p className="text-sm md:text-base mb-8 text-white/90 max-w-2xl mx-auto" style={{ fontFamily: '"Inconsolata", monospace' }}>
          Un brunch d’exception, pensé comme une véritable expérience gustative.
          Des produits frais, une présentation soignée et des compositions généreuses pour sublimer chacun de vos moments.
          </p>
        </div>
      </section>

      {/* Products Section with Tabs */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={categories[0]?.id} className="w-full">
            {/* Tabs Navigation */}
            <TabsList className="grid w-full max-w-4xl mx-auto mb-12 h-auto p-2 bg-accent/10 border border-accent/30 shadow-lg rounded-2xl" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
              {categories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                const { line1, line2 } = splitCategoryName(category.name);
                
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id} 
                    className="flex flex-col gap-2 p-8 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#cbb36f] data-[state=active]:to-[#99771b] data-[state=active]:text-white rounded-xl transition-all duration-300"
                  >
                    <IconComponent className="h-5 w-5" />
                    <div className="text-xs font-medium text-center leading-tight">
                      <div>{line1}</div>
                      {line2 && <div className="mt-0.5">{line2}</div>}
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab Contents */}
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="text-center mb-12">
                  <p className="text-lg text-gray-600">{category.description}</p>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {category.products?.map((product, index) => (
                    <Card
                      key={product._id || index}
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-bg-accent/30 rounded-2xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                        
                        <div className="absolute top-4 right-4">
                          <Badge className={`text-white font-bold text-lg px-4 py-2 ${
                            product.isPremium 
                              ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b]' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-600'
                          }`}>
                            {product.price}€
                          </Badge>
                        </div>
                        
                        {product.quantity && (
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full text-sm font-medium">
                              {product.quantity}
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                            {product.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Call to Action */}
          <div className="text-center mt-16 rounded-3xl p-8 w-full max-w-6xl bg-accent/10 mx-auto border border-accent/30 shadow-xl">
            <h3 className="text-2xl font-bold text-[#99771b] mb-4">
              Envie d'un brunch sur mesure ?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Contactez-nous pour composer votre brunch parfait
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link to="/contact">
                <Coffee className="mr-2 h-5 w-5" />
                Commander votre brunch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brunch;
