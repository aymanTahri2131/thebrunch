import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from "../../public/favicon.ico"
import { 
  ArrowLeft, 
  Save, 
  Eye,
  EyeOff,
  Sparkles,
  Calendar,
  Star
} from 'lucide-react';

const AdminReveillon = () => {
  const navigate = useNavigate();
  const [reveillonData, setReveillonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchReveillonData();
  }, []);

  const fetchReveillonData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/reveillon/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReveillonData(data.data);
      } else {
        throw new Error('Erreur lors du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching reveillon data:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const saveReveillonData = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/reveillon/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plateaux: reveillonData.plateaux,
          seasonStartDate: reveillonData.seasonStartDate,
          seasonEndDate: reveillonData.seasonEndDate
        })
      });

      if (response.ok) {
        setSuccess('Menu réveillon sauvegardé avec succès!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving reveillon data:', error);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const togglePlateauActive = (plateauIndex) => {
    setReveillonData(prev => ({
      ...prev,
      plateaux: prev.plateaux.map((plateau, index) => 
        index === plateauIndex 
          ? { ...plateau, isActive: !plateau.isActive }
          : plateau
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img src={Logo} className="w-20 h-20 animate-spin mx-auto mb-4" alt="Traiteur Oriental & Brunch à Strasbourg" />
          <p>Chargement du menu réveillon...</p>
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
                  Gestion Menu Réveillon
                </h1>
                <p className="text-sm text-gray-500">
                  {reveillonData?.plateaux?.length || 0} plateaux • Saison: {new Date(reveillonData?.seasonStartDate).toLocaleDateString()} - {new Date(reveillonData?.seasonEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge 
                variant={reveillonData?.isSeasonallyActive ? "default" : "secondary"}
                className="mr-2"
              >
                {reveillonData?.isSeasonallyActive ? "Saison Active" : "Hors Saison"}
              </Badge>
              <Button
                onClick={saveReveillonData}
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700"
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

        {/* Season Info */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Configuration de Saison
            </CardTitle>
            <CardDescription>
              Période d'activité du menu spécial réveillon
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Début de saison</h4>
                <p className="text-gray-600">
                  {new Date(reveillonData?.seasonStartDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fin de saison</h4>
                <p className="text-gray-600">
                  {new Date(reveillonData?.seasonEndDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">
                <strong>Status actuel:</strong> {reveillonData?.isSeasonallyActive ? 
                  "Le menu réveillon est actuellement visible car nous sommes dans la période active." : 
                  "Le menu réveillon est masqué car nous sommes hors de la période active."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Plateaux Management */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Plateaux Réveillon
          </h3>
          
          {reveillonData?.plateaux && reveillonData.plateaux.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reveillonData.plateaux.map((plateau, plateauIndex) => (
                <Card key={plateauIndex} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {plateau.name}
                            <Badge 
                              variant={plateau.badgeText === "Premium" ? "default" : "secondary"}
                              className={plateau.badgeText === "Premium" ? "bg-gradient-to-r from-[#cbb36f] to-[#99771b] text-white" : ""}
                            >
                              {plateau.badgeText}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{plateau.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePlateauActive(plateauIndex)}
                        >
                          {plateau.isActive ? (
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
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-lg font-bold">
                          {plateau.price}€
                        </Badge>
                        <Badge variant={plateau.isActive ? "default" : "secondary"}>
                          {plateau.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-3">Composition du plateau:</h5>
                      <ul className="space-y-2">
                        {plateau.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucun plateau</h3>
                <p className="text-gray-500 mb-4">
                  Les plateaux de réveillon seront chargés automatiquement
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReveillon;