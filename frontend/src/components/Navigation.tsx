import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "../../public/images/logo.png"

interface NavLink {
  name: string;
  path: string;
  scrollTo?: string;
  isContact?: boolean;
  isHome?: boolean;
  icon?: React.ReactNode;
}

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('adminToken');
      const user = localStorage.getItem('adminUser');
      setIsAdminLoggedIn(!!(token && user));
    };
    checkAuthStatus();
    const handleStorageChange = () => { checkAuthStatus(); };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChange', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChange', handleStorageChange);
    };
  }, []);

  const adminLink = isAdminLoggedIn ? "/admin/dashboard" : "/admin/login";

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactClick = () => {
    if (location.pathname === '/') scrollToSection('contact');
    else navigate('/contact');
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };

  const handleWhatsAppClick = async () => {
    const message = "Bonjour ! Je souhaite en savoir plus sur vos services de traiteur oriental.";
    try {
      await fetch('https://thebrunchtraiteur-production.up.railway.app/api/communication/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, customerName: 'Client depuis le site web', customerPhone: 'Via bouton WhatsApp navigation' })
      });
    } catch { console.log('Notification WhatsApp échouée, ouverture directe'); }
    const phoneNumber = "33783453605";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const navLinks: NavLink[] = [
    { name: "Accueil", path: "/", isHome: true },
    { name: "Lunch", path: "/lunch" },
    { name: "Brunch", path: "/brunch" },
    { name: "Menu Réveillon", path: "/menu-reveillon", scrollTo: "reveillon-menu" },
    { name: "FAQ", path: "/faq", icon: <HelpCircle className="h-4 w-4 inline mr-1" /> }, // جديد
    { name: "Contact", path: "/contact", isContact: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} className="w-16" alt="Traiteur Oriental & Brunch à Strasbourg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
              const content = (
                <>
                  {link.icon}
                  {link.name}
                </>
              );
              if (link.scrollTo) return (
                <button key={link.name} onClick={() => scrollToSection(link.scrollTo)} className="text-foreground hover:text-primary transition-colors font-medium">{content}</button>
              );
              if (link.isContact) return (
                <button key={link.name} onClick={handleContactClick} className="text-foreground hover:text-primary transition-colors font-medium">{content}</button>
              );
              if (link.isHome) return (
                <button key={link.name} onClick={handleHomeClick} className="text-foreground hover:text-primary transition-colors font-medium">{content}</button>
              );
              return (
                <Link key={link.path} to={link.path} className="text-foreground hover:text-primary transition-colors font-medium">{content}</Link>
              );
            })}
            <Button variant="default" size="sm" onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 text-white border-green-500 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>

            <Link to={adminLink} className="text-xs text-muted-foreground hover:text-primary transition-colors opacity-50 hover:opacity-100" title={isAdminLoggedIn ? "Dashboard Admin" : "Administration"}>
              <Settings className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        <div className={cn("md:hidden overflow-hidden transition-all duration-300", isOpen ? "max-h-96 pb-4" : "max-h-0")}>
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map(link => {
              const content = (
                <>
                  {link.icon}
                  {link.name}
                </>
              );
              if (link.scrollTo) return (
                <button key={link.name} onClick={() => { scrollToSection(link.scrollTo); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left">{content}</button>
              );
              if (link.isContact) return (
                <button key={link.name} onClick={() => { handleContactClick(); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left">{content}</button>
              );
              if (link.isHome) return (
                <button key={link.name} onClick={() => { handleHomeClick(); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left">{content}</button>
              );
              return (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary transition-colors font-medium py-2">{content}</Link>
              );
            })}
            <Button variant="default" size="sm" onClick={() => { handleWhatsAppClick(); setIsOpen(false); }} className="bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
