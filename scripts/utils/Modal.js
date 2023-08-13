// eslint-disable-next-line no-unused-vars
class Modal {
  //? Création du constructeur pour initialiser les variables
  constructor() {
    //? Sélectionner les boutons d'ouverture et de fermeture de la modale
    this._btnOpenModal = document.querySelector("#btnOpenModal");
    this._btnCloseModal = document.querySelector("#btnCloseModale");
    //? Sélectionner la modale de contact
    this._modalContact = document.querySelector("#contact_modal");
    //? Sélectionner le bouton de soumission du formulaire
    this._btnSubmitForm = document.querySelector("#submit_form");
    //? Sélectionner les champs pour le prénom, le nom, l'email et le message
    this._firstName = document.querySelector("#firstName");
    this._lastName = document.querySelector("#lastName");
    this._email = document.querySelector("#email");
    this._message = document.querySelector("#message");
    //? Sélectionner les éléments pour les messages d'erreur
    this._firstNameError = document.querySelector("#firstNameError");
    this._lastNameError = document.querySelector("#lastNameError");
    this._emailError = document.querySelector("#emailError");
    this._messageError = document.querySelector("#messageError");
  }

  //? Fonction pour initialiser l'ouverture de la modale
  openModalInit() {
    //? Ajouter un écouteur d'événement pour le clic sur le bouton d'ouverture de la modale
    this._btnOpenModal.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalContact.style.display = "block";
    });
    //? Ajouter un écouteur d'événement pour la touche "Entrée" sur le bouton d'ouverture de la modale
    this._btnOpenModal.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._modalContact.style.display = "block";
      }
    });
  }

  //? Fonction pour initialiser la fermeture de la modale
  closeModalInit() {
    //? Ajouter un écouteur d'événement pour le clic sur le bouton de fermeture de la modale
    this._btnCloseModal.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalContact.style.display = "none";
    });
    //? Ajouter un écouteur d'événement pour la touche "Entrée" sur le bouton de fermeture de la modale
    this._btnCloseModal.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._modalContact.style.display = "none";
      }
    });
  }

  //? Fonction pour contrôler les saisies d'entrées de l'utilisateur en utilisant des expressions régulières
  controlRegExpInput() {
    //? Fonction pour contrôler le prénom
    const firstNameControle = () => {
      if (
        /^([A-Za-z]{2,20})?([- ]{0,1})?([A-Za-z]{2,20})$/.test(
          this._firstName.value.trim()
        )
      ) {
        this._firstName.style.border = "solid 2px green";
        this._firstNameError.textContent = "Champ Valide";
        this._firstNameError.style.color = "green";
        this._firstNameError.style.fontSize = "13px";
        return true;
      } else {
        this._firstName.style.border = "solid 2px red";
        this._firstNameError.textContent =
          "Veuillez rentrer deux caractères minimum";
        this._firstNameError.style.color = "red";
        this._firstNameError.style.fontSize = "13px";
        return false;
      }
    };

    this._firstName.addEventListener("input", firstNameControle);

    //? Fonction pour contrôler le nom
    const lastNameControle = () => {
      if (
        /^([A-Za-z]{2,20})?([- ]{0,1})?([A-Za-z]{2,20})$/.test(
          this._lastName.value.trim()
        )
      ) {
        this._lastName.style.border = "solid 2px green";
        this._lastNameError.textContent = "Champ Valide";
        this._lastNameError.style.color = "green";
        this._lastNameError.style.fontSize = "13px";
        return true;
      } else {
        this._lastName.style.border = "solid 2px red";
        this._lastNameError.textContent =
          "Veuillez rentrer deux caractères minimum";
        this._lastNameError.style.color = "red";
        this._lastNameError.style.fontSize = "13px";
        return false;
      }
    };

    this._lastName.addEventListener("input", () => {
      lastNameControle();
    });

    //? Fonction pour contrôler l'email
    const emailControle = () => {
      if (
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this._email.value.trim()
        )
      ) {
        this._email.style.border = "solid 2px green";
        this._emailError.textContent = "Champ Valide";
        this._emailError.style.fontSize = "13px";
        this._emailError.style.color = "green";
        return true;
      } else {
        this._email.style.border = "solid 2px red";
        this._emailError.textContent =
          "Veuillez rentrer une adresse email valide";
        this._emailError.style.fontSize = "13px";
        this._emailError.style.color = "red";
        return false;
      }
    };

    this._email.addEventListener("input", () => {
      emailControle();
    });

    //? Fonction pour contrôler le message
    const messageControle = () => {
      if (
        // eslint-disable-next-line no-useless-escape
        /^[a-zA-Z0-9~!@#$%^&*()`\[\]{};':,./<>?| ]{5,}$/.test(
          this._message.value.trim()
        )
      ) {
        this._message.style.border = "solid 2px green";
        this._messageError.textContent = "Champ Valide";
        this._messageError.style.fontSize = "13px";
        this._messageError.style.color = "green";
        return true;
      } else {
        this._message.style.border = "solid 2px red";
        this._messageError.textContent =
          "Veuillez rentrer cinq caractères minimum";
        this._messageError.style.fontSize = "13px";
        this._messageError.style.color = "red";
        return false;
      }
    };

    this._message.addEventListener("input", () => {
      messageControle();
    });

    //?Envoie du formulaire
    this._btnSubmitForm.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        firstNameControle() &&
        lastNameControle() &&
        emailControle() &&
        messageControle()
      ) {
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
        alert("Merci de remplir correctement la fiche de contact.");
      }
    });

    this._btnSubmitForm.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (
          firstNameControle() &&
          lastNameControle() &&
          emailControle() &&
          messageControle()
        ) {
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
          alert("Merci de remplir correctement la fiche de contact.");
        }
      }
    });
  }
}
