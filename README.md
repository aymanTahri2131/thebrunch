# The Brunch - MVP

Plateforme web pour T & A Brunch et Traiteur Oriental à Strasbourg.

## 🚀 Technologies

- **Frontend**: React TypeScript + Vite + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + MongoDB
- **Communication**: Twilio (WhatsApp + Email)
- **Upload**: Cloudinary

## 📱 Fonctionnalités

### Frontend
- ✅ Landing page responsive
- ✅ Menus dynamiques (Brunch, Lunch, Réveillon)
- ✅ Système de contact avec WhatsApp
- ✅ Interface admin complète
- ✅ Gestion des produits/plateaux

### Backend
- ✅ API REST complète
- ✅ Authentification JWT
- ✅ CRUD menus/produits
- ✅ Upload d'images
- ✅ Intégration Twilio

### Admin Dashboard
- ✅ Gestion des menus (Brunch, Lunch, Réveillon)
- ✅ Ajout/modification/suppression de produits
- ✅ Upload d'images
- ✅ Validation robuste avec toasts

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- MongoDB
- Comptes Twilio et Cloudinary

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm start
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## 🔧 Configuration

### Variables d'environnement Backend (.env)
\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thebrunch
JWT_SECRET=your_jwt_secret

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=your_whatsapp_number

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

## 📱 Utilisation

### URLs
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:5000
- **Admin**: http://localhost:8080/admin/login

### Compte Admin par défaut
- Email: admin@thebrunch.fr
- Mot de passe: admin123

## 📋 API Endpoints

### Menus
- `GET /api/brunch` - Menu brunch public
- `GET /api/lunch` - Menu lunch public
- `GET /api/reveillon` - Menu réveillon public

### Admin (Authentifié)
- `POST /api/auth/login` - Connexion admin
- `GET /api/*/admin` - Menus admin
- `PUT /api/*/admin` - Modifier menu
- `POST /api/*/admin` - Créer produit

### Communication
- `POST /api/communication/whatsapp` - Envoyer WhatsApp
- `POST /api/communication/email` - Envoyer email

## 🎨 Design System

- **Colors**: Palette or/brun pour le luxe oriental
- **Typography**: Police élégante et lisible
- **Components**: Shadcn/ui + Tailwind
- **Responsive**: Mobile-first design

## 👥 Développement

Développé par **G2GTech** - Solutions digitales innovantes
- Site: https://g2gtech.fr

## 📄 License

© 2025 T & A Brunch et Traiteur. Tous droits réservés.