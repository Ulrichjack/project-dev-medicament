# 🛒 ROADMAP ANGE — Tunnel de Commande & Paiement

> **Tu travailles sur la partie qui génère les revenus.**
> Une erreur ici = client qui ne peut pas payer. Sois rigoureux sur les états.
> **Commence par cartSlice.js — Linus en a besoin rapidement.**

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
/* Couleurs paiement mobile */
/* MTN Mobile Money : #FFCC00 */
/* Orange Money     : #FF6600 */
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
│   │   ├── medicament/      ← (Linus)
│   │   └── order/           ← CartItem, OrderStatusBadge (Ange) ← TOI
│   ├── pages/
│   │   ├── auth/            ← (Leslie)
│   │   ├── search/          ← (Linus)
│   │   ├── order/           ← Cart, Checkout, Payment (Ange) ← TOI
│   │   └── tracking/        ← (Sonia)
│   ├── services/
│   │   ├── api.js           ← Config Axios (Sonia crée)
│   │   ├── orderService.js  ← (Ange) ← TOI
│   │   └── paymentService.js ← (Ange) ← TOI
│   └── store/
│       ├── index.js         ← Redux store (Sonia crée)
│       ├── authSlice.js     ← (Leslie)
│       └── cartSlice.js     ← (Ange) ← TOI
└── public/
    └── logo.png
```

---

## 🔗 API BACKEND (Laravel - Jack) — Endpoints que tu utilises

```
URL de base : http://localhost:8000/api (via api.js de Sonia)

POST /orders → body: { pharmacy_id, items:[{medicament_id, quantity, unit_price}],
               delivery_address, delivery_latitude, delivery_longitude, notes }
               → retourne { success, data: { id, status, total_amount, ... } }
GET  /orders → retourne liste mes commandes
GET  /orders/{id} → détails commande
PATCH /orders/{id}/cancel → annuler

POST /payments/{orderId}/initiate → body: { method, phone_number }
                                  → { success, data: { transaction_id } }
GET  /payments/{orderId}/status → { success, data: { status: 'pending'|'paid'|'failed' } }
```

Format réponse standard Jack :
```json
{ "success": true, "message": "...", "data": { ... } }
{ "success": false, "message": "...", "errors": { ... } }
```

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

## 🌿 GIT WORKFLOW

### Ta branche

```bash
git checkout develop && git pull origin develop
git checkout -b feature/frontend-orders
```

### Tes commits

```
feat(cart): ajout cartSlice Redux - NOTIFIER LINUS SUR DISCORD
feat(order): ajout OrderStatusBadge composant
feat(order): ajout CartItem composant
feat(order): ajout orderService et paymentService
feat(order): ajout CartPage
feat(order): ajout CheckoutPage avec géolocalisation
feat(order): ajout PaymentPage flux Mobile Money
```

### Règles Git absolues

```bash
# Chaque matin avant de coder
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature

# En travaillant — committer toutes les heures minimum
git add .
git commit -m "feat(cart): ajout cartSlice Redux"
git push -u origin feature/ma-feature
```

Quand la tâche est finie :
1. Ouvrir une **Pull Request** vers `develop` sur GitHub
2. Décrire ce que tu as fait dans la description
3. **Interdiction de merger ta propre PR** — c'est Jack qui merge

### Règle anti-conflit

**Chaque dev touche UNIQUEMENT ses fichiers.**
Si tu as besoin d'un composant pas encore créé → utilise une balise HTML standard.

### 🔔 Communication Discord — IMPORTANT

**Quand cartSlice.js est prêt, préviens Linus sur Discord :**
> "cartSlice.js pushé ✅ — Linus peut utiliser addItem"

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
{
  items: [],           // items du panier
  pharmacyId: null,    // ID de la pharmacie sélectionnée
  pharmacyName: ""     // nom pour affichage
}

Structure d'un item :
{
  medicamentId: number,
  medicamentName: string,
  photo_url: string | null,
  pharmacyId: number,
  pharmacyName: string,
  price: number,          // prix unitaire en FCFA
  quantity: number        // commence à 1
}

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

## 📊 Issues GitHub — Tes tickets

```
#36 feat(frontend): cartSlice + OrderStatusBadge + CartItem (URGENT)
#37 feat(frontend): orderService + paymentService
#38 feat(frontend): CartPage + CheckoutPage + PaymentPage
```
