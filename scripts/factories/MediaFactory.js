// eslint-disable-next-line no-unused-vars
class MediaFactory {
  createMedia(photographerDataMediaById, photographerDataById) {
   
    //? Vérifier si le media est une image
    // eslint-disable-next-line no-prototype-builtins
    if (photographerDataMediaById.hasOwnProperty("image")) {
      return new ImageMedia(photographerDataMediaById, photographerDataById);
    //? Si ce n'est pas une image, vérifier si c'est une vidéo
    // eslint-disable-next-line no-prototype-builtins
    } else if (photographerDataMediaById.hasOwnProperty("video")) {
      return new VideoMedia(photographerDataMediaById, photographerDataById);
    } else {
      //? Si le type de média est inconnu, lever une erreur
      throw new Error("Unknown media type");
    }
  }
}

class ImageMedia {
  constructor(photographerDataMediaById, photographerDataById) {
    //? Définir les propriétés d'une image
    this.type = "image";
    this.src = `../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.image}`;
    this.alt = photographerDataMediaById.title;
  }
}

class VideoMedia {
  constructor(photographerDataMediaById, photographerDataById) {
    //? Définir les propriétés d'une vidéo
    this.type = "video";
    this.src = `../assets/profil_photographers/${photographerDataById.name}/${photographerDataMediaById.video}`;
    this.alt = photographerDataMediaById.title;
  }
}