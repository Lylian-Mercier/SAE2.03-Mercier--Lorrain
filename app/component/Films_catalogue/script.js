let templateFile = await fetch("./component/Films_catalogue/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (movies, profileId, favorites) {
  let html = "";
  favorites = Array.isArray(favorites) ? favorites : [];
  for (let i = 0; i < movies.length; i++) {
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{titre}}", movies[i].name);
    movieHtml = movieHtml.replace("{{image1}}", movies[i].image);
    movieHtml = movieHtml.replace("{{image1.1}}", movies[i].image);
    movieHtml = movieHtml.replace(
      "{{handler}}",
      `C.handlerDetail(${movies[i].id})`
    );
    let isFavorite = false;
    for (let fav of favorites) {
      if (fav.id === movies[i].id) {
        isFavorite = true;
        break;
      }
    }
    const favoriteButton = isFavorite
      ? `<button disabled>Favori</button>`
      : `<button onclick="C.addFavorite(${profileId}, ${movies[i].id})">Ajouter aux favoris</button>`;

    movieHtml += favoriteButton;
    html += movieHtml;
  }
  return html;
};

export { Movie };
