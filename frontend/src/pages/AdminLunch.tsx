import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from "../../public/favicon.ico"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Upload,
  Eye,
  EyeOff,
  Star,
  ChefHat
} from 'lucide-react';

const AdminLunch = () => {
  const navigate = useNavigate();
  const [lunchData, setLunchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);

  useEffect(() => {
    fetchLunchData();
  }, []);

  const fetchLunchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/lunch/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLunchData(data.data);
      } else {
        throw new Error('Erreur lors du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching lunch data:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const saveLunchData = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/lunch/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          categories: lunchData.categories
        })
      });

      if (response.ok) {
        setSuccess('Menu lunch sauvegardé avec succès!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving lunch data:', error);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const toggleProductActive = (categoryId, productIndex) => {
    setLunchData(prev => ({
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
    setLunchData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, isActive: !cat.isActive }
          : cat
      )
    }));
  };

  const deleteProduct = (categoryId, productIndex) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      setLunchData(prev => ({
        ...prev,
        categories: prev.categories.map(cat => 
          cat.id === categoryId 
            ? {
                ...cat,
                products: cat.products.filter((_, index) => index !== productIndex)
              }
            : cat
        )
      }));
    }
  };

  const deleteCategory = (categoryId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie et tous ses produits?')) {
      setLunchData(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== categoryId)
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img src={Logo} className="w-20 h-20 animate-spin mx-auto mb-4" alt="Traiteur Oriental & Brunch à Strasbourg" />
          <p>Chargement du menu lunch...</p>
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
                  Gestion Menu Lunch
                </h1>
                <p className="text-sm text-gray-500">
                  {lunchData?.categories?.length || 0} catégories • {lunchData?.categories?.reduce((sum, cat) => sum + (cat.products?.length || 0), 0) || 0} produits
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddCategoryDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Catégorie
              </Button>
              <Button
                onClick={saveLunchData}
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
          {lunchData?.categories?.map((category, categoryIndex) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-blue-600" />
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
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddProductDialog(category.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Produit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingProduct({...product, categoryId: category.id, productIndex})}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteProduct(category.id, productIndex)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {product.price} {'€'}
                            </Badge>
                            <Badge variant={product.isActive ? "default" : "secondary"} className="text-xs">
                              {product.isActive ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun produit dans cette catégorie</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowAddProductDialog(category.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un produit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {(!lunchData?.categories || lunchData.categories.length === 0) && (
            <Card>
              <CardContent className="text-center py-12">
                <ChefHat className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucune catégorie</h3>
                <p className="text-gray-500 mb-4">
                  Commencez par créer votre première catégorie de menu lunch
                </p>
                <Button onClick={() => setShowAddCategoryDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une catégorie
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Dialogs would be added here */}
      {/* For brevity, I'll add them in the next iteration */}
    </div>
  );
};

export default AdminLunch;

