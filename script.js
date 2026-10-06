// On récupère les éléments une seule fois pour les réutiliser dans les interactions.
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const filterButtons = document.querySelectorAll(".filter-chip");
const destinationCards = document.querySelectorAll(".destination-card");
const destinationSelect = document.querySelector("#destination-select");
const monthSelect = document.querySelector("#month-select");
const emptyMessage = document.querySelector("#empty-message");

let activeRegion = "all";
let activeSeason = "all";

// Applique le thème choisi et met à jour les indications accessibles du bouton.
function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#171c18" : "#f8f7f2");
}

// Retrouve le thème choisi la dernière fois, ou respecte le réglage de l'appareil.
const savedTheme = localStorage.getItem("ailleurs-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("ailleurs-theme", nextTheme);
});

// Le menu se déplie sur petit écran et se referme après le choix d'une rubrique.
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Ouvrir le menu");
    });
});

// Affiche uniquement les destinations qui correspondent aux filtres sélectionnés.
function updateDestinations() {
    let visibleCount = 0;

    destinationCards.forEach((card) => {
        const matchesRegion = activeRegion === "all" || card.dataset.region === activeRegion;
        const seasons = card.dataset.season.split(" ");
        const matchesSeason = activeSeason === "all" || seasons.includes(activeSeason);
        const isVisible = matchesRegion && matchesSeason;

        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount > 0;
}

// Les boutons de catégorie filtrent les cartes sans recharger la page.
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeRegion = button.dataset.filter;
        destinationSelect.value = activeRegion;

        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("selected", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });

        updateDestinations();
    });
});

// La recherche applique en même temps la région et la saison choisies.
document.querySelector("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    activeRegion = destinationSelect.value;
    activeSeason = monthSelect.value;

    filterButtons.forEach((button) => {
        const isSelected = button.dataset.filter === activeRegion;
        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    updateDestinations();
    document.querySelector("#destinations").scrollIntoView({ behavior: "smooth" });
});

// Les petits cœurs permettent de marquer une destination comme favorite.
document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
        const isFavorite = button.getAttribute("aria-pressed") === "true";
        const destinationName = button.closest(".destination-card").querySelector("h3").textContent;

        button.setAttribute("aria-pressed", String(!isFavorite));
        button.textContent = isFavorite ? "♡" : "♥";
        button.setAttribute("aria-label", `${isFavorite ? "Ajouter" : "Retirer"} ${destinationName} ${isFavorite ? "aux" : "des"} favoris`);
    });
});

// Le formulaire vérifie l'adresse et affiche un message de démonstration.
// Pour recevoir réellement les inscriptions, il faudra le relier à un service d'envoi.
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = document.querySelector("#email-input");
    const message = document.querySelector("#form-message");

    if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
    }

    message.textContent = "Merci ! Le formulaire fonctionne ; il reste à le relier à un service d'envoi.";
    emailInput.value = "";
});

// La touche Échap ferme le menu lorsque l'on navigue au clavier.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Ouvrir le menu");
        menuButton.focus();
    }
});