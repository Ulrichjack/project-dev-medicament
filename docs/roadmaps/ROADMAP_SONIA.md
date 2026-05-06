# 🎨 ROADMAP SONIA — Composants UI & Pages Suivi

> **Tu es la fondation de tout le projet.**
> Sans tes composants, personne ne peut finir son travail proprement.
> **Jour 1 = livrer api.js + store/index.js + Button + Input + Navbar.**

---

## 🎨 IDENTITÉ VISUELLE MEDCAM (à respecter partout)

Couleurs tirées du logo officiel :

```css
/* Coller dans src/index.css */
:root {
  --color-primary:      #1E3A8A;   /* Bleu marine foncé — hexagone droit du logo */
  --color-secondary:    #38BDF8;   /* Bleu ciel — hexagone centre du logo */
  --color-accent:       #4ADE80;   /* Vert — hexagone gauche du logo */
  --color-bg:           #FFFFFF;
  --color-bg-alt:       #F0F4FF;   /* Bleu très clair */
  --color-text:         #1E293B;
  --color-text-light:   #64748B;
  --color-border:       #E2E8F0;
}
```

Typographie :
- Titres : **Montserrat** Bold/SemiBold
- Corps : **Inter** Regular/Medium

Import dans `index.html` :
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

Logo dans le projet : `docs/conception/ui-kit/logo.png`
Pour l'utiliser dans React : `<img src="/logo.png" alt="MEDCAM" />`
(ou copier logo.png dans `public/`)

---

## 📁 STRUCTURE DU PROJET (rappel global)

```
frontend/medcam/
├── src/
│   ├── App.jsx              ← DÉJÀ CRÉÉ — routes globales
│   ├── App.css
│   ├── main.jsx             ← DÉJÀ CRÉÉ — point d'entrée
│   ├── index.css            ← DÉJÀ CRÉÉ — styles globaux + variables CSS
│   ├── assets/              ← DÉJÀ CRÉÉ
│   ├── components/
│   │   ├── layout/          ← Navbar, PrivateRoute (Leslie)
│   │   ├── ui/              ← Button, Input, Card, Toast (Sonia) ← TOI
│   │   ├── medicament/      ← MedicamentCard, PharmacyCard (Linus)
│   │   └── order/           ← CartItem, OrderStatusBadge (Ange)
│   ├── pages/
│   │   ├── auth/            ← Login, Register, Profile (Leslie)
│   │   ├── search/          ← Home, Results, Detail (Linus)
│   │   ├── order/           ← Cart, Checkout, Payment (Ange)
│   │   └── tracking/        ← History, Status, Notifications (Sonia) ← TOI
│   ├── services/
│   │   ├── api.js           ← Config Axios (Sonia crée) ← TOI
│   │   ├── authService.js   ← (Leslie)
│   │   ├── medicamentService.js ← (Linus)
│   │   ├── orderService.js  ← (Ange)
│   │   └── paymentService.js ← (Ange)
│   └── store/
│       ├── index.js         ← Redux store (Sonia crée) ← TOI
│       ├── authSlice.js     ← (Leslie)
│       └── cartSlice.js     ← (Ange)
├── public/
│   └── logo.png             ← COPIER LE LOGO ICI
├── tailwind.config.js       ← DÉJÀ CRÉÉ
├── vite.config.js           ← DÉJÀ CRÉÉ
└── .env                     ← À CRÉER
```

---

## 🔗 API BACKEND (Laravel - Jack) — Référence globale

```
URL de base : http://localhost:8000/api

POST   /auth/register
POST   /auth/login        → retourne { success, data: { user, token } }
POST   /auth/logout
GET    /auth/me

GET    /medicaments
GET    /medicaments/search?q=terme
GET    /medicaments/{id}
GET    /medicaments/{id}/pharmacies?latitude=X&longitude=Y

POST   /orders
GET    /orders
GET    /orders/{id}
PATCH  /orders/{id}/cancel

POST   /payments/{orderId}/initiate
GET    /payments/{orderId}/status

GET    /notifications
PATCH  /notifications/{id}/read
PATCH  /notifications/read-all

POST   /reviews
GET    /pharmacies/{id}/reviews
```

Format réponse standard Jack :
```json
{ "success": true, "message": "...", "data": { ... } }
{ "success": false, "message": "...", "errors": { ... } }
```

---

## TES FICHIERS (et SEULEMENT les tiens)

```
src/services/api.js                        ← JOUR 1 - URGENT
src/store/index.js                         ← JOUR 1 - URGENT
src/store/toastSlice.js                    ← JOUR 1
src/components/layout/Navbar.jsx           ← JOUR 1
src/components/ui/Button.jsx               ← JOUR 1
src/components/ui/Input.jsx                ← JOUR 1
src/components/ui/Card.jsx                 ← JOUR 2
src/components/ui/Toast.jsx                ← JOUR 2
src/pages/tracking/OrderHistoryPage.jsx    ← JOUR 3
src/pages/tracking/OrderStatusPage.jsx     ← JOUR 3
src/pages/tracking/NotificationsPage.jsx   ← JOUR 4
src/services/notificationService.js        ← JOUR 4
```

**NE TOUCHE JAMAIS à ces fichiers** (appartiennent aux autres) :
- src/store/authSlice.js (Leslie)
- src/store/cartSlice.js (Ange)
- Tout ce qui est dans pages/auth/, pages/search/, pages/order/

---

## 🌿 GIT WORKFLOW

### Ta branche

```bash
# Jour 1
git checkout develop && git pull origin develop
git checkout -b feature/frontend-ui-components

# Jour 3-4 (pages suivi)
git checkout develop && git pull origin develop
git checkout -b feature/frontend-tracking
```

### Tes commits

```
feat(ui): ajout api.js config Axios avec intercepteurs
feat(store): ajout store Redux avec toastSlice
feat(layout): ajout Navbar MEDCAM responsive
feat(ui): ajout Button avec variantes primary/success/danger/outline
feat(ui): ajout Input avec label, icône, états error/valid
feat(ui): ajout Card réutilisable avec hover
feat(ui): ajout Toast système notifications visuelles
feat(tracking): ajout OrderHistoryPage
feat(tracking): ajout OrderStatusPage avec timeline
feat(tracking): ajout NotificationsPage
```

### Règles Git absolues

```bash
# Chaque matin avant de coder
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature

# En travaillant — committer toutes les heures minimum
git add .
git commit -m "feat(ui): ajout Button avec variantes"
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

Quand tu pousses un fichier dont quelqu'un d'autre a besoin, annonce-le sur Discord :
- **"api.js pushé sur develop ✅ — Leslie, Linus, Ange peuvent l'utiliser"**
- **"Button.jsx pushé ✅"**

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
3. Routing : react-router-dom v6 UNIQUEMENT
4. Composants fonctionnels UNIQUEMENT avec Hooks
5. Style : Tailwind CSS v3 UNIQUEMENT
6. Nom du projet : MEDCAM — "La pharmacie à portée de main"
7. Design inspiration : https://isomorphic-furyroad.vercel.app (design professionnel, moderne)

CONTEXTE DU PROJET :
Je travaille sur MEDCAM, une application de commande de médicaments au Cameroun.
Je suis SONIA, responsable des composants UI réutilisables et des pages de suivi commandes.

IDENTITÉ VISUELLE MEDCAM :
- Couleur primary : #1E3A8A (bleu marine foncé - couleur principale)
- Couleur secondary : #38BDF8 (bleu ciel - accent)
- Couleur accent : #4ADE80 (vert - succès/disponible)
- Fond alternatif : #F0F4FF
- Texte principal : #1E293B
- Police titres : Montserrat 600/700
- Police corps : Inter 400/500

FICHIERS DÉJÀ EXISTANTS dans le projet (ne pas recréer) :
- src/App.jsx (routes déjà configurées)
- src/main.jsx (point d'entrée)
- src/index.css (variables CSS déjà définies)
- tailwind.config.js, vite.config.js, package.json

MES FICHIERS À CRÉER (dans cet ordre de priorité) :

━━━ JOUR 1 - URGENT (tout le monde en a besoin) ━━━

📄 src/services/api.js
- Instance Axios avec baseURL = import.meta.env.VITE_API_URL
- Intercepteur request : lit token dans localStorage, ajoute header "Authorization: Bearer {token}"
- Intercepteur response : si status 401 → supprimer token de localStorage + redirect /login
- Exporter l'instance comme default
Note : les autres devs importeront api depuis ce fichier

📄 src/store/index.js
- Configurer Redux store avec configureStore
- Combiner authSlice (sera créé par Leslie), cartSlice (sera créé par Ange), toastSlice (toi)
- Utiliser un objet vide pour les slices pas encore créés
- Exporter store, RootState, AppDispatch

📄 src/store/toastSlice.js
State : { toasts: [] }
Chaque toast : { id (Date.now()), type ('success'|'error'|'warning'|'info'), message, duration: 4000 }
Actions : addToast(payload), removeToast(id)

📄 src/components/layout/Navbar.jsx
Structure :
- Fond blanc, ombre légère, position sticky top-0, z-50
- Gauche : logo MEDCAM depuis /logo.png (height 40px)
- Centre desktop : barre de recherche (navigue vers /search?q= au submit)
- Droite : icône panier (fa-cart-shopping) + badge rouge count, icône cloche (fa-bell) + badge, avatar/initiales si connecté OU boutons Connexion/Inscription
- Mobile : logo + hamburger + drawer slide-in
- Lire cartCount depuis store.cart (peut être 0 si cartSlice pas encore créé)
- Lire user depuis store.auth (peut être null si authSlice pas encore créé)

📄 src/components/ui/Button.jsx
Props : variant, size, loading, disabled, onClick, type, children, className, fullWidth
Variants : primary (#1E3A8A), secondary (#38BDF8 texte blanc), success (#4ADE80 texte blanc), danger (#EF4444), outline (bordure #1E3A8A texte #1E3A8A), ghost
Sizes : sm (py-1.5 px-3 text-sm), md (py-2.5 px-5 text-base), lg (py-3 px-8 text-lg)
loading=true → spinner SVG animé à gauche + désactivé
disabled → opacity-50 cursor-not-allowed
Style base : font-family Inter, font-weight 600, rounded-xl, transition-all, focus:ring-2

📄 src/components/ui/Input.jsx
Props : label, type, name, placeholder, value, onChange, error, valid, icon (classe fa-), required, disabled, hint
Structure :
  <div> wrapper
    <label> si fourni (Inter 500, text-sm, mb-1)
    <div> relatif (icône + input)
      <i className={icon}> si fourni (absolute left-3, text-slate-400)
      <input> className dynamique selon état
    </div>
    <p> si error → texte rouge petit
    <p> si hint → texte gris petit
  </div>
Bordure normale : #E2E8F0 | focus : #1E3A8A + ring | error : #EF4444 | valid : #4ADE80

━━━ JOUR 2 ━━━

📄 src/components/ui/Card.jsx
Props : children, className, hover, onClick, padding ('sm'|'md'|'lg'), shadow
Style : bg-white, rounded-2xl, border border-slate-100
hover=true → hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer
Shadows : sm (shadow-sm), md (shadow-md), lg (shadow-xl)

📄 src/components/ui/Toast.jsx
- Position : fixed bottom-6 right-6 z-50, flex flex-col gap-2
- Lire toasts depuis Redux toastSlice
- Chaque toast : rounded-xl shadow-lg px-4 py-3, flex items-center gap-3
- Types : success (bg-green-50 border-l-4 border-green-500), error (bg-red-50 border-l-4 border-red-500), warning (bg-amber-50 border-l-4 border-amber-500), info (bg-blue-50 border-l-4 border-blue-900)
- Icône Font Awesome selon type
- Bouton × pour fermer (dispatch removeToast)
- useEffect → setTimeout(4000) → dispatch removeToast

━━━ JOUR 3-4 ━━━

📄 src/services/notificationService.js
- getAll() → GET /notifications → retourne data.data
- markRead(id) → PATCH /notifications/{id}/read
- markAllRead() → PATCH /notifications/read-all

📄 src/pages/tracking/OrderHistoryPage.jsx
- useEffect → Appel GET /orders via api.get('/orders')
- États : loading (skeleton cards), error (message retry), empty (illustration + CTA)
- Liste de cards : date formatée (ex: "Lundi 21 avril 2026"), pharmacie, total FCFA, badge statut, bouton "Voir"
- Filtre tabs : Toutes / En cours / Livrées / Annulées
- Clic sur une commande → navigate('/orders/:id')
Statuts et couleurs :
  pending → badge slate "En attente"
  confirmed → badge blue-800 "Confirmée"
  preparing → badge amber "En préparation"
  ready → badge yellow "Prête"
  shipped → badge violet "Expédiée"
  delivered → badge green "Livrée"
  cancelled → badge red "Annulée"

📄 src/pages/tracking/OrderStatusPage.jsx
- useParams() → id
- Appel GET /orders/{id} via api.get
- Timeline verticale progressive :
  Cercle vert plein + trait vert = étape passée
  Cercle bleu pulsant = étape actuelle
  Cercle gris vide = étape future
  Étapes : En attente → Confirmée → En préparation → Prête → Expédiée → Livrée
- Section items commandés (nom, quantité, prix)
- Total + méthode de paiement
- Si tracking_url → bouton "Suivre la livraison" (lien externe)
- Si status='delivered' → bouton "Laisser un avis" (call POST /reviews via api.post)
- Si status='pending' → bouton "Annuler" (call PATCH via api.patch)

📄 src/pages/tracking/NotificationsPage.jsx
- Appel GET /notifications via api.get au montage
- Non lue : bg-blue-50 + point bleu animate-pulse
- Lue : bg-white
- Bouton "Tout marquer comme lu" → PATCH /notifications/read-all
- Icône selon type : order_update=fa-box, payment=fa-credit-card, delivery=fa-truck, stock_alert=fa-triangle-exclamation
- Format heure relative : "Il y a 5 min", "Hier à 14h30"

━━━ FIN DU CONTEXTE SONIA ━━━

AUJOURD'HUI JE DOIS IMPLÉMENTER : [remplace par le fichier spécifique]

Génère le code complet. Utilise exclusivement Tailwind CSS v3.
Inspire-toi du design de https://isomorphic-furyroad.vercel.app pour un rendu professionnel.
```

---

## 📊 Issues GitHub — Tes tickets

```
#30 feat(frontend): api.js + Redux store + Navbar + Button + Input
#31 feat(frontend): Card + Toast + pages Suivi
```
