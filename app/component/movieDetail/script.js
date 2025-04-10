let templateFile = await fetch("./component/movieDetail/template.html");
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function (movieData) {
    let html = template;
    html = html.replace("{{movieTitle}}", movieData.name);
    html = html.replace("{{image}}", movieData.image);
    html = html.replace("{{movieSynopsis}}", movieData.description);
    html = html.replace("{{movieDirector}}", movieData.director);
    html = html.replace("{{movieYear}}", movieData.year);
    html = html.replace("{{movieCategory}}", movieData.category);
    html = html.replace("{{movieAgeRestriction}}", movieData.min_age);
    html = html.replace("{{movieTrailerUrl}}", movieData.trailer);

    // Insérez le contenu dans la page
    document.querySelector("#movie-detail-container").innerHTML = html;

    // Défilement automatique vers la section des détails
    document.querySelector("#movie-detail-section").scrollIntoView({
        behavior: "smooth", // Défilement fluide
        block: "start"      // Aligne le haut de l'élément avec le haut de la fenêtre
    });

    return html;
};

export { MovieDetail };