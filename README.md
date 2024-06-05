Interface pour la Collection d'Art du MET
Ce projet consiste en la création d'une interface frontend pour la collection d'art et d'artefacts du Metropolitan Museum of Art (MET). L'objectif est de fournir un moyen convivial et efficace aux chercheurs, universitaires et utilisateurs généraux de rechercher et d'explorer les collections du MET.

Installation
	Clonez ce dépôt sur votre machine locale :

	git clone https://github.com/GrosHoogo/museum-app.git
Accédez au répertoire du projet :

	cd projet-met-interface
Installez les dépendances :

	npm install
Exécution
Lancez l'application en mode développement :

	npm start
Ouvrez votre navigateur et accédez à l'URL suivante :

	http://localhost:3000
Fonctionnalités
Recherche Rapide
	Une fonctionnalité de recherche rapide est disponible sur toutes les pages de l'interface. Elle permet aux utilisateurs de rechercher rapidement des objets dans les collections du MET.
Recherche Avancée
	Une fonctionnalité de recherche avancée est disponible sur une page dédiée. Elle permet aux utilisateurs d'effectuer des requêtes plus spécifiques en utilisant une liste complète de paramètres provenant de la documentation de 	l'API du MET.
Page Principale / Index
	La page principale affiche quelques articles en vedette provenant des collections du MET. Ces articles sont récupérés en utilisant l'API de recherche.
Page d'Objet Spécifique
	Une page est dédiée à l'affichage d'un objet spécifique. Les utilisateurs peuvent accéder à cette page via la barre de recherche, la recherche avancée ou d'autres moyens de navigation. Cette page affiche des informations détaillées sur l'objet telles que l'image, le nom, le département, la période, l'auteur, etc.
Conception Globale
	L'interface est conçue pour être réactive, offrant une expérience utilisateur optimale sur une variété d'appareils et de tailles d'écrans.
Documentation de l'API
	La spécification de l'API du MET est disponible à l'adresse suivante : https://metmuseum.github.io/