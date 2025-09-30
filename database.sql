DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS association;
DROP TABLE IF EXISTS collect;
DROP TABLE IF EXISTS test;


PRAGMA foreign_keys = ON;

CREATE TABLE volunteer (
    volunteers_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    city_id INTEGER NOT NULL,
    current_donation_point INTEGER,
    spend_donation_point INTEGER,
    total_donation_point INTEGER,
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE city (
    city_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE association (
    association_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    donation_value INTEGER NOT NULL,
    total_donation INTEGER
);

CREATE TABLE collect (
    collect_id INTEGER PRIMARY KEY AUTOINCREMENT,
    volunteer_id INTEGER NOT NULL,
    date TEXT NOT NULL, -- SQLite stocke les dates comme TEXT, REAL ou INTEGER (ici TEXT est courant)
    city_id INTEGER NOT NULL,
    nb_butt INTEGER,
    nb_plastic INTEGER,
    nb_glass INTEGER,
    nb_metal INTEGER,
    nb_electronic INTEGER,
    nb_other INTEGER,
    FOREIGN KEY (city_id) REFERENCES city(city_id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteer(volunteers_id)
);

INSERT INTO city (name) VALUES
('Nantes'),
('Lyon'),
('Paris'),
('Marseille'),
('Toulouse'),
('Nice'),
('Strabourg'),
('Montpellier'),
('Bordeaux'),
('Lille');

INSERT INTO association (name, description, donation_value, image) VALUES
('Ocean Cleanup', 'Association dédiée au nettoyage des océans et à la protection de la vie marine.', 100,'🌊'),
('Forest Guardians', 'Protection des forêts et reforestation à travers le monde.', 150,'🌳'),
('Wildlife Protectors', 'Protection des espèces menacées et préservation de leur habitat.', 200,'🦁'),
('Clean Air Initiative', 'Lutte contre la pollution de l''air et promotion des énergies propres.', 120,'🌬️');
