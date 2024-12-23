CREATE DATABASE tcg;

use tcg;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    packs INT NOT NULL DEFAULT 1
);

CREATE TABLE enemies(
    id INT AUTO_INCREMENT PRIMARY KEY,
    atk INT NOT NULL,
    hp INT NOT NULL
);

CREATE TABLE cards(
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    atk INT NOT NUll,
    hp INT NOT NULL 
);

CREATE TABLE cards_owned(
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    owned BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
);

INSERT INTO enemies (atk, hp) VALUES (6, 25);
INSERT INTO enemies (atk, hp) VALUES (13, 50);
INSERT INTO enemies (atk, hp) VALUES (25, 100);

INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/HogRider.png", "Hog Rider", 4, 7);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Kon.png", "Kon", 1, 1);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Mordred.png", "Mordred", 5, 5);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Raptor.png", "Raptor", 7, 10);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Goku.png", "Goku", 25, 25);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Duolingo.png", "Duolingo", 6, 8);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Omega_Weapon.png", "Omega Weapon", 50, 50);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Vivi.png", "Vivi", 5, 2);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/2B.png", "2B", 10, 20);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Varazslo.png", "Varazslo", 15, 5);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Ranni.png", "Ranni", 13, 9);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Solaire.png", "Solaire", 6, 7);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Alexander.png", "Alexander", 8, 17);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Gwen.png", "Gwen", 14, 8);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Sans.png", "Sans", 16, 2);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Blue_Buff.png", "Blue Buff", 7, 19);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Spirit.png", "Spirit", 13, 3);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Braum.png", "Barum", 7, 23);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Mashu.png", "Mashu", 9, 21);
INSERT INTO cards (image, name, atk, hp) VALUES ("Cards/Kenya.png", "Kanya Weszt", 3, 4);