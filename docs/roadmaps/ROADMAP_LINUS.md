# 🔍 ROADMAP LINUS — Recherche & Médicaments

> **Tu travailles sur le cœur fonctionnel de l'app.**
> Commence dès le Jour 1 en parallèle avec les autres.
> Si cartSlice d'Ange n'est pas dispo → utilise un state local temporaire.

---

## 🎨 IDENTITÉ VISUELLE MEDCAM (à respecter partout)

Couleurs tirées du logo officiel :

```css
:root {
  --color-primary:      #1E3A8A;   /* Bleu marine foncé */
  --color-secondary:    #38BDF8;   /* Bleu ciel */
  --color-accent:       #4ADE80;   /* Vert */
  --color-bg:           #FFFFFF;
  --color-bg-alt:       #F0F4FF;
  --color-text:         #1E293B;
  --color-text-light:   #64748B;
  --color-border:       #E2E8F0;
}
```

Typographie :
- Titres : **Montserrat** Bold/SemiBold
- Corps : **Inter** Regular/Medium

Logo dans le projet : `docs/conception/ui-kit/logo.png`
Pour l'utiliser dans React : `<img src="/logo.png" alt="MEDCAM" />`

---

## 📁 STRUCTURE DU PROJET (rappel global)

```
frontend/medcam/
├── src/
│   ├── App.jsx              ← DÉJÀ CRÉÉ — routes globales
│   ├── components/
│   │   ├── layout/          ← Navbar (Sonia), PrivateRoute (Leslie)
│   │   ├── ui/              ← Button, Input, Card, Toast (Sonia)
│   │   ├── medicament/      ← MedicamentCard, PharmacyCard (Linus) ← TOI
│   │   └── order/           ← CartItem, OrderStatusBadge (Ange)
│   ├── pages/
│   │   ├── auth/            ← (Leslie)
│   │   ├── search/          ← Home, Results, Detail (Linus) ← TOI
│   │   ├── order/           ← (Ange)
│   │   └── tracking/        ← (Sonia)
│   ├── services/
│   │   ├── api.js           ← Config Axios (Sonia crée)
│   │   └── medicamentService.js ← (Linus) ← TOI
│   └── store/
│       ├── index.js         ← Redux store (Sonia crée)
│       ├── authSlice.js     ← (Leslie)
│       └── cartSlice.js     ← (Ange)
└── public/
    └── logo.png
```

---

## 🔗 API BACKEND (Laravel - Jack) — Endpoints que tu utilises

```
URL de base : http://localhost:8000/api (via api.js de Sonia)

GET /medicaments → { success, data: { data: [...], current_page, total } }
GET /medicaments/search?q=terme&category_id=X → même format
GET /medicaments/{id} → { success, data: { id, name, active_substance, description, dosage,
                          prescription_required, photo_url, manufacturer, category } }
GET /medicaments/{id}/pharmacies?latitude=X&longitude=Y
    → { success, data: [{ pharmacy: {...}, price, quantity, distance_km, is_open }] }

POST /reviews   ← utilisé dans MedicamentDetailPage
```

Format réponse standard Jack :
```json
{ "success": true, "message": "...", "data": { ... } }
{ "success": false, "message": "...", "errors": { ... } }
```

---

## TES FICHIERS (et SEULEMENT les tiens)

```
src/services/medicamentService.js                    ← JOUR 1
src/components/medicament/MedicamentCard.jsx          ← JOUR 1
src/components/medicament/PharmacyCard.jsx            ← JOUR 2
src/pages/search/HomePage.jsx                        ← JOUR 2
src/pages/search/SearchResultsPage.jsx               ← JOUR 3
src/pages/search/MedicamentDetailPage.jsx            ← JOUR 3-4
```

**NE TOUCHE JAMAIS à ces fichiers** :
- src/store/cartSlice.js (Ange)
- src/store/authSlice.js (Leslie)
- Tout pages/auth/, pages/order/, pages/tracking/
- src/components/ui/* (Sonia)

---

## 🌿 GIT WORKFLOW

### Ta branche

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-search
```

### Tes commits

```
feat(search): ajout medicamentService
feat(search): ajout MedicamentCard composant
feat(search): ajout PharmacyCard avec distance et stock
feat(search): ajout HomePage avec hero et recherche
feat(search): ajout SearchResultsPage avec filtres
feat(search): ajout MedicamentDetailPage
```

### Règles Git absolues

```bash
# Chaque matin avant de coder
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature

# En travaillant — committer toutes les heures minimum
git add .
git commit -m "feat(search): ajout MedicamentCard"
git push -u origin feature/ma-feature
```

Quand la tâche est finie :
1. Ouvrir une **Pull Request** vers `develop` sur GitHub
2. Décrire ce que tu as fait dans la description
3. **Interdiction de merger ta propre PR** — c'est Jack qui merge

### Règle anti-conflit

**Chaque dev touche UNIQUEMENT ses fichiers.**
Si tu as besoin d'un composant pas encore créé → utilise une balise HTML standard.

### 🔔 Communication Discord

Attends la notification d'Ange : **"cartSlice.js pushé ✅ — Linus peut utiliser addItem"**
Avant ça, utilise un state local temporaire pour le panier.

---

## 🛠️ SETUP INITIAL (à faire une seule fois)

```bash
git clone https://github.com/Ulrichjack/project-dev-medicament.git
cd project-dev-medicament/frontend/medcam
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env
cp ../../docs/conception/ui-kit/logo.png public/logo.png
npm run dev
```

---

## ⚠️ MÉTA-RÈGLES POUR TON IA

**Colle toujours ces règles en tête de chaque prompt :**

```
RÈGLES OBLIGATOIRES — NE JAMAIS VIOLER :
1. Framework : React.js 18 avec Vite UNIQUEMENT
2. INTERDIT : Next.js, dossier app/, fichiers page.js → JAMAIS
3. Routing : react-router-dom v6 UNIQUEMENT (useNavigate, Link, Outlet, useParams, useSearchParams)
4. Composants : fonctionnels UNIQUEMENT avec Hooks (useState, useEffect, useSelector, useDispatch)
5. Style : Tailwind CSS v3 UNIQUEMENT — pas de style inline sauf cas exceptionnel
6. Pas de logique métier dans les composants → tout dans services/
7. Gérer TOUJOURS les 3 états : loading (spinner), error (message rouge), success (données)
8. Mobile first : toujours penser petit écran en premier
9. Nom du projet : MEDCAM (pas PharmApp)
10. Design inspiration : https://isomorphic-furyroad.vercel.app
```

---

## PROMPT COMPLET POUR TON IA

```
RÈGLES OBLIGATOIRES — NE JAMAIS VIOLER :
1. Framework : React.js 18 avec Vite UNIQUEMENT
2. INTERDIT : Next.js, dossier app/, fichiers page.js → JAMAIS
3. Routing : react-router-dom v6 UNIQUEMENT (useNavigate, useParams, useSearchParams, Link)
4. Composants fonctionnels UNIQUEMENT avec Hooks
5. Style : Tailwind CSS v3 UNIQUEMENT
6. Nom du projet : MEDCAM — "La pharmacie à portée de main"
7. Design inspiration : https://isomorphic-furyroad.vercel.app

CONTEXTE DU PROJET :
Je travaille sur MEDCAM, une application de commande de médicaments au Cameroun.
Je suis LINUS, responsable des pages de recherche et des médicaments.

IDENTITÉ VISUELLE MEDCAM :
- Couleur primary : #1E3A8A (bleu marine foncé)
- Couleur secondary : #38BDF8 (bleu ciel)
- Couleur accent : #4ADE80 (vert succès/disponible)
- Fond alternatif : #F0F4FF
- Texte : #1E293B
- Police titres : Montserrat 600/700
- Police corps : Inter 400/500

FICHIERS DÉJÀ EXISTANTS (ne pas recréer) :
- src/App.jsx avec ces routes :
  / → HomePage (moi)
  /search → SearchResultsPage (moi)
  /medicaments/:id → MedicamentDetailPage (moi)
- src/services/api.js (Sonia) → instance Axios avec token auto
  Usage : import api from '../services/api'
- src/store/cartSlice.js (Ange) — Si pas encore dispo, utilise state local

API BACKEND MEDCAM :
URL base : http://localhost:8000/api (via api.js)
GET /medicaments → { success, data: { data: [...], current_page, total } }
GET /medicaments/search?q=terme&category_id=X → même format
GET /medicaments/{id} → { success, data: { id, name, active_substance, description, dosage, prescription_required, photo_url, manufacturer, category } }
GET /medicaments/{id}/pharmacies?latitude=X&longitude=Y → { success, data: [{ pharmacy: {...}, price, quantity, distance_km, is_open }] }

DONNÉES MOCK (si API pas encore prête) :
const MOCK_MEDICAMENTS = [
  { id: 1, name: "Paracétamol 500mg", active_substance: "Paracétamol", prescription_required: false, photo_url: null, manufacturer: "Sanofi", price_min: 500, pharmacies_count: 4 },
  { id: 2, name: "Amoxicilline 500mg", active_substance: "Amoxicilline", prescription_required: true, photo_url: null, manufacturer: "GSK", price_min: 1200, pharmacies_count: 2 },
  { id: 3, name: "Ibuprofène 400mg", active_substance: "Ibuprofène", prescription_required: false, photo_url: null, manufacturer: "Pfizer", price_min: 800, pharmacies_count: 3 }
]

MES FICHIERS À CRÉER :

━━━ JOUR 1 ━━━

📄 src/services/medicamentService.js
Importer api depuis '../services/api'
Méthodes :
- getAll(page=1, filters={}) → api.get('/medicaments', { params: {page, ...filters} }) → retourne data.data
- search(query, filters={}) → api.get('/medicaments/search', { params: {q:query, ...filters} }) → retourne data.data
- getById(id) → api.get('/medicaments/'+id) → retourne data.data
- getPharmacies(id, lat, lng) → api.get('/medicaments/'+id+'/pharmacies', { params: {latitude:lat, longitude:lng} }) → retourne data.data

📄 src/components/medicament/MedicamentCard.jsx
Props : medicament (objet), onClick (optionnel, navigue vers /medicaments/:id)

Structure visuelle (card professionnelle) :
- Container : bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 transition-all cursor-pointer
- Zone image : bg-[#F0F4FF] h-32 rounded-t-2xl flex items-center justify-center
  → Si photo_url : <img src={photo_url} className="h-24 object-contain" />
  → Sinon : <i className="fa-solid fa-pills text-5xl text-[#38BDF8]" />
- Badge "Ordonnance" si prescription_required : absolute top-2 right-2, bg-amber-100 text-amber-700 text-xs rounded-full px-2 py-0.5
- Zone infos : p-4
  → Nom (Montserrat 600, 2 lignes max, text-[#1E293B])
  → "À partir de X FCFA" (text-[#4ADE80] font-semibold)
  → X pharmacie(s) (text-slate-500 text-xs, icône fa-store)

━━━ JOUR 2 ━━━

📄 src/components/medicament/PharmacyCard.jsx
Props : pharmacyStock ({ pharmacy: {name, address}, price, quantity, distance_km, is_open }), onOrder (function)

Structure :
- Container : bg-white rounded-xl border border-slate-100 p-4 hover:border-[#38BDF8] transition-all
- Ligne 1 : nom pharmacie (bold) + badge "Ouvert" (bg-green-100 text-green-700) ou "Fermé" (bg-red-100 text-red-700)
- Ligne 2 : fa-location-dot #38BDF8 + adresse (texte gris, tronquée)
- Ligne 3 : fa-route + distance formatée ("< 1 km" ou "X.X km")
- Ligne 4 : prix FCFA (vert bold, grand) + stock (gris petit, "X unité(s)")
- Bouton "Commander ici" : bg-[#1E3A8A] text-white rounded-xl py-2 px-4 text-sm font-semibold w-full mt-3
  → onClick appelle onOrder({pharmacyId: pharmacy.id, pharmacyName: pharmacy.name, price})

📄 src/pages/search/HomePage.jsx
Structure (inspire isomorphic-furyroad) :

SECTION HERO :
- Fond dégradé : bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8]
- Logo MEDCAM blanc centré (img /logo.png filter brightness-0 invert)
- Tagline : "La pharmacie à portée de main" (blanc, Montserrat)
- Barre de recherche grande : bg-white rounded-2xl shadow-xl px-6 py-4
  → input pleine largeur + bouton recherche #1E3A8A
  → onSubmit → navigate('/search?q='+query)
  → Icône géolocalisation (fa-location-dot) à droite → navigator.geolocation → stocker lat/lng dans localStorage

SECTION CATÉGORIES :
- Titre section "Catégories"
- Scroll horizontal : flex gap-3 overflow-x-auto pb-2
- Boutons : Tous, Antibiotiques, Antidouleurs, Vitamines, Antiparasitaires, Cardiovasculaire, Dermatologie
- Clic → navigate('/search?category_id=X')

SECTION "MÉDICAMENTS POPULAIRES" :
- Titre + bouton "Voir tout" → /search
- Grille : grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Afficher 6 MedicamentCard (appel medicamentService.getAll())
- Loading : skeleton cards (animate-pulse bg-slate-100)

━━━ JOUR 3-4 ━━━

📄 src/pages/search/SearchResultsPage.jsx
- useSearchParams() → lire q et category_id
- useEffect([q, category_id]) → medicamentService.search(q, {category_id})
- Titre "Résultats pour '{q}'" ou "Catégorie : ..."
- Loading : skeleton + spinner
- Vide : illustration fa-search text-6xl text-slate-200 + "Aucun résultat pour '{q}'"
- Résultats : grille responsive MedicamentCard
- Filtres (barre latérale desktop, modal mobile) : catégorie + prescription_required toggle
- Pagination : boutons Précédent/Suivant si total > 20

📄 src/pages/search/MedicamentDetailPage.jsx
- useParams() → id
- useEffect → Promise.all([medicamentService.getById(id), navigator.geolocation]) → puis medicamentService.getPharmacies(id, lat, lng)

SECTION MÉDICAMENT :
- Image grande ou icône fa-pills géante (#38BDF8)
- Badge ordonnance si applicable
- Nom H1 Montserrat bold
- Substance active, dosage, fabricant (avec icônes fa-)
- Description complète

SECTION PHARMACIES :
- Titre "Disponible près de vous" + nombre
- Liste de PharmacyCard
- onOrder → vérifier si cartSlice disponible :
  → Si oui : dispatch(addItem({medicamentId:id, medicamentName:name, ...})) + navigate('/cart')
  → Sinon (cartSlice pas encore créé) : alert('Panier non disponible pour l'instant') ou stocker en localStorage temporaire

━━━ FIN DU CONTEXTE LINUS ━━━

AUJOURD'HUI JE DOIS IMPLÉMENTER : [remplace par le fichier spécifique]

Génère le code complet. Tailwind CSS v3 uniquement.
Inspire du design professionnel de https://isomorphic-furyroad.vercel.app.
```

---

## 📊 Issues GitHub — Tes tickets

```
#34 feat(frontend): medicamentService + MedicamentCard + PharmacyCard
#35 feat(frontend): HomePage + SearchResultsPage + MedicamentDetailPage
```
