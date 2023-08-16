// Classe responsable de la gestion de la page du photographe
class Photographer {
  constructor() {
    // Obtenir l'ID du photographe à partir du paramètre de requête de l'URL
    const urlParams = new URLSearchParams(document.location.search);
    this.id = parseInt(urlParams.get("id"));

    // Obtenir les différentes sections de la page du photographe
    this.photograph_header = document.querySelector(".photograph_section1");
    this.photograph_filter = document.querySelector(".photograph_section2");
    this.photograph_article = document.querySelector(".photograph_section3");
    this.photograph_total = document.querySelector(".photograph_section4");
    this.photograph_modal = document.querySelector("#contact_modal");
    this.photograph_lightBox = document.querySelector("#lightBox");

    // Créer une nouvelle instance de la classe DataApi avec l'URL du fichier photographers.json
    this.dataApi = new DataApi(`../photographers.json`);
  }

  async main() {
    // Obtenir les données du photographe par ID à partir de DataApi
    const photographerDataById = await this.dataApi.getDataById(this.id);

    // Obtenir les données des médias du photographe par ID à partir de DataApi
    const photographerDataMediaById = await this.dataApi.getDataMediaById(
      this.id
    );

    // Créer le modèle de la section 1 du photographe
    const templateHeaderSection1 = new PhotographerSection1(
      photographerDataById
    );

    // Créer le modèle de la section 2 du photographe
    const templateFilterSection2 = new PhotographerSection2(
      photographerDataMediaById,
      photographerDataById
    );

    // Créer le modèle de la section 3 du photographe pour chaque élément de média et l'ajouter au DOM
    for (let i = 0; i < photographerDataMediaById.length; i++) {
      const templateArticleSection3 = new PhotographerSection3(
        photographerDataMediaById[i],
        photographerDataById
      );
      this.photograph_article.append(
        templateArticleSection3.createPhotographArticleSection3()
      );
    }

    // Créer le modèle de la section 4 du photographe
    const templateTotalSection4 = new PhotographerSection4(
      photographerDataMediaById,
      photographerDataById
    );

    // Créer le modèle de la fenêtre modale du photographe
    const templateModal = new PhotographerModale(photographerDataById);

    // Créer le modèle de la LightBox du photographe
    const templateLightBox = new PhotographerLightBox(
      photographerDataMediaById,
      photographerDataById
    );

    // Ajouter les modèles à leurs sections respectives dans le DOM
    this.photograph_header.append(
      templateHeaderSection1.createPhotographHeaderSection1()
    );

    this.photograph_filter.append(
      templateFilterSection2.createPhotographFilterSection2()
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

// Créer une nouvelle instance de la classe Photographer et appeler sa méthode main pour rendre la page du photographe
const photographer = new Photographer();
photographer.main();
