let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = async function (hAbout, hShowMovies, profiles ) {
  let html = template;

  
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{hShowMovies}}", hShowMovies);

  let options = `<option value="" data-img="" data-age="0">Choisir un profil</option>`;
  // let options ="";
  for (let i = 0; i < profiles.length; i++) {
    let profile = profiles[i];
    options += `<option value="${profile.id}" data-img="${profile.avatar}" data-age="${profile.min_age}">${profile.name}</option>`;
  }

  let image = profiles[0]?.avatar|| "";  
  html = html.replace("{{profileOptions}}", options);
  html = html.replace("{{image}}", image);
  return html;
};

export { NavBar };
