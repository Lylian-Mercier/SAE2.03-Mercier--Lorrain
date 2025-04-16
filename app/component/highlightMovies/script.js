let templateFile = await fetch("./component/highlightMovies/template.html");
let template = await templateFile.text();
let templateLiFile = await fetch("./component/highlightMovies/template_li.html");
let templateLi = await templateLiFile.text();

let HighlightMovies = {};

HighlightMovies.format = function (movies) {
  console.log("Films mis en avant reçus pour le rendu :", movies);
  if (movies.length === 0) {
    return "<p>Aucun film mis en avant pour le moment.</p>";
  }

  let formattedMovies = "";
  for (let movie of movies) {
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{image}}", movie.image);
    movieHtml = movieHtml.replace("{{name}}", movie.name);
    movieHtml = movieHtml.replace("{{description}}", movie.description);
    movieHtml = movieHtml.replace(
      "{{handler}}",
      `C.handlerDetail(${movie.id})`
    );
    formattedMovies += movieHtml;
  }

  // Utilisation du template conteneur
  let finalHtml = templateLi;
  finalHtml = finalHtml.replace("{{highlight}}", formattedMovies);
  
  return finalHtml;
};

export { HighlightMovies };
