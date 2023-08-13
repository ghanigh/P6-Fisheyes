// eslint-disable-next-line no-unused-vars
class PhotographerSection2 {
  constructor(photographerDataMediaById, photographerDataById) {
    this._photographers = photographerDataMediaById; //? Tableau contenant les les media des photographes
    this._photographers2 = photographerDataById; //? Tableau contenant les données des photographes
  }

  createPhotographFilterSection2() {
    //? Crée une nouvelle div qui contiendra les éléments de la section de filtre des photographes
    const photograph_section2 = document.createElement("div");
    //? Ajoute la classe "sort-container" à la nouvelle div
    photograph_section2.classList.add("sort-container");

    //? Crée une chaîne de caractères qui contient le code HTML des éléments de la section de filtre des photographes
    const photographerFilter = `
      <div class='container-btn-select'>
        <label tabindex="0" for="sort-select">Trier par : </label>
        <button id='btnOpenFilter' aria-label='Bouton pour ouvrir le menu déroulant' type='button'><span>Popularité</span><i tabindex="0" class="arrows fas fa-chevron-down"></i></button>
      </div>
       <div class='container-select' aria-expanded="false" aria-labelledby="btnOpenFilter">
          <ul id="sort-select role="menu" tabindex="0">
            <li id='popularité' tabindex="0" role="menuitem" aria-current="true">Popularité</li>
            <li id='date' tabindex="0" role="menuitem">Date</li>
            <li id='titre' tabindex="0" role="menuitem">Titre</li>
          </ul>
          <span tabindex="0" id='iconCloseFilter' class="arrows fas fa-chevron-up"></span>
       </div>
    `;

    photograph_section2.innerHTML = photographerFilter;

    //? Attend 50 millisecondes avant d'exécuter la boucle pour que les éléments de la section de filtre soient prêts
    setTimeout(() => {
      //? Boucle pour chaque photographe dans le tableau des photographies
      for (let i = 0; i < this._photographers.length; i++) {
        // eslint-disable-next-line no-undef
        const filter = new Filter(this._photographers[i], this._photographers);

        //? Crée une instance de la classe "Filter"
        filter.openFilterInit(); //? Initialise l'ouverture du filtre
        filter.closeFilterInit(); //? Initialise la fermeture du filtre
        filter.filterPopularité(this._photographers, this._photographers2); //? Filtre les photographies par popularité
        filter.filterDate(this._photographers, this._photographers2); //? Filtre les photographies par date
        filter.filterTitre(this._photographers, this._photographers2); //? Filtre les photographies par titre
      }
    }, 50);

    //? Retourne la nouvelle div contenant les éléments de la section de filtre des photographes
    return photograph_section2;
  }
}
