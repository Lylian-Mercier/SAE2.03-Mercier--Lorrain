let templateFile = await fetch("./component/highlightMovies/template.html");
let template = await templateFile.text();

let HighlightMovies = {};

HighlightMovies.format = function (movies) {
  console.log("Films mis en avant reçus pour le rendu :", movies); // Vérifiez les données reçues
  if (movies.length === 0) {
    return "<p>Aucun film mis en avant pour le moment.</p>";
  }

  let formattedMovies = "";
  for (let movie of movies) {
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{image}}", movie.image);
    movieHtml = movieHtml.replace("{{title}}", movie.name);
    movieHtml = movieHtml.replace("{{synopsis}}", movie.description);
    movieHtml = movieHtml.replace(
      "{{handler}}",
      `C.handlerDetail(${movie.id})`
    );
    formattedMovies += movieHtml;
  }
  return formattedMovies;
};

export { HighlightMovies };
