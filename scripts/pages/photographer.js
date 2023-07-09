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

// Fonction pour afficher la Lightbox en fonction de l'index des photos de la galerie
function setGaleryEvent() {
  const galeryMedias = document.querySelectorAll('.photographer-galery-media');
  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightbox = document.querySelector('.lightbox');
  const lightboxBg = document.querySelector('.lightbox-bg');
  const lightboxSlide = document.querySelector('.lightbox li');
  const slideWidth = lightboxSlide.clientWidth;

  galeryMedias.forEach((galeryMedia) => {
    galeryMedia.addEventListener('click', (event) => {
      lightboxIdx = parseInt(event.currentTarget.dataset.idx);
      lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;

      lightboxContainer.style.visibility = "visible";
      lightboxContainer.style.opacity = 1;
      lightboxBg.style.visibility = 'visible';
    });
  });
}

// Fonction pour afficher la Lightbox en fonction de l'index des photos de la galerie
function previousSlide() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxSlide = document.querySelector('.lightbox li');
  const slideWidth = lightboxSlide.clientWidth;
  lightboxIdx = (lightboxIdx - 1 + lightbox.children.length) % lightbox.children.length;
  lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;
}

// Fonction pour afficher la Lightbox en fonction de l'index des photos de la galerie
function nextSlide() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxSlide = document.querySelector('.lightbox li');
  const slideWidth = lightboxSlide.clientWidth;
  lightboxIdx = (lightboxIdx + 1) % lightbox.children.length;
  lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;
}

// L'événement modal Lightbox
function setLightboxEvents(mediaLength) {
  const lightboxModal = document.querySelector(".lightbox-container");
  const lightbox = document.querySelector('.lightbox');
  const lightboxBg = document.querySelector(".lightbox-bg");
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  const closeLightbox = document.querySelector(".lightbox-close");
  
  // Comportements à l'action bouton échap et flèche précédente, flèche suivante
  const keyCodes = {
  escape: "Escape",
  previous: "ArrowLeft",
  next: "ArrowRight"
  };
  
  window.addEventListener('keydown', (event) => {
  if (event.code === keyCodes.escape) {
  closeModal();
  }
  if (event.code === keyCodes.previous) {
  previousSlide();
  }
  if (event.code === keyCodes.next) {
  nextSlide();
  }
  });
  
  // Fermeture Lightbox au clic sur la croix
  closeLightbox.addEventListener("click", closeModal);
  // Flèche de gauche, précédente
  prevButton.addEventListener('click', previousSlide);
  // Flèche de droite, suivante
  nextButton.addEventListener('click', nextSlide);
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
  setEvent();
  }
  
  init();
