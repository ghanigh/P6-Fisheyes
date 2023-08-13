// eslint-disable-next-line no-unused-vars
class LightBox {
  //? Constructeur de la classe Lightbox, permettant de gérer l'affichage de l'image en grand format
  constructor(photographerDataMediaById, photographerDataMediaByIdAll) {
    //? On récupère les éléments HTML de la lightbox
    this._lightbox__container = document.querySelector(".lightbox__container");
    this._modalLightBox = document.querySelector("#lightBox");
    this._btnCloseLightBox = document.querySelector(".btnCloseLightBox");
    this._btnNextLightBox = document.querySelector(".button-next");
    this._btnPreviousLightBox = document.querySelector(".button-previous");
    //? On récupère l'élément HTML de la media
    this._media = document.querySelector(
      `.media-${photographerDataMediaById.id}`
    );
    //? On enregistre la liste complète des médias pour pouvoir itérer dessus
    this._array = photographerDataMediaByIdAll;
    //? On initialise l'index courant à 0, correspondant au premier média
    this._currentIndex = 0;
  }

  openLightBox(photographerDataMediaById, photographerDataById) {
    //? Ajoute un écouteur d'événement sur le clic de l'utilisateur pour ouvrir la lightbox
    this._media.addEventListener("click", () => {
      //? Change la propriété display du modal pour l'afficher
      this._modalLightBox.style.display = "block";
      //? Injecte le contenu de la lightbox dans le container
      this._lightbox__container.innerHTML = `
      ${
        photographerDataMediaById.image
          ? `<img alt="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}">`
          : `<video title="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}" controls></video>`
      }
      <p tabindex="0" class="lightbox__title">${
        photographerDataMediaById.title
      }</p>
      `;
    });
    //? Ajoute un écouteur d'événement sur la touche entrée pour ouvrir la lightbox
    this._media.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        //? Change la propriété display du modal pour l'afficher
        this._modalLightBox.style.display = "block";
        //? Injecte le contenu de la lightbox dans le container
        this._lightbox__container.innerHTML = `
        ${
          photographerDataMediaById.image
            ? `<img alt="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}">`
            : `<video title="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${
          photographerDataMediaById.title
        }</p>
      `;
      }
    });
  }

  closeOpenLightBox() {
    //? Ajoute un événement click sur le bouton de fermeture de la lightbox
    this._btnCloseLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      //? Cache la lightbox
      this._modalLightBox.style.display = "none";
    });

    //? Ajoute un événement clavier sur le bouton de fermeture de la lightbox
    this._btnCloseLightBox.addEventListener("keydown", (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        //? Cache la lightbox lorsque la touche "Entrée" est pressée
        this._modalLightBox.style.display = "none";
      }
    });
  }

  btnNextMedia(photographerDataById) {
    //? Lorsque l'utilisateur clique sur le bouton "suivant" de la lightbox
    this._btnNextLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      //? On met à jour l'index courant en se déplaçant vers le média suivant
      this._currentIndex = (this._currentIndex + 1) % this._array.length;
      //? On récupère le média suivant
      const nextMedia = this._array[this._currentIndex];
      //? On met à jour le contenu de la lightbox avec le média suivant
      this._lightbox__container.innerHTML = `
      ${
        nextMedia.image
          ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
          : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
      }
      <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
      `;
    });
    //? Lorsque l'utilisateur utilise le clavier pour appuyer sur le bouton "suivant" de la lightbox
    document.addEventListener("keydown", (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        //? On met à jour l'index courant en se déplaçant vers le média suivant
        this._currentIndex = (this._currentIndex + 1) % this._array.length;
        //? On récupère le média suivant
        const nextMedia = this._array[this._currentIndex];
        //? On met à jour le contenu de la lightbox avec le média suivant
        this._lightbox__container.innerHTML = `
        ${
          nextMedia.image
            ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
            : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
        `;
      }
    });
  }

  btnPreviousMedia(photographerDataById) {
    //? Ajout d'un écouteur d'événement au clic du bouton précédent
    this._btnPreviousLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      //? Calcul de l'indice de l'élément précédent
      this._currentIndex = (this._currentIndex - 1) % this._array.length;
      //? Si l'indice est inférieur à 0, on boucle à la fin du tableau
      if (this._currentIndex < 0) {
        this._currentIndex = this._array.length - 1;
      }
      //? Récupération de l'élément précédent
      const nextMedia = this._array[this._currentIndex];
      //? Affichage de l'élément précédent dans la lightbox
      this._lightbox__container.innerHTML = `
      ${
        nextMedia.image
          ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
          : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
      }
      <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
      `;
    });
    //? Ajout d'un écouteur d'événement pour la navigation précédente avec le clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        //? Calcul de l'indice de l'élément précédent
        this._currentIndex = (this._currentIndex - 1) % this._array.length;
        //? Si l'indice est inférieur à 0, on boucle à la fin du tableau
        if (this._currentIndex < 0) {
          this._currentIndex = this._array.length - 1;
        }
        //? Récupération de l'élément précédent
        const nextMedia = this._array[this._currentIndex];
        //? Affichage de l'élément précédent dans la lightbox
        this._lightbox__container.innerHTML = `
        ${
          nextMedia.image
            ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
            : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
        `;
      }
    });
  }
}
