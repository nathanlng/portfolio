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

window.addEventListener('load', function() {
  document.body.style.visibility = 'visible';
});

function animerVers(idCible) {
  const divAnimee = document.getElementById('info');
  const divCible = document.getElementById(idCible);

  // ÉTAPE 1 : Capturer les dimensions actuelles de la div en flex
  const largeurActuelle = divAnimee.offsetWidth;
  const hauteurActuelle = divAnimee.offsetHeight;
  
  // ÉTAPE 2 : Fixer ces dimensions en dur (sortir du mode flex)
  divAnimee.style.width = largeurActuelle + 'px';
  divAnimee.style.height = hauteurActuelle + 'px';
  divAnimee.style.flex = 'none'; // Désactiver flex
  
  // ÉTAPE 3 : Forcer le reflow pour que le navigateur applique ces changements
  divAnimee.offsetHeight;

  divAnimee.classList.add('div-animee')
  
  // Récupérer les dimensions de la div cible
  const largeur = divCible.offsetWidth;
  const hauteur = divCible.offsetHeight;
  
  // Appliquer les nouvelles dimensions
  divAnimee.style.width = largeur + 'px';
  divAnimee.style.height = hauteur + 'px';
  divAnimee.style.bottom = '24px';
  divAnimee.style.left = '24px';
  divAnimee.style.position = 'absolute';

  setTimeout(() => {
    window.location.href = "./profil.html";
  }, 1000); // pause de 3 secondes
}

function resetDiv() {
  const divAnimee = document.getElementById('info');
  divAnimee.style.width = '150px';
  divAnimee.style.height = '150px';
}