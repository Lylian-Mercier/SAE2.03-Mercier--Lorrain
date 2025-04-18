let templateFile = await fetch("./component/Fav/template.html");
let template = await templateFile.text();

let templateLiFile = await fetch("./component/Fav/template_li.html");
let templateLi = await templateLiFile.text();

let Fav = {};

Fav.format = function (favoriteData) {
    let html = template;

    html = html.replace("{{image}}", favoriteData.image || "default-image.png");
    html = html.replace("{{name}}", favoriteData.name ? favoriteData.name : "Nom inconnu");
    html = html.replace(/{{id}}/g, favoriteData.id);
    html = html.replace("{{handler}}", `C.handlerDetail(${favoriteData.id})`);
    return html;
};

// Pour générer une liste complète de favoris
Fav.formatList = function(favoritesArray) {
    let content = '';
    for (let favorite of favoritesArray) {
        content += Fav.format(favorite);
    }
    
    // Utilise le template_li seulement une fois, et place tous les favoris à l'intérieur
    let completeHtml = '<h1 class="fav__title">Mes films préférés</h1><div class="favorite__container">' + content + '</div>';
    return completeHtml;
};

// Cette fonction formatLi doit remplacer {{favorite}} par le contenu formaté
Fav.formatLi = function (favoriteData) {
    let favoriteContent = Fav.format(favoriteData);
    let liHtml = templateLi;
    liHtml = liHtml.replace("{{favorite}}", favoriteContent);
    return liHtml;
};

export { Fav };