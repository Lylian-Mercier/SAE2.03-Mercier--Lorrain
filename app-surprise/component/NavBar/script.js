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

// Initialize mobile menu toggle
NavBar.initMobileMenu = function() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const navbarList = document.querySelector('.navbar__list');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarList.classList.toggle('active');
    });
  }
  
  // Close menu when clicking on a menu item
  const menuItems = document.querySelectorAll('.navbar__item');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navbarList.classList.remove('active');
    });
  });
};

// Add observer to call initMobileMenu after DOM is loaded
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (document.querySelector('.navbar__hamburger')) {
      NavBar.initMobileMenu();
      observer.disconnect();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

export { NavBar };
