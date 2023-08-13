class Photographer {
  constructor() {
    //? Obtenir l'ID du photographe à partir du paramètre de requête de l'URL
    const url = new URLSearchParams(document.location.search);
    this.id = parseInt(url.get("id"));

    //? Obtenir les différentes sections de la page du photographe
    this.photograph_header = document.querySelector(".photograph_section1");
    this.photograph_filter = document.querySelector(".photograph_section2");
    this.photograph_article = document.querySelector(".photograph_section3");
    this.photograph_total = document.querySelector(".photograph_section4");
    this.photograph_modal = document.querySelector("#contact_modal");
    this.photograph_lightBox = document.querySelector("#lightBox");

    //? Créer une nouvelle instance de la classe DataApi avec l'URL du fichier photographers.json
    // eslint-disable-next-line no-undef
    this.dataApi = new DataApi(`../photographers.json`);
  }

  async main() {
    //? Obtenir les données du photographe par ID à partir de DataApi
    const photographerDataById = await this.dataApi.getDataById(this.id);

    //? Obtenir les données des médias du photographe par ID à partir de DataApi
    const photographerDataMediaById = await this.dataApi.getDataMediaById(
      this.id
    );

    //? Créer le modèle de section 1 du photographe
    // eslint-disable-next-line no-undef
    const templateHeaderSection1 = new PhotographerSection1(
      photographerDataById
    );

    //? Créer le modèle de section 2 du photographe
    // eslint-disable-next-line no-undef
    const templatefilterSection2 = new PhotographerSection2(
      photographerDataMediaById,
      photographerDataById
    );


    //? Créer le modèle de section 3 du photographe pour chaque élément de média et l'ajouter au DOM
    for (let i = 0; i < photographerDataMediaById.length; i++) {
      // eslint-disable-next-line no-undef
      const templateArticleSection3 = new PhotographerSection3(
        photographerDataMediaById[i],
        photographerDataById
      );
      this.photograph_article.append(
        templateArticleSection3.createPhotographArticleSection3()
      );
    }

    //? Créer le modèle de section 4 du photographe
    // eslint-disable-next-line no-undef
    const templateTotalSection4 = new PhotographerSection4(
      photographerDataMediaById,
      photographerDataById
    );

    //? Créer le modèle de la fenêtre modale du photographe
    // eslint-disable-next-line no-undef
    const templateModal = new PhotographerModale(photographerDataById);

    //? Créer le modèle de la LightBox du photographe
    // eslint-disable-next-line no-undef
    const templateLightBox = new PhotographerLightBox(
      photographerDataMediaById,
      photographerDataById
    );

    //? Ajouter les modèles à leurs sections respectives dans le DOM
    this.photograph_header.append(
      templateHeaderSection1.createPhotographHeaderSection1()
    );

    this.photograph_filter.append(
      templatefilterSection2.createPhotographFilterSection2()
    );

    this.photograph_total.append(
      templateTotalSection4.createPhotographTotalSection4()
    );

    this.photograph_modal.append(templateModal.createPhotographerModale());

    this.photograph_lightBox.append(
      templateLightBox.createPhotographerLightBox()
    );
  }
}

//? Créer une nouvelle instance de la classe Photographer et appeler sa méthode main pour rendre la page du photographe
const photographer = new Photographer();
photographer.main();