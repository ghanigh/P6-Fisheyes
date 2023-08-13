//? Classe qui gère la page d'accueil des photographes
class Home {
  constructor() {
    //? Récupère la section où les cartes des photographes seront affichées
    this.photographer_home = document.querySelector(".photographer_section");
    //? Instancie une API de données avec le chemin du fichier JSON contenant les données des photographes
    // eslint-disable-next-line no-undef
    this.dataApi = new DataApi("./photographers.json");
  }

  //? Fonction principale qui affiche toutes les cartes de photographes sur la page d'accueil
  async main() {
    //? Récupère toutes les données de tous les photographes depuis l'API de données
    const photographersDataAll = await this.dataApi.getDataAll();

    //? Parcourt toutes les données de chaque photographe et crée une carte pour chacun
    photographersDataAll.forEach((dataHome) => {
      //? Crée une carte de photographe en utilisant la classe HomeCard et les données de chaque photographe
      // eslint-disable-next-line no-undef
      const TemplateHome = new HomeCard(dataHome);
      //? Ajoute la carte créée à la section d'accueil des photographes
      this.photographer_home.append(TemplateHome.createHomeCard());
    });
  }
}

//? Instancie la classe Home et appelle la fonction principale pour afficher toutes les cartes de photographes sur la page d'accueil
const home = new Home();
home.main();