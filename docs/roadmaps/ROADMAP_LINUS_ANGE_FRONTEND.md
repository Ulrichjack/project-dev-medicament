# 🗺️ ROADMAP FRONTEND — LINUS (Pages Recherche & Médicaments)

> **Tu travailles sur le cœur de l'app — la recherche de médicaments.**
> C'est la fonctionnalité principale. Fais-la bien.
> Attends que Sonia pousse Card.jsx et api.js avant de commencer.

---

## 📌 TES RESPONSABILITÉS

| Fichier | Description |
|---------|-------------|
| `src/pages/search/HomePage.jsx` | Page d'accueil |
| `src/pages/search/SearchResultsPage.jsx` | Résultats de recherche |
| `src/pages/search/MedicamentDetailPage.jsx` | Détail médicament + pharmacies |
| `src/components/medicament/MedicamentCard.jsx` | Card médicament |
| `src/components/medicament/PharmacyCard.jsx` | Card pharmacie avec stock |
| `src/services/medicamentService.js` | Appels API médicaments |

---

## 🌿 TA BRANCHE GIT

```bash
git checkout develop
git pull origin develop
git checkout -b feature/frontend-search

git add .
git commit -m "feat(search): description"
git push -u origin feature/frontend-search
```

### Tes commits

```
feat(search): ajout medicamentService avec search et getById
feat(search): ajout composant MedicamentCard
feat(search): ajout composant PharmacyCard avec distance et stock
feat(search): ajout HomePage avec barre de recherche et catégories
feat(search): ajout SearchResultsPage avec liste et filtres
feat(search): ajout MedicamentDetailPage avec pharmacies
```

---

## 📋 BACKLOG DÉTAILLÉ

---

### JOUR 1-2 — Services et Composants

#### Tâche LI-1 : medicamentService.js

**Fichier :** `src/services/medicamentService.js`

Méthodes :

`search(query, filters = {})`
- GET `/medicaments/search?q={query}&category_id={id}`
- Retourne la liste paginée des médicaments

`getAll(page = 1, filters = {})`
- GET `/medicaments?page={page}&category_id={id}`
- Retourne la liste paginée

`getById(id)`
- GET `/medicaments/{id}`
- Retourne le médicament avec ses détails

`getPharmacies(id, latitude, longitude)`
- GET `/medicaments/{id}/pharmacies?latitude={lat}&longitude={lng}`
- Retourne les pharmacies avec stock, triées par distance

`getCategories()`
- GET `/categories`
- Retourne la liste des catégories

> Si l'API n'est pas encore prête → utilise ces données mock :
> ```js
> const MOCK_MEDICAMENTS = [
>   { id: 1, name: "Paracétamol 500mg", photo_url: null, price_min: 500, pharmacies_count: 3 },
>   { id: 2, name: "Amoxicilline 500mg", photo_url: null, price_min: 1200, pharmacies_count: 1 }
> ]
> ```

Commit : `feat(search): ajout medicamentService`

---

#### Tâche LI-2 : MedicamentCard.jsx

**Fichier :** `src/components/medicament/MedicamentCard.jsx`

Props :
- `medicament` : objet { id, name, photo_url, price_min, pharmacies_count, prescription_required }
- `onClick` : function (par défaut → navigue vers /medicaments/:id)

Structure de la card :
- Image du médicament (si photo_url) sinon icône `fa-pills` (#2C5F8D, 48px)
- Badge "Sur ordonnance" si prescription_required = true (badge orange)
- Nom du médicament (Montserrat bold, max 2 lignes)
- "À partir de X FCFA" (vert #27AE60)
- "Disponible dans X pharmacie(s)" (gris, petit)
- Hover : élévation de la card

Commit : `feat(search): ajout composant MedicamentCard`

---

#### Tâche LI-3 : PharmacyCard.jsx

**Fichier :** `src/components/medicament/PharmacyCard.jsx`

Props :
- `pharmacy` : { id, name, address, distance_km, price, quantity, is_open, rating }
- `onOrder` : function (appelée quand on clique "Commander ici")

Structure :
- Nom de la pharmacie (bold)
- Badge "Ouvert" (vert) ou "Fermé" (rouge) selon is_open
- Adresse (fa-location-dot, gris, petit)
- Distance (fa-route, bleu) : "X km" ou "< 1 km"
- Prix : "X FCFA" (vert, bold)
- Stock : "X unité(s) disponible(s)" (gris)
- Bouton "Commander ici" (variant primary, sm)

Commit : `feat(search): ajout composant PharmacyCard`

---

### JOUR 2-3 — Pages

#### Tâche LI-4 : HomePage.jsx

**Fichier :** `src/pages/search/HomePage.jsx`

Structure de la page :

**Section Hero (haut de page) :**
- Fond bleu dégradé (#2C5F8D → #1E4870)
- Titre "Trouvez vos médicaments rapidement" (blanc, Montserrat)
- Sous-titre "Commandez depuis les meilleures pharmacies proches de vous"
- Barre de recherche grande (fond blanc, arrondie, fa-magnifying-glass)
- Quand l'utilisateur tape + appuie Entrée → navigate('/search?q=terme')
- Bouton de localisation (fa-location-dot) → navigator.geolocation → stocke lat/lng

**Section Catégories :**
- Titre "Parcourir par catégorie"
- Liste horizontale scrollable de boutons catégories
- Clic sur catégorie → navigate('/search?category_id=X')
- Si catégories pas encore en API → utilise : Antibiotiques, Antidouleurs, Vitamines, Antiparasitaires, Cardio

**Section Médicaments populaires :**
- Titre "Médicaments fréquents"
- Grille 2 colonnes mobile, 3 colonnes desktop
- 6 MedicamentCard
- Bouton "Voir tout"

Commit : `feat(search): ajout HomePage avec recherche et catégories`

---

#### Tâche LI-5 : SearchResultsPage.jsx

**Fichier :** `src/pages/search/SearchResultsPage.jsx`

Fonctionnement :
- Lit `?q=` et `?category_id=` depuis l'URL avec `useSearchParams()`
- Au montage ET quand les params changent → appel medicamentService.search()
- Affiche "Résultats pour 'terme'" en titre

États à gérer :
- loading → spinner centré
- error → message d'erreur + bouton retry
- résultats vides → "Aucun médicament trouvé pour 'terme'" + suggestions

Filtres (en haut de la liste) :
- Dropdown catégorie
- Checkbox "Sans ordonnance uniquement"

Liste des résultats :
- Grille de MedicamentCard
- Pagination si plus de 20 résultats (boutons Précédent / Suivant)

Commit : `feat(search): ajout SearchResultsPage avec filtres et pagination`

---

#### Tâche LI-6 : MedicamentDetailPage.jsx

**Fichier :** `src/pages/search/MedicamentDetailPage.jsx`

Fonctionnement :
- Lit `:id` depuis l'URL avec `useParams()`
- Appel medicamentService.getById(id)
- Appel navigator.geolocation → récupère position du client
- Appel medicamentService.getPharmacies(id, lat, lng)

Structure de la page :

**Section Info médicament :**
- Photo (grande) ou icône fa-pills
- Badge "Sur ordonnance" si prescription_required
- Nom (H1, Montserrat bold)
- Substance active : "Principe actif : ..."
- Dosage : "Dosage : ..."
- Fabricant : "Fabriqué par : ..."
- Description

**Section Pharmacies (haut de page ou onglet) :**
- Titre "Disponible dans ces pharmacies"
- Loading → spinner
- Liste de PharmacyCard triées par distance
- Clic "Commander ici" → addItem dans Redux cartSlice + navigate('/cart')

**Bouton fixe en bas de page (mobile) :**
- "Ajouter au panier" → sélectionne la pharmacie la moins chère

Commit : `feat(search): ajout MedicamentDetailPage avec liste pharmacies`

---

## 📊 ISSUES GITHUB À CRÉER (toi)

```
#30 feat(frontend): medicamentService + MedicamentCard + PharmacyCard
#31 feat(frontend): HomePage avec recherche et catégories
#32 feat(frontend): SearchResultsPage + MedicamentDetailPage
```

---

## ⚠️ DÉPENDANCES

Tu as besoin de :
- `Card.jsx` (Sonia) ← pour MedicamentCard et PharmacyCard
- `api.js` (Sonia) ← pour les appels API
- `cartSlice.js` (Ange) ← pour "Ajouter au panier"

Coordonne avec Ange pour cartSlice — tu en as besoin dans MedicamentDetailPage.

---
---
---

# 🗺️ ROADMAP FRONTEND — ANGE (Pages Commande & Paiement)

> **Tu travailles sur le flux de commande — l'étape qui génère les revenus.**
> C'est critique : une erreur ici = client qui ne peut pas payer.
> Sois rigoureux sur la gestion des états et des erreurs.

---

## 📌 TES RESPONSABILITÉS

| Fichier | Description |
|---------|-------------|
| `src/pages/order/CartPage.jsx` | Page panier |
| `src/pages/order/CheckoutPage.jsx` | Confirmation + adresse |
| `src/pages/order/PaymentPage.jsx` | Paiement Mobile Money |
| `src/components/order/CartItem.jsx` | Item dans le panier |
| `src/components/order/OrderStatusBadge.jsx` | Badge statut commande |
| `src/services/orderService.js` | Appels API commandes |
| `src/services/paymentService.js` | Appels API paiement |
| `src/store/cartSlice.js` | État global du panier |

---

## 🌿 TA BRANCHE GIT

```bash
git checkout develop
git pull origin develop
git checkout -b feature/frontend-orders

git add .
git commit -m "feat(orders): description"
git push -u origin feature/frontend-orders
```

### Tes commits

```
feat(orders): ajout cartSlice Redux avec addItem, removeItem, updateQuantity
feat(orders): ajout composant CartItem
feat(orders): ajout composant OrderStatusBadge
feat(orders): ajout orderService et paymentService
feat(orders): ajout page CartPage
feat(orders): ajout page CheckoutPage avec géolocalisation
feat(orders): ajout page PaymentPage avec Mobile Money
```

---

## 📋 BACKLOG DÉTAILLÉ

---

### JOUR 1 — Store et Composants (PRIORITÉ — Linus en a besoin)

#### Tâche A-1 : cartSlice.js

**Fichier :** `src/store/cartSlice.js`

> ⚠️ URGENT — Linus a besoin de cartSlice pour le bouton "Ajouter au panier".
> Crée ce fichier EN PREMIER et préviens Linus sur Discord quand c'est pushé.

State initial :
```js
{
  items: [],           // liste des items
  pharmacyId: null,    // ID de la pharmacie choisie
  pharmacyName: ""     // nom de la pharmacie
}
```

Structure d'un item :
```js
{
  medicamentId: 1,
  medicamentName: "Paracétamol 500mg",
  photo_url: null,
  pharmacyId: 2,
  pharmacyName: "Pharmacie de la Paix",
  price: 500,          // prix unitaire
  quantity: 1
}
```

Actions :
- `addItem(item)` → si le médicament existe déjà → incrémenter quantity
- `removeItem(medicamentId)` → supprimer l'item
- `updateQuantity({ medicamentId, quantity })` → si quantity = 0 → supprimer
- `clearCart()` → vider complètement le panier
- `setPharmacy({ pharmacyId, pharmacyName })` → changer de pharmacie (vide le panier si différente)

Selectors :
- `selectCartItems` → liste des items
- `selectCartTotal` → somme(price × quantity)
- `selectCartCount` → nombre total d'articles
- `selectCartPharmacy` → { pharmacyId, pharmacyName }

Commit : `feat(orders): ajout cartSlice Redux - NOTIFIER LINUS`

---

#### Tâche A-2 : OrderStatusBadge.jsx

**Fichier :** `src/components/order/OrderStatusBadge.jsx`

Props : `status` (string)

Rendu par statut :
- `pending` → badge gris "En attente"
- `confirmed` → badge bleu "Confirmée"
- `preparing` → badge orange "En préparation"
- `ready` → badge jaune "Prête"
- `shipped` → badge violet "Expédiée"
- `delivered` → badge vert "Livrée"
- `cancelled` → badge rouge "Annulée"

Commit : `feat(orders): ajout composant OrderStatusBadge`

---

#### Tâche A-3 : CartItem.jsx

**Fichier :** `src/components/order/CartItem.jsx`

Props :
- `item` : { medicamentId, medicamentName, photo_url, price, quantity }
- `onQuantityChange` : function(medicamentId, newQuantity)
- `onRemove` : function(medicamentId)

Structure :
- Image médicament (ou icône fa-pills)
- Nom du médicament
- Prix unitaire (gris)
- Contrôle quantité : bouton − | nombre | bouton +
  - bouton − désactivé si quantity = 1
- Sous-total : price × quantity (vert, bold)
- Bouton supprimer (fa-trash, rouge, petit)

Commit : `feat(orders): ajout composant CartItem`

---

### JOUR 2 — Services

#### Tâche A-4 : orderService.js

**Fichier :** `src/services/orderService.js`

Méthodes :

`createOrder(data)`
- POST `/orders`
- Body : `{ pharmacy_id, items: [{medicament_id, quantity, unit_price}], delivery_address, delivery_latitude, delivery_longitude, notes }`
- Retourne la commande créée avec son ID

`getMyOrders()`
- GET `/orders`
- Retourne la liste de mes commandes

`getOrderById(id)`
- GET `/orders/{id}`
- Retourne les détails avec items + paiement + livraison

`cancelOrder(id)`
- PATCH `/orders/{id}/cancel`
- Retourne la commande annulée

Commit : `feat(orders): ajout orderService`

---

#### Tâche A-5 : paymentService.js

**Fichier :** `src/services/paymentService.js`

Méthodes :

`initiatePayment(orderId, method, phoneNumber)`
- POST `/payments/{orderId}/initiate`
- Body : `{ method: 'mtn_mobile_money', phone_number: '677XXXXXX' }`
- Retourne `{ success: true, transaction_id, message }`

`getPaymentStatus(orderId)`
- GET `/payments/{orderId}/status`
- Retourne `{ status: 'pending' | 'paid' | 'failed' }`

Commit : `feat(orders): ajout paymentService`

---

### JOUR 3 — Pages

#### Tâche A-6 : CartPage.jsx

**Fichier :** `src/pages/order/CartPage.jsx`

Données depuis Redux (cartSlice) :
- Liste des items
- Total
- Nom de la pharmacie

Si panier vide :
- Icône fa-cart-shopping (grande, grise)
- "Votre panier est vide"
- Bouton "Rechercher un médicament" → navigate('/')

Si panier non vide :
- En-tête : "Mon panier - Pharmacie : {pharmacyName}"
- Liste de CartItem
- Récapitulatif :
  - Sous-total : X FCFA
  - Frais de livraison : 500 FCFA (fixe pour MVP)
  - **Total : X FCFA** (bold, grand)
- Bouton "Commander" → navigate('/checkout')

Commit : `feat(orders): ajout CartPage`

---

#### Tâche A-7 : CheckoutPage.jsx

**Fichier :** `src/pages/order/CheckoutPage.jsx`

Structure :
- Récapitulatif commande (items + total, non modifiable)
- Formulaire livraison :
  - Textarea "Adresse complète" (required)
  - Bouton "Utiliser ma position GPS" (fa-location-dot)
    → navigator.geolocation.getCurrentPosition()
    → stocke lat/lng dans state local
    → affiche "Position détectée ✓" en vert
  - Textarea "Notes optionnelles" (placeholder: horaires, étage...)
- Bouton "Confirmer et payer" (primary, lg, full width)

Logique bouton "Confirmer et payer" :
1. Valider que adresse est remplie
2. Construire le body de la commande depuis Redux cartSlice
3. Appel orderService.createOrder(data)
4. Si succès → dispatch clearCart() → navigate('/payment/{orderId}')
5. Si erreur stock → afficher "Médicament X plus disponible en quantité suffisante"

Commit : `feat(orders): ajout CheckoutPage avec géolocalisation`

---

#### Tâche A-8 : PaymentPage.jsx

**Fichier :** `src/pages/order/PaymentPage.jsx`

Fonctionnement :
- Lit `:orderId` depuis l'URL
- Affiche le montant total à payer

Étape 1 — Choix de la méthode :
- Bouton MTN Mobile Money (jaune, logo MTN ou fa-mobile)
- Bouton Orange Money (orange, logo Orange ou fa-mobile)
- Quand un choix est fait → passe à l'étape 2

Étape 2 — Saisie du numéro :
- Input "Numéro de téléphone" (type: tel, placeholder: "6XXXXXXXX")
- Rappel du montant
- Bouton "Payer {montant} FCFA"

Étape 3 — En attente de confirmation :
- Spinner animé
- "Vérifiez votre téléphone et confirmez le paiement..."
- Appel paymentService.initiatePayment()
- Poll paymentService.getPaymentStatus() toutes les 3 secondes (max 60 secondes)

Étape 4a — Succès :
- Icône fa-circle-check (vert, grand)
- "Paiement confirmé ! 🎉"
- "Votre commande a été transmise à la pharmacie"
- Bouton "Voir ma commande" → navigate('/orders/{orderId}')

Étape 4b — Échec :
- Icône fa-circle-xmark (rouge, grand)
- "Paiement échoué"
- "Vérifiez votre solde ou réessayez"
- Bouton "Réessayer"

Commit : `feat(orders): ajout PaymentPage avec flux MTN/Orange Money`

---

## 📊 ISSUES GITHUB À CRÉER (toi)

```
#33 feat(frontend): cartSlice + OrderStatusBadge + CartItem (URGENT)
#34 feat(frontend): orderService + paymentService
#35 feat(frontend): CartPage + CheckoutPage + PaymentPage
```

---

## ⚠️ DÉPENDANCES

Tu as besoin de :
- `Button.jsx` (Sonia)
- `Input.jsx` (Sonia)
- `api.js` (Sonia)
- `authSlice.js` (Leslie) ← pour vérifier si l'utilisateur est connecté

Linus a besoin de toi :
- `cartSlice.js` ← pousse-le dès que possible, Linus en a besoin pour le bouton "Ajouter au panier"
- Préviens Linus sur Discord quand cartSlice est pushé sur develop
