

// const buttons = document.querySelectorAll(".nav-item");
// Chargement des données
let pagesData = null;

fetch('../../json/data.json')
  .then(response => response.json())
  .then(data => {
    pagesData = data.pages;
    // Affichage de la page 1 au chargement
    loadPage("1");
  })
  .catch(error => console.error('Erreur de chargement:', error));

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


const highlight = document.querySelector('.highlight');

function moveHighlight(element) {
  highlight.style.top = element.offsetTop + 'px';
  highlight.style.height = element.offsetHeight + 'px';
}

// Position initiale
moveHighlight(document.querySelector('.active'));

const navItems = document.querySelectorAll('#projects-nav .nav-item');
const carousels = document.querySelectorAll('.carousel');

let currentIndices = Array.from(carousels).map(() => 0);
let animating = Array.from(carousels).map(() => false);

function goToSlide(targetIndex, carouselIndex) {
  if (animating[carouselIndex] || targetIndex === currentIndices[carouselIndex]) return;
  animating[carouselIndex] = true;

  const carousel = carousels[carouselIndex];
  const items = carousel.querySelectorAll('.carousel-item');
  const current = items[currentIndices[carouselIndex]];
  const next = items[targetIndex];

  const direction = 1; // Toujours glisser vers la droite

  next.style.transition = 'none';
  next.style.transform = `translateX(${direction * 100}%)`;
  next.style.opacity = '1';
  next.style.zIndex = '3';

  requestAnimationFrame(() => {
    next.offsetHeight;

    current.style.transition = 'transform 0.6s ease';
    next.style.transition = 'transform 0.6s ease';

    current.style.transform = `translateX(${-direction * 100}%)`;
    next.style.transform = 'translateX(0%)';

    current.addEventListener('transitionend', () => {
      current.style.transition = '';
      current.style.transform = '';
      next.style.transition = '';
      next.style.zIndex = '';
      current.classList.remove('active');
      next.classList.add('active');
      animating[carouselIndex] = false;
    }, { once: true });
  });

  currentIndices[carouselIndex] = targetIndex;
}

// Lier la navbar à tous les carrousels
navItems.forEach(nav => {
  nav.addEventListener('click', () => {
    const index = parseInt(nav.dataset.target) - 1;
    carousels.forEach((_, carouselIndex) => {
      goToSlide(index, carouselIndex);
    });
    
    // Mettre à jour la navbar
    navItems.forEach(n => n.classList.remove('active'));
    nav.classList.add('active');
    loadPage(index + 1);
    moveHighlight(nav);
  });
});


