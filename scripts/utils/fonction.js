document.addEventListener('DOMContentLoaded', function() {
    // Event Listener pour le bouton "Contactez-moi"
    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', function() {
        displayModal();
    });

    // Event Listener pour fermer le bouton modal
    const closeModalButton = document.getElementById('closeModalButton');
    closeModalButton.addEventListener('click', function() {
        closeModal();
    });

    // Validation et gestion des erreurs pour le formulaire de contact
    const prenomInput = document.getElementById('prenom');
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    prenomInput.addEventListener('input', function() {
        validateName(prenomInput, 'prenomError');
    });

    nomInput.addEventListener('input', function() {
        validateName(nomInput, 'nomError');
    });

    emailInput.addEventListener('input', function() {
        validateEmail(emailInput, 'emailError');
    });

    messageInput.addEventListener('input', function() {
        validateMessage(messageInput, 'messageError');
    });

    // Affichage du nombre total de likes
    const totalLikes = 100; // Remplacez cela par la valeur réelle récupérée
    const totalLikeElement = document.querySelector('.total-like');
    totalLikeElement.textContent = totalLikes;
});

// Fonction de validation du nom
function validateName(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    const inputValue = input.value.trim();

    if (inputValue === '') {
        displayErrorMessage(errorElementId, 'Veuillez saisir votre ' + (input.id === 'prenom' ? 'prénom' : 'nom') + '.');
    } else if (inputValue.length < 2) {
        displayErrorMessage(errorElementId, 'Le ' + (input.id === 'prenom' ? 'prénom' : 'nom') + ' doit comporter au moins 2 caractères.');
    } else if (!/^[a-zA-Z]+$/.test(inputValue)) {
        displayErrorMessage(errorElementId, 'Le ' + (input.id === 'prenom' ? 'prénom' : 'nom') + ' ne peut pas contenir de chiffres ou de symboles.');
    } else {
        clearErrorMessage(errorElementId);
    }
}

// Fonction de validation de l'email
function validateEmail(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    const inputValue = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email address

    if (inputValue === '') {
        displayErrorMessage(errorElementId, 'Veuillez saisir votre email.');
    } else if (!regex.test(inputValue)) {
        displayErrorMessage(errorElementId, 'Veuillez saisir une adresse email valide.');
    } else {
        clearErrorMessage(errorElementId);
    }
}

// Fonction de validation du message
function validateMessage(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    const inputValue = input.value.trim();

    if (inputValue === '') {
        displayErrorMessage(errorElementId, 'Veuillez saisir votre message.');
    } else {
        clearErrorMessage(errorElementId);
    }
}

// Fonction pour afficher un message d'erreur
function displayErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

// Fonction pour effacer un message d'erreur
function clearErrorMessage(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}
