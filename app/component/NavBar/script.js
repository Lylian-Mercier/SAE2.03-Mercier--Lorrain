let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = async function (hAbout, hShowMovies, profiles ) {
  let html = template;

  
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{hShowMovies}}", hShowMovies);

  let options = profiles
    .map(profile => `<option value="${profile.id}" data-img="${profile.avatar}">${profile.name}</option>`)
    .join("");

  let image = profiles[0]?.avatar|| "";  
  html = html.replace("{{profileOptions}}", options);
  html = html.replace("{{image}}", image);
  return html;
};

export { NavBar };
