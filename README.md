
# 🎭 AdaCheck'Event

Une application web moderne pour découvrir les événements culturels à Paris, développée avec React et Vite.

## 📋 Description

AdaCheck'Event est une application qui permet de consulter les événements parisiens en exploitant l'API Open Data de la Ville de Paris ("Que faire à Paris"). L'application offre une interface intuitive pour rechercher, filtrer et explorer les événements culturels disponibles.

## ✨ Fonctionnalités

- **🔍 Recherche en temps réel** : Barre de recherche avec debouncing (400ms) pour rechercher des événements par titre ou description
- **🎯 Filtres avancés** :
  - Filtre par type de prix (gratuit/payant)
  - Filtre par type d'accès (sans réservation, réservation obligatoire, réservation conseillée)
- **📄 Pagination** : Navigation par pages avec boutons Previous/Next (6 événements par page)
- **👀 Affichage détaillé** : Boutons "See More/See Less" pour afficher/masquer les détails de chaque événement
- **❤️ Système de favoris** : Possibilité de marquer des événements en favoris
- **📊 Compteur de résultats** : Affichage du nombre total d'événements trouvés
- **🎨 Interface responsive** : Design adaptatif avec Tailwind CSS

## 🛠️ Technologies utilisées

- **React 19.1.1** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite 7.1.7** - Outil de build ultra-rapide
- **Tailwind CSS 4.1.16** - Framework CSS utility-first
- **API Open Data Paris** - Source des données d'événements

## 📦 Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd adacheckevent-guillaume_iris/vite-project
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

## 🚀 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🏗️ Structure du projet

```
vite-project/
├── src/
│   ├── components/
│   │   ├── Button.jsx          # Composant bouton réutilisable
│   │   ├── Cards.jsx           # Affichage des cartes d'événements
│   │   ├── EventList.jsx       # Gestion de la liste et fetch API
│   │   ├── Favorites.jsx       # Système de favoris
│   │   ├── Filter.jsx          # Composant de filtrage
│   │   └── SearchBar.jsx       # Barre de recherche avec debouncing
│   ├── App.jsx                 # Composant principal
│   ├── App.css                 # Styles de l'application
│   ├── main.jsx                # Point d'entrée React
│   └── index.css               # Styles globaux
└── package.json
```

## 🎯 Fonctionnement technique

### Gestion de l'état
L'application utilise les hooks React (`useState`, `useEffect`) pour gérer :
- La pagination (page courante, offset)
- Les filtres actifs
- La recherche textuelle
- L'affichage détaillé des événements
- Les favoris

### Appels API
Les données sont récupérées via l'API Paris Open Data avec :
- Paramètres de pagination (`limit`, `offset`)
- Filtres dynamiques sur le prix et l'accès
- Recherche textuelle sur le titre et la description

### Optimisations
- **Debouncing** sur la recherche pour limiter les appels API
- **Filtrage côté client** pour une réactivité optimale
- **Gestion d'erreurs** lors du chargement des données

## 👥 Auteurs

Projet réalisé par Guillaume et Iris dans le cadre d'un exercice collectif Ada Tech School.

## 📝 Licence

Projet éducatif - Ada Tech School

---

*Données fournies par l'Open Data de la Ville de Paris*
```
