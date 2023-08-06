/* eslint-disable no-unused-vars */
// Afficher la modal de contact
function displayModal() {
  const modal = document.getElementById("contact-modal");
  const main = document.getElementById("main");
  
  modal.style.display = "block";
  if (modal.hasAttribute("aria-hidden") && main.hasAttribute("aria-hidden")) {
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
  }
  const prenom = document.querySelector("#prenom");
  prenom.focus();
}

// Fermeture de la modal de contact
function closeModal() {
  const modal = document.getElementById("contact-modal");
  const main = document.getElementById("main");
  
  modal.style.display = "none";
  if (modal.hasAttribute("aria-hidden") && main.hasAttribute("aria-hidden")) {
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
  }
}

// Fermeture avec la touche échap
window.addEventListener("keyup", (e) => {
  const modal = document.getElementById("contact-modal");
  if (modal.getAttribute("aria-hidden") === "false" && e.key === "Escape") {
    closeModal();
  }
});

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

  