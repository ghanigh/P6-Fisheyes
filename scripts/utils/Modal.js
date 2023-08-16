// eslint-disable-next-line no-unused-vars
class Modal {
  // Constructeur de la classe Modal, initialise les variables pour la modale de contact
  constructor() {
    // Sélection des boutons pour ouvrir et fermer la modale
    this._btnOpenModal = document.querySelector("#btnOpenModal");
    this._btnCloseModal = document.querySelector("#btnCloseModale");
    // Sélection de la modale de contact
    this._modalContact = document.querySelector("#contact_modal");
    // Sélection du bouton de soumission du formulaire
    this._btnSubmitForm = document.querySelector("#submit_form");
    // Sélection des champs pour le prénom, le nom, l'email et le message
    this._firstName = document.querySelector("#firstName");
    this._lastName = document.querySelector("#lastName");
    this._email = document.querySelector("#email");
    this._message = document.querySelector("#message");
    // Sélection des éléments pour afficher les messages d'erreur
    this._firstNameError = document.querySelector("#firstNameError");
    this._lastNameError = document.querySelector("#lastNameError");
    this._emailError = document.querySelector("#emailError");
    this._messageError = document.querySelector("#messageError");
  }

  // Fonction pour initialiser l'ouverture de la modale
  openModalInit() {
    // Ajout d'un écouteur d'événement au clic sur le bouton d'ouverture de la modale
    this._btnOpenModal.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalContact.style.display = "block";
    });

    // Ajout d'un écouteur d'événement pour la touche "Entrée" sur le bouton d'ouverture de la modale
    this._btnOpenModal.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._modalContact.style.display = "block";
      }
    });
  }

  // Fonction pour initialiser la fermeture de la modale
  closeModalInit() {
    // Ajout d'un écouteur d'événement au clic sur le bouton de fermeture de la modale
    this._btnCloseModal.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalContact.style.display = "none";
    });

    // Ajout d'un écouteur d'événement pour la touche "Entrée" sur le bouton de fermeture de la modale
    this._btnCloseModal.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._modalContact.style.display = "none";
      }
    });
  }

  // Fonction pour contrôler les saisies de l'utilisateur en utilisant des expressions régulières
  controlRegExpInput() {
    // Fonction pour contrôler le prénom
    const firstNameControle = () => {
      // Vérification de la validité du prénom avec une expression régulière
      if (
        /^([A-Za-z]{2,20})?([- ]{0,1})?([A-Za-z]{2,20})$/.test(
          this._firstName.value.trim()
        )
      ) {
        // En cas de prénom valide
        this._firstName.style.border = "solid 2px green";
        this._firstNameError.textContent = "Champ Valide";
        this._firstNameError.style.color = "green";
        this._firstNameError.style.fontSize = "13px";
        return true;
      } else {
        // En cas de prénom non valide
        this._firstName.style.border = "solid 2px red";
        this._firstNameError.textContent =
          "Veuillez rentrer au moins deux caractères";
        this._firstNameError.style.color = "red";
        this._firstNameError.style.fontSize = "13px";
        return false;
      }
    };

    // Ajout d'un écouteur d'événement à la saisie dans le champ du prénom
    this._firstName.addEventListener("input", firstNameControle);

    // ... (Répéter le même schéma pour les contrôles de nom, email et message)

    // Envoi du formulaire
    this._btnSubmitForm.addEventListener("click", (e) => {
      e.preventDefault();
      // Vérification de la validité de tous les champs avant l'envoi
      if (
        firstNameControle() &&
        lastNameControle() &&
        emailControle() &&
        messageControle()
      ) {
        // Si tous les champs sont valides, masquer la modale et afficher les données dans la console
        this._modalContact.style.display = "none";
        console.log(
          "Prénom : " +
            this._firstName.value.trim() +
            "\n" +
            "Nom : " +
            this._lastName.value.trim() +
            "\n" +
            "E-mail : " +
            this._email.value.trim() +
            "\n" +
            "Message : " +
            this._message.value.trim()
        );
      } else {
        // Si au moins un champ n'est pas valide, afficher une alerte
        alert("Merci de remplir correctement le formulaire de contact.");
      }
    });

    // ... (Répéter le même schéma pour l'écoute de la touche "Entrée" sur le bouton de soumission)
  }
} // Fin de la classe Modal
