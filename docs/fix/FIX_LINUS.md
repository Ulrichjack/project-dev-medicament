# 🔧 CORRECTIONS URGENTES — LINUS

> Lis ce document en entier, puis envoie-le à ton IA.
> Il y a 1 bug critique et 1 adaptation à faire.

---

## LES PROBLÈMES QUE TU DOIS CORRIGER

### 🔴 BUG 1 — CRITIQUE : medicamentService utilise encore les fausses données (mock)
**Fichier :** `src/services/medicamentService.js`

**Problème :**
La ligne d'import de `api` est commentée :
```js
// import api from './api'; // Commenté car on utilise des fausses données pour l'instant
```
Et tout le service utilise un tableau `MOCK_MEDICAMENTS` inventé.

Résultat : **la recherche ne cherche jamais dans la vraie base de données.**

---

### 🟠 ADAPTATION : Les champs du backend sont en anglais
**Important à savoir :**
Jack a corrigé ses API Resources pour retourner les champs en anglais.
Les noms de champs que tu recevras de l'API sont :

```
name           (pas "nom")
price_min      (pas "prix_moyen")
prescription_required  (pas "ordonnance")
photo_url      (pas "image")
active_substance
description
dosage
manufacturer
pharmacies_count
```

Tes composants `MedicamentCard.jsx` et `MedicamentDetailPage.jsx` doivent utiliser ces noms anglais.

---

## PROMPT À ENVOYER À TON IA

```
Tu es un expert React.js 18 avec Vite.
Je travaille sur MEDCAM, une app de commande de médicaments au Cameroun.

RÈGLES OBLIGATOIRES :
- React.js 18 + Vite UNIQUEMENT — JAMAIS Next.js
- Composants fonctionnels avec Hooks uniquement

API BACKEND (déjà codée par Jack, disponible sur http://localhost:8000/api) :
GET /api/medicaments → { success: true, data: { data: [...], current_page, total, last_page } }
GET /api/medicaments/search?q=terme → même format
GET /api/medicaments/{id} → { success: true, data: { id, name, active_substance, description, dosage, prescription_required, photo_url, manufacturer, category: { id, name } } }
GET /api/medicaments/{id}/pharmacies?latitude=X&longitude=Y → { success: true, data: [{ pharmacy: { id, name, address, phone, is_open, latitude, longitude }, price, quantity, distance_km, is_available }] }
GET /api/categories → { success: true, data: [{ id, name }] }

CHAMPS IMPORTANTS — le backend retourne des noms EN ANGLAIS :
- name (pas "nom")
- price_min (pas "prix_moyen")
- prescription_required (pas "ordonnance")
- photo_url (pas "image")

Je dois corriger 1 fichier principal :

━━━ FICHIER : src/services/medicamentService.js ━━━

Voici mon medicamentService.js ACTUEL : [colle ton fichier ici]

CORRECTIONS À FAIRE :
1. Décommenter ou ajouter l'import : import api from './api'
2. Supprimer tout le tableau MOCK_MEDICAMENTS
3. Remplacer toutes les méthodes pour qu'elles appellent l'API réelle :

   getAll(page=1, filters={}) :
   → api.get('/medicaments', { params: { page, ...filters } })
   → retourner response.data.data (objet avec data:[], total, etc.)

   search(query, filters={}) :
   → api.get('/medicaments/search', { params: { q: query, ...filters } })
   → retourner response.data.data

   getById(id) :
   → api.get('/medicaments/' + id)
   → retourner response.data.data

   getPharmacies(medicamentId, latitude, longitude) :
   → api.get('/medicaments/' + medicamentId + '/pharmacies', { params: { latitude, longitude } })
   → retourner response.data.data

   getCategories() :
   → api.get('/categories')
   → retourner response.data.data

4. Chaque méthode doit avoir un try/catch et throw l'erreur pour que le composant puisse l'afficher

Génère le code complet du fichier corrigé.
Utilise React.js 18 + Vite. JAMAIS Next.js.
```

---

## VÉRIFIER AUSSI TES COMPOSANTS

Après avoir corrigé medicamentService.js, vérifie que tes composants utilisent les bons noms de champs :

**Dans `MedicamentCard.jsx` :**
```jsx
// ✅ CORRECT
<p>{medicament.name}</p>
<p>{medicament.price_min} FCFA</p>
{medicament.prescription_required && <span>Sur ordonnance</span>}
<img src={medicament.photo_url} />

// ❌ INCORRECT (anciens noms)
medicament.nom
medicament.prix_moyen
medicament.ordonnance
medicament.image
```

**Dans `MedicamentDetailPage.jsx` et `PharmacyCard.jsx` :**
Même chose — utilise `name`, `price`, `is_open`, `distance_km`.

Si tu vois des noms français dans tes composants, dis-le à ton IA et elle corrigera.

---

## COMMITS APRÈS CORRECTION

```bash
git checkout develop
git pull origin develop
git checkout -b fix/linus-medicament-api-reelle

git add src/services/medicamentService.js
git commit -m "fix(search): remplacement mock data par vrais appels API backend"

# Si tu as aussi corrigé les composants :
git add src/components/medicament/
git commit -m "fix(search): correction noms champs anglais dans MedicamentCard et PharmacyCard"

git push -u origin fix/linus-medicament-api-reelle
# → Ouvrir PR vers develop
```

---

## ✅ TEST APRÈS CORRECTION

1. Assure-toi que le backend de Jack tourne : `cd backend/MEDCAM && php artisan serve`
2. Lance le frontend : `npm run dev`
3. Va sur `http://localhost:5173` → les médicaments doivent se charger depuis la vraie BDD
4. Tape quelque chose dans la recherche → les vrais résultats doivent apparaître
