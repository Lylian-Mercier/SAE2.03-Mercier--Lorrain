let templateFile = await fetch("./component/Films_catalogue/template.html");
let template = await templateFile.text();
console.log("Template chargé :", template); // Vérifiez le contenu du template

let Movie = {};

Movie.format = function (movies) {
  let html = "";
  movies.forEach((movie) => {
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{titre}}", movie.name);
    movieHtml = movieHtml.replace("{{image1}}", movie.image);
    movieHtml = movieHtml.replace("{{image1.1}}", movie.image);
    html += movieHtml;
  });
  return html;
};

export { Movie };