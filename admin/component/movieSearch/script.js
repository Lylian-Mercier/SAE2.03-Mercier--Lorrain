let MovieSearch = {};
 
 MovieSearch.init = function () {
   // Initialise le composant en ajoutant les gestionnaires d'événements si nécessaire
   document.querySelector("#searchTerm").addEventListener("keypress", (e) => {
     if (e.key === "Enter") {
       C.searchMovies();
     }
   });
 };
 
 MovieSearch.formatResults = function (movies, updateHandler) {
  if (movies.length === 0) {
    return `<p>Aucun film ne correspond à votre recherche.</p>`;
  }

  let html = "";
  let i = 0;
  let moviesCount = movies.length;

  while (i < moviesCount) {
    let movie = movies[i];
    html += `
      <form class="movieSearch__card">
        <h3>${movie.name}</h3>
        <p>Catégorie : ${movie.category || "Non spécifiée"}</p>
        <p>Mis en avant : ${movie.is_highlight ? "Oui" : "Non"}</p>
        <button type="button" onclick="${updateHandler}(${movie.id}, ${!movie.is_highlight})">
          ${movie.is_highlight ? "Retirer" : "Mettre en avant"}
        </button>
      </form>
    `;
    i++;
  }

  return html;
};
 
 export { MovieSearch };