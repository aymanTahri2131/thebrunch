import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      return false;
    }

    try {
      // Vérifier si le token n'est pas expiré (basique)
      const userData = JSON.parse(user);
      return !!(token && userData);
    } catch (error) {
      // Si erreur de parsing, considérer comme non authentifié
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return false;
    }
  };

  useEffect(() => {
    setIsAuthenticated(checkAuthStatus());

    // Écouter les changements d'authentification
    const handleAuthChange = () => {
      setIsAuthenticated(checkAuthStatus());
    };

    window.addEventListener('authStateChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Chargement initial
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#99771b]"></div>
      </div>
    );
  }

  // Si l'authentification est requise et que l'utilisateur n'est pas connecté
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;