<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "mercierlorrai1");
define("DBLOGIN", "mercierlorrai1");
define("DBPWD", "mercierlorrai1");

function getAllMovies() {
    // Connexion à la base de données
    $snx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT id, name, image FROM Movie";
    $stm = $snx->prepare($sql);
    $stm->execute();
    $res = $stm->fetchAll(PDO::FETCH_ASSOC);

    return $res; // Retourne le tableau des films
}

function addMovie($name, $director, $year, $length, $description,$id_category, $image, $trailer, $min_age) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    $sql = "INSERT INTO Movie (name, director, year, length, description, id_category, image, trailer, min_age) 
            VALUES (:name, :director, :year, :length, :description, :id_category, :image, :trailer, :min_age)";

    $stmt = $cnx->prepare($sql);

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':director', $director);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':id_category', $id_category);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);

    $stmt->execute();
    $res = $stmt->rowCount();
    return $res; // Retourne le nombre de lignes affectées par l'opération
}

function getMovieDetail($id) {
        // Connexion à la base de données
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Requête SQL pour récupérer les détails du film
        $sql = "SELECT 
                    Movie.id, 
                    Movie.name, 
                    Movie.director, 
                    Movie.year, 
                    Movie.length, 
                    Movie.description, 
                    Movie.image, 
                    Movie.trailer, 
                    Movie.min_age, 
                    Movie.id_category,
                    Movie.creation,
                    Category.name AS category
                FROM Movie
                JOIN Category ON Movie.id_category = Category.id
                WHERE Movie.id = :id";

        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Récupère le résultat sous forme d'objet
        $movieDetail = $stmt->fetch(PDO::FETCH_OBJ);

        return $movieDetail; // Retourne les détails du film
}

function getMoviesByCategory($age) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $sql = "SELECT 
                Category.id AS category_id, 
                Category.name AS category_name, 
                Movie.id AS movie_id, 
                Movie.name AS movie_name, 
                Movie.image AS movie_image
            FROM Movie
            JOIN Category ON Movie.id_category = Category.id
            WHERE :age = 0 OR Movie.min_age <= :age
            ORDER BY Category.name, Movie.name";

    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':age', $age, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Si aucun film n'est trouvé, retourner un tableau vide
    if (empty($rows)) {
        return [];
    }

    $categories = [];
    $i = 0;
    while ($i < count($rows)) {
        $row = $rows[$i];
        if (!isset($categories[$row->category_id])) {
            $categories[$row->category_id] = [
                "name" => $row->category_name,
                "movies" => []
            ];
        }
        $categories[$row->category_id]["movies"][] = [
            "id" => $row->movie_id,
            "name" => $row->movie_name,
            "image" => $row->movie_image
        ];
        $i++;
    }

    return array_values($categories);
}

function addProfile($id, $name, $avatar, $min_age) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    $favSql = "SELECT movie_id FROM Favorites WHERE profile_id = :id";
    $favStmt = $cnx->prepare($favSql);
    $favStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $favStmt->execute();
    $favMovies = $favStmt->fetchAll(PDO::FETCH_COLUMN);

    $ratingSql = "SELECT movie_id, rating FROM Ratings WHERE profile_id = :id";
    $ratingStmt = $cnx->prepare($ratingSql);
    $ratingStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $ratingStmt->execute();
    $ratings = $ratingStmt->fetchAll(PDO::FETCH_ASSOC);

    $delFavSql = "DELETE FROM Favorites WHERE profile_id = :id";
    $delFavStmt = $cnx->prepare($delFavSql);
    $delFavStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $delFavStmt->execute();

    $delRatingSql = "DELETE FROM Ratings WHERE profile_id = :id";
    $delRatingStmt = $cnx->prepare($delRatingSql);
    $delRatingStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $delRatingStmt->execute();
    
    
    $sql = "REPLACE INTO Profil (id, name, avatar, min_age) 
            VALUES (:id, :name, :avatar, :min_age)";
    $stmt = $cnx->prepare($sql);

    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    $stmt->bindParam(':min_age', $min_age, PDO::PARAM_INT);
    $stmt->execute();

    $insertFavSql = "INSERT INTO Favorites (profile_id, movie_id) VALUES (:profile_id, :movie_id)";
    $insertFavStmt = $cnx->prepare($insertFavSql);
    $i = 0;
    $favCount = count($favMovies);
    while ($i < $favCount) {
        $insertFavStmt->bindParam(':profile_id', $id, PDO::PARAM_INT);
        $insertFavStmt->bindParam(':movie_id', $favMovies[$i], PDO::PARAM_INT);
        $insertFavStmt->execute();
        $i++;
    }

    $insertRatingSql = "INSERT INTO Ratings (profile_id, movie_id, rating) VALUES (:profile_id, :movie_id, :rating)";
    $insertRatingStmt = $cnx->prepare($insertRatingSql);
    $i = 0;
    $ratingCount = count($ratings);
    while ($i < $ratingCount) {
        $insertRatingStmt->bindParam(':profile_id', $id, PDO::PARAM_INT);
        $insertRatingStmt->bindParam(':movie_id', $ratings[$i]['movie_id'], PDO::PARAM_INT);
        $insertRatingStmt->bindParam(':rating', $ratings[$i]['rating'], PDO::PARAM_INT);
        $insertRatingStmt->execute();
        $i++;
    }
    

    $res = $stmt->rowCount();
    return $res; 
}

function getProfiles() {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD,);
        $sql = "SELECT id, name, avatar, min_age FROM Profil";
        $stmt = $cnx->query($sql);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
}


function addFavorite($profile_id, $movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "INSERT INTO Favorites (profile_id, movie_id) VALUES (:profile_id, :movie_id)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}
  
  function getFavorites($profile_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.id, Movie.name, Movie.image 
            FROM Favorites 
            JOIN Movie ON Favorites.movie_id = Movie.id 
            WHERE Favorites.profile_id = :profile_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}
  
  function isFavorite($profile_id, $movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT COUNT(*) FROM Favorites WHERE profile_id = :profile_id AND movie_id = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}

function removeFavorites($profile_id, $movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $sql = "DELETE FROM Favorites WHERE profile_id = :profile_id AND movie_id = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    $rowCount = $stmt->rowCount();

    // Log pour vérifier le résultat
    error_log("Suppression de favori : profile_id=$profile_id, movie_id=$movie_id, lignes affectées=$rowCount");

    return $rowCount;
}

function getHighlightMovies() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, image, description FROM Movie WHERE is_highlight = TRUE";
    $stmt = $cnx->query($sql);
    $movies = $stmt->fetchAll(PDO::FETCH_OBJ);
    error_log("Films mis en avant récupérés : " . json_encode($movies)); // Ajoutez ce log
    return $movies;
}

function searchMovies($searchTerm, $category = NULL, $year = NULL) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.is_highlight, Category.name AS category FROM Movie LEFT JOIN Category ON Movie.id_category = Category.id WHERE Movie.name LIKE :searchTerm";
    if ($category) {
        $sql .= " AND Movie.id_category = :category";
    }
    if ($year) {
        $sql .= " AND Movie.year = :year";
    }
    $stmt = $cnx->prepare($sql);
    $stmt ->bindValue(':searchTerm', '%' . $searchTerm . '%', PDO::PARAM_STR);
    if ($category) {
        $stmt->bindParam(':category', $category, PDO::PARAM_INT);
    }
    if ($year) {
        $stmt->bindParam(':year', $year, PDO::PARAM_INT);
    }
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function updateHighlightStatus($movie_id, $is_highlight) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "UPDATE Movie SET is_highlight = :is_highlight WHERE id = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':is_highlight', $is_highlight, PDO::PARAM_BOOL);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}

function addRating($profile_id, $movie_id, $rating) {
    try {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
        // Correction du nom de la table de "Rating" à "Ratings"
        $sql = "INSERT INTO Ratings (profile_id, movie_id, rating) VALUES (:profile_id, :movie_id, :rating)";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
        $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
        $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
        $stmt->execute();
        
        // Ajouter plus de détails dans le message d'erreur
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            error_log("Aucune ligne n'a été insérée");
            return false;
        }
    } catch (PDOException $e) {
        error_log("Erreur lors de l'ajout de la note: " . $e->getMessage());
        return false;
    }
}

function getAverageRating($movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT AVG(rating) AS average_rating FROM Ratings WHERE movie_id = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    $averageRate = $stmt->fetch(PDO::FETCH_OBJ)->average_rating ?? 0;
    return round($averageRate, 1);
}

function Rated($profile_id, $movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT COUNT(*) FROM Ratings WHERE profile_id = :profile_id AND movie_id = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}

function addComment($profile_id, $movie_id, $comment) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "INSERT INTO Comments (profile_id, movie_id, comment) VALUES (:profile_id, :movie_id, :comment)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    return $stmt->execute();
}

function getComments($movie_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Comments.comment, Comments.creation, Profil.name AS profile_name FROM Comments JOIN Profil ON Comments.profile_id = Profil.id WHERE Comments.movie_id = :movie_id AND Comments.status = 'approved' ORDER BY Comments.creation DESC";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':movie_id', $movie_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function getPendingComments() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Comments.id, Comments.comment, Comments.creation, Profil.name AS profile_name FROM Comments JOIN Profil ON Comments.profile_id = Profil.id WHERE Comments.status = 'pending' ORDER BY Comments.creation DESC";
    $stmt = $cnx->query($sql);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function approveComment($comment_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "UPDATE Comments SET status = 'approved' WHERE id = :comment_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':comment_id', $comment_id, PDO::PARAM_INT);
    return $stmt->execute();
}

function deleteComment($comment_id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "UPDATE Comments SET status = 'deleted' WHERE id = :comment_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':comment_id', $comment_id, PDO::PARAM_INT);
    return $stmt->execute();
}

function getRecentMovies() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, image, creation FROM Movie WHERE creation >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
    $stmt = $cnx->query($sql);
    return $stmt->fetchAll(PDO::FETCH_OBJ); 
}