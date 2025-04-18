import { Movie } from "../Films_catalogue/script.js";

let templateFile = await fetch("./component/movieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category) {
    let categoryHtml = template;
    // Générer un ID unique pour chaque catégorie basé sur son nom
    const categoryId = category.name.toLowerCase().replace(/\s+/g, '-');
    
    categoryHtml = categoryHtml.replace(/{{categoryId}}/g, categoryId);
    categoryHtml = categoryHtml.replace("{{categoryName}}", category.name);

    let moviesListHtml = Movie.format(category.movies || []);
    categoryHtml = categoryHtml.replace("{{movieCard}}", moviesListHtml);

    return categoryHtml;
};

// Modifier la fonction initCarousels :
MovieCategory.initCarousels = function() {
    // Mettre à jour les sélecteurs avec les nouvelles classes
    const prevButtons = document.querySelectorAll('.category-nav-btn.prev-btn');
    const nextButtons = document.querySelectorAll('.category-nav-btn.next-btn');
    
    // Ajouter des écouteurs d'événements pour les boutons précédents
    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            const moviesContainer = document.querySelector(`#category-${categoryId} .movies`);
            // Faire défiler d'environ 80% de la largeur visible
            const scrollDistance = moviesContainer.clientWidth * 0.8;
            moviesContainer.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        });
    }
    
    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            const moviesContainer = document.querySelector(`#category-${categoryId} .movies`);
            // Faire défiler d'environ 80% de la largeur visible
            const scrollDistance = moviesContainer.clientWidth * 0.8;
            moviesContainer.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    }
};

export { MovieCategory };