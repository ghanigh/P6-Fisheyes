// Classe LightBox : Gère l'affichage en grand format des images et vidéos dans la lightbox
class LightBox {
  constructor(photographerDataMediaById, photographerDataMediaByIdAll) {
    // Récupère les éléments HTML nécessaires de la lightbox
    this._lightbox__container = document.querySelector(".lightbox__container");
    this._modalLightBox = document.querySelector("#lightBox");
    this._btnCloseLightBox = document.querySelector(".btnCloseLightBox");
    this._btnNextLightBox = document.querySelector(".button-next");
    this._btnPreviousLightBox = document.querySelector(".button-previous");

    // Récupère l'élément HTML du média correspondant
    this._media = document.querySelector(`.media-${photographerDataMediaById.id}`);

    // Enregistre la liste complète des médias pour itération ultérieure
    this._array = photographerDataMediaByIdAll;

    // Initialise l'index courant à 0, correspondant au premier média
    this._currentIndex = 0;
  }

  // Méthode pour ouvrir la lightbox lors du clic sur le média
  openLightBox(photographerDataMediaById, photographerDataById) {
    this._media.addEventListener("click", () => {
      this._modalLightBox.style.display = "block"; // Affiche le modal
      // Injecte le contenu de la lightbox dans le conteneur
      this._lightbox__container.innerHTML = `
        ${
          photographerDataMediaById.image
            ? `<img alt="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}">`
            : `<video title="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${photographerDataMediaById.title}</p>
      `;
    });

    // Écouteur pour ouvrir la lightbox avec la touche "Entrée"
    this._media.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._modalLightBox.style.display = "block"; // Affiche le modal
        // Injecte le contenu de la lightbox dans le conteneur
        this._lightbox__container.innerHTML = `
          ${
            photographerDataMediaById.image
              ? `<img alt="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}">`
              : `<video title="${photographerDataMediaById.title}" aria-label="${photographerDataMediaById.title}" src="../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}" controls></video>`
          }
          <p tabindex="0" class="lightbox__title">${photographerDataMediaById.title}</p>
        `;
      }
    });
  }

  // Méthode pour fermer la lightbox
  closeOpenLightBox() {
    this._btnCloseLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalLightBox.style.display = "none"; // Cache la lightbox
    });

    // Écouteur pour fermer la lightbox avec la touche "Échap"
    this._btnCloseLightBox.addEventListener("keydown", (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this._modalLightBox.style.display = "none"; // Cache la lightbox
      }
    });
  }

  // Méthode pour afficher le média suivant dans la lightbox
  btnNextMedia(photographerDataById) {
    this._btnNextLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      // Met à jour l'index courant pour le média suivant
      this._currentIndex = (this._currentIndex + 1) % this._array.length;
      const nextMedia = this._array[this._currentIndex]; // Récupère le média suivant
      // Mise à jour du contenu de la lightbox avec le média suivant
      this._lightbox__container.innerHTML = `
        ${
          nextMedia.image
            ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
            : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
      `;
    });

    // Écouteur pour passer au média suivant avec la touche "Flèche droite"
    document.addEventListener("keydown", (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        // Met à jour l'index courant pour le média suivant
        this._currentIndex = (this._currentIndex + 1) % this._array.length;
        const nextMedia = this._array[this._currentIndex]; // Récupère le média suivant
        // Mise à jour du contenu de la lightbox avec le média suivant
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

  // Méthode pour afficher le média précédent dans la lightbox
  btnPreviousMedia(photographerDataById) {
    this._btnPreviousLightBox.addEventListener("click", (e) => {
      e.preventDefault();
      this._currentIndex = (this._currentIndex - 1) % this._array.length; // Calcul de l'indice précédent
      if (this._currentIndex < 0) {
        this._currentIndex = this._array.length - 1; // Boucle à la fin du tableau si
      }
      const nextMedia = this._array[this._currentIndex]; // Récupère le média précédent
      // Mise à jour du contenu de la lightbox avec le média précédent
      this._lightbox__container.innerHTML = `
        ${
          nextMedia.image
            ? `<img alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.image}">`
            : `<video alt="${nextMedia.title}" aria-label="${nextMedia.title}" src="../assets/profil_photographers/${photographerDataById.name}/${nextMedia.video}" controls></video>`
        }
        <p tabindex="0" class="lightbox__title">${nextMedia.title}</p>
      `;
    });
    
    // Écouteur pour passer au média précédent avec la touche "Flèche gauche"
    document.addEventListener("keydown", (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this._currentIndex = (this._currentIndex - 1) % this._array.length; // Calcul de l'indice précédent
        if (this._currentIndex < 0) {
          this._currentIndex = this._array.length - 1; // Boucle à la fin du tableau si nécessaire
        }
    
        const nextMedia = this._array[this._currentIndex]; // Récupère le média précédent
        // Mise à jour du contenu de la lightbox avec le média précédent
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