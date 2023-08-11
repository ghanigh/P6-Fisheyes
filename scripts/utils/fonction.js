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
  
    // Verification pour le first name
    const prenomInput = document.getElementById('prenom');
    const prenomError = document.getElementById('prenomError');
  
    prenomInput.addEventListener('input', function() {
      if (prenomInput.value.trim() === '') {
        displayErrorMessage('prenomError', 'Veuillez saisir votre prénom.');
      } else if (prenomInput.value.trim().length < 2) {
        displayErrorMessage('prenomError', 'Le prénom doit comporter au moins 2 caractères.');
      } else if (!/^[a-zA-Z]+$/.test(prenomInput.value.trim())) {
        displayErrorMessage('prenomError', 'Le prénom ne peut pas contenir de chiffres ou de symboles.');
      } else {
        clearErrorMessage('prenomError');
      }
    });
  
    // Verification pour le last name
    const nomInput = document.getElementById('nom');
    const nomError = document.getElementById('nomError');
  
    nomInput.addEventListener('input', function() {
      if (nomInput.value.trim() === '') {
        displayErrorMessage('nomError', 'Veuillez saisir votre nom.');
      } else if (nomInput.value.trim().length < 2) {
        displayErrorMessage('nomError', 'Le nom doit comporter au moins 2 caractères.');
      } else if (!/^[a-zA-Z]+$/.test(nomInput.value.trim())) {
        displayErrorMessage('nomError', 'Le nom ne peut pas contenir de chiffres ou de symboles.');
      } else {
        clearErrorMessage('nomError');
      }
    });
  
    // Verification pour email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
  
    emailInput.addEventListener('input', function() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email address
  
      if (emailInput.value.trim() === '') {
        displayErrorMessage('emailError', 'Veuillez saisir votre email.');
      } else if (!regex.test(emailInput.value.trim())) {
        displayErrorMessage('emailError', 'Veuillez saisir une adresse email valide.');
      } else {
        clearErrorMessage('emailError');
      }
    });
  
    // Verification du message
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('messageError');
  
    messageInput.addEventListener('input', function() {
      if (messageInput.value.trim() === '') {
        displayErrorMessage('messageError', 'Veuillez saisir votre message.');
      } else {
        clearErrorMessage('messageError');
      }
    });
    // Supposons que totalLikes contienne le nombre total de likes
  const totalLikes = 100; // Remplacez cela par la valeur réelle récupérée

  // Récupérer l'élément span avec la classe "total-like"
  const totalLikeElement = document.querySelector('.total-like');

  // Mettre à jour le contenu de l'élément avec le nombre total de likes
  totalLikeElement.textContent = totalLikes;
  });
    // Event Listener pour le chargement de la page
    window.addEventListener('DOMContentLoaded', function() {
        // Code à exécuter lorsque la page est chargée
        // Appelle une fonction par exemple :
        // loadPhotographers();
      });