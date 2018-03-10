CREATE TABLE Type (
	ID 			SERIAL		PRIMARY KEY NOT NULL,
	type        VARCHAR(50)   			NOT NULL
);

CREATE TABLE Weight(
	weight 		DECIMAL 		PRIMARY KEY NOT NULL
);

CREATE TABLE Prices (
	ID 				SERIAL		PRIMARY KEY 				NOT NULL,
	package_type 	INT			REFERENCES type(ID) 		NOT NULL,
	weight 			DECIMAL		REFERENCES Weight(weight)	NOT NULL,
	price           DECIMAL									NOT NULL
);

INSERT INTO Type (type) VALUES ('Letters (Stamped)'), ('Letters (Metered)'), ('Large Envelopes (Flats)'), ('First-Class Package Service—Retail'); 
INSERT INTO Weight (weight) VALUES (1),(2),(3),(4),(5),(6),(7) ,(8) ,(9) ,(10) ,(11) ,(12) ,(13), (3.5); 

INSERT INTO Prices (package_type, weight, price) VALUES (1, 1, 0.5), (1, 2, 0.71), (1, 3, 0.92), (1, 3.5, 1.13);
INSERT INTO Prices (package_type, weight, price) VALUES (2, 1, 0.47), (2, 2, 0.68), (2, 3, 0.89), (2, 3.5, 1.10);
INSERT INTO Prices (package_type, weight, price) VALUES (3, 1, 1), (3, 2, 1.21), (3, 3, 1.42), (3, 4, 1.63), (3, 5, 1.84), (3, 6, 2.05),
														(3, 7, 2.26), (3, 8, 2.47), (3, 9, 2.68), (3, 10, 2.89), (3, 11, 3.10), (3, 12, 3.31),
														(3, 13, 3.52);

INSERT INTO Prices (package_type, weight, price) VALUES (4, 1, 3.50), (4, 2, 3.50), (4, 3, 3.50), (4, 4, 3.50), (4, 5, 3.75), (4, 6, 3.75),
														(4, 7, 3.75), (4, 8, 3.75), (4, 9, 4.10), (4, 10, 4.45), (4, 11, 4.80), (4, 12, 5.15),
														(4, 13, 5.50);