// eslint-disable-next-line no-unused-vars
class Likes {
  constructor(photographerDataLikes) {
    //? Initialise _isLiked à false par défaut
    this._isLiked = false;
    //? Initialise _totalLikes à 0 par défaut
    this._totalLikes = 0;
    //? Trouve l'élément avec l'ID 'likes-{photographerDataLikes}'
    this._toggleLike = document.querySelector(
      `#likes-${photographerDataLikes}`
    );
    //? Trouve l'élément avec la classe 'countLikes-{photographerDataLikes}'
    this._countLikes = document.querySelector(
      `.countLikes-${photographerDataLikes}`
    );
    //? Trouve l'élément avec l'ID 'sommeslikes'
    this._totalCountLikes = document.querySelector(`#sommeslikes`);
  }

  incrementTotalLikes() {
    //? Récupère la valeur de la propriété 'data-likes' de l'élément _totalCountLikes
    let totalLikes = this._totalCountLikes.dataset.likes;
    //? Incrémente la valeur de totalLikes de 1
    totalLikes = parseInt(totalLikes) + 1;
    //? Met à jour l'attribut 'aria-label' de l'élément _totalCountLikes avec le nombre total de likes mis à jour
    this._totalCountLikes.setAttribute(
      "aria-label",
      `Nombre de likes : ${totalLikes}`
    );
    //? Met à jour le contenu HTML de l'élément _totalCountLikes pour afficher le nombre total de likes mis à jour
    this._totalCountLikes.querySelector(".nbTotalLikes").innerHTML = totalLikes;
    //? Met à jour la propriété 'data-likes' de l'élément _totalCountLikes avec le nombre total de likes mis à jour
    this._totalCountLikes.dataset.likes = totalLikes;
  }


  decrementTotalLikes() {
    //? Récupère la valeur de la propriété 'data-likes' de l'élément _totalCountLikes
    let totalLikes = this._totalCountLikes.dataset.likes;
    //? Décrémente la valeur de totalLikes de 1
    totalLikes = parseInt(totalLikes) - 1;
    //? Met à jour l'attribut 'aria-label' de l'élément _totalCountLikes avec le nombre total de likes mis à jour
    this._totalCountLikes.setAttribute(
      "aria-label",
      `Nombre de likes : ${totalLikes}`
    );
    //? Met à jour le contenu HTML de l'élément _totalCountLikes pour afficher le nombre total de likes mis à jour
    this._totalCountLikes.querySelector(".nbTotalLikes").innerHTML = totalLikes;
    //? Met à jour la propriété 'data-likes' de l'élément _totalCountLikes avec le nombre total de likes mis à jour
    this._totalCountLikes.dataset.likes = totalLikes;
  }

  
  counterLike(photographerDataLikes) {
    //? Écoute un événement de clic sur _toggleLike
    this._toggleLike.addEventListener("click", (e) => {
      //? Empêche l'action par défaut de cliquer sur un lien
      e.preventDefault();
      //? Si la photo est actuellement aimée
      if (this._isLiked) {
        photographerDataLikes -= 1; //? Diminue le nombre de likes de 1
        this.decrementTotalLikes(); //? Appelle une méthode pour diminuer le nombre total de likes de 1
        this._isLiked = false; //? Définit _isLiked à false
      } else {
        //? Si la photo n'est actuellement pas aimée
        photographerDataLikes += 1; //? Augmente le nombre de likes de 1
        this.incrementTotalLikes(); //? Appelle une méthode pour augmenter le nombre total de likes de 1
        this._isLiked = true; //? Définit _isLiked à true
      }
      this._countLikes.innerHTML = `${photographerDataLikes}`; //? Met à jour le contenu HTML de _countLikes pour afficher le nombre de likes mis à jour
    });

    this._toggleLike.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        //? Empêche l'action par défaut de cliquer sur un lien
        e.preventDefault();
        //? Si la photo est actuellement aimée
        if (this._isLiked) {
          photographerDataLikes -= 1; //? Diminue le nombre de likes de 1
          this.decrementTotalLikes(); //? Appelle une méthode pour diminuer le nombre total de likes de 1
          this._isLiked = false; //? Définit _isLiked à false
        } else {
          //? Si la photo n'est actuellement pas aimée
          photographerDataLikes += 1; //? Augmente le nombre de likes de 1
          this.incrementTotalLikes(); //? Appelle une méthode pour augmenter le nombre total de likes de 1
          this._isLiked = true; //? Définit _isLiked à true
        }
        this._countLikes.innerHTML = `${photographerDataLikes}`; //? Met à jour le contenu HTML de _countLikes pour afficher le nombre de likes mis à jour
      }
    });
  }
}
