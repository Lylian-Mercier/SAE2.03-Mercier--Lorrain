-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 18 avr. 2025 à 12:16
-- Version du serveur : 10.11.11-MariaDB-0+deb12u1
-- Version de PHP : 8.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mercierlorrai1`
--

-- --------------------------------------------------------

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Comédie'),
(3, 'Drame'),
(4, 'Science-fiction'),
(5, 'Animation'),
(6, 'Thriller'),
(7, 'Horreur'),
(8, 'Aventure'),
(9, 'Fantaisie'),
(10, 'Documentaire');

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `creation` datetime DEFAULT current_timestamp(),
  `status` enum('pending','approved','deleted') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Comments`
--

INSERT INTO `Comments` (`id`, `movie_id`, `profile_id`, `comment`, `creation`, `status`) VALUES
(7, 45, 1, 'Je recommande, dès le plus jeune âge !!', '2025-04-14 02:06:58', 'approved'),
(8, 45, 1, 'pas du tout gore !', '2025-04-14 02:07:19', 'deleted'),
(40, 33, 2, 'C\'est le meilleur film que j\'ai vu de ma vie, je vais faire de ce pas un letterbox.', '2025-04-15 12:06:48', 'approved'),
(41, 48, 1, 'masterclass', '2025-04-17 22:35:41', 'approved'),
(42, 49, 1, 'Un chef d\'œuvre !!', '2025-04-17 22:41:26', 'approved');

-- --------------------------------------------------------

--
-- Structure de la table `Favorites`
--

CREATE TABLE `Favorites` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Favorites`
--

INSERT INTO `Favorites` (`id`, `profile_id`, `movie_id`) VALUES
(11, 8, 33),
(18, 1, 45),
(19, 2, 17),
(20, 2, 27),
(21, 8, 57);

-- --------------------------------------------------------

--
-- Structure de la table `Movie`
--

CREATE TABLE `Movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `min_age` int(11) DEFAULT NULL,
  `is_highlight` tinyint(1) DEFAULT 0,
  `creation` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Movie`
--

INSERT INTO `Movie` (`id`, `name`, `year`, `length`, `description`, `director`, `id_category`, `image`, `trailer`, `min_age`, `is_highlight`, `creation`) VALUES
(7, 'Interstellar', 2014, 169, 'Un groupe d\'explorateurs voyage à travers un trou de ver pour sauver l\'humanité.', 'Christopher Nolan', 4, 'interstellar.jpg', 'https://www.youtube.com/embed/VaOijhK3CRU?si=76Ke4uw4LYjuLuQ6', 12, 0, '2023-04-02 09:38:34'),
(12, 'La Liste de Schindler', 1993, 195, 'Un industriel allemand sauve des milliers de Juifs pendant l\'Holocauste.', 'Steven Spielberg', 3, 'schindler.webp', 'https://www.youtube.com/embed/ONWtyxzl-GE?si=xC3ASGGPy5Ib-aPn', 16, 0, '2025-04-15 09:38:34'),
(17, 'Your Name', 2016, 107, 'Deux adolescents échangent leurs corps de manière mystérieuse.', 'Makoto Shinkai', 5, 'your_name.jpg', 'https://www.youtube.com/embed/AROOK45LXXg?si=aUQyGk2VMCb_ToUL', 10, 0, '2024-04-15 09:38:34'),
(27, 'Le Bon, la Brute et le Truand', 1966, 161, 'Trois hommes se lancent à la recherche d\'un trésor caché.', 'Sergio Leone', 8, 'bon_brute_truand.jpg', 'https://www.youtube.com/embed/WA1hCZFOPqs?si=TwNZAoM4oj4KpGja', 12, 0, '2025-04-15 09:38:34'),
(33, '\nMinecraft, le film', 2025, 101, 'Un groupe de héros doit sauver leur monde cubique d’une menace mystérieuse. Action, créativité et amitié au rendez-vous.', 'Jared Hess', 2, 'minecraft.jpg', 'https://www.youtube.com/embed/8B1EtVPBSMw?si=tu6B_QUEoA_PXjRV', 5, 0, '2025-04-15 09:38:34'),
(35, 'Le Géant de fer', 1999, 85, 'Abandonné à lui-même, Hogarth découvre dans la forêt un géant métallique, dangereux et mystérieux, après une étrange perturbation.', 'Brad Bird', 5, 'GéantDeFer.jpg', 'https://www.youtube.com/embed/ISNlvL1fqOg?si=-yO5f-tKVYh9AZpa', 6, 0, '2025-04-15 09:38:34'),
(45, 'Mr. Pickles', 2014, 11, 'Dans la ville d\'Old Town, Tommy, un garçon de 6 ans, vit avec son chien démoniaque, M. Pickles, qui mène secrètement une vie sanglante pour le protéger.', 'Will Carsola & Dave Stewart', 7, 'pickles.webp', 'https://www.youtube.com/embed/Ay0zqCi17N8?si=yFDivID5nFCI96Uq', 18, 1, '2025-04-15 09:38:34'),
(46, 'Ratatouille', 2007, 111, 'Un rat passionné de cuisine rêve de devenir un grand chef à Paris. Grâce à une alliance improbable avec un jeune commis maladroit, il va prouver que tout le monde peut cuisiner.', 'Brad Bird', 5, 'rat.jpg', 'https://www.youtube.com/embed/KpiDM6I4x_Q?si=xdC7HuUdF9yS_OGg', 6, 0, '2025-04-16 22:40:25'),
(48, 'Le Château ambulant', 2004, 119, 'Une jeune femme transformée en vieille dame par un sort rencontre un mystérieux sorcier et son château magique. Ensemble, ils affrontent la guerre et lèvent les malédictions.', 'Hayao Miyazaki', 5, 'castle.jpg', 'https://www.youtube.com/embed/iwROgK94zcM?si=IpMqgCCFT101wu64', 7, 1, '2025-04-16 22:45:15'),
(49, 'Akira', 1988, 124, 'Dans un Tokyo post-apocalyptique, un jeune motard développe d’étranges pouvoirs qui menacent de tout détruire. Son ami tente de l’arrêter avant qu’il ne soit trop tard.', 'Katsuhiro Ōtomo', 5, 'akira.jpg', 'https://www.youtube.com/embed/nA8KmHC2Z-g?si=uGj89JiW0t0ZRK0H', 14, 1, '2025-04-16 22:53:23'),
(50, 'Belle et Sébastien', 2013, 104, 'Un jeune garçon orphelin se lie d’amitié avec une chienne sauvage, et ensemble, ils affrontent les dangers de la montagne pour protéger ceux qu’ils aiment.', 'Nicolas Vanier', 8, 'belle.webp', 'https://www.youtube.com/embed/00cPmZTPyjw?si=98NOQqEktFv6_8_C', 10, 0, '2025-04-16 22:56:47'),
(51, 'Retour vers le futur', 1985, 116, 'Un ado voyage accidentellement dans le passé avec une DeLorean et doit s’assurer que ses parents tombent amoureux… pour ne pas disparaître.', 'Robert Zemeckis', 4, 'future.jpg', 'https://www.youtube.com/embed/cU5BREZ9ke0?si=AZZpxNARPdmoepOV', 8, 0, '2025-04-16 23:16:25'),
(52, 'Matrix', 1999, 136, 'Un hacker découvre que la réalité est une illusion et rejoint la rébellion pour libérer l’humanité d’un monde contrôlé par des machines.', 'Les Wachowski', 4, 'matrix.jpg', 'https://www.youtube.com/embed/8xx91zoASLY?si=5QkwrKfWXVDwPxpg', 14, 0, '2025-04-16 23:19:25'),
(53, 'Inception', 2010, 148, 'Un voleur spécialisé dans les rêves doit implanter une idée dans l’esprit d’un homme, mais ses propres souvenirs menacent la mission.', 'Christopher Nolan', 4, 'inception.jpg', 'https://www.youtube.com/embed/HcoZbHBDHQA?si=vA3sJkYw33zJ4Ydq', 12, 1, '2025-04-16 23:21:49'),
(54, 'Blade Runner', 1982, 117, 'Dans un futur dystopique, un policier traque des androïdes rebelles presque indiscernables des humains. Mais la frontière entre l’homme et la machine se brouille.', 'Ridley Scott', 4, 'blade.jpg', 'https://www.youtube.com/embed/FfRPKYwsFNg?si=3i3Z3I6mLNBRsHhP', 16, 0, '2025-04-16 23:26:07'),
(55, 'Blade Runner 2049', 2017, 163, 'Un jeune blade runner découvre un secret enfoui qui pourrait bouleverser l’équilibre entre humains et androïdes, et le pousse à retrouver un ancien disparu.', 'Denis Villeneuve', 4, '2049.jpg', 'https://www.youtube.com/embed/O4C5cwSbXZ8?si=2XIXvvXQwLLlct_s', 16, 0, '2025-04-16 23:28:38'),
(56, 'Les Évadés', 1994, 142, 'Condamné à tort, un homme endure la prison pendant des années et prépare patiemment son évasion, porté par l’amitié et l’espoir.', 'Frank Darabont', 3, 'evade.jpg', 'https://www.youtube.com/embed/wux4Vwy3_x8?si=aDAjy7JG7Div3cSu', 16, 0, '2025-04-16 23:34:39'),
(57, 'La Ligne verte', 1999, 188, 'Dans une prison, un gardien découvre que l’un des condamnés à mort possède des pouvoirs de guérison miraculeux, bouleversant sa vision de la vie et de la justice.', 'Frank Darabont', 3, 'ligne-verte.jpg', 'https://www.youtube.com/embed/mccs8Ql8m8o?si=sMnh_h136f_oOMuf', 12, 0, '2025-04-16 23:37:33'),
(58, 'Parasite', 2019, 132, 'Une famille pauvre s’infiltre peu à peu chez une famille riche, jusqu’à ce que leur mensonge les entraîne dans une spirale incontrôlable.', 'Bong Joon-ho', 3, 'parasite.jpg', 'https://www.youtube.com/embed/_YD8WKEZaPo?si=BsqqHr70Ou03XztT', 16, 1, '2025-04-16 23:41:23'),
(59, 'Requiem for a Dream', 2000, 101, 'Quatre personnes sombrent dans l’addiction, chacun poursuivant un rêve illusoire qui les mène lentement à la déchéance.', 'Darren Aronofsky', 3, 'requiem.jpg', 'https://www.youtube.com/embed/0nU7dC9bIDg?si=uk0vcqU7TvDhaH6e', 18, 1, '2025-04-16 23:46:23');

-- --------------------------------------------------------

--
-- Structure de la table `Profil`
--

CREATE TABLE `Profil` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `min_age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Profil`
--

INSERT INTO `Profil` (`id`, `name`, `avatar`, `min_age`) VALUES
(1, 'lylian mercier--lorrain', 'default.jpg', 0),
(2, 'Hugo Vialatou', 'Marlon.webp', 16),
(3, 'Manon', 'default.jpg', 1),
(4, 'Owen', 'default.jpg', 23),
(7, 'Brad', 'Parrain.jpg', 17),
(8, 'Ezel', 'Kebab.webp', 1000000);

-- --------------------------------------------------------

--
-- Structure de la table `Ratings`
--

CREATE TABLE `Ratings` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Ratings`
--

INSERT INTO `Ratings` (`id`, `profile_id`, `movie_id`, `rating`) VALUES
(2, 1, 33, 10),
(4, 1, 45, 10),
(5, 2, 35, 1),
(6, 2, 33, 8),
(7, 1, 48, 9);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Index pour la table `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Index pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Index pour la table `Profil`
--
ALTER TABLE `Profil`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Ratings`
--
ALTER TABLE `Ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `Favorites`
--
ALTER TABLE `Favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `Movie`
--
ALTER TABLE `Movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `Profil`
--
ALTER TABLE `Profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Ratings`
--
ALTER TABLE `Ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`),
  ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `Profil` (`id`);

--
-- Contraintes pour la table `Favorites`
--
ALTER TABLE `Favorites`
  ADD CONSTRAINT `Favorites_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `Profil` (`id`),
  ADD CONSTRAINT `Favorites_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`);

--
-- Contraintes pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);

--
-- Contraintes pour la table `Ratings`
--
ALTER TABLE `Ratings`
  ADD CONSTRAINT `Ratings_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `Profil` (`id`),
  ADD CONSTRAINT `Ratings_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
