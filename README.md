# Code Snippets Manager

Une application web simple permettant d'enregistrer et de consulter des bouts de code sans avoir besoin de se connecter.

## Fonctionnalités

- Ajout de snippets de code via un formulaire
  - Titre
  - Description
  - Catégorie (PHP, HTML, CSS)
  - Code
- Consultation des snippets enregistrés
  - Liste avec titre, description et catégorie
  - Option pour copier le code
- Filtrage des snippets par catégorie
- Pas d'authentification requise

## Structure du projet

```
code-snippets-app/
├── src/                  # Code source React (frontend)
│   ├── components/       # Composants React
│   ├── pages/            # Pages de l'application
│   ├── services/         # Services pour les API
│   └── styles/           # Fichiers CSS
├── backend/              # Code source PHP (backend)
│   ├── public/           # Point d'entrée public
│   ├── src/              # Code source PHP
│   │   ├── controllers/  # Contrôleurs
│   │   └── models/       # Modèles
│   └── data/             # Stockage des données (JSON)
└── public/               # Fichiers statiques
```

## Technologies utilisées

- **Frontend** : React, Bootstrap
- **Backend** : PHP
- **Stockage** : Fichier JSON (simulation de base de données)

## Installation et démarrage

### Frontend (React)

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm start
```

### Backend (PHP)

Pour exécuter le backend, vous avez besoin d'un serveur PHP (comme Apache ou Nginx).

1. Configurez votre serveur web pour pointer vers le dossier `backend/public`
2. Assurez-vous que le module `mod_rewrite` est activé si vous utilisez Apache

## Déploiement

### Frontend

Pour déployer le frontend sur des plateformes comme Vercel, Netlify ou GitHub Pages :

```bash
npm run build
```

Puis suivez les instructions de la plateforme choisie pour déployer le contenu du dossier `build`.

### Backend

Pour déployer le backend sur un hébergeur PHP comme InfinityFree, AwardSpace, etc. :

1. Téléchargez les fichiers du dossier `backend` sur votre hébergeur
2. Configurez le domaine pour pointer vers le dossier `public`

## Fonctionnement hors ligne

L'application peut fonctionner sans backend en utilisant le stockage local du navigateur (localStorage). Si le backend n'est pas disponible, l'application basculera automatiquement vers le stockage local.

## Auteur

Créé pour le challenge H24Code.
