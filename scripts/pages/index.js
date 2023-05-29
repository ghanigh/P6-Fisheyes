// Récupérer les datas des différents photographes avec un fetch
async function getPhotographers() {
    await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers: [...photographers]            
  };
  }
  
  // Fonction pour afficher les Cards photographes
  async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
  
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
  };
  
  // Fonction pour la compilation des fonctions de récupération et d'affichage des datas
  async function init() {
    // Récupère toutes les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  };  
  
  init();