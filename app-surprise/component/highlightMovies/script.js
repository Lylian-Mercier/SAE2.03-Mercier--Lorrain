let templateFile = await fetch("./component/highlightMovies/template.html");
let template = await templateFile.text();
let templateLiFile = await fetch(
  "./component/highlightMovies/template_li.html"
);
let templateLi = await templateLiFile.text();

let HighlightMovies = {};

// Ajoutez ces fonctions au début du fichier
function initCarousel() {
  const wrapper = document.querySelector(".movies-wrapper");
  if (!wrapper) return;

  // Calculer la largeur à faire défiler (largeur de plusieurs films + gaps)
  const movieWidth = 15; // en rem
  const gap = 1.25; // en rem
  const moviesPerSlide = 3; // Nombre de films à faire défiler à la fois
  const scrollAmount = (movieWidth + gap) * moviesPerSlide * 16; // Conversion en pixels

  // Gestionnaire pour les boutons
  const nextButton = document.querySelector(".carousel-button.next");
  const prevButton = document.querySelector(".carousel-button.prev");

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }
}

// Ajoutez ces constantes pour les SVG des numéros
const numberSvgs = {
  1: `<svg class="number-svg" width="11" height="19" viewBox="0 0 11 19" fill="" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.68269 0.25H10.25V9.5V18.75H5.86111V5.4V5.00745L5.50539 5.17345L1.27296 7.14859L0.290908 3.61319L5.68269 0.25Z" stroke="" stroke-width="0.5"/>
    </svg>`,
  2: `<svg class="number-svg" width="11" height="19" viewBox="0 0 11 19" fill="" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58333 3.8V3.55H7.33333H0.25V0.25H7.33333C8.23655 0.25 9.10466 0.621765 9.74615 1.28659C10.3879 1.95171 10.75 2.85566 10.75 3.8V7.6C10.75 8.54434 10.3879 9.44829 9.74615 10.1134C9.10466 10.7782 8.23655 11.15 7.33333 11.15H3.66667H3.41667V11.4V15.2V15.45H3.66667H10.75V18.75H0.25V11.4C0.25 10.4557 0.61206 9.55171 1.25385 8.88659C1.89534 8.22177 2.76345 7.85 3.66667 7.85H7.33333H7.58333V7.6V3.8Z" stroke="" stroke-width="0.5"/>
</svg>
`,
  3: `<svg class="number-svg" width="12" height="19" viewBox="0 0 12 19" fill="" xmlns="http://www.w3.org/2000/svg">
<path d="M9 9.5V9.75C9.73337 9.75 10.4343 10.0269 10.9491 10.516C11.4636 11.0047 11.75 11.6647 11.75 12.35V15.2C11.75 16.1373 11.3582 17.0389 10.6562 17.7058C9.95385 18.373 8.99858 18.75 8 18.75H0.25V15.45H8H8.25V15.2V11.4V11.15H8H4.25V7.85H8H8.25V7.6V3.8V3.55H8H0.25V0.25H8C8.99858 0.25 9.95385 0.62697 10.6562 1.29424C11.3582 1.9611 11.75 2.86274 11.75 3.8V6.65C11.75 7.3353 11.4636 7.9953 10.9491 8.484C10.4343 8.97312 9.73337 9.25 9 9.25V9.5Z" stroke="" stroke-width="0.5"/>
</svg>
`,
  4: `<svg class="number-svg" width="11" height="19" viewBox="0 0 11 19" fill="" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58333 11.4V11.15H7.33333H0.25V0.25H3.41667V7.6V7.85H3.66667H7.33333H7.58333V7.6V0.25H10.75V18.75H7.58333V11.4Z" stroke="" stroke-width="0.5"/>
</svg>
`,
  5: `<svg class="number-svg" width="11" height="19" viewBox="0 0 11 19" fill="" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58333 11.4V11.15H7.33333H0.25V0.25H10.75V3.55H3.66667H3.41667V3.8V7.6V7.85H3.66667H7.33333C8.23655 7.85 9.10466 8.22177 9.74615 8.88659C10.3879 9.55171 10.75 10.4557 10.75 11.4V15.2C10.75 16.1443 10.3879 17.0483 9.74615 17.7134C9.10466 18.3782 8.23655 18.75 7.33333 18.75H0.25V15.45H7.33333H7.58333V15.2V11.4Z" stroke="" stroke-width="0.5"/>
</svg>`,
  6: `<svg class="number-svg" width="12" height="19" viewBox="0 0 12 19" fill="" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75 7.6V7.85H4H8C8.99858 7.85 9.95385 8.22697 10.6562 8.89425C11.3582 9.5611 11.75 10.4627 11.75 11.4V15.2C11.75 16.1373 11.3582 17.0389 10.6562 17.7058C9.95385 18.373 8.99858 18.75 8 18.75H4C3.00142 18.75 2.04615 18.373 1.34376 17.7058C0.641803 17.0389 0.25 16.1373 0.25 15.2V3.8C0.25 2.86274 0.641803 1.9611 1.34376 1.29424C2.04615 0.62697 3.00142 0.25 4 0.25H11.75V3.55H4H3.75V3.8V7.6ZM4 11.15H3.75V11.4V15.2V15.45H4H8H8.25V15.2V11.4V11.15H8H4Z" stroke="" stroke-width="0.5"/>
</svg>
`,
};

// Modifiez la fonction format pour initialiser le carrousel après le rendu
HighlightMovies.format = function (movies) {
  console.log("Films mis en avant reçus pour le rendu :", movies);
  if (movies.length === 0) {
    return "<p>Aucun film mis en avant pour le moment.</p>";
  }

  let formattedMovies = "";
  for (let index = 0; index < movies.length; index++) {
    let movie = movies[index];
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{image}}", movie.image);
    movieHtml = movieHtml.replace("{{name}}", movie.name);
    movieHtml = movieHtml.replace("{{description}}", movie.description);
    movieHtml = movieHtml.replace(
      "{{handler}}",
      `C.handlerDetail(${movie.id})`
    );

    // Modifier la condition pour inclure le quatrième film
    const movieNumber = index + 1;
    if (movieNumber <= 6 && numberSvgs[movieNumber]) {
      movieHtml = movieHtml.replace("{{numberSvg}}", numberSvgs[movieNumber]);
    } else {
      movieHtml = movieHtml.replace("{{numberSvg}}", "");
    }

    formattedMovies += movieHtml;
  }

  let finalHtml = templateLi;
  finalHtml = finalHtml.replace("{{highlight}}", formattedMovies);

  setTimeout(() => {
    initCarousel();
    
    // Pour mobile, s'assurer que tout est correctement initialisé
    if (window.innerWidth <= 800) {
      const wrapper = document.querySelector(".movies-wrapper");
      if (wrapper) {
        // Réinitialiser le scroll
        wrapper.scrollLeft = 0;
        
        // Calculer la largeur des films uniquement à titre informatif
        const movieWidth = 160; // Largeur de chaque film en pixels
        const margin = 5; // Marge entre les films en pixels
        const totalMoviesWidth = movies.length * (movieWidth + 2 * margin);
        
        console.log(`Nombre de films: ${movies.length}`);
        console.log(`Largeur estimée des films: ${totalMoviesWidth}px`);
        
        // S'assurer que le wrapper est configuré pour le défilement horizontal
        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'nowrap';
        wrapper.style.overflowX = 'auto';
        
        // Ajouter un div invisible à la fin pour garantir que tout le contenu est accessible
        const spacer = document.createElement('div');
        spacer.style.minWidth = '20px';
        spacer.style.height = '1px';
        wrapper.appendChild(spacer);
      }
    }
  }, 100);

  return finalHtml;
};

export { HighlightMovies };
