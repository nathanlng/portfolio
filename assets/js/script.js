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