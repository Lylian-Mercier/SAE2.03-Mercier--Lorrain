// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "../server";

let DataMovie = {};

// DataMovie.requestMovies = async function () {
//   // Récupération des films
//   let answer = await fetch(HOST_URL + "server/script.php?todo=getAllMovies");
//   let movies = await answer.json();
//   return movies;
// };

DataMovie.requestMovies = async function () {
  let answer = await fetch(HOST_URL + "/script.php?todo=getAllMovies");
  let movies = await answer.json();
  return movies;
};

DataMovie.requestMovieDetails = async function (movieId) {
  let answer = await fetch(
    HOST_URL + `/script.php?todo=readMovieDetail&id=${movieId}`
  );
  let movieDetails = await answer.json();

  let averageRating = await fetch(HOST_URL + `/script.php?todo=getRating&movie_id=${movieId}`);
  movieDetails.average_rating = await averageRating.json();

  return movieDetails;
};

DataMovie.requestMoviesCategory = async function (age) {
  const url = HOST_URL + "/script.php?todo=readMovies&age=" + age;
  console.log("URL générée :", url); // Log pour vérifier l'URL
  let answer = await fetch(url);
  let categories = await answer.json();
  return categories;
};

DataMovie.getFavorites = async function (profileId) {
  let answer = await fetch(
    `${HOST_URL}/script.php?todo=getFavorites&profile_id=${profileId}`
  );
  let favorites = await answer.json();
  return favorites;
};

DataMovie.addFavorite = async function (profileId, movieId) {
  const url = `${HOST_URL}/script.php?todo=addFavorite&profile_id=${profileId}&movie_id=${movieId}`;
  console.log("URL générée pour l'ajout de favori :", url);

  // Effectuer la requête fetch pour obtenir la réponse
  let answer = await fetch(url); // Correction : ajout de fetch pour récupérer la réponse
  let response = await answer.json(); // Convertir la réponse en JSON
  return response; // Retourner la réponse
};

DataMovie.removeFavorites = async function (profileId, movieId) {
  const url = `${HOST_URL}/script.php?todo=removeFavorites&profile_id=${profileId}&movie_id=${movieId}`;
  console.log("URL générée pour la suppression de favori :", url);
  let answer = await fetch(url);
  let response = await answer.json();
  return response;
};

DataMovie.requestHighlightMovies = async function () {
  let answer = await fetch(
    HOST_URL + "/script.php?todo=getHighlightMovies"
  );
  console.log(
    "URL générée pour les films mis en avant :",
    HOST_URL + "/script.php?todo=getHighlightMovies"
  ); // Corrigez ici
  let highlightMovies = await answer.json();
  console.log("Données reçues pour les films mis en avant :", highlightMovies); // Vérifiez les données reçues
  return highlightMovies;
};

DataMovie.searchMovies = async function (searchTerm) {
  const url = `${HOST_URL}/script.php?todo=searchMovies&searchTerm=${encodeURIComponent(
    searchTerm
  )}`;
  let answer = await fetch(url);
  let movies = await answer.json();
  return movies;
};

DataMovie.addRating = async function ( profileId, movieId, rating) {
  const url = `${HOST_URL}/server/script.php?todo=addRating&profile_id=${profileId}&movie_id=${movieId}&rating=${rating}`;
  let response = await fetch(url);
  let message = await response.json();
  return message;
}


// On exporte la fonction DataMovie.requestMovies
export { DataMovie };
