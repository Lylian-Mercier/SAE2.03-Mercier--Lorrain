

let templateFile = await fetch('./component/NewMenuForm/template.html');
let template = await templateFile.text();


let NewMenuForm = {};

NewMenuForm.format = function(handler){
    let html= template;
    html = html.replace('{{handler}}', handler);
    return html;
}


export {NewMenuForm};

