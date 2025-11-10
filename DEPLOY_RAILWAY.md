# 🚂 Guide de Déploiement Railway - Backend

## 📋 Prérequis
- Compte GitHub avec le repository
- Compte Railway (gratuit): https://railway.app
- Base de données MongoDB (MongoDB Atlas recommandé)

## 🚀 Étapes de Déploiement

### 1. Créer un Projet Railway

1. **Se connecter à Railway**: https://railway.app
2. **Nouveau Projet**: Cliquer sur "New Project"
3. **Deploy from GitHub repo**: Sélectionner cette option
4. **Choisir le repository**: `aymanTahri2131/thebrunch`
5. **Select Deploy**: Choisir le dossier `backend`

### 2. Configuration des Variables d'Environnement

Dans Railway, aller dans **Variables** et ajouter :

```env
# Base de données
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thebrunch

# JWT
JWT_SECRET=votre_jwt_secret_super_secure

# Twilio
TWILIO_ACCOUNT_SID=votre_twilio_sid
TWILIO_AUTH_TOKEN=votre_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# CORS
FRONTEND_URL=https://votre-site-netlify.netlify.app
ADMIN_URL=https://votre-site-netlify.netlify.app/admin

# Environment
NODE_ENV=production
```

### 3. Configurer MongoDB Atlas (Base de données)

1. **Aller sur MongoDB Atlas**: https://cloud.mongodb.com
2. **Créer un cluster gratuit** (M0)
3. **Créer un utilisateur** de base de données
4. **Configurer Network Access** : Ajouter `0.0.0.0/0` (toutes les IPs)
5. **Obtenir Connection String** : 
   - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

### 4. Déployer

Railway va automatiquement :
- Détecter le `package.json`
- Installer les dépendances avec `npm install`
- Démarrer l'application avec `npm start`

### 5. Initialiser l'Admin

Après le premier déploiement, exécuter une fois :

Dans Railway CLI ou via le terminal Railway :
```bash
npm run init-admin
```

Ou créer manuellement l'admin avec les credentials par défaut.

## 🔗 URLs

Après déploiement, vous obtiendrez :
- **URL Backend**: `https://votre-projet.railway.app`
- **URL Admin API**: `https://votre-projet.railway.app/api/auth/login`

## 📝 Configuration Frontend

Mettre à jour dans Netlify :
```env
VITE_API_URL=https://votre-projet.railway.app
```

## 🛠️ Commandes Utiles

```bash
# Logs en temps réel
railway logs

# Se connecter au projet
railway login
railway link

# Redéployer
git push origin main
```

## ✅ Vérifications Post-Déploiement

1. **Santé de l'API** : `GET https://votre-projet.railway.app/api/health`
2. **Base de données** : Vérifier la connexion MongoDB
3. **CORS** : Tester depuis votre frontend Netlify
4. **Admin Login** : Tester la connexion admin

## 🔧 Dépannage

### Erreurs Communes

1. **MongoDB Connection** : Vérifier MONGODB_URI
2. **CORS Errors** : Vérifier FRONTEND_URL
3. **Environment Variables** : Vérifier toutes les variables requises
4. **Port Binding** : Railway assigne automatiquement le port

### Logs de Débogage

```bash
railway logs --follow
```

## 💰 Coûts

- **Railway** : Plan gratuit avec limitations, puis $5/mois
- **MongoDB Atlas** : Cluster M0 gratuit (512MB)
- **Total** : Gratuit pour commencer !