const modal = document.getElementById("contact-modal");

// Afficher la modal de contact
function displayModal() {
    const modal = document.getElementById("contact-modal");
	modal.style.display = "block";
		if (modal.hasAttribute("aria-hidden") && main.hasAttribute("aria-hidden")) {
			modal.setAttribute("aria-hidden", "false");
			main.setAttribute("aria-hidden", "true");
		}
		const prenom = document.querySelector('#prenom');
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