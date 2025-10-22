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


-- cette ligne genere un compte admin qui a pour mdp 1234
INSERT INTO volunteer 
(firstname, lastname, email, password, city_id, current_donation_point, spend_donation_point, total_donation_point)
VALUES
('admin', 'admin', 'admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$k07c8Ot270p8gYQ+mPEfAg$Lc6dhSgek7E/cTk4pv4ISFBrZxdqep6uJfzkcqQZFxo', 1, 0, 0, 0);
