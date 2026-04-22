# 🔀 GUIDE GIT WORKFLOW — MEDCAM
## Processus Pull Request pour l'équipe Frontend & Backend (Jack)

---

## 👥 PROCESSUS POUR L'ÉQUIPE FRONTEND
> Sonia, Leslie, Linus, Ange — Vous n'êtes pas administrateurs, donc vous ne pouvez pas merger vous-mêmes. C'est voulu et c'est parfait.

---

### ÉTAPE 1 — Créer ta branche de travail

```bash
git checkout develop
git pull origin develop          # Toujours partir d'un develop à jour
git checkout -b feature/ma-feature
```

**Exemples de noms de branches :**
```
feature/frontend-ui-components   ← Sonia
feature/frontend-auth            ← Leslie
feature/frontend-search          ← Linus
feature/frontend-orders          ← Ange
```

---

### ÉTAPE 2 — Coder, committer, pousser

```bash
# Committer régulièrement (toutes les heures minimum)
git add .
git commit -m "feat(auth): ajout LoginPage avec formulaire"

# Pousser ta branche sur GitHub
git push origin feature/ma-feature

# Si c'est la première fois que tu pousses cette branche :
git push -u origin feature/ma-feature
```

---

### ÉTAPE 3 — Ouvrir une Pull Request sur GitHub

1. Va sur **github.com** → dépôt `project-dev-medicament`
2. GitHub affiche une bannière jaune : **"Compare & pull request"** → clique dessus
3. Vérifie que la PR est bien configurée :
   - **base :** `develop` ← (branche de destination)
   - **compare :** `feature/ta-feature` ← (ta branche)
4. Remplis la description :
   ```
   ## Ce que j'ai fait
   - Ajout de LoginPage avec formulaire email/password
   - Ajout du eye toggle pour afficher/masquer le mot de passe
   - Gestion des états loading / error

   ## Fichiers modifiés
   - src/pages/auth/LoginPage.jsx
   - src/services/authService.js
   ```
5. Clique sur **"Create pull request"**

---

### ÉTAPE 4 — Attendre la review de Jack

GitHub affiche automatiquement :

```
❌ Merging is blocked
   Review required — 1 approving review required before merging
   [Merge pull request] ← bouton grisé, tu ne peux PAS cliquer
```

> ✅ C'est normal ! Tu n'as pas le droit de merger ta propre PR.

**Envoie un message sur Discord à Jack :**
```
"Jack, ma PR feature/frontend-auth est prête pour review ! 🙏"
```

---

### ÉTAPE 5 — Après le merge de Jack

Une fois que Jack a mergé ta PR dans `develop` :

```bash
# Revenir sur develop et récupérer le code mergé
git checkout develop
git pull origin develop

# Créer ta prochaine branche depuis le develop à jour
git checkout -b feature/ma-prochaine-feature
```

> ⚠️ **Ne jamais continuer à coder sur une branche déjà mergée.**

---

### ⛔ RÈGLES À NE JAMAIS VIOLER

| Interdit | Pourquoi |
|----------|----------|
| Merger ta propre PR | Risque de casser develop sans review |
| Pousser directement sur `develop` | Tu n'as pas les droits, GitHub le bloquera |
| Pousser directement sur `main` | Idem, accès refusé |
| Travailler sur la branche d'un autre | Conflits garantis |
| Créer une branche depuis `main` | Toujours partir de `develop` |

---
---

## 👑 PROCESSUS POUR TOI — JACK (Backend)
> Tu es administrateur et dans la **Bypass List**. Tu as deux options.

---

### CHOIX A — Méthode Directe ⚡ (La plus rapide)

Puisque tu es dans la Bypass List, tu peux travailler **directement sur `develop`** sans PR :

```bash
git checkout develop
git pull origin develop          # Toujours récupérer les derniers changements avant

# Tu codes le backend...

git add .
git commit -m "feat(backend): ajout authentification JWT"
git push origin develop          # Passe directement, aucune approbation requise
```

**Quand utiliser cette méthode :**
- Corrections urgentes (bug bloquant pour l'équipe)
- Petits ajouts / hotfix rapides
- Quand l'équipe attend ton code pour continuer

---

### CHOIX B — Méthode Propre avec PR ✅ (Recommandée)

Même en étant chef de projet, travailler avec des branches garde un historique Git propre et lisible.

```bash
# 1. Créer ta branche feature
git checkout develop
git pull origin develop
git checkout -b feature/backend-auth

# 2. Coder, committer, pousser
git add .
git commit -m "feat(backend): ajout routes auth + middleware JWT"
git push origin feature/backend-auth

# 3. Ouvrir une PR sur GitHub vers develop
#    GitHub affichera :
#    "Review required — BUT you have bypass privileges"

# 4. Sur la page de la PR, GitHub te propose :
#    ☑ "Merge without waiting for requirements to be met"
#    → Coche cette case et clique sur Merge
```

**Quand utiliser cette méthode :**
- Nouvelles fonctionnalités backend complètes
- Modifications importantes de la structure
- Quand tu veux garder un historique propre des features

---

### 📋 Tableau comparatif — Tes deux choix

| | Choix A — Direct | Choix B — PR |
|---|---|---|
| **Vitesse** | ⚡ Immédiat | 🕐 +2 min |
| **Historique Git** | Moins lisible | Clair et organisé |
| **Risque d'erreur** | Légèrement plus élevé | Plus sécurisé |
| **Idéal pour** | Hotfix / urgences | Features complètes |

---

### 🔍 Comment reviewer et merger les PRs de l'équipe

Quand un membre t'envoie un message Discord, voici tes étapes :

**1. Aller sur la PR**
> GitHub → dépôt `project-dev-medicament` → onglet **Pull requests** → sélectionner la PR

**2. Vérifier les fichiers modifiés**
> Clique sur l'onglet **"Files changed"**
> Vérifie que le dev a touché **uniquement ses fichiers** (pas ceux d'un autre)

**3. Approuver la PR**
> Clique sur **"Review changes"** (bouton vert en haut à droite)
> Coche **✅ Approve**
> Clique sur **"Submit review"**

**4. Merger**
> Le bouton vert **"Merge pull request"** se débloque
> Clique sur **"Merge pull request"** → **"Confirm merge"**
> Le code du dev est maintenant dans `develop` ✅

**5. Notifier le dev sur Discord**
```
"✅ Ta PR feature/frontend-auth est mergée dans develop ! Tu peux pull."
```

---

## 🔄 SCHÉMA GLOBAL DU WORKFLOW

```
main (production)
  └── develop (intégration)
        ├── feature/frontend-ui-components  ← Sonia
        ├── feature/frontend-auth           ← Leslie
        ├── feature/frontend-search         ← Linus
        ├── feature/frontend-orders         ← Ange
        └── feature/backend-auth            ← Jack (optionnel)

Flux normal :
  Dev crée feature/xxx
       ↓
  Dev push + ouvre PR vers develop
       ↓
  Jack review + Approve + Merge
       ↓
  Code intégré dans develop
       ↓ (quand develop est stable)
  Jack merge develop → main (mise en production)
```

---

## 💬 MESSAGES DISCORD TYPE

### L'équipe → Jack
```
"Jack, PR feature/frontend-auth prête ! 🙏"
"Jack, j'ai poussé cartSlice sur feature/frontend-orders, PR ouverte"
"Jack, j'ai un conflit sur ma PR, tu peux m'aider ?"
```

### Jack → L'équipe
```
"✅ PR mergée dans develop — fais un git pull origin develop"
"❌ PR refusée — tu as touché un fichier qui appartient à Ange, corrige ça"
"⚠️ Conflit détecté — viens me voir sur Discord"
"🚀 API auth prête sur localhost:8000 — Leslie peut tester"
```
