const url = window.location.pathname;
console.log(window.devicePixelRatio);

// Chargement des données
let pagesData = null;
const highlight = document.querySelector(".highlight");
const navItems = document.querySelectorAll("#projects-nav .nav-item");
const carousels = document.querySelectorAll(".carousel");
let animating = Array.from(carousels).map(() => false);
let currentIndices = Array.from(carousels).map(() => 0);

if (url == "/acceuil.html" || url == "/") {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const wasActive = header.classList.contains("active");

      // Fermer tous les accordéons
      headers.forEach((header) => {
        header.classList.remove("active");
        header.nextElementSibling.classList.remove("active");
      });

      // Ouvrir celui cliqué s'il n'était pas déjà ouvert
      if (!wasActive) {
        header.classList.add("active");
        header.nextElementSibling.classList.add("active");
      }
    });
  });

  function animerVers(idCible) {
    const divAnimee = document.getElementById("info");
    const divCible = document.getElementById(idCible);

    // ÉTAPE 1 : Capturer les dimensions actuelles de la div en flex
    const largeurActuelle = divAnimee.offsetWidth;
    const hauteurActuelle = divAnimee.offsetHeight;

    // ÉTAPE 2 : Fixer ces dimensions en dur (sortir du mode flex)
    divAnimee.style.width = largeurActuelle + "px";
    divAnimee.style.height = hauteurActuelle + "px";
    divAnimee.style.flex = "none"; // Désactiver flex

    // ÉTAPE 3 : Forcer le reflow pour que le navigateur applique ces changements
    divAnimee.offsetHeight;

    divAnimee.classList.add("div-animee");

    // Récupérer les dimensions de la div cible
    const largeur = divCible.offsetWidth;
    const hauteur = divCible.offsetHeight;

    // Appliquer les nouvelles dimensions
    divAnimee.style.width = largeur + "px";
    divAnimee.style.height = hauteur + "px";
    divAnimee.style.bottom = "24px";
    divAnimee.style.left = "24px";
    divAnimee.style.position = "absolute";

    setTimeout(() => {
      window.location.href = "./profil.html";
    }, 1300); // pause de 1.3 secondes
  }

  function resetDiv() {
    const divAnimee = document.getElementById("info");
    divAnimee.style.width = "150px";
    divAnimee.style.height = "150px";
  }
}

if (url == "/projets.html") {
  fetch("../../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      pagesData = data.pages;
      // Affichage de la page 1 au chargement
      loadPage("1");
    })
    .catch((error) => console.error("Erreur de chargement:", error));

  // Fonction pour charger une page
  function loadPage(page) {
    if (!pagesData || !pagesData[page]) {
      console.error(`Page ${page} introuvable`);
      return;
    }

    const pageData = pagesData[page];
    // Mise à jour des contenus
    Object.entries(pageData.contents).forEach(([id, text]) => {
      const element = window[id]; // ou document.getElementById(id)
      if (element) element.textContent = text;
    });
  }

  function moveHighlight(element) {
    highlight.style.top = element.offsetTop + "px";
    highlight.style.height = element.offsetHeight + "px";
  }

  // Position initiale
  moveHighlight(document.querySelector(".active"));

  function goToSlide(targetIndex, carouselIndex) {
    if (
      animating[carouselIndex] ||
      targetIndex === currentIndices[carouselIndex]
    )
      return;
    animating[carouselIndex] = true;

    const carousel = carousels[carouselIndex];
    const items = carousel.querySelectorAll(".carousel-item");
    const current = items[currentIndices[carouselIndex]];
    const next = items[targetIndex];

    const direction = 1; // Toujours glisser vers la droite

    next.style.transition = "none";
    next.style.transform = `translateX(${direction * 100}%)`;
    next.style.opacity = "1";
    next.style.zIndex = "3";

    requestAnimationFrame(() => {
      next.offsetHeight;

      current.style.transition = "transform 0.6s ease";
      next.style.transition = "transform 0.6s ease";

      current.style.transform = `translateX(${-direction * 100}%)`;
      next.style.transform = "translateX(0%)";

      current.addEventListener(
        "transitionend",
        () => {
          current.style.transition = "";
          current.style.transform = "";
          next.style.transition = "";
          next.style.zIndex = "";
          current.classList.remove("active");
          next.classList.add("active");
          animating[carouselIndex] = false;
        },
        { once: true }
      );
    });

    currentIndices[carouselIndex] = targetIndex;
  }

  // Lier la navbar à tous les carrousels
  navItems.forEach((nav) => {
    nav.addEventListener("click", () => {
      const index = parseInt(nav.dataset.target) - 1;
      carousels.forEach((_, carouselIndex) => {
        goToSlide(index, carouselIndex);
      });

      // Mettre à jour la navbar
      navItems.forEach((n) => n.classList.remove("active"));
      nav.classList.add("active");
      loadPage(index + 1);
      moveHighlight(nav);
    });
  });
}

const checkbox = document.getElementById('checkbox');
  const navLinks = document.getElementById('nav-links');
  const libel = document.querySelector('.first-div-main');

checkbox.addEventListener('change', () => {
  const largeur = libel.offsetWidth;
  const hauteur = libel.offsetHeight;

  if (checkbox.checked) {
    navLinks.classList.add('show');
    navLinks.style.width = largeur + "px";
    navLinks.style.height = hauteur + "px";
    navLinks.style.animation = ''; // reset
  } else {
    navLinks.style.animation = 'fade-out 0.5s ease-out both';
    
    navLinks.addEventListener('animationend', function handler() {
      navLinks.classList.remove('show');
      navLinks.style.animation = ''; // reset
      navLinks.removeEventListener('animationend', handler);
    });
  }
});
