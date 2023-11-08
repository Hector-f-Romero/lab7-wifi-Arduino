CREATE DATABASE IF NOT EXISTS lab7;
USE lab7;

CREATE TABLE IF NOT EXISTS photocell_records (id_record INT PRIMARY KEY AUTO_INCREMENT,number_leds int NOT NULL CHECK (number_leds BETWEEN 0 AND 3),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO photocell_records VALUES (default,3,default);

SELECT * FROM lab7.photocell_records;

SELECT number_leds, COUNT(*) AS count
FROM photocell_records
GROUP BY number_leds
ORDER BY number_leds;

#DROP TABLE IF EXISTS photocell_records;