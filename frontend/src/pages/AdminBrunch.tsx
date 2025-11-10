import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from "../../public/favicon.ico"
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye,
  EyeOff,
  Star,
  Coffee
} from 'lucide-react';

const AdminBrunch = () => {
  const navigate = useNavigate();
  const [brunchData, setBrunchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBrunchData();
  }, []);

  const fetchBrunchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/brunch/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBrunchData(data.data);
      } else {
        throw new Error('Erreur lors du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching brunch data:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const saveBrunchData = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/brunch/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          categories: brunchData.categories
        })
      });

      if (response.ok) {
        setSuccess('Menu brunch sauvegardé avec succès!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving brunch data:', error);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const toggleProductActive = (categoryId, productIndex) => {
    setBrunchData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId 
          ? {
              ...cat,
              products: cat.products.map((product, index) => 
                index === productIndex 
                  ? { ...product, isActive: !product.isActive }
                  : product
              )
            }
          : cat
      )
    }));
  };

  const toggleCategoryActive = (categoryId) => {
    setBrunchData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, isActive: !cat.isActive }
          : cat
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img src={Logo} className="w-20 h-20 animate-spin mx-auto mb-4" alt="Traiteur Oriental & Brunch à Strasbourg" />
          <p>Chargement du menu brunch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestion Menu Brunch
                </h1>
                <p className="text-sm text-gray-500">
                  {brunchData?.categories?.length || 0} catégories • {brunchData?.categories?.reduce((sum, cat) => sum + (cat.products?.length || 0), 0) || 0} produits
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={saveBrunchData}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Categories Management */}
        <div className="space-y-8">
          {brunchData?.categories?.map((category, categoryIndex) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {category.name}
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategoryActive(category.id)}
                    >
                      {category.isActive ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Masquer
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Afficher
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {category.products && category.products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.products.map((product, productIndex) => (
                      <Card key={productIndex} className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm">{product.name}</h4>
                              {product.isPremium && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleProductActive(category.id, productIndex)}
                              >
                                {product.isActive ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <Badge variant="secondary" className="text-xs">
                              {product.price}
                            </Badge>
                            <Badge variant={product.isActive ? "default" : "secondary"} className="text-xs">
                              {product.isActive ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                          
                          {product.quantity && (
                            <p className="text-xs text-gray-500 mt-2">
                              {product.quantity}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Coffee className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun produit dans cette catégorie</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {(!brunchData?.categories || brunchData.categories.length === 0) && (
            <Card>
              <CardContent className="text-center py-12">
                <Coffee className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucune catégorie</h3>
                <p className="text-gray-500 mb-4">
                  Les données du menu brunch seront chargées automatiquement
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBrunch;