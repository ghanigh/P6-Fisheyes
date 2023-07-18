/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Récupère les identifiants des photographes dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id"));

// L'initialisation de l'index photo "Lightbox"
let lightboxIdx = 0;

// Récupère les datas des différents photographes avec un fetch
async function getPhotographer() {
  const photographers = await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.photographers);
  return {
    photographer: photographers.find((p) => p.id === photographerId),
  };
}

// Récupère les datas MEDIA des différents photographes avec un fetch
async function getMedia() {
  const media = await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.media);
  return {
    media: media.filter((m) => m.photographerId === photographerId),
  };
}

// Page photographe : Afficher les datas liées au profil des photographes
async function displayDataPhotographer(photographer) {
  photographerInfosHeader(photographer);
}

// Affiche les photos dans la galerie dédiée
async function displayDataGalery(media) {
  const photographerGalery = document.querySelector('.photographer-galery');
  photographerGalery.innerHTML = '';
  media.forEach((itemMedia, idx) => {
    const photographerGaleryModel = photographerMediaFactory(itemMedia);
    const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom(idx);
    photographerGalery.appendChild(userGaleryCardDOM);
  });
}

// Affichage de la Lightbox
function displayDataLightbox(medias) {
  const lightbox = document.querySelector('.lightbox');
  lightbox.innerHTML = '';
  medias.forEach((itemMedia) => {
    const photographerLightboxModel = photographerMediaFactory(itemMedia);
    const userLightboxDOM = photographerLightboxModel.createLightboxDOM();
    lightbox.appendChild(userLightboxDOM);
  });
}

// Fonction pour les tris avec le Select
function sortMedia(media, triValue) {
  switch (triValue) {
    case "popularite": {
      return media.sort((a, b) => b.likes - a.likes);
    }
    case "date": {
      return media.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    case "titre": {
      return media.sort((a, b) => a.title.localeCompare(b.title));
    }
    default: {
      return media;
    }
  }
}

// L'événement Select et affichage du résultat du tri
function selectData(media) {
  const select = document.querySelector('#select');
  select.addEventListener('change', (e) => {
    const sortedMedia = sortMedia(media, e.target.value);
    displayDataGalery(sortedMedia);
    displayDataLightbox(sortedMedia);
    setGaleryEvent();
  });
}

// ... autres fonctions existantes ...
function setGaleryEvent() {
  // Code de la fonction setGaleryEvent
  // ...
}

// Fonction pour gérer les événements de la Lightbox
function setLightboxEvents(mediaLength) {
  // Ajoutez ici votre code pour gérer les événements de la Lightbox
}

// Permet de récupérer les informations du photographe et de les afficher en gérant les événements
async function init() {
  const { photographer } = await getPhotographer();
  const { media } = await getMedia();
  let sortedMedia = sortMedia(media, 'popularite'); // Par défaut, le select est sur "popularite"
  displayDataPhotographer(photographer);
  displayDataGalery(sortedMedia);
  selectData(media);
  displayDataLightbox(sortedMedia);
  setLightboxEvents(sortedMedia.length);
}

init();

