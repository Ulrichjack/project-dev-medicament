# 🔧 CORRECTIONS URGENTES — SONIA

> Lis ce document en entier, puis envoie-le à ton IA.
> Il y a 3 bugs à corriger. Suis les étapes dans l'ordre.

---

## COMMENT UTILISER CE DOCUMENT

1. Ouvre VS Code dans le dossier `frontend/medcam`
2. Copie le prompt en bas de ce fichier
3. Colle-le dans ton IA (Gemini, Claude, ou ChatGPT)
4. Ton IA va te donner le code corrigé fichier par fichier
5. Tu remplaces le code dans VS Code
6. Tu commits et tu push

---

## LES 3 BUGS QUE TU DOIS CORRIGER

### 🔴 BUG 1 — CRITIQUE : Mauvaise clé localStorage dans api.js
**Fichier :** `src/services/api.js`

**Problème :**
Tu lis `localStorage.getItem('token')` mais Leslie sauvegarde le token sous la clé `'medcam_token'`.
Résultat : **toutes les requêtes sont envoyées sans token → 401 partout → personne ne peut se connecter.**

**Ce qu'il faut changer :**
- Ligne qui lit le token : `'token'` → `'medcam_token'`
- Lignes qui suppriment le token (intercepteur 401) : `'token'` et `'user'` → `'medcam_token'` et `'medcam_user'`

---

### 🔴 BUG 2 — CRITIQUE : toastSlice non enregistré dans le store
**Fichier :** `src/store/index.js`

**Problème :**
L'import de toastReducer et son enregistrement sont commentés.
Résultat : **si quelqu'un utilise `addToast`, l'app crash.**

**Ce qu'il faut changer :**
- Décommenter l'import de toastSlice
- Ajouter `toast: toastReducer` dans l'objet reducer

---

### 🟡 BUG 3 — NETTOYAGE : Fichier store.js en double
**Fichier :** `src/store/store.js`

**Problème :**
Ce fichier existe en double avec `index.js` mais il est incomplet (n'a pas le cartSlice).
**Ce qu'il faut faire :** Supprimer ce fichier.

```bash
rm src/store/store.js
```

---

## PROMPT À ENVOYER À TON IA

```
Tu es un expert React.js 18 avec Vite. Je travaille sur MEDCAM,
une app de commande de médicaments au Cameroun.

Je dois corriger 2 fichiers. Voici les corrections exactes à faire :

━━━ FICHIER 1 : src/services/api.js ━━━

Voici le code ACTUEL de ce fichier (montre-lui ton fichier actuel).

CORRECTIONS À FAIRE :
1. Dans l'intercepteur de requête (request interceptor) :
   Changer localStorage.getItem('token') → localStorage.getItem('medcam_token')

2. Dans l'intercepteur de réponse (response interceptor), sur le bloc 401 :
   Changer localStorage.removeItem('token') → localStorage.removeItem('medcam_token')
   Changer localStorage.removeItem('user') → localStorage.removeItem('medcam_user')

Le reste du fichier ne change pas.

━━━ FICHIER 2 : src/store/index.js ━━━

Voici le code ACTUEL (montre-lui ton fichier actuel).

CORRECTIONS À FAIRE :
1. Décommenter la ligne d'import de toastReducer
2. Dans l'objet reducer du configureStore, ajouter : toast: toastReducer
   (juste après les autres reducers déjà enregistrés)

Le reste du fichier ne change pas.

Génère le code complet corrigé pour chacun des 2 fichiers.
Utilise React.js 18 + Vite. JAMAIS de Next.js.
```

---

## COMMITS APRÈS CORRECTION

```bash
git checkout develop
git pull origin develop
git checkout -b fix/sonia-api-store-corrections

# Après avoir corrigé les fichiers :
git add src/services/api.js
git commit -m "fix(api): correction cle localStorage medcam_token pour intercepteur"

git add src/store/index.js
git commit -m "fix(store): enregistrement toastSlice dans Redux store"

git rm src/store/store.js
git commit -m "chore(store): suppression fichier store.js redondant"

git push -u origin fix/sonia-api-store-corrections
# → Ouvrir PR vers develop, assigner Jack comme reviewer
```

---

## ✅ VÉRIFICATION FINALE

Après tes corrections, dis à Leslie de tester la connexion.
Si elle peut se connecter sans erreur 401 → ton fix fonctionne. 🎉
