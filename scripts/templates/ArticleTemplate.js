//? Désactive l'avertissement de linter indiquant que la variable n'est pas utilisée
// eslint-disable-next-line no-unused-vars
class PhotographerSection3 {
  constructor(photographerDataMediaById, photographerDataById) {
    //? Stocke les données des médias du photographe et les données du photographe dans des variables pour une utilisation ultérieure
    this._photographers = photographerDataMediaById;
    this._photographers2 = photographerDataById;
  }

  createPhotographArticleSection3() {
    //? Crée un nouvel élément article pour stocker la section 3 de la page photographe
    const photograph_section3 = document.createElement("article");
    photograph_section3.classList.add("section3_articles");

    //? Crée une instance de la classe MediaFactory pour récupérer les informations du media du photographe
    // eslint-disable-next-line no-undef
    const mediaFactory = new MediaFactory();
    const media = mediaFactory.createMedia(
      this._photographers,
      this._photographers2
    );

    //? Crée le HTML de la section 3 pour un média en utilisant les informations récupérées
    const photographerArticle = `
      <figure title=${this._photographers.title} tabindex="0">
   
          ${
            media.type === "image"
              ? `<img class='media-${this._photographers.id}' tabindex="0" alt="${media.alt}" src="${media.src}">`
              : media.type === "video"
              ? `<video class='media-${this._photographers.id}' tabindex="0" alt="${media.alt}" aria-label="${media.alt}"  src="${media.src}"></video>`
              : ""
          }
   
          <figcaption tabindex="0">
            <p tabindex="0" class='article_title'>${
              this._photographers.title
            }</p>
            <div class='articles_likes'>
              <span tabindex="0" class='countLikes-${
                this._photographers.likes
              }'  aria-label='Nombre de likes : ${this._photographers.likes}'>${
      this._photographers.likes
    }</span>
              <i tabindex="0" id='likes-${
                this._photographers.likes
              }' class="heart fas fa-heart" aria-label="Ajouter un like"></i>
            </div>
          </figcaption>
      </figure>
    `;

    //? Ajoute le HTML à l'élément article créé précédemment
    photograph_section3.innerHTML = photographerArticle;

    //? Retourne l'élément article avec le HTML créé
    return photograph_section3;
  }
}
