"use strict";

const contactForm = document.getElementById("contactForm");
const messageInput = document.getElementById("message");
const characterCounter = document.getElementById("characterCounter");
const successMessage = document.getElementById("successMessage");
const privacyInput = document.getElementById("privacy");
const privacyError = document.getElementById("privacyError");

const menuButton = document.getElementById("menuButton");
const navList = document.getElementById("navList");

const currentYear = document.getElementById("currentYear");


// Aktuelles Jahr im Footer
currentYear.textContent = new Date().getFullYear();


// Mobiles Menü
menuButton.addEventListener("click", () => {
    navList.classList.toggle("open");
});


// Zeichen zählen
messageInput.addEventListener("input", () => {
    const maximumCharacters = 500;

    if (messageInput.value.length > maximumCharacters) {
        messageInput.value = messageInput.value.slice(
            0,
            maximumCharacters
        );
    }

    characterCounter.textContent =
        `${messageInput.value.length} / ${maximumCharacters}`;
});


// Fehlermeldung anzeigen
function showError(input, message) {
    input.classList.add("invalid");

    const formGroup = input.closest(".form-group");

    if (formGroup) {
        const errorElement =
            formGroup.querySelector(".error-message");

        errorElement.textContent = message;
    }
}


// Fehlermeldung entfernen
function clearError(input) {
    input.classList.remove("invalid");

    const formGroup = input.closest(".form-group");

    if (formGroup) {
        const errorElement =
            formGroup.querySelector(".error-message");

        errorElement.textContent = "";
    }
}


// E-Mail prüfen
function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// Formular prüfen
function validateForm() {
    let isValid = true;

    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const email =
        document.getElementById("email");

    const subject =
        document.getElementById("subject");

    const message =
        document.getElementById("message");


    // Vorname
    if (firstName.value.trim().length < 2) {
        showError(
            firstName,
            "Bitte gib einen gültigen Vornamen ein."
        );

        isValid = false;
    } else {
        clearError(firstName);
    }


    // Nachname
    if (lastName.value.trim().length < 2) {
        showError(
            lastName,
            "Bitte gib einen gültigen Nachnamen ein."
        );

        isValid = false;
    } else {
        clearError(lastName);
    }


    // E-Mail
    if (!isValidEmail(email.value.trim())) {
        showError(
            email,
            "Bitte gib eine gültige E-Mail-Adresse ein."
        );

        isValid = false;
    } else {
        clearError(email);
    }


    // Betreff
    if (subject.value === "") {
        showError(
            subject,
            "Bitte wähle einen Betreff aus."
        );

        isValid = false;
    } else {
        clearError(subject);
    }


    // Nachricht
    if (message.value.trim().length < 10) {
        showError(
            message,
            "Die Nachricht muss mindestens 10 Zeichen enthalten."
        );

        isValid = false;
    } else {
        clearError(message);
    }


    // Datenschutz
    if (!privacyInput.checked) {
        privacyError.textContent =
            "Bitte akzeptiere die Datenschutzerklärung.";

        isValid = false;
    } else {
        privacyError.textContent = "";
    }

    return isValid;
}


// Fehler während Eingabe entfernen
const formInputs = contactForm.querySelectorAll(
    "input, select, textarea"
);

formInputs.forEach((input) => {
    input.addEventListener("input", () => {
        clearError(input);

        if (input === privacyInput) {
            privacyError.textContent = "";
        }
    });

    input.addEventListener("change", () => {
        clearError(input);

        if (input === privacyInput) {
            privacyError.textContent = "";
        }
    });
});


// Formular absenden
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    successMessage.style.display = "none";

    if (!validateForm()) {
        return;
    }

    const submitButton =
        contactForm.querySelector(".submit-button");

    submitButton.disabled = true;
    submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Wird gesendet...';


    /*
        این بخش فقط ارسال را شبیه‌سازی می‌کند.
        برای ارسال واقعی باید Backend، Formspree یا EmailJS اضافه شود.
    */

    setTimeout(() => {
        successMessage.style.display = "flex";

        contactForm.reset();

        characterCounter.textContent = "0 / 500";

        submitButton.disabled = false;
        submitButton.innerHTML =
            '<i class="fa-regular fa-paper-plane"></i> Nachricht senden';

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 1200);
});


// Newsletter
const newsletterForm =
    document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput =
        newsletterForm.querySelector("input");

    if (!isValidEmail(emailInput.value.trim())) {
        alert(
            "Bitte gib eine gültige E-Mail-Adresse ein."
        );

        return;
    }

    alert(
        "Vielen Dank für deine Newsletter-Anmeldung!"
    );

    newsletterForm.reset();
});