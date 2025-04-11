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

    // Vérifiez si l'élément existe
    const detailSection = document.querySelector("#movie-detail-section");
    if (detailSection) {
        detailSection.innerHTML = html;

        // Défilement automatique vers la section des détails
        detailSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    return html;
};

export { MovieDetail };
