//? Classe de base pour interagir avec une API de données
class Api {
  //? Constructeur qui prend une URL de base pour l'API
  constructor(url) {
    this._url = url;
  }

  //? Méthode pour récupérer tous les photographes depuis l'API
  async getPhotographerAll() {
    try {
      const res = await fetch(this._url); //? Envoie une requête HTTP GET à l'URL de base de l'API
      const data = await res.json(); //? Transforme la réponse en objet JSON

      console.log(data); //? Affiche les données dans la console (utile pour le débogage)

      const photographerAll = data.photographers; //? Extrait le tableau de tous les photographes de l'objet JSON
      return photographerAll; //? Renvoie le tableau de tous les photographes
    } catch (err) {
      //? En cas d'erreur, lance une exception avec un message d'erreur et l'erreur d'origine
      throw new Error("Error fetching data:", err);
    }
  }

  //? Méthode pour récupérer un photographe spécifique depuis l'API, en utilisant son ID
  async getPhotographerById(id) {
    try {
      const res = await fetch(this._url); //? Envoie une requête HTTP GET à l'URL de base de l'API
      const data = await res.json(); //? Transforme la réponse en objet JSON

      const photographerById = data.photographers.find( //? Recherche le photographe avec l'ID spécifié
        (dataPhotographer) => dataPhotographer.id === id
      );
      return photographerById; //? Renvoie le photographe trouvé
    } catch (err) {
      //? En cas d'erreur, lance une exception avec un message d'erreur et l'erreur d'origine
      throw new Error("Error fetching data :", err);
    }
  }

  //? Méthode pour récupérer tous les médias d'un photographe spécifique depuis l'API, en utilisant son ID
  async getMediaById(id) {
    try {
      const res = await fetch(this._url); //? Envoie une requête HTTP GET à l'URL de base de l'API
      const data = await res.json(); //? Transforme la réponse en objet JSON

      const photographerMediaById = data.media.filter( //? Filtre les médias pour ne garder que ceux du photographe avec l'ID spécifié
        (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
      );

      return photographerMediaById; //? Renvoie le tableau de médias filtré
    } catch (err) {
      //? En cas d'erreur, lance une exception avec un message d'erreur et l'erreur d'origine
      throw new Error("Error fetching data:", err);
    }
  }
}


//? Sous-classe qui étend la classe de base Api pour fournir des méthodes plus spécifiques
// eslint-disable-next-line no-unused-vars
class DataApi extends Api {
  constructor(url) {
    super(url); //? Appelle le constructeur de la classe de base avec l'URL fournie
  }

  //? Récupère tous les photographes
  async getDataAll() {
    return await this.getPhotographerAll();
  }

  //? Récupère un photographe selon l'ID fourni en paramètre
  async getDataById(id) {
    return await this.getPhotographerById(id);
  }

  //? Récupère tous les médias d'un photographe selon l'ID fourni en paramètre
  async getDataMediaById(id) {
    return await this.getMediaById(id);
  }
}