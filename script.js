// --- Year in footer ---
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// --- Mobile nav toggle ---
const toggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');
if (toggle && header) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    document.body.classList.toggle('nav-open');
  });
}

// --- Initialize EmailJS ---
if (typeof emailjs !== "undefined") {
  emailjs.init("ZxXSPoekQxg9nJnvu");
} else {
  console.error("EmailJS is not loaded!");
}

// --- Contact form via EmailJS ---
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la soumission normale

    // Affiche le message "en attente"
    if (statusEl) statusEl.textContent = "Patienter s'il vous plaît...";

    // Récupère les valeurs du formulaire
    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      service: document.getElementById("service").value,
      message: document.querySelector("#message textarea").value
    };

    // Envoi avec EmailJS
    emailjs.send("service_ei74zcy", "template_5me8zoc", params)
      .then(() => {
        if (statusEl) statusEl.textContent = "Email sent successfully! Thank you for your inquiry.";
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        if (statusEl) statusEl.textContent = "Oops! Something went wrong. Try again or contact us directly at arnaud.chalandat@gmail.com";
      });
  });
}

function scrollSmooth() {
    // 1️⃣ Sélectionne tous les liens internes qui commencent par #
    const links = document.querySelectorAll('a[href^="#"]');

    // 2️⃣ Parcourt chaque lien
    links.forEach(link => {
        // 3️⃣ Ajoute un listener au clic
        link.addEventListener('click', function(e) {
            // 4️⃣ Empêche le saut instantané
            e.preventDefault();

            // 5️⃣ Récupère l'ID de la section ciblée
            const targetId = this.getAttribute('href');

            // 6️⃣ Sélectionne l'élément correspondant
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return; // sécurité : quitte si l'élément n'existe pas

            // 7️⃣ Ajuste le scroll si tu as un header fixe
            const headerOffset = 80; // hauteur de ton header fixe (à adapter)
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // 8️⃣ Scroll smooth vers la position calculée
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });
}

// 9️⃣ Appelle la fonction pour activer le scroll smooth
scrollSmooth();
