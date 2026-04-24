# 🔧 CORRECTIONS URGENTES — ANGE

> Lis ce document en entier, puis envoie-le à ton IA.
> Il y a 3 bugs à corriger. Suis les étapes dans l'ordre.

---

## LES 3 BUGS QUE TU DOIS CORRIGER

### 🔴 BUG 1 — CRITIQUE : Les routes de paiement n'existent pas dans le backend
**Fichiers :** `src/services/paymentService.js` et `src/pages/order/PaymentPage.jsx`

**Problème :**
Ton paymentService appelle :
- `POST /payments/{orderId}/initiate` → **cette route n'existe pas**
- `GET /payments/{orderId}/status` → **cette route n'existe pas**

La seule route de paiement qui existe chez Jack est :
- `POST /orders/{id}/pay` → simule le paiement en une seule fois et retourne la commande mise à jour

Résultat : **le paiement retourne 404, personne ne peut payer.**

**Ce qu'il faut faire :**
Réécrire `paymentService.js` pour utiliser `POST /orders/{id}/pay`.
Adapter `PaymentPage.jsx` : quand l'utilisateur clique "Payer", appeler cette route.
Pas besoin de polling (pas de `/status`) — la réponse arrive directement.

---

### 🟠 BUG 2 — IMPORTANT : Frais de livraison différents frontend/backend
**Fichiers :** `src/pages/order/CartPage.jsx` et `src/pages/order/CheckoutPage.jsx`

**Problème :**
- Ton frontend affiche **500 FCFA** de frais de livraison
- Le backend calcule **1000 FCFA**

Résultat : **l'utilisateur voit 500 FCFA sur le panier mais paie 1000 FCFA réellement. Surprise désagréable.**

**Ce qu'il faut faire :**
Changer `const DELIVERY_FEE = 500` en `const DELIVERY_FEE = 1000` dans les deux fichiers.

---

### 🟠 BUG 3 — IMPORTANT : La liste des commandes retourne un objet paginé, pas un tableau
**Fichier :** `src/services/orderService.js`

**Problème :**
Jack utilise `paginate(10)` → la réponse JSON est :
```json
{
  "success": true,
  "data": {
    "data": [...les commandes...],
    "links": {...},
    "meta": {...}
  }
}
```

Ton code fait `return res.data.data` → ça retourne l'objet `{ data: [...], links, meta }` **pas le tableau**.
Quand OrderHistoryPage fait `.map()` sur ça → erreur.

**Ce qu'il faut faire :**
Dans `getMyOrders()`, changer `return res.data.data` en `return res.data.data.data`

---

## PROMPT À ENVOYER À TON IA

```
Tu es un expert React.js 18 avec Vite.
Je travaille sur MEDCAM, une app de commande de médicaments au Cameroun.

RÈGLES OBLIGATOIRES :
- React.js 18 + Vite UNIQUEMENT — JAMAIS Next.js
- Composants fonctionnels avec Hooks uniquement
- Style : Tailwind CSS v3 uniquement

IDENTITÉ VISUELLE MEDCAM :
- Primary : #1E3A8A (bleu marine)
- Secondary : #38BDF8 (bleu ciel)
- Accent/Succès : #4ADE80 (vert)
- MTN Mobile Money : #FFCC00 (jaune)
- Orange Money : #FF6600 (orange)

API BACKEND disponible sur http://localhost:8000/api :
POST /api/orders/{id}/pay
  → body: { method: 'mtn_mobile_money' | 'orange_money', phone_number: '677XXXXXX' }
  → réponse succès: { success: true, data: { id, status: 'confirmed', total_amount, payment: { status: 'paid', transaction_id } } }
  → réponse échec: { success: false, message: 'Erreur de paiement' }

Je dois corriger 3 fichiers :

━━━ FICHIER 1 : src/services/paymentService.js ━━━

Voici mon paymentService.js ACTUEL : [colle ton fichier ici]

CORRECTIONS COMPLÈTES À FAIRE :
Réécrire entièrement les méthodes pour utiliser la route qui existe réellement.

Nouvelle méthode pay(orderId, method, phoneNumber) :
→ api.post('/orders/' + orderId + '/pay', { method, phone_number: phoneNumber })
→ retourner response.data.data (la commande mise à jour avec le paiement)
→ try/catch : si erreur → throw new Error(error.response?.data?.message || 'Paiement échoué')

Supprimer les méthodes initiatePayment() et getStatus() (elles appelaient des routes inexistantes).

━━━ FICHIER 2 : src/pages/order/PaymentPage.jsx ━━━

Voici mon PaymentPage.jsx ACTUEL : [colle ton fichier ici]

CORRECTIONS À FAIRE :
Le flux doit devenir plus simple (pas de polling puisque la réponse est directe) :

ÉTAPE 1 — Choix méthode (inchangé) :
Deux cartes : MTN Mobile Money (bg-[#FFCC00]) et Orange Money (bg-[#FF6600])

ÉTAPE 2 — Saisie numéro + bouton payer (inchangé)

ÉTAPE 3 — Traitement (SIMPLIFIÉ) :
Au clic "Payer" :
  1. setStep('loading'), setLoading(true)
  2. const result = await paymentService.pay(orderId, selectedMethod, phoneNumber)
  3. Si succès (result existe et result.payment.status === 'paid') → setStep('success')
  4. Si erreur → setStep('failed'), setErrorMessage(message)
  NE PAS faire de polling (setInterval) — la réponse est directe

ÉTAPE 4A — Succès (inchangé visuellement)
ÉTAPE 4B — Échec (inchangé visuellement)

━━━ FICHIER 3 : src/services/orderService.js ━━━

Voici mon orderService.js ACTUEL : [colle ton fichier ici]

CORRECTION DANS getMyOrders() :
Changer : return res.data.data
Par     : return res.data.data.data
(Le backend utilise la pagination Laravel : la liste est dans data.data.data)

━━━ FICHIER 4 : src/pages/order/CartPage.jsx ━━━
Trouver : const DELIVERY_FEE = 500
Changer : const DELIVERY_FEE = 1000

━━━ FICHIER 5 : src/pages/order/CheckoutPage.jsx ━━━
Trouver : const DELIVERY_FEE = 500
Changer : const DELIVERY_FEE = 1000

Génère le code complet corrigé pour chacun des fichiers.
```

---

## COMMITS APRÈS CORRECTION

```bash
git checkout develop
git pull origin develop
git checkout -b fix/ange-payment-corrections

git add src/services/paymentService.js
git commit -m "fix(payment): utilisation route POST /orders/{id}/pay existante"

git add src/pages/order/PaymentPage.jsx
git commit -m "fix(payment): suppression polling, flux paiement direct"

git add src/services/orderService.js
git commit -m "fix(orders): correction extraction tableau pagine data.data.data"

git add src/pages/order/CartPage.jsx src/pages/order/CheckoutPage.jsx
git commit -m "fix(cart): alignement frais livraison 1000 FCFA comme backend"

git push -u origin fix/ange-payment-corrections
# → Ouvrir PR vers develop
```

---

## ✅ TEST APRÈS CORRECTION

1. Backend Jack doit tourner : `php artisan serve`
2. Faire une commande complète : Recherche → Panier → Checkout → Paiement
3. Le paiement doit se terminer sur l'écran succès vert
4. La liste des commandes (`/orders`) doit afficher tes commandes sans erreur
