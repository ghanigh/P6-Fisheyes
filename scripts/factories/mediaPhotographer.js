/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
// Fonction récupère les infos du profil du photographe
// eslint-disable-next-line no-unused-vars
function photographerInfosHeader(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");
	const { name, portrait, city, country, tagline } = photographer;
  
	const BlocPhotographerProfile = document.createElement("div");
	BlocPhotographerProfile.classList.add("photographerProfile");
	BlocPhotographerProfile.innerHTML = `<h1 class="photographerName">${name}</h1>
										  <p class="photographerCity">${city}, ${country}</p>
										  <p class="photographerTagline">${tagline}</p>`;
	const photographerPortraitContainer = document.createElement("div");
	photographerPortraitContainer.classList.add("photographer-portrait-container");
	const photographerPortrait = document.createElement("img");
	photographerPortrait.setAttribute("src", `assets/photographers/${portrait}`);
	photographerPortrait.setAttribute("alt", `Photo de ${portrait}`);
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(BlocPhotographerProfile);
	return photographerHeader;
  }
  
  // Permet de mettre à jour la modal de contact avec les informations du photographe (nom)
  // eslint-disable-next-line no-unused-vars
  function photographerInfosContact(photographer) {
	const contactName = document.querySelector("#contact-name");
	const { name } = photographer;
	contactName.innerHTML = `Contactez-moi <br> ${name}`;
  }
  
  // Factory Media permet de trier image et vidéo
  class MediaFactory {
	constructor(media, controls) {
	  this.media = media;
	  this.controls = controls;
	}
  
	render() {
	  if (this.media.image) {
		return `<img class="imgGalery" src="assets/photos/${this.media.photographerId}/${this.media.image}" alt="${this.media.title}">`;
	  } else {
		// Affiche de manière conditionnelle les controles de vidéo (non affichés en galerie, affichés en Lightbox)
		const video = document.createElement('video');
		video.innerHTML = `<source src="assets/photos/${this.media.photographerId}/${this.media.video}" type="video/mp4">`;
		video.classList.add('imgGalery');
		if (this.controls) {
		  video.setAttribute('controls', '');
		}
		return video.outerHTML;
	  }
	}
  }
  
  // Fonction pour la création de la galerie photos des photographes
  function photographerMediaFactory(media) {
	const { title } = media;
	let likes = media.likes;
  
	// DOM lightbox
	function createLightboxDOM() {
	  const mediaItem = document.createElement('li');
	  const mediaFactory = new MediaFactory(media, true);
	  const mediaTitle = document.createElement('h2');
	  mediaTitle.innerText = title;
	  mediaItem.innerHTML = mediaFactory.render();
	  mediaItem.appendChild(mediaTitle);
	  return mediaItem;
	}
  
	// DOM galerie
	function CreateGaleryDom(idx) {
	  const BlocPhotographerGalery = document.querySelector(".photographer-galery");
	  BlocPhotographerGalery.classList.add("container");
	  const photographerArticle = document.createElement("article");
	  photographerArticle.classList.add("photographer-galery-item");
	  const photographerMedia = document.createElement("a");
	  photographerMedia.setAttribute('href', "#");
	  photographerMedia.setAttribute("aria-controls", "modal");
	  photographerMedia.setAttribute("aria-label", `${title}`);
	  document.addEventListener('DOMContentLoaded', () => {
  // Votre code ici, y compris l'ajout de l'écouteur d'événement pour les likes
});

  
	  // Ajout des informations de la photo
	  const photographerArticleInfos = document.createElement("div");
	  photographerArticleInfos.classList.add("photographer-galery-item-info");
	  const photographerArticleTitle = document.createElement("h2");
	  photographerArticleTitle.classList.add("title-photo");
	  photographerArticleTitle.textContent = title;
	  photographerArticleInfos.appendChild(photographerArticleTitle);
	  // Ajout des likes sur les photos
	  const likesElement = document.createElement('button');
	  likesElement.classList.add("btn-like-photo");
	  const likesHeart = document.createElement('i');
	  likesHeart.classList = "fas fa-heart";
	  const likesCount = document.createElement('span');
	  likesCount.innerText = likes;
	  likesElement.appendChild(likesCount);
	  likesElement.appendChild(likesHeart);
	  photographerArticleInfos.appendChild(likesElement);
  
	  // Appel Media factory pour créer les vignettes
	  const mediaFactory = new MediaFactory(media, false);
	  photographerMedia.classList.add('photographer-galery-media');
	  photographerMedia.setAttribute('data-idx', idx);
	  photographerMedia.innerHTML = mediaFactory.render();
  
	  photographerArticle.appendChild(photographerMedia);
	  photographerArticle.appendChild(photographerArticleInfos);
  
	  /* Ajout du clic pour un like par photo */
	  likesElement.addEventListener('click', () => {
		likes += 1;
		likesCount.innerText = likes;
		const totalLike = document.querySelector('.total-like');
		if (totalLike !== null) {
		  totalLike.innerText = parseInt(totalLike.innerText) + 1;
		} else {
		  console.error("L'élément avec la classe 'total-like' n'a pas été trouvé.");
		}
		likesElement.setAttribute('disabled', ''); // Ajouter un aria disabled une fois l'action effectuée pour indiquer à l'utilisateur qu'il ne peut liker qu'une fois chaque cliché
	  });
	  
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  return photographerArticle;
	}
	return { CreateGaleryDom, createLightboxDOM };
  }
  
  /* Création du bloc likes et prix total en bas de la page */
  // eslint-disable-next-line no-unused-vars
  function getLikesPrice(media, photographer) {
	const blocLikesPrice = document.querySelector("#likes-price");
  
	/* Affichage des likes totaux */
	const photographerLikes = document.createElement("div");
	photographerLikes.className = "bloc-likes";
	blocLikesPrice.appendChild(photographerLikes);
	const totalLike = document.createElement("span");
	totalLike.className = "total-like";
	photographerLikes.appendChild(totalLike);
	const photographerLikesHeart = document.createElement("i");
	photographerLikesHeart.className = "fas fa-heart";
	photographerLikes.appendChild(photographerLikesHeart);
  
	// Calcul de l'affichage des likes totaux
	const likeCount = media.reduce((acc, curr) => acc + curr.likes, 0);
	totalLike.innerHTML = likeCount;
  
	/* Affichage du prix journalier des photographes */
	const photographerPrice = document.createElement("span");
	photographerPrice.setAttribute("aria-label", "Tarif journalier du photographe");
	photographerPrice.className = "photographer-price";
	blocLikesPrice.appendChild(photographerPrice);
	photographerPrice.innerHTML = `${photographer.price}€ / jour`;
  }
  
// Affichage de la modal lightbox
const lightboxModal = document.querySelector(".lightbox-container");

function displayLightbox(imageUrl) {
  const lightboxImage = lightboxModal.querySelector('.lightbox img');
  lightboxImage.setAttribute('src', imageUrl);

  lightboxModal.setAttribute('aria-hidden', 'false');
  document.querySelector("body").style.overflow = "hidden";
}

