import { DataCom } from "../../data/dataCom.js";
 
 let commentTemplateFile = await fetch("./component/ModerationCom/template.html");
 let commentTemplate = await commentTemplateFile.text();
 
 let Comment = {};
 

 Comment.format = function () {
   return commentTemplate;
 };
 

 Comment.loadPendingComments = async function () {
   const comments = await DataCom.getPendingComments();
   const commentsList = document.querySelector("#comments-list");
 
   if (comments.length === 0) {
     commentsList.innerHTML = "<p>Aucun commentaire à modérer pour le moment.</p>";
     return;
   }
 
   let commentsHTML = "";
   for (const comment of comments) {
     commentsHTML += `
       <div class="comment">
         <p><strong>${comment.profile_name}</strong> (${comment.creation}):</p>
         <p>${comment.comment}</p>
         <button onclick="Comment.approveComment(${comment.id})">Approuver</button>
         <button onclick="Comment.deleteComment(${comment.id})">Supprimer</button>
       </div>
     `;
   }
   commentsList.innerHTML = commentsHTML;
 };
 
 // Approuve un commentaire
 Comment.approveComment = async function (commentId) {
   const response = await DataCom.approveComment(commentId);
   alert(response);
   Comment.loadPendingComments(); // Recharge la liste des commentaires
 };
 
 // Supprime un commentaire
 Comment.deleteComment = async function (commentId) {
   const response = await DataCom.deleteComment(commentId);
   alert(response);
   Comment.loadPendingComments(); // Recharge la liste des commentaires
 };
 
 // Attache les fonctions au contexte global
 window.Comment = Comment;
 
 export { Comment };