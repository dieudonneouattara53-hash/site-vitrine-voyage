# Ailleurs — Site de voyage

Un site vitrine de voyage responsive, réalisé en HTML, CSS et JavaScript. Il présente des destinations inspirantes et permet de les filtrer selon la région et la saison.

## Ouvrir le site

Aucune installation n'est nécessaire. Ouvrez simplement `index.html` dans un navigateur.

Pour travailler sur le site, vous pouvez aussi ouvrir le dossier dans Visual Studio Code et lancer `index.html` avec l'extension **Live Server**. Cela permet de voir les changements dès qu'un fichier est enregistré.

## Fichiers du projet

- `index.html` : contenu et structure des sections du site.
- `style.css` : présentation, couleurs, thèmes clair et sombre et adaptation aux écrans mobiles.
- `script.js` : interactions du menu, des thèmes, des filtres, des favoris et du formulaire.

## Fonctionnalités

- Mise en page responsive pour ordinateur, tablette et téléphone.
- Thème clair ou sombre, avec mémorisation du choix dans le navigateur.
- Menu de navigation repliable sur les petits écrans.
- Filtrage des destinations par région et par saison.
- Boutons pour ajouter ou retirer une destination des favoris.
- Formulaire de newsletter avec vérification de l'adresse e-mail.

> Le formulaire de newsletter est une démonstration côté navigateur. Il n'enregistre ni n'envoie les adresses. Pour recevoir les inscriptions, il faut le connecter à un service de newsletter ou à un serveur.

## Images et polices

Les photos sont chargées depuis **Unsplash** et les polices depuis **Google Fonts**. Une connexion Internet est nécessaire pour les afficher. Pour utiliser des images locales, remplacez les adresses `https://images.unsplash.com/...` dans `index.html` par le chemin des fichiers correspondants.

## Personnalisation

- Pour changer les couleurs, modifiez les variables au début de `style.css`. Les couleurs du thème sombre sont définies dans le bloc `body.dark-theme`.
- Pour ajouter une destination, copiez un bloc `<article class="destination-card">` dans `index.html`, puis renseignez ses attributs `data-region` et `data-season`.
- Pour ajouter une région ou une saison à la recherche, mettez à jour les listes déroulantes et les boutons de filtre dans `index.html`.

Les commentaires dans les fichiers indiquent le rôle des différentes sections et interactions.
