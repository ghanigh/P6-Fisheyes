// eslint-disable-next-line no-unused-vars
class PhotographerLightBox {
  constructor(photographerDataMediaById, photographerDataById) {
    this._photographers = photographerDataMediaById; //? Les médias du photographe
    this._photographers2 = photographerDataById; //? Les informations du photographe
  }

  createPhotographerLightBox() {
    //? Création d'une div pour la lightbox
    const photographerLightBox = document.createElement("div");

    //? Ajout d'une classe pour la stylisation
    photographerLightBox.classList.add("modal-lightBox");

    const lightBoxPhotographer = `
  
              <button type="button" class="btnCloseLightBox" aria-label="Fermer la lightbox">
                  <i tabindex="0" class="fas fa-times" aria-hidden="true"></i>
              </button>
  
              <button tabindex="0" type="button" class="button-previous" aria-label="Précédent">
                  <i class="fas fa-chevron-left"></i>
              </button>
  
              <button tabindex="0" type="button" class="button-next" aria-label="Suivant">
                  <i class="fas fa-chevron-right" aria-hidden="true"></i>
              </button>
             
              <div tabindex="0" class="lightbox__container" role="dialog" aria-label="Contenu de la lightbox"></div>
      `;

    //? Ajout du contenu à la div créée
    photographerLightBox.innerHTML = lightBoxPhotographer;

    setTimeout(() => {
      //? Boucle pour chaque média du photographe
      for (let i = 0; i < this._photographers.length; i++) {
        // eslint-disable-next-line no-undef
        const lightBox = new LightBox(
          //? Les médias du photographe
          this._photographers[i],
          //? Les informations du photographe
          this._photographers
        );
        lightBox.openLightBox(this._photographers[i], this._photographers2); //? Ouvre la lightbox pour le média sélectionné
        lightBox.closeOpenLightBox(); //? Ferme la lightbox
        lightBox.btnNextMedia(this._photographers2); //? Affiche le média suivant
        lightBox.btnPreviousMedia(this._photographers2); //? Affiche le média précédent
      }
    }, 50);

    return photographerLightBox; //? Retourne la div de la lightbox
  }
}
