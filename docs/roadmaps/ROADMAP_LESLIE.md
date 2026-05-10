# 🔐 ROADMAP LESLIE — Authentification & Profil

> **Tu travailles sur le système de connexion.**
> Tu peux commencer dès le Jour 1 en parallèle avec Sonia.
> Si Button ou Input de Sonia ne sont pas encore dispo → utilise des balises HTML standard.

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
│   │   ├── layout/          ← Navbar (Sonia), PrivateRoute (Leslie) ← TOI
│   │   └── ui/              ← Button, Input, Card, Toast (Sonia)
│   ├── pages/
│   │   ├── auth/            ← Login, Register, Profile (Leslie) ← TOI
│   │   ├── search/          ← (Linus)
│   │   ├── order/           ← (Ange)
│   │   └── tracking/        ← (Sonia)
│   ├── services/
│   │   ├── api.js           ← Config Axios (Sonia crée)
│   │   └── authService.js   ← (Leslie) ← TOI
│   └── store/
│       ├── index.js         ← Redux store (Sonia crée)
│       ├── authSlice.js     ← (Leslie) ← TOI
│       └── cartSlice.js     ← (Ange)
├── public/
│   └── logo.png
└── .env                     ← À CRÉER
```

---

## 🔗 API BACKEND (Laravel - Jack) — Endpoints que tu utilises

```
URL de base : http://localhost:8000/api

POST   /auth/register
POST   /auth/login        → retourne { success, data: { user, token } }
POST   /auth/logout
GET    /auth/me
```

Format réponse standard Jack :
```json
{ "success": true, "message": "...", "data": { ... } }
{ "success": false, "message": "...", "errors": { ... } }
```

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

## 🌿 GIT WORKFLOW

### Ta branche

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-auth
```

### Tes commits

```
feat(auth): ajout authSlice Redux avec persistance localStorage
feat(auth): ajout authService avec login, register, logout, getMe
feat(auth): ajout PrivateRoute protection routes privées
feat(auth): ajout LoginPage MEDCAM
feat(auth): ajout RegisterPage avec validation
feat(auth): ajout ProfilePage utilisateur
```

### Règles Git absolues

```bash
# Chaque matin avant de coder
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature

# En travaillant — committer toutes les heures minimum
git add .
git commit -m "feat(auth): ajout LoginPage avec formulaire"
git push -u origin feature/ma-feature
```

Quand la tâche est finie :
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

## 🛠️ SETUP INITIAL (à faire une seule fois)

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
{
  user: JSON.parse(localStorage.getItem('medcam_user') || 'null'),
  token: localStorage.getItem('medcam_token') || null,
  isAuthenticated: !!localStorage.getItem('medcam_token'),
  loading: false,
  error: null
}

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

## 📊 Issues GitHub — Tes tickets

```
#32 feat(frontend): authSlice + authService + PrivateRoute
#33 feat(frontend): Login + Register + Profile pages
```
