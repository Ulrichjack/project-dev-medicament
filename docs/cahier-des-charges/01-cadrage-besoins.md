 #  CADRAGE DES BESOINS 
    

                     1. Introduction du Projet  


# Contexte
Dans de nombreux pays en développement, l'accès aux médicaments reste un défi quotidien pour les populations. Les patients font face à des ruptures de stock fréquentes dans les pharmacies, des prix variables d'une officine à l'autre sans possibilité de comparaison, et des déplacements inutiles pour finalement ne pas trouver le médicament recherché. Cette situation engendre une perte de temps considérable, des dépenses supplémentaires et parfois des risques sanitaires réels lorsque le traitement est retardé.
Face à ce constat, il existe un besoin clair d'une plateforme centralisée capable de connecter les patients aux pharmacies partenaires, de permettre la recherche et la comparaison des médicaments disponibles, et d'organiser leur livraison de manière rapide et fiable.
Objectifs Généraux
Le projet vise à faciliter l'accès aux médicaments pour l'ensemble de la population en proposant une solution numérique accessible depuis un smartphone ou un navigateur web. Plus précisément, la plateforme devra permettre la comparaison des prix entre pharmacies pour aider le patient à faire le meilleur choix, offrir une livraison rapide et fiable directement au domicile ou au lieu de travail du patient, et accompagner les pharmacies partenaires dans leur transformation numérique en les dotant d'outils modernes de gestion.
Portée du Projet
La zone géographique de déploiement reste à définir avec l'équipe, mais le MVP ciblera en priorité les zones urbaines où la densité de pharmacies et de livreurs est suffisante pour garantir la viabilité du service. Les utilisateurs cibles sont de trois types : les patients qui recherchent et commandent des médicaments, les pharmaciens qui gèrent leur catalogue et leurs stocks, et les livreurs qui assurent l'acheminement des commandes. L'objectif est de livrer un MVP fonctionnel dans un délai de quatre mois à compter du lancement du développement.



2. Étude de l'Existant

Applications Concurrentes
# App 1 – mPharma
Présente dans plusieurs pays africains dont le Ghana, le Kenya et le Nigeria, mPharma est une solution B2B qui s'adresse principalement aux pharmacies et aux hôpitaux pour optimiser la gestion des stocks et réduire les ruptures. Son point fort réside dans son réseau étendu et sa maîtrise de la chaîne d'approvisionnement. En revanche, elle ne propose pas de service de livraison directe au grand public, ni de comparaison de prix pour les patients. La fonctionnalité intéressante à retenir est son système de gestion de stock en temps réel.

# App 2 – Jumia Health / Carsol
Disponible dans plusieurs pays d'Afrique de l'Ouest, cette solution propose la commande de médicaments en ligne avec livraison. Elle bénéficie de la notoriété de la marque Jumia et d'un réseau logistique déjà établi. Ses limites sont la faible couverture en pharmacies partenaires locales, l'absence de vérification de disponibilité en temps réel et un manque de transparence sur les prix. La fonctionnalité de commande en ligne avec paiement mobile est cependant bien implémentée.

# App 3 – Dokitari / applications locales informelles
Dans certains marchés, des tentatives locales existent sous forme de groupes WhatsApp ou de pages Facebook permettant de contacter des pharmacies. Ces solutions informelles montrent un vrai besoin, mais elles ne répondent pas aux exigences de fiabilité, de sécurité, de traçabilité et de comparaison des prix. Elles sont également non scalables.
Notre Différenciation

Notre plateforme se distinguera par la combinaison en un seul produit de la recherche par catégorie, de la vérification de disponibilité en temps réel, de la comparaison automatique des prix entre pharmacies, et de la livraison avec suivi. Aucune solution locale ne propose aujourd'hui cette expérience complète et intégrée. Notre avantage compétitif repose également sur l'espace pharmacie dédié avec tableau de bord, la gestion des ordonnances numériques, et les notifications de disponibilité – des fonctionnalités absentes chez les concurrents identifiés.




3. Analyse du Besoin

# Côté Patients
Les patients rencontrent principalement trois problèmes : se déplacer pour trouver un médicament en rupture, ne pas savoir quelle pharmacie propose le meilleur prix, et ne pas pouvoir commander à distance lorsqu'ils sont malades ou éloignés. Leurs besoins exprimés sont la possibilité de rechercher un médicament depuis chez eux, de savoir en temps réel où il est disponible, de comparer les prix, et de se le faire livrer rapidement. Sur la question du prix de livraison acceptable, les retours de terrain indiquent généralement une tolérance entre 500 et 1 500 FCFA selon la distance, à confirmer lors des interviews.

# Côté Pharmaciens
Les pharmaciens font face à une gestion de stock encore largement manuelle, une faible visibilité en ligne, et une perte de clients qui ne savent pas qu'ils ont le médicament disponible. Ils ont besoin d'un outil simple pour mettre à jour leur catalogue, recevoir des commandes directement, et suivre leurs ventes. Sur la commission, une fourchette de 5 à 10 % par commande semble acceptable selon les premières discussions, mais cela doit être validé lors des entretiens formels.

# Côté Livreurs
Les livreurs cherchent avant tout de la régularité dans les courses et un paiement rapide, idéalement immédiat après chaque livraison. Ils font face à une instabilité des revenus et à un manque d'organisation dans les plateformes existantes. Leur tarif minimum souhaité par course est estimé entre 500 et 800 FCFA, à préciser selon les zones de couverture.

# Synthèse des Besoins – Priorisation MoSCoW
Les fonctionnalités Must Have – c'est-à-dire indispensables au MVP – sont : la recherche de médicaments par nom et par catégorie, la vérification de la disponibilité en pharmacie, la commande avec paiement mobile money, la livraison à domicile, et l'espace pharmacie avec gestion du catalogue.

Les fonctionnalités Should Have – importantes mais non bloquantes pour le lancement – comprennent : la comparaison des prix entre pharmacies, l'historique des commandes, les notifications de disponibilité, et le tableau de bord pharmacie avec statistiques de vente.

Les fonctionnalités Could Have – souhaitables à moyen terme – incluent : la gestion des ordonnances numériques, le paiement par carte bancaire, la géolocalisation en temps réel du livreur, et un système de fidélité pour les clients.

4. Présentation de la Solution

# Description Générale
La solution se compose d'une application mobile destinée aux patients et aux livreurs, et d'une interface web destinée aux pharmaciens. Côté patient, l'application permet de rechercher un médicament par nom, catégorie ou pathologie, de consulter les pharmacies qui le proposent avec leur prix et leur distance, de passer commande et de payer via mobile money, puis de suivre la livraison en temps réel. Côté pharmacien, l'interface web permet de gérer le catalogue de médicaments avec les prix et les stocks, de recevoir et traiter les commandes, et de consulter un tableau de bord de performance. Côté livreur, l'application mobile lui notifie les nouvelles courses disponibles, lui permet d'accepter une livraison, de naviguer jusqu'à la pharmacie puis au client, et de confirmer la livraison.

# Bénéfices Attendus
Pour les patients, la plateforme représente un gain de temps significatif en évitant les déplacements inutiles, une économie financière grâce à la comparaison des prix, et un confort d'accès aux soins notamment pour les personnes à mobilité réduite ou les zones mal desservies.
Pour les pharmaciens, rejoindre la plateforme signifie une augmentation du chiffre d'affaires grâce à une clientèle élargie, une meilleure visibilité en ligne sans effort marketing supplémentaire, et des outils de gestion de stock qui réduisent les erreurs et les pertes.

# Pour les livreurs, la plateforme offre un flux de commandes régulier et prévisible, des revenus stables et transparents, et une intégration simple via l'application mobile.


# Innovation

Notre solution sera la première du genre à proposer dans notre zone géographique cible une expérience complète et intégrée alliant recherche, comparaison automatique des prix, commande, paiement mobile money et livraison géolocalisée. La vérification de disponibilité en temps réel, couplée aux notifications push, représente une innovation concrète qui répond directement aux frustrations exprimées par les patients lors des ruptures de stock.