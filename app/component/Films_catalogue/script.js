let templateFile = await fetch("./component/Films_catalogue/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (movies, profileId, favorites) {
  let html = "";
  favorites = Array.isArray(favorites) ? favorites : [];
  for (let i = 0; i < movies.length; i++) {
    let movieHtml = template;
    
    // Vérifier si le film est récent
    const recent = movies[i].creation && new Date(movies[i].creation) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newTag = recent ? '<span class="tag">New</span>' : '';
    
    // Remplacer tous les placeholders
    movieHtml = movieHtml.replace("{{titre}}", movies[i].name);
    movieHtml = movieHtml.replace("{{image1}}", movies[i].image);
    movieHtml = movieHtml.replace("{{image1.1}}", movies[i].image);
    movieHtml = movieHtml.replace("{{handler}}", `C.handlerDetail(${movies[i].id})`);
    movieHtml = movieHtml.replace("{{new}}", newTag);

    let isFavorite = false;
    for (let fav of favorites) {
      if (fav.id === movies[i].id) {
        isFavorite = true;
        break;
      }
    }
    const favoriteButton = isFavorite
      ? `<button disabled>Favori</button>`
      : `<button class="fav_button" onclick="C.addFavorite(${profileId}, ${movies[i].id})">Ajouter aux favoris</button>`;

    movieHtml += favoriteButton;
    html += movieHtml;
  }
  return html;
};

export { Movie };
