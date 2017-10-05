DROP DATABASE IF EXISTS battlebread;

CREATE DATABASE battlebread;

USE battlebread;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  wins int NOT NULL DEFAULT 0,
  losses int NOT NULL DEFAULT 0,
  playerLevel int NOT NULL DEFAULT 1,
  streak varchar(100) DEFAULT '',
  avatarUrl varchar(100) DEFAULT 'http://oi40.tinypic.com/i5sy1u.jpg',
  PRIMARY KEY (id)
);

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  player1ID int NOT NULL,
  player1Placement varchar(100),
  player1Hits varchar(100),
  player1Misses varchar(100),
  player2ID int NOT NULL,
  player2Placement varchar(100),
  player2Hits varchar(100),
  player2Misses varchar(100),
  allMoves varchar(300) DEFAULT '[]',
  result ENUM('In progress', 'Complete'),
  PRIMARY KEY (id),
  FOREIGN KEY (player1ID) REFERENCES users(id),
  FOREIGN KEY (player2ID) REFERENCES users(id)
);

INSERT into users (username, password, wins, losses, playerLevel, streak, avatarUrl)
Values ('boxingBakerBen', 'password1', 6, 4, 2, 'WLWWLLWWWL', 'http://oi46.tinypic.com/4jl55k.jpg');

INSERT into users (username, password, wins, losses, playerLevel, streak, avatarUrl)
Values ('doughDudeDevon', 'password2', 3, 7, 1, 'WLWWLLLLLL', 'http://oi48.tinypic.com/2n9z89k.jpg');

INSERT into users (username, password, wins, losses, playerLevel, streak, avatarUrl)
Values ('empanadaEaterEphraim', 'password3', 5, 5, 2, 'WWLWWLWLL', 'http://oi50.tinypic.com/241jksn.jpg');

INSERT into users (username, password, wins, losses, playerLevel, streak, avatarUrl)
Values ('sniperSouffleSteph', 'password4', 8, 2, 3, 'LWWLWWWWWW', 'http://oi43.tinypic.com/5twb9d.jpg');



INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, 
player2Placement, player2Hits, player2Misses, result)
Values (1, '[]', '[]', '[]', 2, '[]', '[]', '[{p1guess: [3,3]}, {p2guess: [2,6]}]', 'In progress');

INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, 
player2Placement, player2Hits, player2Misses, result)
Values (3, '[]', '[]', '[]', 4, '[]', '[]', '[]', 'In progress');



