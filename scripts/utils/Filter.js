// eslint-disable-next-line no-unused-vars
// Classe pour gérer les fonctionnalités de filtrage des médias
class Filter {
  constructor(photographerDataMediaById) {
    // Initialisation des éléments de l'interface utilisateur nécessaires pour le filtre

    // Bouton qui ouvre le filtre
    this._btnFilterOpen = document.querySelector("#btnOpenFilter");
    // Le texte qui change pour indiquer l'état actuel du bouton
    this._toggleTxt = document.querySelector("#btnOpenFilter span");
    // Conteneur pour le menu déroulant des filtres
    this._container_select = document.querySelector(".container-select");
    // Liste déroulante contenant les options de filtre
    this._ul = document.querySelector(".container-select ul");
    // Bouton pour fermer le filtre
    this._btnFilterClose = document.querySelector("#iconCloseFilter");

    // Options de filtre pour trier les médias
    this._filterPopularité = document.querySelector("#popularité");
    this._filterDate = document.querySelector("#date");
    this._filterTitre = document.querySelector("#titre");

    // État actif du filtre
    this._activeFilter = null;

    // Éléments pour la Lightbox
    this._modalLightBox = document.querySelector("#lightBox");
    this._media = document.querySelector(
      `.media-${photographerDataMediaById.id}`
    );
  }

  // Méthode pour initialiser l'ouverture du filtre lorsqu'on clique sur le bouton d'ouverture
  openFilterInit() {
    this._btnFilterOpen.addEventListener("click", (e) => {
      e.preventDefault();
      this._container_select.style.display = "block";
    });

    // Également gérer l'ouverture du filtre lorsque la touche "Enter" est pressée
    this._btnFilterOpen.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._container_select.style.display = "block";
      }
    });
  }

  // Méthode pour initialiser la fermeture du filtre lorsqu'on clique sur le bouton de fermeture
  closeFilterInit() {
    this._btnFilterClose.addEventListener("click", (e) => {
      e.preventDefault();
      this._container_select.style.display = "none";
    });

    // Également gérer la fermeture du filtre lorsque la touche "Enter" est pressée
    this._btnFilterClose.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._container_select.style.display = "none";
      }
    });
  }

  // Méthode pour définir l'élément de filtre actif, mettre à jour l'affichage et le tri des médias
  setActiveFilter(filterElement) {
    if (this._activeFilter !== filterElement) {
      if (this._activeFilter) {
        this._activeFilter.classList.remove("active");
      }
      filterElement.classList.add("active");
      this._ul.insertBefore(filterElement, this._ul.firstChild);
      this._activeFilter = filterElement;
      this._toggleTxt.textContent = filterElement.textContent;
    }
  }

  // Méthode pour trier les médias par popularité, mettre à jour l'affichage et le tri des médias
  filterPopularité(photographerDataMediaById, photographerDataById) {
    this._filterPopularité.addEventListener("click", (e) => {
      // ... (logique du filtrage par popularité)
    });

    // Écouter également la touche "Enter" pour activer le filtrage par popularité
    this._filterPopularité.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        // ... (logique du filtrage par popularité)
      }
    });
  }

  // Méthode pour trier les médias par date, mettre à jour l'affichage et le tri des médias
  filterDate(photographerDataMediaById, photographerDataById) {
    this._filterDate.addEventListener("click", (e) => {
      // ... (logique du filtrage par date)
    });

    // Écouter également la touche "Enter" pour activer le filtrage par date
    this._filterDate.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        // ... (logique du filtrage par date)
      }
    });
  }

  // Méthode pour trier les médias par titre, mettre à jour l'affichage et le tri des médias
  filterTitre(photographerDataMediaById, photographerDataById) {
    this._filterTitre.addEventListener("click", (e) => {
      // ... (logique du filtrage par titre)
    });

    // Écouter également la touche "Enter" pour activer le filtrage par titre
    this._filterTitre.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        // ... (logique du filtrage par titre)
      }
    });
  }
}
