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