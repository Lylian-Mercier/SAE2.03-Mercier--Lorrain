let templateFile = await fetch("./component/Films_catalogue/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (movies) {
  let html = "";
  movies.forEach((movie) => {
    let movieHtml = template;
    movieHtml = movieHtml.replace("{{titre}}", movie.name);
    movieHtml = movieHtml.replace("{{image1}}", movie.image);
    movieHtml = movieHtml.replace("{{image1.1}}", movie.image);
    movieHtml = movieHtml.replace("{{handler}}", `C.handlerDetail(${movie.id})`);
    html += movieHtml;
  });
  return html;
};

export { Movie };