

const buttons = document.querySelectorAll(".nav-item");
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
  
  // Application de la transformation
  trackA.style.transform = `translateX(${pageData.transform})`;
  trackB.style.transform = `translateX(${pageData.transform})`;
  
  // Mise à jour des contenus
  Object.entries(pageData.contents).forEach(([id, text]) => {
    const element = window[id]; // ou document.getElementById(id)
    if (element) element.textContent = text;
  });
}

// Gestion des événements sur les boutons
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.target;
    loadPage(page);
  });
});

const items = document.querySelectorAll('.nav-item');
const highlight = document.querySelector('.highlight');

function moveHighlight(element) {
  highlight.style.top = element.offsetTop + 'px';
  highlight.style.height = element.offsetHeight + 'px';
}

items.forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.active')?.classList.remove('active');
    item.classList.add('active');
    moveHighlight(item);
  });
});

// Position initiale
moveHighlight(document.querySelector('.active'));
