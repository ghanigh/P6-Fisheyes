// Fonction de création des Cards photographes contenant leurs informations personnelles
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;
  
    // Création du DOM des Cards photographe
    function getUserCardDOM() {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const a = document.createElement("a");
      a.setAttribute("href", `photographer.html?id=${id}`);
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      const h2 = document.createElement("h2");
      h2.textContent = name;
      const location = document.createElement("p");
      location.textContent = `${city}, ${country}`;
      const tagLine = document.createElement("span");
      tagLine.classList.add("tagLine");
      tagLine.textContent = tagline;
      const prices = document.createElement("span");
      prices.textContent = `${price}€/jour`;
      prices.classList.add("prices");
  
      a.appendChild(img);
      a.appendChild(h2);
      article.appendChild(a);
      article.appendChild(location);
      article.appendChild(tagLine);
      article.appendChild(prices);
  
      return article;
    }
  
    return { name, picture, getUserCardDOM };
  }
  
  // Récupération des valeurs du formulaire de contact
  const form = document.getElementById("contact");
  form.addEventListener("submit", handleSubmit);
  
  function handleSubmit(event) {
    event.preventDefault();
  
    // Récupération des valeurs des champs du formulaire
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    // Validation des champs (ajoutez vos propres conditions de validation ici)
    if (firstName === "" || lastName === "" || email === "" || message === "") {
      console.log("Veuillez remplir tous les champs du formulaire.");
      return;
    }
  
    // Envoyer les données du formulaire à votre backend ou effectuer toute autre action nécessaire
    console.log("Données du formulaire :", firstName, lastName, email, message);
  
    // Réinitialiser le formulaire
    form.reset();
  }
  
  // Dans le fichier photographer.js
  
  // Déclaration de l'objet photographerGaleryModel
  // eslint-disable-next-line no-unused-vars
  const photographerGaleryModel = {
    // Autres propriétés et méthodes de l'objet...
  
    // Fonction pour créer la galerie des photos du photographe
    CreateGaleryDom: function () {
      // Implémentation de la fonction...
    }
  };
  