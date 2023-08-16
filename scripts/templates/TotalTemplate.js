/* eslint-disable no-unused-vars */
// Classe pour créer la section de données totales du photographe
class PhotographerSection4 {
  constructor(photographerDataMediaById, photographerDataById) {
    // Stocke les données des médias du photographe et les données du photographe dans des variables pour une utilisation ultérieure
    this._photographers = photographerDataMediaById;
    this.sommesLikes = 0; // Variable pour calculer le nombre total de likes

    // Calcul du nombre total de likes pour tous les médias du photographe
    for (let i = 0; i < photographerDataMediaById.length; i++) {
      this.sommesLikes += photographerDataMediaById[i].likes;
    }

    this._photographers2 = photographerDataById; // Stocke les données du photographe pour le prix
  }

  // Méthode pour créer la section de données totales du photographe
  createPhotographTotalSection4() {
    // Création de la section globale pour le photographe
    const photograph_section4 = document.createElement("div");
    photograph_section4.classList.add("container-total");
    photograph_section4.setAttribute("tabindex", "0");

    // Contenu de la section 4 : affichage du nombre total de likes et du prix
    const photographerTotal = `
        <span tabindex="0" aria-label= "Nombre de likes : ${this.sommesLikes}" id='sommeslikes' data-likes="${this.sommesLikes}">
            <span class="nbTotalLikes">${this.sommesLikes}</span> <i aria-label="Icône de cœur" class="heart fas fa-heart"></i>
        </span> 
        <span tabindex="0" aria-label= "Prix : ${this._photographers2.price} euros par jour">${this._photographers2.price}€ / jour</span>
    `;

    // Ajout du contenu à la section 4
    photograph_section4.innerHTML = photographerTotal;

    setTimeout(() => {
      // Boucle pour ajouter les compteurs de likes sur chaque photo
      for (let i = 0; i < this._photographers.length; i++) {
        // eslint-disable-next-line no-undef
        const sommesCountLikes = new Likes(this._photographers[i].likes); // Instanciation d'une classe "Likes" pour gérer le comptage des likes d'un média.
        sommesCountLikes.counterLike(this._photographers[i].likes); // Appel de la méthode "counterLike" pour ajouter un compteur de likes à chaque photo sur la page web.
      }
    }, 50);

    // Renvoi de la section 4 du photographe
    return photograph_section4;
  }
}
