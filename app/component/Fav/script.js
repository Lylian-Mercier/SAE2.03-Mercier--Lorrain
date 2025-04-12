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

Fav.formatLi = function (favoriteData) {
    let favoriteContent = Fav.format(favoriteData);
    let liHtml = templateLi;
    liHtml = liHtml.replace("{{favorite}}", favoriteContent);
    return liHtml;
}

export { Fav };