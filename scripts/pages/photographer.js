// Récupére les identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 

// L'initialisation de l'index photo "Lightbox"
let lightboxIdx = 0;

// Récupére les datas des différents photographes avec un fetch
async function getPhotographer() {
    const photographers = await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then(data => data.photographers)
	return {
		photographer: photographers.find(p => p.id === photographerId)           
	};
}

// Récupére les datas MEDIA des différents photographes avec un fetch 
async function getMedia() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (media = data.media));
	return {
		media: media.filter(m => m.photographerId === photographerId)         
	};
}

// Page photographe : Afficher les datas liées au profil des protographes
async function displayDataPhotographer(photographer) {
	photographerInfosHeader(photographer);
	photographerInfosContact(photographer)
}

// Affiche les photos dans la gallerie dédiée
async function displayDataGalery(media) {
	const photographerGalery = document.querySelector('.photographer-galery');
	photographerGalery.innerHTML = '';
	media.forEach((itemMedia, idx) => {
		const photographerGaleryModel = photographerMediaFactory(itemMedia);
		const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom(idx);
		photographerGalery.appendChild(userGaleryCardDOM);    
	})
}

// Affichage de la Lightbox
function displayDataLightbox(medias) {
	const lightbox = document.querySelector('.lightbox');
	lightbox.innerHTML = '';
	medias.forEach(itemMedia => {
		const photographerLightboxModel = photographerMediaFactory(itemMedia);
		const userLightboxDOM = photographerLightboxModel.createLightboxDOM();
		lightbox.appendChild(userLightboxDOM);    
	})	
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
				if (a.title < b.title) { return -1; } return 1;
			});
		}
	}
}

// L'évènement Select et affichage du résultat du tri 
function selectData(media) {
    const select = document.querySelector('#select');
    select.addEventListener('change', (e) => {
        const sortedMedia = sortMedia(media, e.target.value);
        displayDataGalery(sortedMedia);
		displayDataLightbox(sortedMedia);
		setGalleryEvent();
    })
}

// l'évènements modale Lightbox
function setLightboxEvents(mediaLength){
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

	// Comportements à l'action bouton echap et flèche précédente, flèche suivante
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
	})

    // Fermeture Lightbox au clic croix
    closeLightbox.addEventListener("click", closeModal);
    // Flèche de gauche, précédente
    prevButton.addEventListener('click', previousSlide)
    // Flèche de droite, suivante
    nextButton.addEventListener('click', nextSlide)

	// Fonction déterminant le comportement de la Lightbox à sa fermeture
	function closeModal() {
		lightboxModal.style.opacity = 0;
		setTimeout(() => {
			lightboxModal.style.visibility = "hidden";
		}, 500)
		lightboxBg.style.visibility = "hidden";
		// Réaffiche le bloc likes/prix après à la fermeture de la Lightbox 
		likesPrices.style.visibility = "visible";
	}

	// Calcul des translations flèche de droite Lightbox, suivante
    function previousSlide() {
        lightboxIdx -= 1
			if (lightboxIdx === -1) {
				lightboxIdx = mediaLength - 1
			}
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }
	// Calcul translation flèche de droite Lightbox, suivante
    function nextSlide() {
        lightboxIdx += 1
			if (lightboxIdx === mediaLength) {
				lightboxIdx = 0
			}
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }

}

// Fonction pour afficher la Lightbox en fonction de l'index des photos de la gallerie
function setGalleryEvent(){
	const galleryMedias = document.querySelectorAll('.photographer-galery-media');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightbox = document.querySelector('.lightbox');
    const lightboxBg = document.querySelector('.lightbox-bg');
    const lightboxSlide = document.querySelector('.lightbox li');
    const slideWidth = lightboxSlide.clientWidth;
	const likesPrices = document.getElementById('likes-price');

// Fonction pour afficher la Lightbox en fonction de l'index des photos de la gallerie
	galleryMedias.forEach((galleryMedia) => {
		galleryMedia.addEventListener('click', (event) => {
            lightboxIdx = parseInt(event.currentTarget.dataset.idx);
			lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;

			lightboxContainer.style.visibility = "visible";
            //lightboxContainer.style.display = 'block';

            lightboxContainer.style.opacity = 1;
			likesPrices.style.visibility = "hidden";

            lightboxBg.style.visibility = 'visible';
			//lightboxBg.style.display = 'block';

			/* Test focus sur le ul
			const ul = document.getElementsByTagName('ul');
			ul.focus();
			*/ 
			const myDiv = document.getElementById('myDiv');
			myDiv.focus();
			const myDiv2 = document.getElementById('myDiv2');
			myDiv2.focus();
			
		})
	})
}

/* Validation console formulaire de contact */
const form = document.getElementById("contact");

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const currentElement = event.target;
    const formFields = Array.from(form.elements);

    const currentIndex = formFields.indexOf(currentElement);

    if (currentIndex < formFields.length - 1) {
      formFields[currentIndex + 1].focus();
      event.preventDefault();
    }
  }
});


// Permet de récupérer les informations du photographe et de les afficher en gérant les événements 
async function init() {
	const { photographer } = await getPhotographer();
	const { media } = await getMedia();
	let sortedMedia = sortMedia(media, 'popularite'); // Par défaut select est sur popularite 
	displayDataPhotographer(photographer);
	displayDataGalery(sortedMedia);
	selectData(media);
	getLikesPrice(media, photographer);
	displayDataLightbox(sortedMedia);
	setLightboxEvents(media.length);
	setGalleryEvent();
	setContactFormEvent()
}
init();

// Événements du formulaire de contact
function setContactFormEvent() {
	const form = document.getElementById("contact");
	form.addEventListener("submit", (event) => {
	  event.preventDefault(); // Empêche la soumission du formulaire
  
	  // Vérification des champs
	  const nameField = document.getElementById("name");
	  const emailField = document.getElementById("email");
	  const messageField = document.getElementById("message");
  
	  if (nameField.value.trim() === "") {
		console.log("Veuillez saisir votre nom.");
		return;
	  }
  
	  if (emailField.value.trim() === "") {
		console.log("Veuillez saisir votre adresse e-mail.");
		return;
	  }
  
	  if (messageField.value.trim() === "") {
		console.log("Veuillez saisir un message.");
		return;
	  }
  
	  // Affichage des valeurs dans la console
	  console.log("Nom:", nameField.value);
	  console.log("Email:", emailField.value);
	  console.log("Message:", messageField.value);
  
	  // Réinitialisation des champs du formulaire
	  form.reset();
	});
  }
  
  