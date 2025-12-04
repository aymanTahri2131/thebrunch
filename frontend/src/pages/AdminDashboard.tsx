import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Coffee, 
  ChefHat, 
  Sparkles,
  Edit,
  Trash2,
  Plus,
  Home,
  Menu as MenuIcon,
  Save,
  X,
  Upload,
  Folder,
  Utensils,
  Package,
  Apple,
  Cake,
  Wine,
  Croissant,
  Cookie,
  IceCream,
  Pizza,
  Sandwich,
  Salad,
  UtensilsCrossed
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeMenu, setActiveMenu] = useState('lunch');
  const [brunchData, setBrunchData] = useState({ categories: [] });
  const [lunchData, setLunchData] = useState({ categories: [] });
  const [reveillonData, setReveillonData] = useState({ categories: [], plateaux: [] });
  const [loading, setLoading] = useState(true);

  // États pour modals de produit
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState('');
  const [editingMenuType, setEditingMenuType] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    price: '',
    quantity: '',
    isPremium: false,
    isActive: true,
    image: '',
    items: [],
    lastItem: ''
  });
  
  // États pour l'upload d'image
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // États pour la validation des erreurs
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========== NOUVEAUX ÉTATS POUR LA GESTION DES CATÉGORIES ==========
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    icon: 'Utensils',
    isActive: true,
    sortOrder: 0
  });
  const [categoryFormErrors, setCategoryFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  // Liste des icônes disponibles
  const availableIcons = [
    { name: 'Utensils', component: Utensils },
    { name: 'Package', component: Package },
    { name: 'Apple', component: Apple },
    { name: 'Cake', component: Cake },
    { name: 'Coffee', component: Coffee },
    { name: 'Wine', component: Wine },
    { name: 'Croissant', component: Croissant },
    { name: 'Cookie', component: Cookie },
    { name: 'IceCream', component: IceCream },
    { name: 'Pizza', component: Pizza },
    { name: 'Sandwich', component: Sandwich },
    { name: 'Salad', component: Salad }
  ];

  // ========== FONCTIONS DE VALIDATION DES CATÉGORIES ==========
  const validateCategoryForm = () => {
    const errors: Record<string, string> = {};
    
    if (!categoryFormData.name || categoryFormData.name.trim().length === 0) {
      errors.name = 'Le nom de la catégorie est obligatoire';
    } else if (categoryFormData.name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (categoryFormData.description && categoryFormData.description.trim().length > 0 && categoryFormData.description.trim().length < 10) {
      errors.description = 'La description doit contenir au moins 10 caractères';
    }
    
    if (categoryFormData.sortOrder !== undefined && categoryFormData.sortOrder < 0) {
      errors.sortOrder = 'L\'ordre doit être un nombre positif';
    }
    
    setCategoryFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ========== FONCTIONS DE GESTION DES CATÉGORIES ==========
  const handleAddCategory = (menuType) => {
    setCategoryFormData({
      name: '',
      description: '',
      icon: 'Utensils',
      isActive: true,
      sortOrder: 0
    });
    setEditingCategory(null);
    setEditingMenuType(menuType);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (menuType, category) => {
    setCategoryFormData({
      name: category.name || '',
      description: category.description || '',
      icon: category.icon || 'Utensils',
      isActive: category.isActive !== undefined ? category.isActive : true,
      sortOrder: category.sortOrder !== undefined ? category.sortOrder : 0
    });
    setEditingCategory(category);
    setEditingMenuType(menuType);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!validateCategoryForm()) {
      toast({
        title: "Erreurs de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté",
        variant: "destructive",
      });
      navigate('/admin/login');
      return;
    }

    setIsSubmittingCategory(true);

    try {
      // Générer l'ID à partir du nom (kebab-case)
      const generateId = (name) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      };

      const cleanedData = {
        id: editingCategory ? editingCategory.id : generateId(categoryFormData.name),
        name: categoryFormData.name.trim(),
        description: categoryFormData.description?.trim() || '',
        icon: categoryFormData.icon || 'Utensils',
        isActive: categoryFormData.isActive,
        sortOrder: parseInt(categoryFormData.sortOrder.toString()) || 0
      };

      let url = `https://thebrunchtraiteur-production.up.railway.app/api/${editingMenuType}/admin/category`;
      let method = 'POST';
      
      if (editingCategory) {
        // Mode modification
        url = `https://thebrunchtraiteur-production.up.railway.app/api/${editingMenuType}/admin/category/${editingCategory.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanedData)
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Succès",
          description: editingCategory 
            ? 'Catégorie modifiée avec succès' 
            : 'Catégorie créée avec succès',
        });
        
        setCategoryModalOpen(false);
        fetchAllMenus();
      } else {
        toast({
          title: "Erreur",
          description: result.message || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la catégorie:', error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de contacter le serveur",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleDeleteCategory = async (menuType, categoryId) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les produits associés seront également supprimés.');
    
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`https://thebrunchtraiteur-production.up.railway.app/api/${menuType}/admin/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Succès",
          description: 'Catégorie supprimée avec succès',
        });
        fetchAllMenus();
      } else {
        toast({
          title: "Erreur",
          description: result.message || "Impossible de supprimer la catégorie",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la catégorie",
        variant: "destructive",
      });
    }
  };

  const handleCancelCategory = () => {
    setCategoryModalOpen(false);
    setEditingCategory(null);
    setCategoryFormErrors({});
    setCategoryFormData({
      name: '',
      description: '',
      icon: 'Utensils',
      isActive: true,
      sortOrder: 0
    });
  };

  // ========== VALIDATION DES PRODUITS ==========
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name || formData.name.trim().length === 0) {
      errors.name = 'Le nom est obligatoire';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!formData.description || formData.description.trim().length === 0) {
      errors.description = 'La description est obligatoire';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'La description doit contenir au moins 10 caractères';
    }
    
    if (!formData.price || formData.price.toString().trim().length === 0) {
      errors.price = 'Le prix est obligatoire';
    } else {
      const cleanPrice = formData.price.toString().replace(/[€\s]/g, '').replace(',', '.');
      const priceNum = parseFloat(cleanPrice);
      
      if (isNaN(priceNum) || priceNum <= 0) {
        errors.price = 'Le prix doit être un nombre positif';
      } else if (priceNum > 1000) {
        errors.price = 'Le prix ne peut pas dépasser 1000€';
      }
    }
    
    if (editingType === 'plateau') {
      if (!formData.items || formData.items.length === 0 || 
          (formData.items.length === 1 && formData.items[0].trim().length === 0)) {
        errors.items = 'Au moins un item est obligatoire pour un plateau';
      }
    }
    
    if (editingType === 'product') {
      if (formData.quantity && formData.quantity.trim().length > 0) {
        const quantity = formData.quantity.trim();
        if (quantity.length < 2) {
          errors.quantity = 'La quantité doit être plus descriptive (ex: "10 pièces")';
        }
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const cleanFormData = () => {
    const cleanedData = { ...formData };
    
    if (cleanedData.price) {
      const cleanPrice = cleanedData.price.toString().replace(/[€\s]/g, '').replace(',', '.');
      cleanedData.price = cleanPrice;
    }
    
    cleanedData.name = cleanedData.name.trim();
    cleanedData.description = cleanedData.description.trim();
    if (cleanedData.quantity) {
      cleanedData.quantity = cleanedData.quantity.trim();
    }
    
    if (editingType === 'plateau' && cleanedData.items) {
      cleanedData.items = cleanedData.items
        .filter(item => item && item.trim().length > 0)
        .map(item => item.trim());
      
      if (cleanedData.lastItem) {
        cleanedData.lastItem = cleanedData.lastItem.trim();
      }
    }
    
    return cleanedData;
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllMenus();
  }, [navigate]);

  const fetchAllMenus = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      setLoading(true);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [brunchResponse, lunchResponse, reveillonResponse] = await Promise.all([
        fetch('https://thebrunchtraiteur-production.up.railway.app/api/brunch/admin', { headers }),
        fetch('https://thebrunchtraiteur-production.up.railway.app/api/lunch/admin', { headers }),
        fetch('https://thebrunchtraiteur-production.up.railway.app/api/reveillon/admin', { headers })
      ]);

      const brunch = await brunchResponse.json();
      const lunch = await lunchResponse.json();
      const reveillon = await reveillonResponse.json();

      if (brunch.success) setBrunchData(brunch.data);
      if (lunch.success) setLunchData(lunch.data);
      if (reveillon.success) setReveillonData(reveillon.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.dispatchEvent(new Event('authStateChange'));
    navigate('/admin/login');
  };

  const editProduct = (menuType, categoryId, productId) => {
    let item = null;
    let itemType = '';

    if (menuType === 'reveillon') {
      item = reveillonData.plateaux?.find(p => (p._id || p.id) === productId);
      itemType = 'plateau';
    } else if (menuType === 'brunch') {
      const category = brunchData.categories?.find(c => c.id === categoryId);
      item = category?.products?.find(p => (p._id || p.id) === productId);
      itemType = 'product';
    } else if (menuType === 'lunch') {
      const category = lunchData.categories?.find(c => c.id === categoryId);
      item = category?.products?.find(p => (p._id || p.id) === productId);
      itemType = 'product';
    }

    if (item) {
      setFormData({
        name: item.name || '',
        title: item.title || '',
        description: item.description || '',
        price: item.price || '',
        quantity: item.quantity || '',
        isPremium: item.isPremium || false,
        isActive: item.isActive !== undefined ? item.isActive : true,
        image: item.image || '',
        items: item.items || [],
        lastItem: item.lastItem || ''
      });

      setEditingItem(item);
      setEditingType(itemType);
      setEditingMenuType(menuType);
      setEditingCategoryId(categoryId);
      setEditModalOpen(true);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleAddProduct = (menuType, categoryId) => {
    setFormData({
      name: '',
      title: '',
      description: '',
      price: '',
      quantity: '',
      isPremium: false,
      isActive: true,
      image: '',
      items: [],
      lastItem: ''
    });

    setEditingItem(null);
    setEditingType('product');
    setEditingMenuType(menuType);
    setEditingCategoryId(categoryId);
    setEditModalOpen(true);
  };

  const handleAddPlateau = (menuType) => {
    setFormData({
      name: '',
      title: '',
      description: '',
      price: '',
      quantity: '',
      isPremium: false,
      isActive: true,
      image: '',
      items: [],
      lastItem: ''
    });

    setEditingItem(null);
    setEditingType('plateau');
    setEditingMenuType(menuType);
    setEditingCategoryId(null);
    setEditModalOpen(true);
  };

  const handleSaveProduct = async () => {
  setFormErrors({});
  
  if (!validateForm()) {
    toast({
      title: "Erreurs de validation",
      description: "Veuillez corriger les erreurs dans le formulaire",
      variant: "destructive",
    });
    return;
  }
  
  const token = localStorage.getItem('adminToken');
  if (!token) {
    toast({
      title: "Erreur d'authentification",
      description: "Vous devez être connecté pour effectuer cette action",
      variant: "destructive",
    });
    navigate('/admin/login');
    return;
  }

  setIsSubmitting(true);

  try {
    const cleanedFormData = cleanFormData();
    
    // ✅ S'assurer que l'image est bien présente ou vide (pas de valeur par défaut)
    if (!cleanedFormData.image || cleanedFormData.image.trim() === '') {
      cleanedFormData.image = '';  // Envoyer une chaîne vide au lieu d'undefined
    }
    
    let requestData;
    let method = 'PUT';
    
    if (editingItem) {
      if (editingMenuType === 'reveillon') {
        requestData = {
          action: 'updateProduct',
          itemId: editingItem._id || editingItem.id,
          updates: cleanedFormData
        };
      } else {
        requestData = {
          action: editingType === 'plateau' ? 'updatePlateau' : 'updateProduct',
          itemId: editingItem._id || editingItem.id,
          categoryId: editingCategoryId,
          updates: cleanedFormData
        };
      }
    } else {
      method = 'POST';
      if (editingMenuType === 'reveillon') {
        requestData = {
          action: 'addProduct',
          productData: cleanedFormData
        };
      } else {
        requestData = {
          action: editingType === 'plateau' ? 'addPlateau' : 'addProduct',
          categoryId: editingCategoryId,
          productData: cleanedFormData
        };
      }
    }

    // ✅ Log pour vérifier les données envoyées
    console.log('🔍 Données envoyées:', requestData);

    const response = await fetch(`https://thebrunchtraiteur-production.up.railway.app/api/${editingMenuType}/admin`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const result = await response.json();

    // ✅ Log pour vérifier la réponse
    console.log('📥 Réponse du serveur:', result);

    if (response.ok) {
      toast({
        title: "Succès",
        description: editingItem 
          ? `${editingType === 'plateau' ? 'Plateau' : 'Produit'} modifié avec succès` 
          : `${editingType === 'plateau' ? 'Plateau' : 'Produit'} créé avec succès`,
        variant: "default",
      });
      
      setEditModalOpen(false);
      fetchAllMenus();
    } else {
      if (result.message && result.message.includes('validation failed')) {
        toast({
          title: "Erreur de validation",
          description: "Certains champs ne sont pas valides. Vérifiez le prix et les champs obligatoires.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: result.message || "Une erreur est survenue lors de l'enregistrement",
          variant: "destructive",
        });
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    toast({
      title: "Erreur de connexion",
      description: "Impossible de contacter le serveur. Vérifiez votre connexion.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      const data = await response.json();

      if (response.ok) {
        handleFormChange('image', data.data.url);
        alert('Image uploadée avec succès !');
      } else {
        alert(`Erreur: ${data.message || 'Erreur lors de l\'upload de l\'image'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors de l\'upload de l\'image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingItem(null);
    setFormErrors({});
    setIsSubmitting(false);
    setFormData({
      name: '',
      title: '',
      description: '',
      price: '',
      quantity: '',
      isPremium: false,
      isActive: true,
      image: '',
      items: [],
      lastItem: ''
    });
  };

  const deleteProduct = async (menuType, categoryId, productId) => {
    const token = localStorage.getItem('adminToken');
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    
    if (!confirmed) return;

    try {
      const response = await fetch(`https://thebrunchtraiteur-production.up.railway.app/api/${menuType}/admin`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'deleteProduct',
          categoryId,
          productId
        })
      });

      if (response.ok) {
        fetchAllMenus();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderProductTable = (data, menuType) => {
    if (menuType === 'reveillon') {
      if (!data.plateaux || data.plateaux.length === 0) {
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun plateau trouvé</p>
          </div>
        );
      }

      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MenuIcon className="h-5 w-5" />
              Plateaux Réveillon
              <Badge variant="secondary">{data.plateaux.length} plateaux</Badge>
            </CardTitle>
            <Button 
              className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
              onClick={() => handleAddPlateau('reveillon')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un plateau
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.plateaux.map((plateau) => (
                  <TableRow key={plateau._id || plateau.id}>
                    <TableCell className="font-medium">{plateau.title}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate" title={plateau.description}>
                        {plateau.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[#99771b] border-[#99771b]">
                        {plateau.price}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {plateau.items?.length || 0} items
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => editProduct(menuType, null, plateau._id || plateau.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteProduct(menuType, null, plateau._id || plateau.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }

    // GESTION DES CATÉGORIES POUR BRUNCH ET LUNCH
    const categories = data.categories;
    
    // Trier les catégories par sortOrder
    const sortedCategories = categories ? [...categories].sort((a, b) => {
      const orderA = a.sortOrder !== undefined ? a.sortOrder : 0;
      const orderB = b.sortOrder !== undefined ? b.sortOrder : 0;
      return orderA - orderB;
    }) : [];
    
    if (!sortedCategories || sortedCategories.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune catégorie trouvée</p>
          <Button 
            className="mt-4 bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
            onClick={() => handleAddCategory(menuType)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une catégorie
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Bouton pour ajouter une catégorie */}
        <div className="flex justify-end">
          <Button 
            className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
            onClick={() => handleAddCategory(menuType)}
          >
            <Folder className="h-4 w-4 mr-2" />
            Ajouter une catégorie
          </Button>
        </div>

        <Tabs defaultValue={sortedCategories[0]?.id} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${sortedCategories.length}, 1fr)` }}>
            {sortedCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#cbb36f] data-[state=active]:to-[#99771b] data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {sortedCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MenuIcon className="h-5 w-5" />
                    {category.name}
                    <Badge variant="secondary">{category.products?.length || 0} produits</Badge>
                    <Badge variant="outline" className="text-xs">
                      Ordre: {category.sortOrder !== undefined ? category.sortOrder : 0}
                    </Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleEditCategory(menuType, category)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier catégorie
                    </Button>
                    <Button 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteCategory(menuType, category.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer catégorie
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
                      onClick={() => handleAddProduct(menuType, category.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un produit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {category.products && category.products.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Prix</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.products.map((product) => (
                          <TableRow key={product._id || product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="max-w-md">
                              <p className="truncate" title={product.description}>
                                {product.description}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-[#99771b] border-[#99771b]">
                                {product.price}
                              </Badge>
                            </TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => editProduct(menuType, category.id, product._id || product.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => deleteProduct(menuType, category.id, product._id || product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun produit dans cette catégorie</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Tableau de bord</h1>
        </div>
        
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            <a
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 border-b border-gray-200 mb-4 pb-3"
            >
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </a>
            <button
              onClick={() => setActiveMenu('lunch')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'lunch' 
                  ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChefHat className="h-5 w-5" />
              Menu Lunch
            </button>

            <button
              onClick={() => setActiveMenu('brunch')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'brunch' 
                  ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Coffee className="h-5 w-5" />
              Menu Brunch
            </button>
            
            <button
              onClick={() => setActiveMenu('reveillon')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'reveillon' 
                  ? 'bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="h-5 w-5" />
              Menu Réveillon
            </button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeMenu === 'brunch' && 'Gestion du Menu Brunch'}
                {activeMenu === 'lunch' && 'Gestion du Menu Lunch'}
                {activeMenu === 'reveillon' && 'Gestion du Menu Réveillon'}
              </h1>
              <p className="text-gray-600 mt-1">
                Gérez les catégories et produits de votre menu
              </p>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#99771b] mx-auto mb-4"></div>
                <p>Chargement des menus...</p>
              </div>
            </div>
          ) : (
            <>
              {activeMenu === 'brunch' && renderProductTable(brunchData, 'brunch')}
              {activeMenu === 'lunch' && renderProductTable(lunchData, 'lunch')}
              {activeMenu === 'reveillon' && renderProductTable(reveillonData, 'reveillon')}
            </>
          )}
        </main>
      </div>

      {/* ========== MODAL DE GESTION DES CATÉGORIES ========== */}
      <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingCategory ? <Edit className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
              {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName" className={categoryFormErrors.name ? 'text-red-500' : ''}>
                Nom de la catégorie
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="categoryName"
                value={categoryFormData.name}
                onChange={(e) => {
                  setCategoryFormData(prev => ({ ...prev, name: e.target.value }));
                  if (categoryFormErrors.name) {
                    setCategoryFormErrors(prev => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder="Ex: Sandwichs, Salades, Desserts..."
                className={categoryFormErrors.name ? 'border-red-500' : ''}
              />
              {categoryFormErrors.name && (
                <p className="text-sm text-red-500 mt-1">{categoryFormErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description (optionnel)</Label>
              <Textarea
                id="categoryDescription"
                value={categoryFormData.description}
                onChange={(e) => {
                  setCategoryFormData(prev => ({ ...prev, description: e.target.value }));
                  if (categoryFormErrors.description) {
                    setCategoryFormErrors(prev => ({ ...prev, description: undefined }));
                  }
                }}
                placeholder="Description de la catégorie..."
                rows={3}
                className={categoryFormErrors.description ? 'border-red-500' : ''}
              />
              {categoryFormErrors.description && (
                <p className="text-sm text-red-500 mt-1">{categoryFormErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder" className={categoryFormErrors.sortOrder ? 'text-red-500' : ''}>
                Ordre d'affichage
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="sortOrder"
                type="number"
                min="0"
                value={categoryFormData.sortOrder}
                onChange={(e) => {
                  setCategoryFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }));
                  if (categoryFormErrors.sortOrder) {
                    setCategoryFormErrors(prev => ({ ...prev, sortOrder: undefined }));
                  }
                }}
                placeholder="0"
                className={categoryFormErrors.sortOrder ? 'border-red-500' : ''}
              />
              {categoryFormErrors.sortOrder && (
                <p className="text-sm text-red-500 mt-1">{categoryFormErrors.sortOrder}</p>
              )}
              <p className="text-xs text-gray-500">
                Plus le nombre est petit, plus la catégorie apparaît en premier (0 = première position)
              </p>
            </div>

            <div className="space-y-2">
              <Label>
                Icône de la catégorie
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {availableIcons.map((icon) => {
                  const IconComponent = icon.component;
                  const isSelected = categoryFormData.icon === icon.name;
                  return (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => setCategoryFormData(prev => ({ ...prev, icon: icon.name }))}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-[#99771b] bg-[#cbb36f]/10' 
                          : 'border-gray-200 hover:border-[#cbb36f]'
                      }`}
                    >
                      <IconComponent className={`h-6 w-6 ${isSelected ? 'text-[#99771b]' : 'text-gray-600'}`} />
                      <span className={`text-xs mt-2 ${isSelected ? 'text-[#99771b] font-medium' : 'text-gray-500'}`}>
                        {icon.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="categoryActive">Catégorie active</Label>
              <Switch
                id="categoryActive"
                checked={categoryFormData.isActive}
                onCheckedChange={(checked) => setCategoryFormData(prev => ({ ...prev, isActive: checked }))}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleCancelCategory}
              disabled={isSubmittingCategory}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              onClick={handleSaveCategory}
              className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
              disabled={isSubmittingCategory}
            >
              {isSubmittingCategory ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingCategory ? 'Enregistrer' : 'Ajouter'}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========== MODAL D'ÉDITION DES PRODUITS ========== */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingItem ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {editingItem 
                ? (editingType === 'plateau' ? 'Modifier le Plateau' : 'Modifier le Produit')
                : (editingType === 'plateau' ? 'Ajouter un Plateau' : 'Ajouter un Produit')
              }
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={formErrors.name ? 'text-red-500' : ''}>
                {editingType === 'plateau' ? 'Titre du plateau' : 'Nom du produit'}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="name"
                value={editingType === 'plateau' ? formData.title : formData.name}
                onChange={(e) => handleFormChange(editingType === 'plateau' ? 'title' : 'name', e.target.value)}
                placeholder={editingType === 'plateau' ? 'Entrez le titre du plateau' : 'Entrez le nom du produit'}
                className={formErrors.name ? 'border-red-500 focus:border-red-500' : ''}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className={formErrors.description ? 'text-red-500' : ''}>
                Description
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Description du produit"
                rows={3}
                className={formErrors.description ? 'border-red-500 focus:border-red-500' : ''}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className={formErrors.price ? 'text-red-500' : ''}>
                Prix
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                placeholder="Ex: 15€"
                className={formErrors.price ? 'border-red-500 focus:border-red-500' : ''}
              />
              {formErrors.price && (
                <p className="text-sm text-red-500 mt-1">{formErrors.price}</p>
              )}
              <p className="text-sm text-gray-500">Il faut saisir le prix avec le symbole €</p>
            </div>

            {editingType === 'product' && (
              <div className="space-y-2">
                <Label htmlFor="quantity" className={formErrors.quantity ? 'text-red-500' : ''}>
                  Quantité (optionnel)
                </Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                  placeholder="Ex: 10 pièces"
                  className={formErrors.quantity ? 'border-red-500 focus:border-red-500' : ''}
                />
                {formErrors.quantity && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.quantity}</p>
                )}
              </div>
            )}

            {editingType === 'plateau' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="items" className={formErrors.items ? 'text-red-500' : ''}>
                    Items du plateau (un par ligne)
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="items"
                    value={formData.items.join('\n')}
                    onChange={(e) => handleFormChange('items', e.target.value.split('\n'))}
                    placeholder="Burger Brioché&#10;Natte Viennoise&#10;..."
                    rows={4}
                    className={formErrors.items ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.items && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.items}</p>
                  )}
                  <p className="text-sm text-gray-500">Saisissez chaque item sur une ligne séparée</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastItem">Dernier item</Label>
                  <Input
                    id="lastItem"
                    value={formData.lastItem}
                    onChange={(e) => handleFormChange('lastItem', e.target.value)}
                    placeholder="Pepper poulet"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="image">Image du produit</Label>
              <div className="flex space-x-2">
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleFormChange('image', e.target.value)}
                  placeholder="/images/card1.jpg"
                  className="flex-1"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadingImage}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImage}
                    className="whitespace-nowrap flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingImage ? 'Upload...' : 'Uploader'}
                  </Button>
                </div>
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Prévisualisation"
                    className="w-20 h-20 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="isPremium">Produit Premium</Label>
                <Switch
                  id="isPremium"
                  checked={formData.isPremium}
                  onCheckedChange={(checked) => handleFormChange('isPremium', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Produit Actif</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleFormChange('isActive', checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              onClick={handleSaveProduct}
              className="bg-gradient-to-r from-[#cbb36f] to-[#99771b] hover:from-[#b8a060] hover:to-[#856818]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? 'Enregistrer' : 'Ajouter'}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
