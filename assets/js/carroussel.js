

const buttons = document.querySelectorAll(".nav-item");
const trackA = document.getElementById("trackA");
const trackB = document.getElementById("trackB");
const contentA = document.getElementById("contentA");
const contentB = document.getElementById("contentB");
const contentC = document.getElementById("contentC");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.target;

        if (page === "1") {
            trackA.style.transform = "translateX(0%)";
            trackB.style.transform = "translateX(0%)";
            contentA.textContent = "Contenu A - Page 1";
            contentB.textContent = "Contenu B - Page 1";
            contentC.textContent = "Contenu C - Page 1";

        } else if (page === "2") {
            trackA.style.transform = "translateX(-50%)";
            trackB.style.transform = "translateX(-50%)";
            contentA.textContent = "Contenu A - Page 2";
            contentB.textContent = "Contenu B - Page 2";
            contentC.textContent = "Contenu C - Page 2";
        }
    });
});

