import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Logo from "../../public/images/logo.png"

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src={Logo} className="w-20 mb-4" alt="Traiteur Oriental & Brunch à Strasbourg" />
            <p className="text-muted-foreground text-xs">
              Traiteur basé à Strasbourg et spécialisé dans la création d'événements sur mesure.
              Nous mettons un point d'honneur à proposer des créations artisanales,
              élégantes et adaptées à toutes vos occasions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/traiteur"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Traiteur
                </Link>
              </li>
              <li>
                <Link
                  to="/brunch"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Brunch
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Événements privés</li>
              <li>Événements professionnels</li>
              <li>Mariages & Baptêmes</li>
              <li>Fêtes de fin d'année</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Schiltigheim, Bas-rhin (67)</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+33783453605"
                  className="hover:text-primary transition-colors"
                >
                  07 83 45 36 05
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@thebrunchtraiteur.fr"
                  className="hover:text-primary transition-colors"
                >
                  contact@ta-traiteur.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/33783453605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p className="mb-2">
            &copy; 2022 T & A Brunch et Traiteur. Tous
            droits réservés.
          </p>
          <p className="text-xs opacity-75">
            Développé par{" "}
            <a
              href="https://g2gtech.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              G2GTech
            </a>
            {" "}- Solutions digitales innovantes
          </p>
        </div>
      </div>
    </footer>
  );
};
