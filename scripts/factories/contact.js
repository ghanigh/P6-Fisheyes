const modal = document.getElementById("contact-modal");

// Afficher la modal de contact
function displayModal() {
  const modal = document.getElementById("contact-modal");
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
  modal.style.display = "none";
  if (modal.hasAttribute("aria-hidden") && main.hasAttribute("aria-hidden")) {
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
  }
}

// Fermeture avec la touche échap
window.addEventListener("keyup", (e) => {
  if (modal.getAttribute("aria-hidden") === "false" && e.key === "Escape") {
    closeModal();
  }
});

// Fonction pour afficher un message d'erreur sous un champ
function displayFieldError(field, message) {
  const errorContainer = field.nextElementSibling;
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
}

// Fonction pour masquer les messages d'erreur sous tous les champs
function hideFieldErrors() {
  const errorContainers = document.querySelectorAll(".field-error");
  errorContainers.forEach((container) => {
    container.textContent = "";
    container.style.display = "none";
  });
}

// Événements du formulaire de contact
function setContactFormEvent() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire

    // Vérification des champs
    const prenomField = document.getElementById("prenom");
    const nomField = document.getElementById("nom");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const errors = [];

    if (prenomField.value.trim() === "") {
      errors.push("Veuillez saisir votre prénom.");
      displayFieldError(prenomField, "Veuillez saisir votre prénom.");
    }

    if (nomField.value.trim() === "") {
      errors.push("Veuillez saisir votre nom.");
      displayFieldError(nomField, "Veuillez saisir votre nom.");
    }

    if (emailField.value.trim() === "") {
      errors.push("Veuillez saisir votre adresse e-mail.");
      displayFieldError(emailField, "Veuillez saisir votre adresse e-mail.");
    }

    if (messageField.value.trim() === "") {
      errors.push("Veuillez saisir un message.");
      displayFieldError(messageField, "Veuillez saisir un message.");
    }

    if (errors.length > 0) {
      return;
    }

    // Affichage des valeurs dans la console
    console.log("Prénom:", prenomField.value);
    console.log("Nom:", nomField.value);
    console.log("Email:", emailField.value);
    console.log("Message:", messageField.value);

    // Réinitialisation des champs du formulaire
    form.reset();

    // Masquage des messages d'erreur après soumission réussie
    hideFieldErrors();

    // Fermeture de la modal de contact
    closeModal();

    // Affichage d'un message de succès
    console.log("Le formulaire a été soumis avec succès !");
  });
}

setContactFormEvent();
``
