let HOST_URL = "../server";

let DataProfile = {};

DataProfile.addProfile = async function (fdata) {
  
    let config = {
      method: "POST",
      body: fdata,
    };
    let answer = await fetch(HOST_URL + "/script.php?todo=addProfile", config);
    let data = await answer.json();
    return data;
  };
  
  /** DataProfile.update
 *
 * Prend en paramètre un objet FormData (données de formulaire) à envoyer au serveur.
 * Ces données sont incluses dans une requête HTTP en méthode POST.
 * Une requête POST au lieu de GET n'affiche pas les données dans l'URL (plus discret).
 * Les données sont placées dans le corps (body) de la requête HTTP. Elles restent visibles mais
 * en utilisant les outils de développement du navigateur (Network > Payload).
 * La requête comprend aussi un paramètre todo valant updateProfile pour indiquer au serveur qu'il
 * s'agit d'une mise à jour (car on a codé le serveur pour qu'il sache quoi faire en fonction de la valeur de todo).
 *
 * @param {*} fdata un objet FormData contenant les données du formulaire à envoyer au serveur.
 * @returns la réponse du serveur.
 */

// DataProfile.updateProfile = async function (fdata) {
//   let config = {
//     method: "POST",
//     body: fdata,
//   };
//   let answer = await fetch(HOST_URL + "/server/script.php?todo=updateProfile", config);
//   let data = await answer.json();
//   return data;
// };

/** DataProfile.getProfiles
 *
 * Récupère la liste des profils depuis le serveur.
 * @returns {Array} Une liste de profils.
 */

DataProfile.getProfiles = async function () {
  let answer = await fetch(HOST_URL + "/script.php?todo=readProfiles");
  let data = await answer.json();
  return data;
};


export { DataProfile };