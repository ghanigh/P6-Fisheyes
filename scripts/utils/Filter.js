// eslint-disable-next-line no-unused-vars
class Filter {
  //? Initialisation des éléments de l'interface utilisateur nécessaires pour le filtre
  constructor(photographerDataMediaById) {
    //? Bouton qui ouvre le filtre
    this._btnFilterOpen = document.querySelector("#btnOpenFilter");
    //? Le texte qui change pour indiquer l'état actuel du bouton
    this._toggleTxt = document.querySelector("#btnOpenFilter span");
    //? Conteneur pour le menu déroulant des filtres
    this._container_select = document.querySelector(".container-select");
    //? Liste déroulante contenant les options de filtre
    this._ul = document.querySelector(".container-select ul");
    //? Bouton pour fermer le filtre
    this._btnFilterClose = document.querySelector("#iconCloseFilter");

    //? Option de filtre pour trier par popularité
    this._filterPopularité = document.querySelector("#popularité");
    //? Option de filtre pour trier par date
    this._filterDate = document.querySelector("#date");
    //? Option de filtre pour trier par titre
    this._filterTitre = document.querySelector("#titre");

    //? État actif du filtre
    this._activeFilter = null;
    //? Éléments pour la Lightbox
    this._modalLightBox = document.querySelector("#lightBox");
    //? Élément de la page contenant le media
    this._media = document.querySelector(
      `.media-${photographerDataMediaById.id}`
    );
  }

  //? Cette méthode initialise l'ouverture du filtre lorsqu'on clique sur le bouton d'ouverture
  openFilterInit() {
    this._btnFilterOpen.addEventListener("click", (e) => {
      e.preventDefault();
      this._container_select.style.display = "block";
    });
    this._btnFilterOpen.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._container_select.style.display = "block";
      }
    });
  }

  //? Cette méthode initialise la fermeture du filtre lorsqu'on clique sur le bouton de fermeture
  closeFilterInit() {
    this._btnFilterClose.addEventListener("click", (e) => {
      e.preventDefault();
      this._container_select.style.display = "none";
    });

    this._btnFilterClose.addEventListener("keydown", (e) => {
        e.preventDefault();
        this._container_select.style.display = "none";
    });
  }

  //? Cette méthode définit l'élément de filtre actif, met à jour l'affichage et le tri des médias
  setActiveFilter(filterElement) {
    //? Vérifie si l'élément de filtre actuel est le même que l'élément de filtre sélectionné
    if (this._activeFilter !== filterElement) {
      //? Si l'élément de filtre actuel existe, il supprime la classe "active" de cet élément pour le désactiver
      if (this._activeFilter) {
        this._activeFilter.classList.remove("active");
      }
      //? Ajoute la classe active à l'élément de filtre sélectionné pour le désigner comme étant actif
      filterElement.classList.add("active");
      //? Déplace l'élément de filtre sélectionné en haut de la liste déroulante
      this._ul.insertBefore(filterElement, this._ul.firstChild);
      //? Définit l'élément de filtre sélectionné comme étant le filtre actif
      this._activeFilter = filterElement;
      //? Met à jour le texte du bouton d'ouverture du filtre avec le texte de l'élément de filtre sélectionné
      this._toggleTxt.textContent = filterElement.textContent;
    }
  }

  //? Cette méthode trie les médias par popularité, met à jour l'affichage et le tri des médias
  filterPopularité(photographerDataMediaById, photographerDataById) {
    //? Écouteur d'événement pour le clic sur le bouton de filtre par popularité
    this._filterPopularité.addEventListener("click", (e) => {
      e.preventDefault();
      //? Définit le filtre par popularité comme étant le filtre actif
      this.setActiveFilter(this._filterPopularité);
      //? Trie les médias par popularité (likes)
      const sorteByPopularity = photographerDataMediaById.sort(
        (a, b) => b.likes - a.likes
      );
      //? Sélectionne la section des articles de photographes
      const photographerArticleList = document.querySelector(
        ".photograph_section3"
      );
      //? Efface le contenu actuel de la section des articles de photographes
      photographerArticleList.innerHTML = "";
      //? Pour chaque média trié par popularité, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
      sorteByPopularity.forEach((sorteDataByPopularité) => {
        // eslint-disable-next-line no-undef
        const newPhotographerArticleList = new PhotographerSection3(
          sorteDataByPopularité,
          photographerDataById
        );
        const photographerArticle =
          newPhotographerArticleList.createPhotographArticleSection3();

        photographerArticleList.appendChild(photographerArticle);
      });

      //? Boucle pour chaque média du photographe 
      for (let i = 0; i < photographerDataMediaById.length; i++) {
        // eslint-disable-next-line no-undef
        const lightBox = new LightBox(
          //? Les médias du photographe
          photographerDataMediaById[i],
          //? Les informations du photographe
          photographerDataById
        );
        lightBox.openLightBox(
          photographerDataMediaById[i],
          photographerDataById
        ); //? Ouvre la lightbox pour le média sélectionné
        lightBox.closeOpenLightBox(); //? Ferme la lightbox
        lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
        lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
      
        // eslint-disable-next-line no-undef
        const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
        sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
      }
    });

    //? Écouteur d'événement pour la touche entrée sur le bouton de filtre par popularité
    this._filterPopularité.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        //? Définit le filtre par popularité comme étant le filtre actif
        this.setActiveFilter(this._filterPopularité);
        //? Trie les médias par popularité (likes)
        const sorteByPopularity = photographerDataMediaById.sort(
          (a, b) => b.likes - a.likes
        );
        //? Sélectionne la section des articles de photographes
        const photographerArticleList = document.querySelector(
          ".photograph_section3"
        );
        //? Efface le contenu actuel de la section des articles de photographes
        photographerArticleList.innerHTML = "";
        //? Pour chaque média trié par popularité, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
        sorteByPopularity.forEach((sorteDataByPopularité) => {
          // eslint-disable-next-line no-undef
          const newPhotographerArticleList = new PhotographerSection3(
            sorteDataByPopularité,
            photographerDataById
          );
          const photographerArticle =
            newPhotographerArticleList.createPhotographArticleSection3();

          photographerArticleList.appendChild(photographerArticle);
        });
      
        //? Boucle pour chaque média du photographe
        for (let i = 0; i < photographerDataMediaById.length; i++) {
          // eslint-disable-next-line no-undef
          const lightBox = new LightBox(
            //? Les médias du photographe
            photographerDataMediaById[i],
            //? Les informations du photographe
            photographerDataById
          );
          lightBox.openLightBox(
            photographerDataMediaById[i],
            photographerDataById
          ); //? Ouvre la lightbox pour le média sélectionné
          lightBox.closeOpenLightBox(); //? Ferme la lightbox
          lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
          lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
        
          // eslint-disable-next-line no-undef
          const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
          sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
        }
      }
    });
  }

  //? Cette méthode trie les médias par date, met à jour l'affichage et le tri des médias
  filterDate(photographerDataMediaById, photographerDataById) {
    //? Écouteur d'événement aux click sur le bouton de filtre par date
    this._filterDate.addEventListener("click", (e) => {
      e.preventDefault();
      //? Définit le filtre par date comme étant le filtre actif
      this.setActiveFilter(this._filterDate);
      //? Trie les médias par date
      const sorteByDate = photographerDataMediaById.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      //? Sélectionne la section des articles de photographes
      const photographerArticleList = document.querySelector(
        ".photograph_section3"
      );
      //? Efface le contenu actuel de la section des articles de photographes
      photographerArticleList.innerHTML = "";
      //? Pour chaque média trié par date, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
      sorteByDate.forEach((sorteDataByDate) => {
        // eslint-disable-next-line no-undef
        const newPhotographerArticleList = new PhotographerSection3(
          sorteDataByDate,
          photographerDataById
        );
        const photographerArticle =
          newPhotographerArticleList.createPhotographArticleSection3();

        photographerArticleList.appendChild(photographerArticle);
      });

      //? Boucle pour chaque média du photographe
      for (let i = 0; i < photographerDataMediaById.length; i++) {
        // eslint-disable-next-line no-undef
        const lightBox = new LightBox(
          //? Les médias du photographe
          photographerDataMediaById[i],
          //? Les informations du photographe
          photographerDataById
        );
        lightBox.openLightBox(
          photographerDataMediaById[i],
          photographerDataById
        ); //? Ouvre la lightbox pour le média sélectionné
        lightBox.closeOpenLightBox(); //? Ferme la lightbox
        lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
        lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
   
        // eslint-disable-next-line no-undef
        const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
        sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
      }
    });

    //? Écouteur d'événement pour la touche entrée sur le bouton de filtre par date
    this._filterDate.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        //? Définit le filtre par date comme étant le filtre actif
        this.setActiveFilter(this._filterDate);
        //? Trie les médias par date
        const sorteByDate = photographerDataMediaById.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        //? Sélectionne la section des articles de photographes
        const photographerArticleList = document.querySelector(
          ".photograph_section3"
        );
        //? Efface le contenu actuel de la section des articles de photographes
        photographerArticleList.innerHTML = "";
        //? Pour chaque média trié par date, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
        sorteByDate.forEach((sorteDataByDate) => {
          // eslint-disable-next-line no-undef
          const newPhotographerArticleList = new PhotographerSection3(
            sorteDataByDate,
            photographerDataById
          );
          const photographerArticle =
            newPhotographerArticleList.createPhotographArticleSection3();

          photographerArticleList.appendChild(photographerArticle);
        });
      

        //? Boucle pour chaque média du photographe
        for (let i = 0; i < photographerDataMediaById.length; i++) {
          // eslint-disable-next-line no-undef
          const lightBox = new LightBox(
            //? Les médias du photographe
            photographerDataMediaById[i],
            //? Les informations du photographe
            photographerDataById
          );
          lightBox.openLightBox(
            photographerDataMediaById[i],
            photographerDataById
          ); //? Ouvre la lightbox pour le média sélectionné
          lightBox.closeOpenLightBox(); //? Ferme la lightbox
          lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
          lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
      
          // eslint-disable-next-line no-undef
          const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
          sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
        }
      }
    });
  }

  //? Cette méthode trie les médias par titre, met à jour l'affichage et le tri des médias
  filterTitre(photographerDataMediaById, photographerDataById) {
    //? Écouteur d'événement aux click sur le bouton de filtre par titre
    this._filterTitre.addEventListener("click", (e) => {
      e.preventDefault();
      //? Définit le filtre par titre comme étant le filtre actif
      this.setActiveFilter(this._filterTitre);
      //? Trie les médias par titre
      const sorteByTitre = photographerDataMediaById.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      //? Sélectionne la section des articles de photographes
      const photographerArticleList = document.querySelector(
        ".photograph_section3"
      );
      //? Efface le contenu actuel de la section des articles de photographes
      photographerArticleList.innerHTML = "";
      //? Pour chaque média trié par titre, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
      sorteByTitre.forEach((sorteDataByTitre) => {
        // eslint-disable-next-line no-undef
        const newPhotographerArticleList = new PhotographerSection3(
          sorteDataByTitre,
          photographerDataById
        );
        const photographerArticle =
          newPhotographerArticleList.createPhotographArticleSection3();

        photographerArticleList.appendChild(photographerArticle);
      });

      //? Boucle pour chaque média du photographe
      for (let i = 0; i < photographerDataMediaById.length; i++) {
        // eslint-disable-next-line no-undef
        const lightBox = new LightBox(
          //? Les médias du photographe
          photographerDataMediaById[i],
          //? Les informations du photographe
          photographerDataById
        );
        lightBox.openLightBox(
          photographerDataMediaById[i],
          photographerDataById
        ); //? Ouvre la lightbox pour le média sélectionné
        lightBox.closeOpenLightBox(); //? Ferme la lightbox
        lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
        lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
      
        // eslint-disable-next-line no-undef
        const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
        sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
      }
    });

    //? Écouteur d'événement pour la touche entrée sur le bouton de filtre par titre
    this._filterTitre.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        //? Définit le filtre par titre comme étant le filtre actif
        this.setActiveFilter(this._filterTitre);
        //? Trie les médias par titre
        const sorteByTitre = photographerDataMediaById.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        //? Sélectionne la section des articles de photographes
        const photographerArticleList = document.querySelector(
          ".photograph_section3"
        );
        //? Efface le contenu actuel de la section des articles de photographes
        photographerArticleList.innerHTML = "";
        //? Pour chaque média trié par titre, crée un nouvel article de photographe et l'ajoute à la section des articles de photographes
        sorteByTitre.forEach((sorteDataByTitre) => {
          // eslint-disable-next-line no-undef
          const newPhotographerArticleList = new PhotographerSection3(
            sorteDataByTitre,
            photographerDataById
          );
          const photographerArticle =
            newPhotographerArticleList.createPhotographArticleSection3();
          photographerArticleList.appendChild(photographerArticle);
        });

        //? Boucle pour chaque média du photographe
        for (let i = 0; i < photographerDataMediaById.length; i++) {
          // eslint-disable-next-line no-undef
          const lightBox = new LightBox(
            //? Les médias du photographe
            photographerDataMediaById[i],
            //? Les informations du photographe
            photographerDataById
          );
          lightBox.openLightBox(
            photographerDataMediaById[i],
            photographerDataById
          ); //? Ouvre la lightbox pour le média sélectionné
          lightBox.closeOpenLightBox(); //? Ferme la lightbox
          lightBox.btnNextMedia(photographerDataById); //? Affiche le média suivant
          lightBox.btnPreviousMedia(photographerDataById); //? Affiche le média précédent
      
          // eslint-disable-next-line no-undef
          const sommesCountLikes = new Likes(photographerDataMediaById[i].likes); //? "Likes" est une classe qui gère le comptage des likes d'un média.
          sommesCountLikes.counterLike(photographerDataMediaById[i].likes); //? En appelant la méthode "counterLike" pour chaque instance "sommesCountLikes" créée, on ajoute un compteur de likes pour chaque photo dans la page web.
        }
      }
    });
  }
}
