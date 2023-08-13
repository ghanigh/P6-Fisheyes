// eslint-disable-next-line no-undef
const modal = document.getElementById("contact-modal");

// Afficher la modal de contact
function displayModal() {
  modal.style.display = "block";
  if (modal.hasAttribute("aria-hidden")) {
    modal.setAttribute("aria-hidden", "false");
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("aria-hidden", "true");
    }
    const prenom = document.querySelector('#prenom');
    prenom.focus();
  }
}

// Fermeture de la modal de contact 
function closeModal() {
  modal.style.display = "none";
  if (modal.hasAttribute("aria-hidden")) {
    modal.setAttribute("aria-hidden", "true");
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("aria-hidden", "false");
    }
  }
}

// Fermeture avec la touche échap
window.addEventListener("keyup", (e) => {
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
  closeModal();
}
