# CESIZen — Application Web (Back-office admin)

Interface d'administration web pour la plateforme CESIZen, permettant la gestion des utilisateurs, articles, catégories et émotions.

## Stack technique

- **Framework :** React 19
- **Langage :** TypeScript
- **Build tool :** Vite 8
- **Routing :** React Router 7
- **CSS :** Tailwind CSS 4
- **Composants UI :** shadcn/ui (Radix UI)
- **HTTP Client :** Axios
- **Validation :** Zod
- **Icônes :** Lucide React

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)
- L'API CESIZen doit être lancée et accessible (par défaut `http://localhost:3000`)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Nicolas-s-Organization/Cesizen-app-web.git
cd Cesizen-app-web/Cesizen-app-web
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3000
```

> Adaptez l'URL si votre API tourne sur un autre port ou domaine.

## Lancement

### Mode développement

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`.



## Fonctionnalités

- **Authentification :** Connexion admin avec JWT (access + refresh token automatique)
- **Gestion des utilisateurs :** Liste, création, modification, activation/désactivation, suppression
- **Gestion des articles :** CRUD complet avec upload d'image, filtres par catégorie et statut
- **Gestion des émotions :** Arborescence hiérarchique à 2 niveaux (émotions primaires et sous-émotions)
- **Gestion des catégories :** CRUD des catégories d'articles
- **Pagination et recherche :** Recherche avec debounce, filtres, pagination sur les listes

## Structure du projet

```
src/
├── App.tsx                # Routeur principal
├── main.tsx               # Point d'entrée
├── contexts/              # AuthContext (état d'authentification)
├── services/              # Couche d'appel API (Axios)
├── hooks/                 # Hooks personnalisés (logique métier séparée de l'affichage)
├── pages/                 # Pages/écrans de l'application
├── components/            # Composants réutilisables
│   ├── articles/          # Composants articles
│   ├── users/             # Composants utilisateurs
│   ├── emotions/          # Composants émotions
│   ├── common/            # Composants partagés (Pagination, Spinner, ProtectedRoute)
│   └── layout/            # Header, Navbar, Footer
├── schemas/               # Schémas de validation Zod
├── types/                 # Interfaces TypeScript
└── assets/                # Images et ressources statiques
```

## Architecture

L'application suit une séparation logique/affichage via les **custom hooks** :
- Les **hooks** (`useUsers`, `useArticles`, etc.) contiennent toute la logique métier, les appels API, la gestion d'état et la validation
- Les **composants** se concentrent uniquement sur le rendu visuel
- Les **services** isolent les appels HTTP vers l'API
