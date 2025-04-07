let HOST_URL = "https://mmi.unilim.fr/~mercierlorrai1/SAE2.03-Mercier--Lorrain";

let DataProfile = {};

DataProfile.read = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfiles");
  let profile = await answer.json();
  return profile;
};

export { DataProfile };