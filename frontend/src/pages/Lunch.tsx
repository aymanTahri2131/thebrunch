import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ChefHat, 
  Utensils, 
  Package, 
  Wine, 
  Loader2,
  Cake,
  Coffee,
  Croissant,
  Cookie,
  IceCream,
  Pizza,
  Sandwich,
  Salad,
  UtensilsCrossed,
  Apple
} from "lucide-react";

const Lunch = () => {
  const [lunchData, setLunchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');

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
    Star
  };

  // Fonction pour obtenir le composant d'icône depuis le nom
  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Utensils;
  };

  // Fonction pour diviser le titre sur deux lignes si nécessaire
  const splitCategoryName = (name) => {
    // Vérifier que name existe et est une string
    if (!name || typeof name !== 'string') {
      return { line1: 'Sans nom', line2: null };
    }
    
    const lowerName = name.toLowerCase();
    if (lowerName.includes('planches') || lowerName.includes('planche')) {
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

  useEffect(() => {
    const fetchLunchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/lunch');
        
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
        
        setLunchData(data.data);
        // Définir le premier onglet par défaut
        if (data.data?.categories?.length > 0) {
          setActiveTab(data.data.categories[0].id);
        }
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

  // Récupérer et filtrer les catégories valides
  const categories = (lunchData?.categories || []).filter(
    category => category && category.id && category.name
  );
  
  // Diviser les catégories en lignes de 3
  const categoryRows = [];
  for (let i = 0; i < categories.length; i += 3) {
    categoryRows.push(categories.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] mt-20 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/lunch.jpg")' }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Menu Lunch
            </h1>
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
            Découvrez notre collection complète de créations gourmandes
          </p>
        </div>
      </section>

      {/* Products Section with Tabs */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Aucune catégorie disponible pour le moment</p>
            </div>
          ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs Navigation - Multiple lignes (3 catégories par ligne) */}
            <div className="space-y-4 mb-12">
              {categoryRows.map((row, rowIndex) => (
                <TabsList 
                  key={rowIndex}
                  className="grid w-full max-w-6xl mx-auto h-auto p-2 bg-accent/10 border border-accent/30 shadow-lg rounded-2xl" 
                  style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
                >
                
                  {row.map((category) => {
                    const IconComponent = getIconComponent(category.icon);
                    const { line1, line2 } = splitCategoryName(category.name);
                    
                    return (
                      <TabsTrigger
                        key={category.id} 
                        value={category.id} 
                        className="flex flex-col gap-2 p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#cbb36f] data-[state=active]:to-[#99771b] data-[state=active]:text-white rounded-xl transition-all duration-300"
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
              ))}
            </div>

            {/* Tab Contents */}
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {category.name || 'Sans nom'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {category.description || ''}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                  {category.products && category.products.length > 0 ? (
                    category.products.map((product, index) => (
                    <Card
                      key={product._id || index}
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-bg-accent/30 rounded-2xl"
                    >
                      {/* Image Section */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name || 'Produit'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Image non disponible</span>
                          </div>
                        )}
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className={`text-white font-bold text-lg px-4 py-2 ${
                            product.isPremium 
                              ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b]' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-600'
                          }`}>
                            {product.price ? `${product.price}€` : 'Prix non défini'}
                          </Badge>
                        </div>
                        
                        {/* Quantity Badge */}
                        {product.quantity && (
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-full text-sm font-medium">
                              {product.quantity}
                            </div>
                          </div>
                        )}
                        
                        {/* Premium Star */}
                        {product.isPremium && (
                          <div className="absolute top-4 left-4">
                            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                            {product.name || 'Produit sans nom'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {product.description || 'Aucune description disponible'}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">Aucun produit dans cette catégorie</p>
                    </div>
                  )}
                </div>

                {/* Plateaux Section */}
                {category.plateaux && category.plateaux.length > 0 && (
                  <>
                    <div className="text-center mb-8 mt-16">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Plateaux & Formules</h3>
                      <p className="text-gray-600">Parfaits pour vos événements</p>
                    </div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {category.plateaux.map((plateau, index) => (
                        <Card
                          key={plateau._id || index}
                          className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 rounded-2xl"
                        >
                          {/* Image Section */}
                          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                            <img
                              src={plateau.image || '/images/placeholder.jpg'}
                              alt={plateau.name || 'Plateau'}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                            />
                            
                            {/* Price Badge */}
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white font-bold text-lg px-4 py-2">
                                {plateau.price || 'Prix non défini'}
                              </Badge>
                            </div>
                            
                            {/* Premium Star */}
                            <div className="absolute top-4 left-4">
                              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                            </div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6">
                            <CardHeader className="p-0 mb-4">
                              <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                                {plateau.name || 'Plateau sans nom'}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {plateau.description || 'Aucune description disponible'}
                              </p>
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
          )}

          {/* Call to Action */}
          <div className="text-center mt-16 rounded-3xl p-8 w-full max-w-6xl bg-accent/10 border border-accent/30 mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-[#99771b] mb-4">
              Prêt à composer votre commande ?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Contactez-nous pour personnaliser votre sélection
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              asChild
            >
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
