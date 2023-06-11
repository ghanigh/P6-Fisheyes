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
async function displayDataGallery(media) {
    const photographerGallery = document.querySelector('.photographer-gallery');
    photographerGallery.innerHTML = '';
    media.forEach((itemMedia, idx) => {
        const photographerGalleryModel = photographerMediaFactory(itemMedia);
        const userGalleryCardDOM = photographerGalleryModel.CreateGalleryDom(idx);
        photographerGallery.appendChild(userGalleryCardDOM);
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
            return media.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                return 1;
            });
        }
    }
}

// L'événement Select et affichage du résultat du tri
function selectData(media) {
    const select = document.querySelector('#select');
    select.addEventListener('change', (e) => {
        const sortedMedia = sortMedia(media, e.target.value);
        displayDataGallery(sortedMedia);
        displayDataLightbox(sortedMedia);
        setGalleryEvent();
    });
}

// L'événement modal Lightbox
function setLightboxEvents(mediaLength) {
    const lightboxModal = document.querySelector(".lightbox-container");
    const lightbox = document.querySelector('.lightbox');
    const lightboxBg = document.querySelector(".lightbox-bg");
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    const closeLightbox = document.querySelector(".lightbox-close");
	const lightboxSlide = document.querySelector('.lightbox li');
	const slideWidth = lightboxSlide.clientWidth;

	    // Demande de suppression du bloc likes/prix suite à l'activation de la Lightbox
		const likesPrices = document.getElementById('likes-price');

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
	
	// Fonction pour afficher la Lightbox en fonction de l'index des photos de la galerie
	function setGalleryEvent() {
		const galleryMedias = document.querySelectorAll('.photographer-gallery-media');
		const lightboxContainer = document.querySelector('.lightbox-container');
		const lightbox = document.querySelector('.lightbox');
		const lightboxBg = document.querySelector('.lightbox-bg');
		const lightboxSlide = document.querySelector('.lightbox li');
		const slideWidth = lightboxSlide.clientWidth;
	
		galleryMedias.forEach((galleryMedia) => {
			galleryMedia.addEventListener('click', (event) => {
				lightboxIdx = parseInt(event.currentTarget.dataset.idx);
				lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;
	
				lightboxContainer.style.visibility = "visible";
				lightboxContainer.style.opacity = 1;
				lightboxBg.style.visibility = 'visible';
			});
		});
	}
	
	// Permet de récupérer les informations du photographe et de les afficher en gérant les événements
	async function init() {
		const { photographer } = await getPhotographer();
		const { media } = await getMedia();
		let sortedMedia = sortMedia(media, 'popularite'); // Par défaut, le select est sur "popularite"
		displayDataPhotographer(photographer);
		displayDataGallery(sortedMedia);
		selectData(media);
		displayDataLightbox(sortedMedia);
		setLightboxEvents(media.length);
		setGalleryEvent();
	}
	
	init();
	