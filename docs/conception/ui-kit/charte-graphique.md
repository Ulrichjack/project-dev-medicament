

#  CHARTE GRAPHIQUE – PharmApp



DOCUMENT DE CHARTE TECHNIQUE ET DESIGN

APPLICATION DE RECHERCHE ET COMMANDE DE MEDICAMENT 

 Ce document définit les choix techniques, les conventions d’interface, les règles d’alignement, le style visuel et les standards de développement pour l’application de recherche, comparaison et commande de médicaments. Il sert de référence commune à toute l’équipe afin d’assurer cohérence, maintenabilité et professionnalisme.




1. Architecture Technique Générale

1.1 Stack proposée
•	Frontend Web : React native
•	Framework UI : Tailwind CSS
•	Backend :  PHP (Laravel)
•	Base de données : MySQL / PostgreSQL
•	API : REST JSON
•	Versioning : Git + GitHub (branches + pull requests)
•	Paiement : API Mobile Money 

1.2 Organisation du projet
•	frontend/ → interfaces utilisateur
•	backend/ → API et logique métier
•	database/ → scripts SQL
•	assets/ → images, icônes, logos
•	docs/ → documentation technique


2. Conventions d’Interface et Alignement
•	Utilisation d’une grille 12 colonnes (responsive)
•	Alignement principal à gauche pour les textes
•	Titres centrés uniquement pour les pages d’accueil ou sections importantes
•	Marges extérieures minimum : 16px
•	Espacement vertical cohérent : 8px / 16px / 24px / 32px
•	Tous les boutons alignés horizontalement quand ils sont groupés
•	Formulaires en colonnes verticales claires


3. Style des Boutons
•	Coins arrondis (border-radius: 10px à 14px)
•	Ombre légère pour effet moderne
•	Hauteur minimale : 44px pour accessibilité mobile
•	Icônes facultatives à gauche du texte
•	Transitions douces (hover 0.2s)
Types de boutons
•	Primaire : Rechercher / Commander / Payer (couleur principale)
•	Secondaire : Annuler / Retour
•	Succès : Paiement validé / Disponible
•	Danger : Supprimer / Annuler commande
•	Désactivé : gris clair


4. Palette de Couleurs Recommandée
•	Bleu principal : confiance / santé
•	Vert : succès / disponibilité
•	Rouge : alertes / ruptures de stock
•	Gris : éléments secondaires
•	Blanc : fond principal


5. Typographie (Police)
•	Police principale : Poppins ou Roboto (moderne, lisible)
•	Titres : Semi-bold
•	Texte normal : Regular
•	Hiérarchie recommandée : H1 28–32px, H2 22–24px, H3 18–20px, texte 14–16px
•	Interligne : 1.5 pour la lisibilité


6. Règles UX (Expérience Utilisateur)
•	Recherche rapide visible en haut de chaque page
•	Feedback visuel pour chaque action
•	Statuts de commande clairs (couleurs + texte)
•	Navigation simple : maximum 3 clics pour commander
•	Responsive mobile obligatoire


7. Bonnes Pratiques GitHub (Travail d’Équipe)
•	1 fonctionnalité = 1 branche
•	Nommage : feature/nom-fonctionnalite
•	Pull Request obligatoire avant merge
•	Messages de commit clairs
•	Code review entre membres


8. Objectif Global du Design
L’application doit inspirer confiance, clarté et sécurité. L’utilisateur doit pouvoir rechercher, comparer et commander un médicament en moins de deux minutes. Le design doit être simple, professionnel, médical et rassurant.




#  Palette de couleurs

## Primaire
- Hex : #2C5F8D
- RGB : rgb(44,95,141)
- Usage : boutons principaux, navigation, icônes actives

## Secondaire (Succès)
- Hex : #27AE60
- RGB : rgb(39,174,96)
- Usage : validation, succès, actions positives

## Danger
- Hex : #E74C3C
- RGB : rgb(231,76,60)
- Usage : erreurs, suppression, alertes critiques

## Warning
- Hex : #F39C12
- RGB : rgb(243,156,18)
- Usage : avertissements, attention

## Fond principal
- Hex : #FFFFFF
- Usage : arrière-plan principal

## Fond secondaire
- Hex : #F5F7FA
- Usage : sections, cards, blocs

## Texte principal
- Hex : #2C3E50
- Usage : titres, paragraphes

## Texte secondaire
- Hex : #7F8C8D
- Usage : placeholders, sous-titres, infos secondaires

---

#  Variables CSS globales

```css
:root {
  --color-primary: #2C5F8D;
  --color-secondary: #27AE60;
  --color-danger: #E74C3C;
  --color-warning: #F39C12;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F7FA;
  --color-text: #2C3E50;
  --color-text-light: #7F8C8D;
}



# TYPOGRAPHIE 

#TITRE 

POLICE / Montserrat
poids: 600/700


#CORP DE TEXTE 

Police: open ans
poids: 400/500


Import Google font 


<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;500&display=swap" rel="stylesheet">



# STYLE CSS


body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text);
}

h1 { font-size: 32px; font-weight: 700; }
h2 { font-size: 24px; font-weight: 700; }
h3 { font-size: 20px; font-weight: 600; }


# BOUTON 

Bouton primaire 

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  opacity: 0.9;
}


bouton Success


.btn-success {
  background-color: var(--color-secondary);
  color: white;
}


Bouton danger 

.btn-danger {
  background-color: var(--color-danger);
  color: white;
}


Bouton secondaire (outline)

.btn-outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}


#INPUT CHAMP DE FORMULAIRE 
Text, email , password, textarea,

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  padding: 12px 16px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(44,95,141,0.1);
}

::placeholder {
  color: var(--color-text-light);
}



#CARDS UTILISE POUR : produits,médicaments, 
informations patients, dashboard

.card {
  background-color: var(--color-bg);
  border: 1px solid #E8ECF0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}


#ICONE


Bibliotheque: Font Awesome 6 

Icônes principales

Recherche → fa-magnifying-glass

Panier → fa-cart-shopping

Localisation → fa-location-dot

Paiement → fa-credit-card

Livraison → fa-truck

Succès → fa-circle-check

Erreur → fa-circle-exclamation

Notifications → fa-bell

Profil → fa-user

Paramètres → fa-gear

Tailles recommandées

16px → petite

24px → moyenne

32px → grande



#Règles générales

Interface simple et claire

Couleurs médicales (bleu + vert)

Coins arrondis

Ombres légères

Lisibilité prioritaire

Mobile friendly







