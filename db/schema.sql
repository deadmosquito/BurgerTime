DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;
CREATE TABLE burgers
(
    burger_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    burger_name VARCHAR
    (50) NOT NULL,
    devoured BOOLEAN DEFAULT false NOT NULL
);