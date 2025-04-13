import { DataMovie } from "../../data/dataMovie.js"; // Importation de DataMovie
 
 let commentTemplateFile = await fetch("./component/Commentaires/template.html");
 let commentTemplate = await commentTemplateFile.text();
 
 let Comment = {};
 
 Comment.format = function (movieId) {
   let html = commentTemplate;
   html = html.replace("{{movieId}}", movieId); // Remplace {{movieId}} dans le template
   return html;
 };
 
 Comment.loadComments = async function (movieId) {
   const comments = await DataMovie.getComments(movieId);
   const commentsList = document.querySelector("#comments-list");
 
   if (comments.length === 0) {
     commentsList.innerHTML =
       "<p>Aucun commentaire pour ce film. Soyez le premier à en laisser un !</p>";
     return;
   }
 
   let commentsHTML = "";
   for (let i = 0; i < comments.length; i++) {
     const comment = comments[i];
     commentsHTML += `
         <div class="comment">
             <p><strong>${comment.profile_name}</strong> (${comment.creation}):</p>
             <p>${comment.comment}</p>
         </div>
     `;
   }
   commentsList.innerHTML = commentsHTML;
 };
 
 Comment.addComment = async function (movieId) {
   const profileId = C.getSelectedProfileId();
   if (!profileId) {
     alert("Veuillez sélectionner un profil pour laisser un commentaire.");
     return;
   }
 
   const comment = document.querySelector("#new-comment").value.trim();
   if (!comment) {
     alert("Veuillez écrire un commentaire avant de l'envoyer.");
     return;
   }
 
   const response = await DataMovie.addComment(movieId, profileId, comment);
   alert(response);
   Comment.loadComments(movieId); // Recharge les commentaires
 };
 
 export { Comment };