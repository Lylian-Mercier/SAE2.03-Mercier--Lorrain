import { Comment } from "../Commentaires/script.js";

let templateFile = await fetch("./component/movieDetail/template.html");
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function (movieData) {
    let html = template;
    
    // Vérifier si le film est récent
    const recent = movieData.creation && new Date(movieData.creation) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newTag = recent ? '<span class="tag">New</span>' : '';
    
    // Remplacer tous les placeholders
    html = html.replace("{{movieTitle}}", movieData.name);
    html = html.replace("{{image}}", movieData.image);
    html = html.replace("{{movieSynopsis}}", movieData.description);
    html = html.replace("{{movieDirector}}", movieData.director);
    html = html.replace("{{movieYear}}", movieData.year);
    html = html.replace("{{movieCategory}}", movieData.category);
    html = html.replace("{{movieAgeRestriction}}", movieData.min_age);
    html = html.replace("{{movieTrailerUrl}}", movieData.trailer);
    html = html.replace("{{handler}}", `C.addRatings(${movieData.id})`);
    html = html.replace("{{new}}", newTag);

    let averageRating = movieData.average_rating || 0;
    html = html.replace("{{averageRating}}", averageRating);

    html += Comment.format(movieData.id); // Ajout du format de commentaire

    // Vérifiez si l'élément existe
    const detailSection = document.querySelector("#movie-detail-section");
    if (detailSection) {
        detailSection.innerHTML = html;

        // Défilement automatique vers la section des détails après un court délai
        setTimeout(() => {
            detailSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100); // Un délai de 100ms est généralement suffisant
    }

    return html;
};

MovieDetail.loadComments = function (movieId) {
    Comment.loadComments(movieId);
}
MovieDetail.addComment = function (movieId) {
    Comment.addComment(movieId);
}

export { MovieDetail };
