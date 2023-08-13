//? Création d'une classe HomeCard
// eslint-disable-next-line no-unused-vars
class HomeCard {
  //? Le constructeur prend en paramètre les données de la page d'accueil
  constructor(dataHome) {
    this._photographers = dataHome;
  }

  //? Méthode pour créer une carte de photographe sur la page d'accueil
  createHomeCard() {
    //? Création d'un élément HTML <article> pour la carte
    const photographer_section = document.createElement("article");
    photographer_section.classList.add("card_profile");
    photographer_section.setAttribute("tabindex", "0");

    //? Contenu HTML de la carte
    const homeCard = `
            <a href="./html/photographer.html?id=${this._photographers.id}" title="Visitez la page de profil de : ${this._photographers.name} ? " role="link">
                <img tabindex="0" alt="Photo de profil de ${this._photographers.name}" aria-hidden="true" class='card_picture' src="../assets/photo_profil_home/${this._photographers.portrait}">
                <h2 tabindex="0" class='card_name' aria-label="Nom du photographe" >${this._photographers.name}</h2>
            </a>
            <div tabindex="0" class='cards_info' role="region">
              <span tabindex="0" aria-hidden="true" class='cards_country'>${this._photographers.country}, ${this._photographers.city}</span>
              <p tabindex="0" class='cards_tagline' aria-label="Phrase d'accroche du photographe">${this._photographers.tagline}</p>
              <span tabindex="0" aria-hidden="true" class='cards_price'>${this._photographers.price} € / Jour</span>
            </div>
        `;

    //? Insertion du contenu HTML dans l'élément <article> créé précédemment
    photographer_section.innerHTML = homeCard;

    //? Retourne l'élément <article> créé avec le contenu HTML
    return photographer_section;
  }
}
