import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  path: string;
  isHome?: boolean;
  scrollTo?: string;
}

const navLinks: NavLink[] = [
  { name: "Accueil", path: "/", isHome: true },
  { name: "Lunch", path: "/lunch" },
  { name: "Brunch", path: "/brunch" },
  { name: "Menu Réveillon", path: "/menu-reveillon", scrollTo: "reveillon-menu" },
  { name: "Contact", path: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (link: NavLink) => {
    if (link.isHome && link.scrollTo && location.pathname === "/") {
      scrollToSection(link.scrollTo);
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          The Brunch
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link)}
              className={cn(
                "text-foreground hover:text-primary transition-colors font-medium",
                location.pathname === link.path && "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link)}
              className={cn(
                "block py-2 text-foreground hover:text-primary transition-colors font-medium",
                location.pathname === link.path && "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
