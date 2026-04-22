# 🏥 MEDCAM — GUIDE COMPLET ÉQUIPE FRONTEND

> **"La pharmacie à portée de main"**
> Projet : MEDCAM | Stack : React 18 + Vite + Tailwind v3 + React Router v6 + Redux Toolkit
> Logo : `docs/conception/ui-kit/logo.png`
> Inspiration design : https://isomorphic-furyroad.vercel.app

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

## 📁 STRUCTURE DU PROJET (déjà initialisée)

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
│   │   ├── ui/              ← Button, Input, Card, Toast (Sonia)
│   │   ├── medicament/      ← MedicamentCard, PharmacyCard (Linus)
│   │   └── order/           ← CartItem, OrderStatusBadge (Ange)
│   ├── pages/
│   │   ├── auth/            ← Login, Register, Profile (Leslie)
│   │   ├── search/          ← Home, Results, Detail (Linus)
│   │   ├── order/           ← Cart, Checkout, Payment (Ange)
│   │   └── tracking/        ← History, Status, Notifications (Sonia)
│   ├── services/
│   │   ├── api.js           ← Config Axios (Sonia crée)
│   │   ├── authService.js   ← (Leslie)
│   │   ├── medicamentService.js ← (Linus)
│   │   ├── orderService.js  ← (Ange)
│   │   └── paymentService.js ← (Ange)
│   └── store/
│       ├── index.js         ← Redux store (Sonia crée)
│       ├── authSlice.js     ← (Leslie)
│       └── cartSlice.js     ← (Ange)
├── public/
│   └── logo.png             ← COPIER LE LOGO ICI
├── tailwind.config.js       ← DÉJÀ CRÉÉ
├── vite.config.js           ← DÉJÀ CRÉÉ
└── .env                     ← À CRÉER
```

---

## 🔗 API BACKEND (Laravel - Jack)

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

## 🌿 GIT WORKFLOW — RÈGLES ABSOLUES

### Chaque matin avant de coder

```bash
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature
```

### En travaillant

```bash
# Committer toutes les heures minimum
git add .
git commit -m "feat(auth): ajout LoginPage avec formulaire"
git push -u origin feature/ma-feature
```

### Quand la tâche est finie

1. Ouvrir une **Pull Request** vers `develop` sur GitHub
2. Décrire ce que tu as fait dans la description
3. **Interdiction de merger ta propre PR** — c'est Jack qui merge

### Règle anti-conflit

**Chaque dev touche UNIQUEMENT ses fichiers.**
Si tu as besoin d'un composant pas encore créé → utilise une balise HTML standard :
```jsx
// En attendant Button.jsx de Sonia
<button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold">
  Se connecter
</button>
```
Tu remplaceras par `<Button>` quand Sonia aura mergé.

---

## ⚠️ MÉTA-RÈGLES POUR VOTRE IA

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
---

# 🎨 ROADMAP SONIA — Composants UI & Pages Suivi

> **Tu es la fondation de tout le projet.**
> Sans tes composants, personne ne peut finir son travail proprement.
> **Jour 1 = livrer api.js + store/index.js + Button + Input + Navbar.**

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

## TA BRANCHE GIT

```bash
# Jour 1
git checkout develop && git pull origin develop
git checkout -b feature/frontend-ui-components

# Jour 3-4 (pages suivi)
git checkout develop && git pull origin develop
git checkout -b feature/frontend-tracking
```

Tes commits :
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
- useEffect → notificationService.getAll() ... (ordre : orderService mais c'est Ange)
  → Appel GET /orders via api.get('/orders')
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
---

# 🔐 ROADMAP LESLIE — Authentification & Profil

> **Tu travailles sur le système de connexion.**
> Tu peux commencer dès le Jour 1 en parallèle avec Sonia.
> Si Button ou Input de Sonia ne sont pas encore dispo → utilise des balises HTML standard.

---

## TES FICHIERS (et SEULEMENT les tiens)

```
src/store/authSlice.js                   ← JOUR 1
src/services/authService.js              ← JOUR 1
src/components/layout/PrivateRoute.jsx   ← JOUR 1
src/pages/auth/LoginPage.jsx             ← JOUR 2
src/pages/auth/RegisterPage.jsx          ← JOUR 2
src/pages/auth/ProfilePage.jsx           ← JOUR 3
```

**NE TOUCHE JAMAIS à ces fichiers** :
- src/components/ui/* (Sonia)
- src/components/layout/Navbar.jsx (Sonia)
- src/store/cartSlice.js (Ange)
- Tout pages/search/, pages/order/, pages/tracking/

---

## TA BRANCHE GIT

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-auth
```

Tes commits :
```
feat(auth): ajout authSlice Redux avec persistance localStorage
feat(auth): ajout authService avec login, register, logout, getMe
feat(auth): ajout PrivateRoute protection routes privées
feat(auth): ajout LoginPage MEDCAM
feat(auth): ajout RegisterPage avec validation
feat(auth): ajout ProfilePage utilisateur
```

---

## SETUP INITIAL (à faire une seule fois)

```bash
# Cloner le repo
git clone https://github.com/Ulrichjack/project-dev-medicament.git
cd project-dev-medicament/frontend/medcam

# Installer les dépendances
npm install

# Créer le .env
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Copier le logo dans public/
cp ../../docs/conception/ui-kit/logo.png public/logo.png

# Démarrer
npm run dev
```

---

## PROMPT COMPLET POUR TON IA

```
RÈGLES OBLIGATOIRES — NE JAMAIS VIOLER :
1. Framework : React.js 18 avec Vite UNIQUEMENT
2. INTERDIT : Next.js, dossier app/, fichiers page.js → JAMAIS
3. Routing : react-router-dom v6 UNIQUEMENT (useNavigate, Link, Outlet)
4. Composants fonctionnels UNIQUEMENT avec Hooks
5. Style : Tailwind CSS v3 UNIQUEMENT
6. Nom du projet : MEDCAM — "La pharmacie à portée de main"
7. Design inspiration : https://isomorphic-furyroad.vercel.app

CONTEXTE DU PROJET :
Je travaille sur MEDCAM, une application de commande de médicaments au Cameroun.
Je suis LESLIE, responsable de l'authentification et du profil utilisateur.

IDENTITÉ VISUELLE MEDCAM :
- Couleur primary : #1E3A8A (bleu marine foncé)
- Couleur secondary : #38BDF8 (bleu ciel)
- Couleur accent : #4ADE80 (vert)
- Fond alternatif : #F0F4FF
- Texte : #1E293B
- Police titres : Montserrat 600/700 (déjà importé dans index.css)
- Police corps : Inter 400/500

FICHIERS DÉJÀ EXISTANTS (ne pas recréer) :
- src/App.jsx avec ces routes déjà configurées :
  /login → LoginPage (moi)
  /register → RegisterPage (moi)
  /profile → ProfilePage (moi, route privée via PrivateRoute)
- src/services/api.js (créé par Sonia) — instance Axios configurée avec token auto
  Usage : import api from '../services/api' puis api.post('/auth/login', data)
- src/store/index.js (créé par Sonia) — Redux store configuré

MES FICHIERS À CRÉER :

━━━ JOUR 1 ━━━

📄 src/store/authSlice.js
Créer avec createSlice de @reduxjs/toolkit.

State initial :
```js
{
  user: JSON.parse(localStorage.getItem('medcam_user') || 'null'),
  token: localStorage.getItem('medcam_token') || null,
  isAuthenticated: !!localStorage.getItem('medcam_token'),
  loading: false,
  error: null
}
```
Actions :
- setCredentials({ user, token }) → stocke dans Redux ET localStorage('medcam_token', 'medcam_user')
- logout() → vide Redux ET supprime localStorage
- setLoading(bool)
- setError(string | null)
Exporter les actions ET le reducer (default export)
Exporter les selectors : selectUser, selectToken, selectIsAuthenticated, selectAuthLoading

📄 src/services/authService.js
Importer api depuis '../services/api' (fichier de Sonia).
Méthodes à exporter :
- login(email, password) → api.post('/auth/login', {email, password}) → retourne data.data = {user, token}
- register(formData) → api.post('/auth/register', formData) → retourne data.data
- logout() → api.post('/auth/logout')
- getMe() → api.get('/auth/me') → retourne data.data

Gestion erreurs :
- 401 → throw new Error('Email ou mot de passe incorrect')
- 422 → throw l'objet errors pour validation
- 500 → throw new Error('Erreur serveur, réessayez')

📄 src/components/layout/PrivateRoute.jsx
Logique :
- Lire isAuthenticated depuis Redux (useSelector)
- Si true → <Outlet /> (affiche la page enfant)
- Si false → <Navigate to="/login" replace />
Usage dans App.jsx : <Route element={<PrivateRoute />}> les routes privées </Route>

━━━ JOUR 2 ━━━

📄 src/pages/auth/LoginPage.jsx
Structure visuelle (inspire de isomorphic-furyroad.vercel.app) :
- Page 2 colonnes : gauche illustration/branding (hidden sur mobile), droite formulaire
- Colonne gauche : fond dégradé #1E3A8A → #38BDF8, logo MEDCAM blanc, tagline, icônes features
- Colonne droite : fond blanc, centré verticalement, max-w-md
- Logo MEDCAM en haut du formulaire (mobile)
- Titre "Bon retour !" (Montserrat bold)
- Sous-titre "Connectez-vous à votre compte MEDCAM"

Formulaire :
- Label "Email" + input type email (si Input.jsx de Sonia dispo, sinon balise input avec classes Tailwind)
- Label "Mot de passe" + input type password + eye toggle (show/hide)
- Lien "Mot de passe oublié ?" (aligné droite, texte #38BDF8)
- Bouton "Se connecter" (bg-[#1E3A8A] text-white, pleine largeur, rounded-xl)
- Séparateur ligne "ou"
- Lien "Créer un compte" → navigate('/register')

Logique :
1. useState pour email, password, showPassword, loading, errorMsg
2. handleSubmit → setLoading(true)
3. await authService.login(email, password)
4. dispatch(setCredentials({user, token}))
5. navigate('/') [redirection accueil]
6. catch → setErrorMsg(message)
7. finally → setLoading(false)

États visuels :
- loading → bouton avec spinner SVG + texte "Connexion..." + disabled
- errorMsg → div bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm

📄 src/pages/auth/RegisterPage.jsx
Structure similaire à LoginPage (2 colonnes desktop).

Formulaire :
- Nom complet
- Email
- Téléphone (format camerounais : 6XXXXXXXX)
- Je suis : radio ou select (Client / Pharmacien)
- Mot de passe + confirmation
- Case à cocher "J'accepte les conditions"
- Bouton "Créer mon compte"
- Lien "Déjà un compte ? Connexion"

Validation avant envoi :
- Email : regex valide
- Téléphone : commence par 6 ou 2, 9 chiffres
- Password : min 8 chars
- password_confirmation === password
- Afficher erreurs sous chaque champ si invalide

Logique :
1. Valider → afficher erreurs inline
2. await authService.register(formData)
3. dispatch(setCredentials) → navigate('/')
4. Si erreur 422 → afficher erreurs Laravel champ par champ

━━━ JOUR 3 ━━━

📄 src/pages/auth/ProfilePage.jsx
Structure :
- Header carte profil : fond dégradé #1E3A8A → #38BDF8, avatar cercle (initiales nom sur fond blanc/bleu), nom, badge rôle (Client/Pharmacien/Admin)
- Sections d'infos avec icônes Font Awesome :
  fa-user Nom complet : valeur
  fa-envelope Email : valeur
  fa-phone Téléphone : valeur ou "Non renseigné"
  fa-shield-halved Rôle : badge coloré
  fa-calendar Membre depuis : date.toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})
- Bouton "Se déconnecter" variant danger (outline)

Logique déconnexion :
1. await authService.logout()
2. dispatch(logout())
3. navigate('/login')

━━━ FIN DU CONTEXTE LESLIE ━━━

AUJOURD'HUI JE DOIS IMPLÉMENTER : [remplace par le fichier spécifique]

Génère le code complet. Tailwind CSS v3 uniquement.
Inspire du design professionnel de https://isomorphic-furyroad.vercel.app.
```

---
---

# 🔍 ROADMAP LINUS — Recherche & Médicaments

> **Tu travailles sur le cœur fonctionnel de l'app.**
> Commence dès le Jour 1 en parallèle avec les autres.
> Si cartSlice d'Ange n'est pas dispo → utilise un state local temporaire.

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

## TA BRANCHE GIT

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-search
```

Tes commits :
```
feat(search): ajout medicamentService
feat(search): ajout MedicamentCard composant
feat(search): ajout PharmacyCard avec distance et stock
feat(search): ajout HomePage avec hero et recherche
feat(search): ajout SearchResultsPage avec filtres
feat(search): ajout MedicamentDetailPage
```

---

## SETUP INITIAL

```bash
git clone https://github.com/Ulrichjack/project-dev-medicament.git
cd project-dev-medicament/frontend/medcam
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env
cp ../../docs/conception/ui-kit/logo.png public/logo.png
npm run dev
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
```js
const MOCK_MEDICAMENTS = [
  { id: 1, name: "Paracétamol 500mg", active_substance: "Paracétamol", prescription_required: false, photo_url: null, manufacturer: "Sanofi", price_min: 500, pharmacies_count: 4 },
  { id: 2, name: "Amoxicilline 500mg", active_substance: "Amoxicilline", prescription_required: true, photo_url: null, manufacturer: "GSK", price_min: 1200, pharmacies_count: 2 },
  { id: 3, name: "Ibuprofène 400mg", active_substance: "Ibuprofène", prescription_required: false, photo_url: null, manufacturer: "Pfizer", price_min: 800, pharmacies_count: 3 }
]
```

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
---

# 🛒 ROADMAP ANGE — Tunnel de Commande & Paiement

> **Tu travailles sur la partie qui génère les revenus.**
> Une erreur ici = client qui ne peut pas payer. Sois rigoureux sur les états.
> **Commence par cartSlice.js — Linus en a besoin rapidement.**

---

## TES FICHIERS (et SEULEMENT les tiens)

```
src/store/cartSlice.js                   ← JOUR 1 - URGENT (Linus attend ça)
src/components/order/OrderStatusBadge.jsx ← JOUR 1
src/components/order/CartItem.jsx         ← JOUR 1
src/services/orderService.js              ← JOUR 2
src/services/paymentService.js            ← JOUR 2
src/pages/order/CartPage.jsx              ← JOUR 2-3
src/pages/order/CheckoutPage.jsx          ← JOUR 3
src/pages/order/PaymentPage.jsx           ← JOUR 4
```

**NE TOUCHE JAMAIS à ces fichiers** :
- src/store/authSlice.js (Leslie)
- src/components/ui/* (Sonia)
- Tout pages/auth/, pages/search/, pages/tracking/

---

## TA BRANCHE GIT

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-orders
```

Tes commits :
```
feat(cart): ajout cartSlice Redux - NOTIFIER LINUS SUR DISCORD
feat(order): ajout OrderStatusBadge composant
feat(order): ajout CartItem composant
feat(order): ajout orderService et paymentService
feat(order): ajout CartPage
feat(order): ajout CheckoutPage avec géolocalisation
feat(order): ajout PaymentPage flux Mobile Money
```

**IMPORTANT : quand cartSlice.js est prêt, préviens Linus sur Discord.**

---

## SETUP INITIAL

```bash
git clone https://github.com/Ulrichjack/project-dev-medicament.git
cd project-dev-medicament/frontend/medcam
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env
cp ../../docs/conception/ui-kit/logo.png public/logo.png
npm run dev
```

---

## PROMPT COMPLET POUR TON IA

```
RÈGLES OBLIGATOIRES — NE JAMAIS VIOLER :
1. Framework : React.js 18 avec Vite UNIQUEMENT
2. INTERDIT : Next.js, dossier app/, fichiers page.js → JAMAIS
3. Routing : react-router-dom v6 UNIQUEMENT (useNavigate, useParams, Link)
4. Composants fonctionnels UNIQUEMENT avec Hooks
5. Style : Tailwind CSS v3 UNIQUEMENT
6. Nom du projet : MEDCAM — "La pharmacie à portée de main"
7. Design inspiration : https://isomorphic-furyroad.vercel.app

CONTEXTE DU PROJET :
Je travaille sur MEDCAM, une application de commande de médicaments au Cameroun.
Je suis ANGE, responsable du panier, de la commande et du paiement.

IDENTITÉ VISUELLE MEDCAM :
- Couleur primary : #1E3A8A (bleu marine)
- Couleur secondary : #38BDF8 (bleu ciel)
- Couleur accent : #4ADE80 (vert succès)
- MTN Mobile Money : #FFCC00 (jaune MTN)
- Orange Money : #FF6600 (orange)
- Fond alternatif : #F0F4FF
- Police titres : Montserrat 600/700 | Corps : Inter 400/500

FICHIERS DÉJÀ EXISTANTS (ne pas recréer) :
- src/App.jsx avec routes :
  /cart → CartPage (moi, route privée)
  /checkout → CheckoutPage (moi, route privée)
  /payment/:orderId → PaymentPage (moi, route privée)
- src/services/api.js (Sonia) — instance Axios avec token auto
  Usage : import api from '../services/api' puis api.post(...)

API BACKEND :
POST /orders → body: { pharmacy_id, items:[{medicament_id, quantity, unit_price}], delivery_address, delivery_latitude, delivery_longitude, notes }
               → retourne { success, data: { id, status, total_amount, ... } }
GET  /orders → retourne liste mes commandes
GET  /orders/{id} → détails commande
PATCH /orders/{id}/cancel → annuler
POST /payments/{orderId}/initiate → body: { method, phone_number } → { success, data: { transaction_id } }
GET  /payments/{orderId}/status → { success, data: { status: 'pending'|'paid'|'failed' } }

MES FICHIERS À CRÉER :

━━━ JOUR 1 - URGENT ━━━

📄 src/store/cartSlice.js
⚠️ CRÉER EN PREMIER — Linus (pages médicaments) en a besoin pour "Ajouter au panier"

Créer avec createSlice de @reduxjs/toolkit.

State initial :
```js
{
  items: [],           // items du panier
  pharmacyId: null,    // ID de la pharmacie sélectionnée
  pharmacyName: ""     // nom pour affichage
}
```
Structure d'un item :
```js
{
  medicamentId: number,
  medicamentName: string,
  photo_url: string | null,
  pharmacyId: number,
  pharmacyName: string,
  price: number,          // prix unitaire en FCFA
  quantity: number        // commence à 1
}
```
Actions :
- addItem(item) → si medicamentId+pharmacyId existe déjà → quantity++ | sinon → push nouveau item
- removeItem(medicamentId) → filter
- updateQuantity({ medicamentId, quantity }) → si quantity <= 0 → supprimer | sinon → mettre à jour
- clearCart() → items:[], pharmacyId:null, pharmacyName:""
- setPharmacy({ pharmacyId, pharmacyName }) → si pharmacyId différent de l'actuel → vider items d'abord puis mettre à jour

Selectors (export named) :
- selectCartItems : state.cart.items
- selectCartTotal : items.reduce((sum, item) => sum + item.price * item.quantity, 0)
- selectCartCount : items.reduce((sum, item) => sum + item.quantity, 0)
- selectCartPharmacyId : state.cart.pharmacyId
- selectCartPharmacyName : state.cart.pharmacyName

📄 src/components/order/OrderStatusBadge.jsx
Props : status (string)
Map statut → couleur + label :
  pending → bg-slate-100 text-slate-600 "En attente"
  confirmed → bg-blue-100 text-blue-800 "Confirmée"
  preparing → bg-amber-100 text-amber-700 "En préparation"
  ready → bg-yellow-100 text-yellow-700 "Prête"
  shipped → bg-violet-100 text-violet-700 "Expédiée"
  delivered → bg-green-100 text-green-700 "Livrée"
  cancelled → bg-red-100 text-red-700 "Annulée"
Style : rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1 + point coloré

📄 src/components/order/CartItem.jsx
Props : item ({ medicamentId, medicamentName, photo_url, pharmacyName, price, quantity }), onQuantityChange, onRemove

Structure :
- Container : flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100
- Image : bg-[#F0F4FF] w-16 h-16 rounded-xl flex items-center justify-center
  → img si photo_url, sinon fa-pills text-2xl text-[#38BDF8]
- Infos : flex-1
  → Nom (font-semibold text-[#1E293B])
  → Pharmacie (text-slate-500 text-xs fa-store)
  → Prix unitaire (text-slate-400 text-xs)
- Contrôle quantité : flex items-center gap-2
  → Bouton "−" : w-8 h-8 rounded-full border border-slate-200, disabled si quantity=1
  → Chiffre : w-8 text-center font-bold
  → Bouton "+" : w-8 h-8 rounded-full border border-slate-200
- Sous-total : text-[#1E3A8A] font-bold (price × quantity + " FCFA")
- Bouton supprimer : fa-trash text-red-400 hover:text-red-600, ml-2

━━━ JOUR 2 ━━━

📄 src/services/orderService.js
Import api depuis '../services/api'
- createOrder(data) → api.post('/orders', data) → retourne data.data
- getMyOrders() → api.get('/orders') → retourne data.data
- getOrderById(id) → api.get('/orders/'+id) → retourne data.data
- cancelOrder(id) → api.patch('/orders/'+id+'/cancel') → retourne data.data

📄 src/services/paymentService.js
- initiatePayment(orderId, method, phoneNumber) → api.post('/payments/'+orderId+'/initiate', { method, phone_number: phoneNumber }) → retourne data.data
- getStatus(orderId) → api.get('/payments/'+orderId+'/status') → retourne data.data.status

📄 src/pages/order/CartPage.jsx
Lire depuis Redux : items (selectCartItems), total (selectCartTotal), pharmacyName

Panier VIDE :
- Illustration : fa-cart-shopping text-8xl text-slate-200 centré
- "Votre panier est vide" (Montserrat, text-slate-400)
- Bouton "Rechercher un médicament" → navigate('/')

Panier NON VIDE :
- Header : "Mon panier" + "Pharmacie : {pharmacyName}" (badge bleu)
- Liste : CartItem pour chaque item (dispatch updateQuantity / removeItem)
- Récapitulatif fixe en bas (sticky ou section séparée) :
  → Sous-total : {total} FCFA
  → Frais de livraison : 500 FCFA
  → Ligne séparatrice
  → TOTAL : {total + 500} FCFA (Montserrat bold, grand, couleur #1E3A8A)
- Bouton "Passer la commande" → navigate('/checkout')

━━━ JOUR 3 ━━━

📄 src/pages/order/CheckoutPage.jsx
Section 1 — Récapitulatif commande (read-only) :
- Liste items condensée
- Total calculé

Section 2 — Livraison :
- Textarea "Adresse complète de livraison" (required)
- Bouton "📍 Utiliser ma position GPS" :
  → navigator.geolocation.getCurrentPosition(pos => stocker lat/lng)
  → Afficher "✓ Position GPS détectée" en vert après succès
- Textarea "Notes pour le livreur" (optionnel, placeholder: "Ex: Quartier Bastos, bâtiment bleu, 3ème étage")

Bouton "Confirmer et payer" :
1. Valider que adresse non vide
2. Construire body depuis Redux cartSlice
3. await orderService.createOrder(body)
4. dispatch(clearCart())
5. navigate('/payment/'+orderId)
6. Erreur stock → toast "Le médicament X n'est plus disponible en quantité suffisante"

━━━ JOUR 4 ━━━

📄 src/pages/order/PaymentPage.jsx
useParams() → orderId
Appel orderService.getOrderById(orderId) → récupérer le montant

ÉTAPE 1 — Choix méthode :
- Titre "Choisissez votre moyen de paiement"
- Carte MTN : bg-[#FFCC00] rounded-2xl p-6, logo/texte MTN, "Mobile Money"
- Carte Orange : bg-[#FF6600] rounded-2xl p-6, logo/texte, "Orange Money"
- Les deux full-width, avec icône fa-mobile-screen-button grand

ÉTAPE 2 — Numéro de téléphone :
- Afficher méthode choisie (header coloré)
- Montant à payer (Montserrat bold, très grand)
- Input "Numéro de téléphone" placeholder="677 XX XX XX"
- Validation : commence par 6, 9 chiffres
- Bouton "Payer {montant} FCFA"

ÉTAPE 3 — Attente confirmation :
- Spinner animé (SVG cercle tournant, couleur #1E3A8A)
- "En attente de confirmation..."
- "Vérifiez votre téléphone {numero} et validez le paiement"
- await paymentService.initiatePayment(orderId, method, phone)
- Puis polling : setInterval(3000) → paymentService.getStatus(orderId)
  → Si 'paid' → passer étape 4a, clearInterval
  → Si 'failed' → passer étape 4b, clearInterval
  → Timeout 60s → afficher "Délai dépassé, réessayez"

ÉTAPE 4A — Succès :
- fa-circle-check text-8xl text-[#4ADE80] centré animate-bounce
- "Paiement confirmé ! 🎉" (Montserrat bold, vert)
- "Votre commande a été transmise à la pharmacie"
- Numéro de commande : #{orderId}
- Bouton "Suivre ma commande" → navigate('/orders/'+orderId)

ÉTAPE 4B — Échec :
- fa-circle-xmark text-8xl text-red-400 centré
- "Paiement échoué"
- "Solde insuffisant ou numéro incorrect"
- Bouton "Réessayer" → retour étape 1
- Bouton "Annuler la commande" → orderService.cancelOrder(orderId) + navigate('/')

━━━ FIN DU CONTEXTE ANGE ━━━

AUJOURD'HUI JE DOIS IMPLÉMENTER : [remplace par le fichier spécifique]

Génère le code complet. Tailwind CSS v3 uniquement.
Inspire du design professionnel de https://isomorphic-furyroad.vercel.app.
```

---

## 📊 RÉCAPITULATIF ISSUES GITHUB À CRÉER

```
# Sonia
#30 feat(frontend): api.js + Redux store + Navbar + Button + Input
#31 feat(frontend): Card + Toast + pages Suivi

# Leslie
#32 feat(frontend): authSlice + authService + PrivateRoute
#33 feat(frontend): Login + Register + Profile pages

# Linus
#34 feat(frontend): medicamentService + MedicamentCard + PharmacyCard
#35 feat(frontend): HomePage + SearchResultsPage + MedicamentDetailPage

# Ange
#36 feat(frontend): cartSlice + OrderStatusBadge + CartItem (URGENT)
#37 feat(frontend): orderService + paymentService
#38 feat(frontend): CartPage + CheckoutPage + PaymentPage
```

---

## 🔔 COMMUNICATION ÉQUIPE

Quand tu pousses un fichier dont quelqu'un d'autre a besoin, annonce-le sur Discord :
- **Sonia** → "api.js pushé sur develop ✅ — Leslie, Linus, Ange peuvent l'utiliser"
- **Sonia** → "Button.jsx pushé ✅"
- **Ange** → "cartSlice.js pushé ✅ — Linus peut utiliser addItem"
- **Jack** → "API auth prête sur localhost:8000 ✅ — Leslie peut tester"