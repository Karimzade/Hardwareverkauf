"use strict";

// --- 1. عناصر ثابتة موجودة دائماً في الـ index.html (تعمل فوراً) ---
const menuButton = document.getElementById("menuButton");
const navList = document.getElementById("navList");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navList) {
  menuButton.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// --- 2. دالة مساعدة للتحقق من الإيميل ---
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// --- 3. الـ Newsletter (موجود دائماً أو يعمل بالتفويض) ---
document.addEventListener("submit", (event) => {
  const newsletterForm = event.target.closest(".newsletter-form");
  if (!newsletterForm) return;

  event.preventDefault();
  const emailInput = newsletterForm.querySelector("input");

  if (!isValidEmail(emailInput.value.trim())) {
    alert("Bitte gib eine gültige E-Mail-Adresse ein.");
    return;
  }

  alert("Vielen Dank für deine Newsletter-Anmeldung!");
  newsletterForm.reset();
});

// ==============================================================
// --- 4. كود الاتصال الأصلي الخاص بك (يعمل الآن عبر الـ Delegation) ---
// ==============================================================

// [دوال المساعدة الأصلية الخاصة بك]
function showError(input, message) {
  input.classList.add("invalid");
  const formGroup = input.closest(".form-group");
  if (formGroup) {
    const errorElement = formGroup.querySelector(".error-message");
    if (errorElement) errorElement.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove("invalid");
  const formGroup = input.closest(".form-group");
  if (formGroup) {
    const errorElement = formGroup.querySelector(".error-message");
    if (errorElement) errorElement.textContent = "";
  }
}

function validateForm(form) {
  let isValid = true;

  const firstName = form.querySelector("#firstName");
  const lastName = form.querySelector("#lastName");
  const email = form.querySelector("#email");
  const subject = form.querySelector("#subject");
  const message = form.querySelector("#message");
  const privacyInput = form.querySelector("#privacy");
  const privacyError = form.querySelector("#privacyError");

  // Vorname
  if (firstName.value.trim().length < 2) {
    showError(firstName, "Bitte gib einen gültigen Vornamen ein.");
    isValid = false;
  } else {
    clearError(firstName);
  }

  // Nachname
  if (lastName.value.trim().length < 2) {
    showError(lastName, "Bitte gib einen gültigen Nachnamen ein.");
    isValid = false;
  } else {
    clearError(lastName);
  }

  // E-Mail
  if (!isValidEmail(email.value.trim())) {
    showError(email, "Bitte gib eine gültige E-Mail-Adresse ein.");
    isValid = false;
  } else {
    clearError(email);
  }

  // Betreff
  if (subject.value === "") {
    showError(subject, "Bitte wähle einen Betreff aus.");
    isValid = false;
  } else {
    clearError(subject);
  }

  // Nachricht
  if (message.value.trim().length < 10) {
    showError(message, "Die Nachricht muss mindestens 10 Zeichen enthalten.");
    isValid = false;
  } else {
    clearError(message);
  }

  // Datenschutz
  if (!privacyInput.checked) {
    privacyError.textContent = "Bitte akzeptiere die Datenschutzerklärung.";
    isValid = false;
  } else {
    privacyError.textContent = "";
  }

  return isValid;
}

// --- مراقبة الأحداث داخل الـ Form المحقون ديناميكياً ---

// أ) عداد الحروف (Character Counter) وإزالة الأخطاء أثناء الكتابة
document.addEventListener("input", (event) => {
  const target = event.target;
  const form = target.closest("#contactForm");
  if (!form) return; // إذا لم نكن داخل فورم الاتصال، تجاهل الأمر

  // إذا كانت الكتابة داخل حقل الرسالة (العداد)
  if (target.id === "message") {
    const maximumCharacters = 500;
    if (target.value.length > maximumCharacters) {
      target.value = target.value.slice(0, maximumCharacters);
    }
    const characterCounter = form.querySelector("#characterCounter");
    if (characterCounter) {
      characterCounter.textContent = `${target.value.length} / ${maximumCharacters}`;
    }
  }

  // إزالة الخطأ فوراً أثناء الكتابة
  clearError(target);
  const privacyInput = form.querySelector("#privacy");
  const privacyError = form.querySelector("#privacyError");
  if (target === privacyInput && privacyError) {
    privacyError.textContent = "";
  }
});

// ب) إزالة الخطأ عند تغيير الخيارات (للقوائم والـ Checkbox)
document.addEventListener("change", (event) => {
  const target = event.target;
  const form = target.closest("#contactForm");
  if (!form) return;

  clearError(target);
  const privacyInput = form.querySelector("#privacy");
  const privacyError = form.querySelector("#privacyError");
  if (target === privacyInput && privacyError) {
    privacyError.textContent = "";
  }
});

// ج) إرسال النموذج (Form Submit)
document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.id !== "contactForm") return; // نتأكد أنه فورم الاتصال

  event.preventDefault();
  const successMessage = form.querySelector("#successMessage");
  const characterCounter = form.querySelector("#characterCounter");

  if (successMessage) successMessage.style.display = "none";

  if (!validateForm(form)) {
    return;
  }

  const submitButton = form.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Wird gesendet...';

  setTimeout(() => {
    if (successMessage) successMessage.style.display = "flex";

    form.reset();

    if (characterCounter) characterCounter.textContent = "0 / 500";

    submitButton.disabled = false;
    submitButton.innerHTML =
      '<i class="fa-regular fa-paper-plane"></i> Nachricht senden';

    if (successMessage) {
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, 1200);
});
