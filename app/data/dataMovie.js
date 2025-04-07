// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~mercierlorrai1/SAE2.03-Mercier--Lorrain";

let DataMovie = {};

// DataMovie.requestMovies = async function () {
//   // Récupération des films
//   let answer = await fetch(HOST_URL + "server/script.php?todo=getAllMovies");
//   let movies = await answer.json();
//   return movies;
// };

DataMovie.requestMovies = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=getAllMovies");
  let movies = await answer.json();
  return movies;
};

DataMovie.requestMovieDetails = async function (movieId) {
  let answer = await fetch(HOST_URL + `/server/script.php?todo=readMovieDetail&id=${movieId}`);
  let movieDetails = await answer.json();
  return movieDetails;
};

DataMovie.requestMoviesCategory = async function (age) {
  const url = HOST_URL + "/server/script.php?todo=readMovies&age=" + age;
  console.log("URL générée :", url); // Log pour vérifier l'URL
  let answer = await fetch(url);
  let categories = await answer.json();
  return categories;
};

// On exporte la fonction DataMovie.requestMovies
export { DataMovie };
