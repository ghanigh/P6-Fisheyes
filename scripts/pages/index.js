// Récupérer les datas des différents photographes avec un fetch
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  return {
    photographers: [...photographers]
  };
}

// Fonction pour afficher les Cards photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction pour la compilation des fonctions de récupération et d'affichage des datas
async function init() {
  // Récupère toutes les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

// Event Listener pour le chargement de la page
window.addEventListener('DOMContentLoaded', function() {
  init();
});