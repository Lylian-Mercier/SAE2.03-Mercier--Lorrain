let HOST_URL = "https://mmi.unilim.fr/~mercierlorrai1/SAE2.03-Mercier--Lorrain";

let DataMovie = {};

DataMovie.request = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=getmovie");
  let data = await answer.json();
  return data;
};

/** DataMovie.update
 *
 * Prend en paramètre un objet FormData (données de formulaire) à envoyer au serveur.
 * Ces données sont incluses dans une requête HTTP en méthode POST.
 * Une requête POST au lieu de GET n'affiche pas les données dans l'URL (plus discret).
 * Les données sont placées dans le corps (body) de la requête HTTP. Elles restent visibles mais
 * en utilisant les outils de développement du navigateur (Network > Payload).
 * La requête comprend aussi un paramètre todo valant update pour indiquer au serveur qu'il
 * s'agit d'une mise à jour (car on a codé le serveur pour qu'il sache quoi faire en fonction de la valeur de todo).
 *
 * @param {*} fdata un objet FormData contenant les données du formulaire à envoyer au serveur.
 * @returns la réponse du serveur.
 */


DataMovie.addMovie = async function (fdata) {
  let config = {
    method: "POST",
    body: fdata,
  };
  let answer = await fetch(HOST_URL + "/server/script.php?todo=addMovie", config);
  let data = await answer.json();
  return data;
};

export { DataMovie };
