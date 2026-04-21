# 🤝 GUIDE DE CONTRIBUTION - PharmApp

**Bienvenue dans le projet PharmApp !**

Ce document explique comment travailler sur le projet, étape par étape.

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Récupérer le projet](#récupérer-le-projet)
3. [Comprendre les branches](#comprendre-les-branches)
4. [Workflow de travail](#workflow-de-travail)
5. [Conventions de nommage](#conventions-de-nommage)
6. [Règles importantes](#règles-importantes)
7. [Checklist avant de pousser](#checklist-avant-de-pousser)
8. [Tableau Kanban](#tableau-kanban)
9. [Résolution de problèmes](#résolution-de-problèmes)

---

## 🔧 PRÉREQUIS

Avant de commencer, installe :

- **Git** : [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Un éditeur de texte** : VS Code, Sublime Text, ou Notepad++
- **Un compte GitLab/GitHub** : Pour accéder au dépôt

### Vérifier que Git est installé :
```bash
git --version
# Devrait afficher : git version 2.x.x
```

### Configurer Git (première fois uniquement) :
```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton.email@example.com"
```

---

## 📥 RÉCUPÉRER LE PROJET

### **Première fois (Cloner le projet) :**
```bash
# 1. Aller dans le dossier où tu veux mettre le projet
cd ~/Documents

# 2. Cloner le dépôt
git clone https://github.com/Ulrichjack/project-dev-medicament.git

# 3. Entrer dans le dossier
cd projet-pharmacieT 

µµ

# 4. Vérifier que tu es sur la branche develop
git branch
# Tu devrais voir : * develop
```

### **Les autres fois (Mettre à jour) :**
```bash
# 1. Se mettre sur develop
git checkout develop

# 2. Récupérer les dernières modifications
git pull origin develop

# 3. Vérifier que c'est à jour
git status
# Devrait afficher : "Your branch is up to date with 'origin/develop'"
```

---

## 🌿 COMPRENDRE LES BRANCHES

### **Structure des branches :**
```
main (production - VERROUILLÉE)
  ↓
develop (intégration - VERROUILLÉE)
  ↓
feature/ta-tache (ta branche perso)
```

### **Les 3 types de branches :**

| Type | Quand l'utiliser | Exemple |
|------|------------------|---------|
| `docs/` | Travail sur documentation (.md, diagrammes, charte) | `docs/cadrage-besoins` |
| `feature/` | Nouvelle fonctionnalité (code, plus tard) | `feature/authentification` |
| `fix/` | Correction de bug | `fix/erreur-typo` |

**Pour l'instant, vous utilisez UNIQUEMENT `docs/`**

---

## 🔄 WORKFLOW DE TRAVAIL

### **ÉTAPE 1 : AVANT DE COMMENCER**

**TOUJOURS faire ça en premier :**
```bash
# 1. Se mettre sur develop
git checkout develop

# 2. Récupérer les dernières modifications
git pull origin develop

# 3. Vérifier qu'on est à jour
git status
# Devrait afficher : "Your branch is up to date with 'origin/develop'"
```

---

### **ÉTAPE 2 : CRÉER TA BRANCHE**

**Exemple : Tu travailles sur le fichier 01-cadrage-besoins.md**
```bash
# Créer ta branche à partir de develop
git checkout -b docs/cadrage-besoins

# Vérifier que tu es sur ta branche
git branch
# Tu devrais voir : * docs/cadrage-besoins
```

---

### **ÉTAPE 3 : TRAVAILLER SUR TON FICHIER**

1. **Ouvre ton éditeur de texte** (VS Code, Notepad++, etc.)
2. **Modifie ou crée ton fichier** dans `docs/cahier-des-charges/`
3. **Enregistre** (Ctrl+S ou Cmd+S)

**Exemple :**
```
Tu travailles sur : docs/cahier-des-charges/01-cadrage-besoins.md
Tu écris dedans pendant 2 heures
Tu sauvegardes
```

---

### **ÉTAPE 4 : VÉRIFIER TES MODIFICATIONS**
```bash
# Voir ce que tu as modifié
git status

# Devrait afficher :
# On branch docs/cadrage-besoins
# Changes not staged for commit:
#   modified:   docs/cahier-des-charges/01-cadrage-besoins.md
```

---

### **ÉTAPE 5 : AJOUTER TES MODIFICATIONS (STAGING)**
```bash
# Ajouter UN fichier spécifique
git add docs/cahier-des-charges/01-cadrage-besoins.md

# OU ajouter TOUS les fichiers modifiés
git add .
```

**Vérifier que c'est bien ajouté :**
```bash
git status

# Devrait afficher :
# Changes to be committed:
#   modified:   docs/cahier-des-charges/01-cadrage-besoins.md
```

---

### **ÉTAPE 6 : CRÉER UN COMMIT**

Un commit = une sauvegarde avec un message qui explique ce que tu as fait.
```bash
git commit -m "docs(cadrage): ajout introduction et étude concurrence"
```

**Format du message :**
```
type(module): description courte

Exemples :
- docs(cadrage): ajout introduction projet
- docs(ux): ajout parcours utilisateur UC-01
- docs(archi): ajout diagramme de classes
- fix(typo): correction fautes module 2
```

---

### **ÉTAPE 7 : POUSSER TA BRANCHE SUR GITLAB**

**Première fois (ta branche n'existe pas encore sur GitLab) :**
```bash
git push -u origin docs/cadrage-besoins
```

**Les fois suivantes (ta branche existe déjà) :**
```bash
git push
```

---

### **ÉTAPE 8 : OUVRIR UNE PULL REQUEST (PR)**

1. **Va sur GitLab** dans ton navigateur
2. **Bandeau jaune** apparaît : "You recently pushed to docs/cadrage-besoins"
3. **Clique** sur "Create Merge Request" (ou "Compare & pull request")
4. **Remplis** :
   - **Source branch** : `docs/cadrage-besoins`
   - **Target branch** : `develop`
   - **Title** : `docs(cadrage): ajout introduction et concurrence`
   - **Description** :
```
     ## Ce que j'ai fait
     - Ajouté introduction du projet
     - Analysé 2 apps concurrentes
     
     ## Fichiers modifiés
     - docs/cahier-des-charges/01-cadrage-besoins.md
```
   - **Assigné** : Toi-même
   - **Reviewer** : Jack (Lead Dev)
5. **Clique** sur "Create Merge Request"

---

### **ÉTAPE 9 : ATTENDRE LA VALIDATION**

- **Jack** reçoit une notification
- **Jack** regarde ton travail
- **Jack** laisse des commentaires OU approuve

**Si Jack demande des modifications :**
```bash
# 1. Modifier ton fichier
# 2. Enregistrer

# 3. Ajouter les changements
git add .

# 4. Nouveau commit
git commit -m "docs(cadrage): correction suite review"

# 5. Pousser
git push

# La PR se met à jour automatiquement
```

---

### **ÉTAPE 10 : APRÈS LE MERGE**

**Une fois que Jack a mergé ta branche :**
```bash
# 1. Retourner sur develop
git checkout develop

# 2. Récupérer la dernière version (avec ton travail dedans)
git pull origin develop

# 3. Supprimer ta branche locale (optionnel mais recommandé)
git branch -d docs/cadrage-besoins
```

**Ta branche sur GitLab sera supprimée automatiquement après le merge.**

---

## 📝 CONVENTIONS DE NOMMAGE

### **Branches :**
```
docs/nom-de-la-tache
docs/cadrage-besoins
docs/ux-parcours
docs/charte-graphique
```

**Règles :**
- Tout en minuscules
- Tirets pour séparer les mots (pas d'espaces)
- Pas de caractères spéciaux (pas d'accents)

### **Messages de commit :**

**Format :**
```
type(module): description courte
```

**Types disponibles :**
- `docs` : Documentation (cahier des charges, diagrammes)
- `feat` : Nouvelle fonctionnalité (code)
- `fix` : Correction de bug
- `chore` : Tâches techniques (config, outils)

**Modules :**
- `cadrage` : Module 1
- `produit` : Module 2
- `ux` : Module 3
- `archi` : Module 4
- `securite` : Module 5

**Exemples de bons commits :**
```
✅ docs(cadrage): ajout introduction projet
✅ docs(ux): ajout diagramme use case
✅ docs(archi): définition stack technique
✅ fix(typo): correction fautes module 2
```

**Exemples de mauvais commits :**
```
❌ Update
❌ modifications
❌ fini
❌ ça marche
```

---

## ⚠️ RÈGLES IMPORTANTES

### **1. TOUJOURS travailler sur une branche**

❌ **JAMAIS faire ça :**
```bash
git checkout main
# Modifier des fichiers
# Commit
```

✅ **TOUJOURS faire ça :**
```bash
git checkout develop
git checkout -b docs/ma-tache
# Modifier des fichiers
# Commit
```

---

### **2. JAMAIS pousser directement sur main ou develop**

Les branches `main` et `develop` sont **protégées**.

Si tu essaies :
```bash
git checkout main
git push
```

**Tu auras une erreur :**
```
! [remote rejected] main -> main (protected branch hook declined)
```

**C'est normal, c'est fait exprès !**

---

### **3. TOUJOURS se mettre à jour avant de commencer**
```bash
git checkout develop
git pull origin develop
git checkout -b docs/ma-nouvelle-tache
```

**Pourquoi ?**
- Pour éviter les conflits
- Pour avoir la dernière version du projet

---

### **4. Faire des commits réguliers**

❌ **PAS bien :**
- Travailler 5 heures
- 1 seul gros commit

✅ **BIEN :**
- Travailler 30 min
- Commit
- Travailler 30 min
- Commit

**Exemple :**
```bash
# Après avoir écrit l'introduction
git add .
git commit -m "docs(cadrage): ajout introduction"

# Après avoir analysé une app concurrente
git add .
git commit -m "docs(cadrage): ajout analyse 1mg"

# Après avoir analysé la 2ème app
git add .
git commit -m "docs(cadrage): ajout analyse Netmeds"
```

---

## ✅ CHECKLIST AVANT DE POUSSER

**Avant CHAQUE `git push`, vérifie :**

- [ ] J'ai enregistré mon fichier (Ctrl+S)
- [ ] J'ai relu mon travail (pas de fautes)
- [ ] Mon fichier est au bon endroit (`docs/cahier-des-charges/`)
- [ ] Mon fichier a le bon nom (pas d'espaces, bonne extension .md)
- [ ] J'ai fait `git add`
- [ ] J'ai fait `git commit` avec un bon message
- [ ] Je suis sur ma branche perso (pas sur develop ou main)

**Vérifier ça avec :**
```bash
git status
git branch
```

---

## 📊 TABLEAU KANBAN

### **Où le trouver ?**
- GitLab : **Project → Issues → Boards**
- GitHub : **Projects**

### **Les colonnes :**
```
📋 To Do → 🔨 In Progress → 👀 In Review → ✅ Done
```

### **Quand tu commences une tâche :**

1. **Déplace ta carte** de "To Do" → "In Progress"
2. **Assigne-toi** la tâche (clique dessus, "Assign to me")
3. **Ajoute un label** : `docs`, `urgent`, etc.

### **Quand tu crées ta PR :**

1. **Déplace ta carte** de "In Progress" → "In Review"
2. **Laisse-la là** jusqu'à ce que Jack merge

### **Après le merge :**

1. **Déplace ta carte** de "In Review" → "Done"
2. **Ferme l'issue** (ou elle se ferme automatiquement)

---

## 🆘 RÉSOLUTION DE PROBLÈMES

### **Problème 1 : J'ai oublié de créer une branche**

Tu as modifié des fichiers sur `develop` directement.

**Solution :**
```bash
# 1. Créer une branche maintenant
git checkout -b docs/ma-tache

# Tes modifications sont transférées sur la nouvelle branche
```

---

### **Problème 2 : J'ai modifié le mauvais fichier**

**Solution :**
```bash
# Annuler les modifications (fichier pas encore ajouté)
git checkout -- nom-du-fichier.md

# OU annuler TOUT
git checkout .
```

---

### **Problème 3 : J'ai fait un commit sur develop**

**Solution :**
```bash
# 1. Créer une nouvelle branche à partir d'ici
git checkout -b docs/ma-tache

# 2. Revenir sur develop
git checkout develop

# 3. Annuler le dernier commit sur develop
git reset --hard HEAD~1

# 4. Retourner sur ta branche
git checkout docs/ma-tache

# Ton commit est maintenant sur ta branche, pas sur develop
```

---

### **Problème 4 : Conflit Git**

Tu vois ça :
```
<<<<<<< HEAD
Mon texte
=======
Le texte de quelqu'un d'autre
>>>>>>> develop
```

**Solution :**

1. **Ouvre le fichier** dans ton éditeur
2. **Supprime** les lignes `<<<<<<<`, `=======`, `>>>>>>>`
3. **Garde** la bonne version (la tienne ou l'autre, ou les deux)
4. **Enregistre**
5. **Ajoute** : `git add .`
6. **Commit** : `git commit -m "fix: résolution conflit"`
7. **Pousse** : `git push`

---

### **Problème 5 : Je ne sais pas où j'en suis**
```bash
# Voir l'état actuel
git status

# Voir sur quelle branche je suis
git branch

# Voir l'historique des commits
git log --oneline

# Voir les différences non commitées
git diff
```

---

## 📞 BESOIN D'AIDE ?

**Contacte Jack sur :**
- WhatsApp : +237652588197
- Email : ulrichfosso246@gmail.com

---

**Bon courage ! 🚀**