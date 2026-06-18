# 🤖 PROMPTS FRONTEND — ÉQUIPE REACT (PharmApp)

> Chaque membre de l'équipe a son propre prompt.
> Copie-colle le tien dans Gemini AI Studio, Claude, ou ChatGPT.

---

## 📌 CONTEXTE COMMUN (à inclure dans TOUS les prompts)

```
Tu es un expert React.js 18 et Tailwind CSS. Tu m'aides à développer
le frontend de PharmApp, une application de commande de médicaments au Cameroun.

STACK FRONTEND :
- React.js 18 avec Vite
- React Router v6 pour le routing
- Redux Toolkit pour l'état global
- Axios pour les appels API
- Tailwind CSS pour le style
- Font Awesome 6 pour les icônes

CHARTE GRAPHIQUE :
- Couleur primaire : #2C5F8D (bleu médical)
- Couleur secondaire : #27AE60 (vert succès)
- Couleur danger : #E74C3C (rouge)
- Couleur warning : #F39C12 (orange)
- Police titres : Montserrat (600, 700)
- Police corps : Open Sans (400, 500)
- Border radius : 8px pour boutons, 12px pour cards
- Fond alternatif : #F5F7FA

API BACKEND (Laravel sur http://localhost:8000/api) :
- POST /api/auth/register     → Inscription
- POST /api/auth/login        → Connexion → retourne { token, user }
- POST /api/auth/logout       → Déconnexion
- GET  /api/auth/me           → Profil connecté
- GET  /api/medicaments       → Liste médicaments
- GET  /api/medicaments/search?q=terme → Recherche
- GET  /api/medicaments/{id}  → Détail médicament
- GET  /api/medicaments/{id}/pharmacies?latitude=X&longitude=Y → Pharmacies avec stock
- POST /api/orders            → Créer commande
- GET  /api/orders            → Mes commandes
- GET  /api/orders/{id}       → Détail commande
- PATCH /api/orders/{id}/cancel → Annuler
- POST /api/payments/{orderId}/initiate → Payer
- GET  /api/notifications     → Mes notifications
- PATCH /api/notifications/{id}/read   → Marquer lue
- POST /api/reviews           → Laisser un avis

AUTHENTIFICATION :
- Après login, stocker le token dans localStorage
- Ajouter le token dans chaque requête : Authorization: Bearer {token}
- Si l'API retourne 401, rediriger vers /login

CONFIG AXIOS (fichier services/api.js) :
  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

RÈGLES DE CODE :
1. Composants fonctionnels uniquement (pas de classes)
2. Hooks React uniquement (useState, useEffect, useSelector, useDispatch)
3. Pas de logique métier dans les composants — tout dans les services/
4. Toujours gérer les états : loading, error, success
5. Responsive mobile first (Tailwind sm:, md:, lg:)
6. Utiliser les composants UI réutilisables de Sonia (Button, Input, Card, Toast)
```

---

## 👩‍💻 PROMPT LESLIE — Pages Auth & Profil

```
[Colle le CONTEXTE COMMUN ci-dessus]

JE SUIS LESLIE. Je travaille sur les pages d'authentification de PharmApp.

MES FICHIERS À CRÉER :
- src/pages/auth/LoginPage.jsx
- src/pages/auth/RegisterPage.jsx
- src/pages/auth/ProfilePage.jsx
- src/services/authService.js
- src/store/authSlice.js

AUJOURD'HUI JE DOIS IMPLÉMENTER : [décris ce que tu veux]

DÉTAILS DE MES PAGES :

LoginPage.jsx :
- Formulaire avec : email (input type email), password (input type password)
- Bouton "Se connecter" (btn-primary, Montserrat 600)
- Lien "Pas encore de compte ? S'inscrire"
- Lien "Mot de passe oublié ?" (pour plus tard)
- Appel POST /api/auth/login → stocke token + user dans Redux + localStorage
- Si erreur 401 : affiche "Email ou mot de passe incorrect"
- Si succès : redirige vers la page d'accueil

RegisterPage.jsx :
- Formulaire avec : name, email, phone, password, password_confirmation
- Select pour le rôle : Client ou Pharmacien
- Validation côté client avant envoi
- Appel POST /api/auth/register
- Si succès : redirige vers /login avec message "Compte créé avec succès"

ProfilePage.jsx :
- Affiche : nom, email, téléphone, rôle, date d'inscription
- Bouton "Se déconnecter" → POST /api/auth/logout → clear Redux + localStorage → /login

authService.js :
- login(email, password) → appel API → retourne { token, user }
- register(data) → appel API → retourne user
- logout() → appel API
- getMe() → GET /api/auth/me → retourne user

authSlice.js (Redux Toolkit) :
- State : { user: null, token: null, isAuthenticated: false, loading: false }
- Actions : setCredentials(user, token), logout, setLoading

Génère le code complet pour [fichier spécifique].
Utilise Tailwind CSS. Respecte la charte graphique (#2C5F8D, Montserrat, Open Sans).
Gère les états loading (spinner), error (message rouge), success.
```

---

## 👨‍💻 PROMPT LINUS — Pages Recherche & Médicaments

```
[Colle le CONTEXTE COMMUN ci-dessus]

JE SUIS LINUS. Je travaille sur les pages de recherche de PharmApp.

MES FICHIERS À CRÉER :
- src/pages/search/HomePage.jsx
- src/pages/search/SearchResultsPage.jsx
- src/pages/search/MedicamentDetailPage.jsx
- src/components/medicament/MedicamentCard.jsx
- src/components/medicament/PharmacyCard.jsx
- src/services/medicamentService.js

AUJOURD'HUI JE DOIS IMPLÉMENTER : [décris ce que tu veux]

DÉTAILS DE MES PAGES :

HomePage.jsx :
- Barre de recherche grande et visible en haut (placeholder: "Rechercher un médicament...")
- Quand l'utilisateur appuie Entrée ou clique Rechercher → navigue vers /search?q=terme
- Section "Catégories" : boutons horizontaux scrollables (Antibiotiques, Antidouleurs, etc.)
- Section "Médicaments populaires" : 6 MedicamentCard en grille 2 colonnes
- Icône de localisation pour détecter la position du client (navigator.geolocation)

SearchResultsPage.jsx :
- Lit le paramètre ?q= depuis l'URL (useSearchParams)
- Appel GET /api/medicaments/search?q=terme au montage
- Affiche les résultats en grille de MedicamentCard
- Message "Aucun résultat pour X" si vide
- Pagination si beaucoup de résultats
- Filtre par catégorie (dropdown)

MedicamentDetailPage.jsx :
- Lit l'ID depuis l'URL (/medicaments/:id)
- Appel GET /api/medicaments/{id} → affiche photo, nom, substance active, description, dosage
- Badge "Sur ordonnance" si prescription_required = true
- Section "Disponible dans ces pharmacies" :
  Appel GET /api/medicaments/{id}/pharmacies?latitude=X&longitude=Y
  Pour chaque pharmacie : PharmacyCard avec nom, distance, prix, bouton "Commander"
- Bouton "Ajouter au panier" fixe en bas de page

MedicamentCard.jsx :
- Photo du médicament (image ou icône Pills si pas de photo)
- Nom du médicament
- Prix à partir de X FCFA
- Nombre de pharmacies qui l'ont
- onClick → navigue vers /medicaments/{id}

PharmacyCard.jsx :
- Nom de la pharmacie
- Adresse
- Distance en km
- Prix : X FCFA
- Stock : X unités
- Badge vert "Ouvert" ou rouge "Fermé" selon is_open
- Bouton "Commander ici" → ajoute au panier avec cette pharmacie

medicamentService.js :
- search(query, filters) → GET /api/medicaments/search
- getById(id) → GET /api/medicaments/{id}
- getPharmacies(id, latitude, longitude) → GET /api/medicaments/{id}/pharmacies
- getAll(page, filters) → GET /api/medicaments

Génère le code complet pour [fichier spécifique].
```

---

## 👩‍💻 PROMPT ANGE — Pages Commande & Paiement

```
[Colle le CONTEXTE COMMUN ci-dessus]

JE SUIS ANGE. Je travaille sur les pages de commande de PharmApp.

MES FICHIERS À CRÉER :
- src/pages/order/CartPage.jsx
- src/pages/order/CheckoutPage.jsx
- src/pages/order/PaymentPage.jsx
- src/components/order/CartItem.jsx
- src/components/order/OrderStatusBadge.jsx
- src/services/orderService.js
- src/services/paymentService.js
- src/store/cartSlice.js

AUJOURD'HUI JE DOIS IMPLÉMENTER : [décris ce que tu veux]

DÉTAILS DE MES PAGES :

CartPage.jsx :
- Liste des items du panier (depuis Redux store cartSlice)
- Chaque item : photo, nom, pharmacie, prix unitaire, quantité (+ et -), sous-total, bouton supprimer
- Récapitulatif : sous-total, frais livraison (500 FCFA), TOTAL
- Bouton "Commander" → navigue vers /checkout
- Si panier vide : message + bouton retour à la recherche

CheckoutPage.jsx :
- Récapitulatif de la commande (items + total)
- Formulaire adresse de livraison : adresse complète (textarea)
- Bouton "Détecter ma position" → navigator.geolocation → remplit la position GPS
- Notes optionnelles (textarea)
- Bouton "Confirmer et payer" → appel POST /api/orders → navigue vers /payment/{orderId}

PaymentPage.jsx :
- Affiche le montant à payer
- 2 boutons : MTN Mobile Money (jaune) et Orange Money (orange)
- Quand on choisit : input "Numéro de téléphone" (10 chiffres)
- Bouton "Payer maintenant"
- Appel POST /api/payments/{orderId}/initiate avec { method, phone_number }
- Écran d'attente : "Vérifiez votre téléphone et confirmez le paiement..."
- Poll GET /api/payments/{orderId}/status toutes les 3 secondes
- Si status=paid : écran succès vert + bouton "Voir ma commande"
- Si status=failed : message erreur + bouton "Réessayer"

CartItem.jsx :
- Photo médicament
- Nom + nom de la pharmacie
- Prix unitaire × quantité = sous-total
- Boutons + et - pour la quantité
- Bouton ×️ pour supprimer du panier

OrderStatusBadge.jsx :
- Reçoit un prop "status"
- pending → badge gris "En attente"
- confirmed → badge bleu "Confirmée"
- preparing → badge orange "En préparation"
- ready → badge jaune "Prête"
- shipped → badge violet "Expédiée"
- delivered → badge vert "Livrée"
- cancelled → badge rouge "Annulée"

cartSlice.js (Redux Toolkit) :
- State : { items: [], pharmacyId: null }
- item : { medicamentId, medicamentName, photo, pharmacyId, pharmacyName, price, quantity }
- Actions : addItem(item), removeItem(medicamentId), updateQuantity(medicamentId, qty), clearCart
- Selector : selectCartTotal, selectCartCount

orderService.js :
- createOrder(data) → POST /api/orders → retourne order
- getMyOrders() → GET /api/orders → retourne liste
- getOrderById(id) → GET /api/orders/{id}
- cancelOrder(id) → PATCH /api/orders/{id}/cancel

paymentService.js :
- initiatePayment(orderId, method, phoneNumber) → POST /api/payments/{orderId}/initiate
- getPaymentStatus(orderId) → GET /api/payments/{orderId}/status

Génère le code complet pour [fichier spécifique].
```

---

## 👩‍💻 PROMPT SONIA — Layout + Composants UI + Suivi

```
[Colle le CONTEXTE COMMUN ci-dessus]

JE SUIS SONIA. Je travaille sur le layout global, les composants réutilisables
et les pages de suivi de PharmApp.

MES FICHIERS À CRÉER :
PRIORITÉ 1 (Jour 1 — tout le monde en a besoin) :
- src/App.jsx
- src/components/layout/Navbar.jsx
- src/components/layout/PrivateRoute.jsx
- src/components/ui/Button.jsx
- src/components/ui/Input.jsx
- src/components/ui/Card.jsx
- src/components/ui/Toast.jsx

PRIORITÉ 2 (Jour 2-4) :
- src/pages/tracking/OrderHistoryPage.jsx
- src/pages/tracking/OrderStatusPage.jsx
- src/pages/tracking/NotificationsPage.jsx
- src/services/notificationService.js

AUJOURD'HUI JE DOIS IMPLÉMENTER : [décris ce que tu veux]

DÉTAILS :

App.jsx (PRIORITÉ ABSOLUE - Jour 1) :
- Configure React Router v6 avec toutes ces routes :
  / → HomePage (Linus)
  /search → SearchResultsPage (Linus)
  /medicaments/:id → MedicamentDetailPage (Linus)
  /login → LoginPage (Leslie) [route publique]
  /register → RegisterPage (Leslie) [route publique]
  /profile → ProfilePage (Leslie) [route privée]
  /cart → CartPage (Ange) [route privée]
  /checkout → CheckoutPage (Ange) [route privée]
  /payment/:orderId → PaymentPage (Ange) [route privée]
  /orders → OrderHistoryPage [route privée]
  /orders/:id → OrderStatusPage [route privée]
  /notifications → NotificationsPage [route privée]
- Routes privées (PrivateRoute) → redirige vers /login si pas connecté

Navbar.jsx :
- Logo PharmApp à gauche (couleur #2C5F8D)
- Barre de recherche au centre (desktop) ou icône loupe (mobile)
- À droite : icône panier + nombre d'items, icône cloche + nombre notifs non lues
- Menu utilisateur (avatar ou icône user) → dropdown : Profil, Mes commandes, Déconnexion
- Version mobile : hamburger menu ou bottom navigation bar

Button.jsx (composant réutilisable) :
Props : variant ('primary'|'success'|'danger'|'outline'), size ('sm'|'md'|'lg'),
        loading (bool), disabled (bool), onClick, children
- loading=true → affiche spinner + texte "Chargement..."
- Respecte la charte graphique

Input.jsx (composant réutilisable) :
Props : label, type, placeholder, value, onChange, error (string), valid (bool), icon
- Affiche le label au-dessus
- Affiche le message d'erreur en rouge si error est défini
- Bordure verte si valid=true

Toast.jsx (système de notifications visuelles) :
- Affiché en bas à droite de l'écran
- Types : success (vert), error (rouge), warning (orange), info (bleu)
- Disparaît automatiquement après 4 secondes
- Peut afficher plusieurs toasts simultanément

OrderHistoryPage.jsx :
- Appel GET /api/orders au montage
- Liste des commandes : date, pharmacie, total, OrderStatusBadge, bouton "Voir détails"
- Filtre par statut (tous, en cours, livrées, annulées)

OrderStatusPage.jsx :
- Timeline verticale : étapes de la commande (pending → shipped → delivered)
- Étape active mise en évidence
- Info livraison : tracking_url si disponible
- Liste des items commandés
- Total payé
- Bouton "Laisser un avis" si status=delivered

NotificationsPage.jsx :
- Liste des notifications avec l'heure
- Non lue : fond légèrement bleuté, point bleu à droite
- Lue : fond blanc normal
- Bouton "Tout marquer comme lu"
- Types : commande_confirmée, paiement_reçu, commande_expédiée, commande_livrée

Génère le code complet pour [fichier spécifique].
Commence TOUJOURS par App.jsx et les composants UI car tout le monde en a besoin.
```

---

## 📋 RÈGLES POUR TOUS

1. **Sonia livre App.jsx et les composants UI le Jour 1** — sinon personne ne peut avancer
2. **Chacun travaille sur sa branche** : `feature/frontend-auth`, `feature/frontend-search`, etc.
3. **Jamais de merge sans PR** → Jack review tout
4. **Tester sur mobile** (Chrome DevTools → responsive) avant chaque push
5. **Si l'API n'est pas encore prête** → utiliser des données mock :
   ```js
   // mock temporaire — à remplacer par le vrai appel API
   const medicaments = [
     { id: 1, name: "Paracétamol 500mg", price: 500 }
   ]
   ```
6. **Coordonnez-vous sur Discord** — si Linus a besoin du CartSlice de Ange, il lui demande

---

## 🔗 COMMENT UTILISER CES PROMPTS

**Sur Gemini AI Studio :**
1. Va sur https://aistudio.google.com
2. Clique "New prompt"
3. Colle le contexte commun + ton prompt spécifique
4. Dans "Model" : choisis Gemini 1.5 Pro
5. Décris ce que tu veux générer dans la partie [décris ce que tu veux]

**Sur Claude (claude.ai) :**
1. Nouvelle conversation
2. Colle le contexte commun + ton prompt
3. Demande le fichier spécifique

**Conseil :** garde une conversation ouverte par fonctionnalité.
Ne mélange pas Login et SearchPage dans la même conversation.
