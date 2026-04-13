# 🗺️ ROADMAP FRONTEND — SONIA (Layout + Composants UI + Suivi)

> **Tu es la première à travailler — tout le monde attend tes composants.**
> Sans App.jsx et les composants UI, personne ne peut avancer.
> **Jour 1 = priorité absolue.**

---

## 📌 TES RESPONSABILITÉS

| Priorité | Fichier | Pourquoi c'est urgent |
|----------|---------|----------------------|
| 🔴 URGENT | `App.jsx` | Sans ça, aucune page ne s'affiche |
| 🔴 URGENT | `Button.jsx` | Leslie, Linus, Ange en ont besoin |
| 🔴 URGENT | `Input.jsx` | Leslie en a besoin pour ses formulaires |
| 🔴 URGENT | `Navbar.jsx` | Visible sur toutes les pages |
| 🔴 URGENT | `PrivateRoute.jsx` | Protège les pages qui nécessitent connexion |
| 🟡 JOUR 2 | `Card.jsx` | Linus en a besoin |
| 🟡 JOUR 2 | `Toast.jsx` | Ange en a besoin |
| 🟢 JOUR 3-4 | Pages Suivi | OrderHistory, OrderStatus, Notifications |

---

## 🌿 TA BRANCHE GIT

```bash
# Setup initial (une seule fois)
git checkout develop
git pull origin develop
git checkout -b feature/frontend-setup

# Après avoir fini le setup (App.jsx + composants UI)
git push -u origin feature/frontend-setup
# → Ouvrir PR vers develop

# Pour les pages Suivi
git checkout develop
git pull origin develop
git checkout -b feature/frontend-tracking
git push -u origin feature/frontend-tracking
```

### Tes commits

```
feat(layout): ajout App.jsx avec toutes les routes
feat(ui): ajout composant Button avec variantes
feat(ui): ajout composant Input avec états error/valid
feat(ui): ajout Navbar avec menu utilisateur
feat(layout): ajout PrivateRoute protection authentification
feat(ui): ajout composant Card
feat(ui): ajout système Toast notifications
feat(tracking): ajout page OrderHistory
feat(tracking): ajout page OrderStatus avec timeline
feat(tracking): ajout page Notifications
```

---

## 📋 BACKLOG DÉTAILLÉ

---

### JOUR 1 — COMPOSANTS PRIORITAIRES (tout le monde attend ça)

---

#### Tâche S-1 : Créer le projet React + installer les dépendances

```bash
cd project-dev-medicament
npm create vite@latest frontend -- --template react
cd frontend
npm install react-router-dom axios @reduxjs/toolkit react-redux
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configurer `tailwind.config.js` :
```js
content: ["./index.html", "./src/**/*.{js,jsx}"]
```

Configurer `src/index.css` — coller en haut :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --color-primary: #2C5F8D;
  --color-secondary: #27AE60;
  --color-danger: #E74C3C;
  --color-warning: #F39C12;
  --color-bg-alt: #F5F7FA;
  --color-text: #2C3E50;
  --color-text-light: #7F8C8D;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #2C3E50;
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
}
```

Créer `.env` dans `frontend/` :
```
VITE_API_URL=http://localhost:8000/api
```

Commit : `chore(frontend): setup React + Tailwind + dépendances`

---

#### Tâche S-2 : App.jsx — Routes de toute l'application

**Fichier :** `src/App.jsx`

Configurer toutes les routes :
```
/                    → HomePage (Linus) — publique
/search              → SearchResultsPage (Linus) — publique
/medicaments/:id     → MedicamentDetailPage (Linus) — publique
/login               → LoginPage (Leslie) — publique (si déjà connecté → redirige vers /)
/register            → RegisterPage (Leslie) — publique
/profile             → ProfilePage (Leslie) — PRIVÉE
/cart                → CartPage (Ange) — PRIVÉE
/checkout            → CheckoutPage (Ange) — PRIVÉE
/payment/:orderId    → PaymentPage (Ange) — PRIVÉE
/orders              → OrderHistoryPage (toi) — PRIVÉE
/orders/:id          → OrderStatusPage (toi) — PRIVÉE
/notifications       → NotificationsPage (toi) — PRIVÉE
*                    → Page 404 simple
```

Pour les pages pas encore créées → utilise des composants placeholder :
```jsx
const PlaceholderPage = ({ name }) => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">{name}</h1>
    <p className="text-gray-500">En cours de développement...</p>
  </div>
)
```

Commit : `feat(layout): ajout App.jsx avec toutes les routes React`

---

#### Tâche S-3 : PrivateRoute.jsx

**Fichier :** `src/components/layout/PrivateRoute.jsx`

Logique :
- Récupère le token depuis Redux (authSlice)
- Si token existe → affiche le composant enfant (Outlet)
- Si pas de token → redirige vers `/login`

Commit : `feat(layout): ajout PrivateRoute protection des routes privées`

---

#### Tâche S-4 : Button.jsx — Composant bouton réutilisable

**Fichier :** `src/components/ui/Button.jsx`

Props :
- `variant` : 'primary' | 'success' | 'danger' | 'outline' | 'ghost'
- `size` : 'sm' | 'md' | 'lg'
- `loading` : boolean (affiche spinner + désactive le bouton)
- `disabled` : boolean
- `onClick` : function
- `type` : 'button' | 'submit'
- `children` : contenu du bouton
- `className` : classes Tailwind supplémentaires

Styles par variante :
- primary : fond #2C5F8D, texte blanc, hover plus foncé
- success : fond #27AE60, texte blanc
- danger : fond #E74C3C, texte blanc
- outline : fond transparent, bordure #2C5F8D, texte #2C5F8D
- ghost : fond transparent, texte #2C3E50, hover fond gris clair

Styles par taille :
- sm : padding 8px 16px, text-sm
- md : padding 12px 24px, text-base (défaut)
- lg : padding 16px 32px, text-lg

État loading :
- Affiche un spinner (cercle animé) à gauche du texte
- `cursor-wait`, opacité réduite
- Désactive les clics

État disabled :
- Fond gris #B0BEC5
- `cursor-not-allowed`
- Opacité 60%

Commit : `feat(ui): ajout composant Button avec toutes variantes et états`

---

#### Tâche S-5 : Input.jsx — Composant input réutilisable

**Fichier :** `src/components/ui/Input.jsx`

Props :
- `label` : string (affiché au-dessus)
- `type` : 'text' | 'email' | 'password' | 'tel'
- `placeholder` : string
- `value` : string
- `onChange` : function
- `error` : string (message d'erreur en rouge, bordure rouge)
- `valid` : boolean (bordure verte)
- `icon` : nom icône Font Awesome (affiché à gauche dans le champ)
- `required` : boolean
- `disabled` : boolean

Structure HTML :
```
<div>
  <label> ← si label fourni
  <div> ← wrapper relatif pour l'icône
    <i> ← icône si fournie
    <input>
  </div>
  <span> ← message d'erreur si error fourni (texte rouge)
</div>
```

Commit : `feat(ui): ajout composant Input avec label, erreur, icône`

---

#### Tâche S-6 : Navbar.jsx

**Fichier :** `src/components/layout/Navbar.jsx`

Contenu :
- Logo "PharmApp" à gauche (couleur #2C5F8D, police Montserrat bold)
- Centre (desktop) : barre de recherche rapide
- À droite :
  - Icône panier (`fa-cart-shopping`) + badge nombre d'items (depuis Redux cartSlice)
  - Icône cloche (`fa-bell`) + badge nombre notifs non lues (depuis Redux)
  - Si connecté : avatar/initiales + dropdown (Profil, Mes commandes, Déconnexion)
  - Si non connecté : boutons "Connexion" et "S'inscrire"

Mobile :
- Logo + icônes panier/cloche/menu hamburger
- Menu hamburger → drawer latéral avec les liens

Commit : `feat(layout): ajout Navbar responsive avec menu utilisateur`

---

### JOUR 2 — COMPOSANTS SECONDAIRES

---

#### Tâche S-7 : Card.jsx

**Fichier :** `src/components/ui/Card.jsx`

Props :
- `children` : contenu de la card
- `className` : classes supplémentaires
- `hover` : boolean (active l'effet hover translateY)
- `onClick` : function (rend la card cliquable)
- `padding` : 'sm' | 'md' | 'lg'

Style :
- Fond blanc, border 1px #E8ECF0, border-radius 12px
- Box shadow légère
- Hover : shadow plus forte + translateY(-2px)

Commit : `feat(ui): ajout composant Card réutilisable`

---

#### Tâche S-8 : Toast.jsx — Notifications visuelles

**Fichier :** `src/components/ui/Toast.jsx`
**Fichier :** `src/store/toastSlice.js`

Fonctionnement :
- Affiché en bas à droite de l'écran (position fixed)
- Types : success (vert), error (rouge), warning (orange), info (bleu)
- Icône Font Awesome selon le type
- Disparaît après 4 secondes (timeout automatique)
- Bouton ×️ pour fermer manuellement
- Peut afficher plusieurs toasts empilés

Usage dans les autres composants :
```jsx
dispatch(addToast({ type: 'success', message: 'Commande créée !' }))
dispatch(addToast({ type: 'error', message: 'Erreur de paiement' }))
```

Commit : `feat(ui): ajout système Toast avec Redux`

---

#### Tâche S-9 : Services et Store de base

**Fichier :** `src/services/api.js` — Configuration Axios

```
- baseURL = import.meta.env.VITE_API_URL
- Intercepteur request : ajoute Authorization: Bearer {token}
- Intercepteur response : si 401 → dispatch logout + redirect /login
```

**Fichier :** `src/store/index.js` — Configuration Redux store

Combine les slices :
- authSlice (Leslie va le créer)
- cartSlice (Ange va le créer)
- toastSlice (toi)

Commit : `feat(store): configuration Redux store + Axios intercepteurs`

---

### JOUR 3-4 — PAGES SUIVI

---

#### Tâche S-10 : OrderHistoryPage.jsx

**Fichier :** `src/pages/tracking/OrderHistoryPage.jsx`

Fonctionnement :
- Au montage → GET /api/orders → récupère mes commandes
- Affiche liste de cards : date, pharmacie, total, statut coloré, bouton "Voir"
- Filtre par statut : Toutes / En cours / Livrées / Annulées
- Si liste vide → message "Aucune commande" + bouton "Rechercher un médicament"
- Clic sur une commande → navigue vers `/orders/:id`

Statuts et couleurs :
- pending → gris "En attente"
- confirmed → bleu "Confirmée"
- preparing → orange "En préparation"
- ready → jaune "Prête"
- shipped → violet "Expédiée"
- delivered → vert "Livrée"
- cancelled → rouge "Annulée"

Commit : `feat(tracking): ajout page historique commandes`

---

#### Tâche S-11 : OrderStatusPage.jsx

**Fichier :** `src/pages/tracking/OrderStatusPage.jsx`

Fonctionnement :
- Lit l'ID depuis l'URL (`/orders/:id`)
- GET /api/orders/:id → récupère les détails
- Affiche une timeline verticale des étapes :
  Étape passée : cercle vert plein + ligne verte
  Étape actuelle : cercle bleu pulsant
  Étape future : cercle gris vide
- Affiche les items commandés (nom, quantité, prix)
- Affiche le total + méthode de paiement
- Si tracking_url disponible → bouton "Suivre la livraison"
- Si status = 'delivered' → bouton "Laisser un avis"
- Bouton "Annuler la commande" si status = 'pending'

Commit : `feat(tracking): ajout page statut commande avec timeline`

---

#### Tâche S-12 : NotificationsPage.jsx

**Fichier :** `src/pages/tracking/NotificationsPage.jsx`

Fonctionnement :
- GET /api/notifications → liste paginée
- Non lue : fond légèrement bleuté + point bleu
- Lue : fond blanc
- Clic sur notification → marquer comme lue + naviguer si lien
- Bouton "Tout marquer comme lu" → PATCH /api/notifications/read-all
- Icône selon le type : commande=box, paiement=credit-card, livraison=truck

Commit : `feat(tracking): ajout page notifications`

---

## 📊 ISSUES GITHUB À CRÉER (toi)

```
#25 feat(frontend): Setup React + Tailwind + dépendances
#26 feat(frontend): App.jsx + PrivateRoute + composants UI (Button, Input, Card, Toast, Navbar)
#29 feat(frontend): Pages suivi (OrderHistory, OrderStatus, Notifications)
```

---

## ⚠️ RÈGLE IMPORTANTE

**Tu DOIS livrer App.jsx, Button, Input, Navbar, PrivateRoute avant la fin du Jour 1.**
Préviens l'équipe sur Discord quand c'est pushé sur develop.
Leslie, Linus et Ange ne peuvent pas avancer sans ça.
