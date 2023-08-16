// Classe qui fabrique des instances de média en fonction de leur type (image ou vidéo)
class MediaFactory {
  // Méthode pour créer un média en fonction de ses propriétés
  createMedia(photographerDataMediaById, photographerDataById) {
    // Vérifier si le media est une image
    if (photographerDataMediaById.hasOwnProperty("image")) {
      return new ImageMedia(photographerDataMediaById, photographerDataById);
    // Si ce n'est pas une image, vérifier si c'est une vidéo
    } else if (photographerDataMediaById.hasOwnProperty("video")) {
      return new VideoMedia(photographerDataMediaById, photographerDataById);
    } else {
      // Si le type de média est inconnu, lever une erreur
      throw new Error("Unknown media type");
    }
  }
}

// Classe représentant un média de type image
class ImageMedia {
  constructor(photographerDataMediaById, photographerDataById) {
    // Définir les propriétés d'une image
    this.type = "image";
    this.src = `../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}`;
    this.alt = photographerDataMediaById.title;
  }
}

// Classe représentant un média de type vidéo
class VideoMedia {
  constructor(photographerDataMediaById, photographerDataById) {
    // Définir les propriétés d'une vidéo
    this.type = "video";
    this.src = `../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}`;
    this.alt = photographerDataMediaById.title;
  }
}
