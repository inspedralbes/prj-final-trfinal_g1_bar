INSERT INTO RESTAURANTS(id, nom) VALUES (1, 'Le Petit Cambodge'), (2, 'Can Roca');

INSERT INTO USERS(id, name, email, password, restaurant_id) VALUES 
(1, "admin", "admin@gmail.com", "$2y$12$kv4uXRTwXp4MzAsDg8zNHOkJ8Qzb7LfweBWSmMa1wFTRuMyAUc.im", 1), -- password: adminadminadmin
(2, "Santi", "santi@gmail.com", "$2y$12$LL.VQ7Ihn/rutxFt3afP.ey0JwHk6AA6c72b5kUZYjQ0QpHiy3Up2", 2), -- password: santi
(3, "Alvaro", "alvaro@gmail.com", "$2y$12$nXaOJfYfe3L8pciCK8sbu.ygIQxCxmOph7rsWsJAl4sQVZyRjPJ.6", NULL), -- password: alvaro
(4, "David", "david@gmail.com", "$2y$12$2T2EIVOsx/l2ke3UvoeZ/Oko1rGo.SrFt3Rf.l0aV7//Vwn8bf0Xe", 2), -- password: david
(5, "Miquel", "miquel@gmail.com", "$2y$12$4uWjEHnKQkju94mlhGlid.ieDPcjGNevI5wT0hI19txA83vIymeb6", NULL); -- password: miquel

INSERT INTO CATEGORIAS(id, nom, restaurant_id, imatge) VALUES 
(1, 'Entrants', 1, "link_a_la_imatge.jpg"), (2, 'Primers', 1, "link_a_la_imatge.jpg"), (3, 'Postres', 1, "link_a_la_imatge.jpg"),
(4, 'Esmorzars', 2, "link_a_la_imatge.jpg"), (5, 'Dinars', 2, "link_a_la_imatge.jpg"), (6, 'Sopars', 2, "link_a_la_imatge.jpg");

INSERT INTO PRODUCTES(id, nom, descripcio, preu, imatge) VALUES
(1, 'Hamburguesa Clàssica', 'Hamburguesa de vedella de 150g amb enciam, tomàquet, ceba, formatge cheddar i salsa especial. Acompanyada de patates fregides.', 8.50, 'hamburguesa_classica.jpg'),
(2, 'Pizza Margarita', 'Pizza tradicional italiana amb salsa de tomàquet, mozzarella fresca i fulles de basilic, sobre una massa fina i cruixent.', 10.00, 'pizza_margarita.jpg'),
(3, 'Ensalada Cèsar', 'Ensalada amb enciam romà, trossets de pollastre a la graella, crostons, parmesà ratllat i salsa Cèsar casolana.', 7.00, 'ensalada_cesar.jpg'),
(4, 'Tapas Variades', 'Selecció de tapas que inclou patates braves, calamars a la romana, pebrots del Padró i croquetes casolanes de pernil.', 12.00, 'tapes_variades.jpg'),
(5, 'Paella de Marisc', 'Autèntica paella valenciana amb gambes, cloïsses, musclos i calamars, cuinada amb arròs de qualitat i safrà.', 15.00, 'paella_marisc.jpg'),
(6, 'Steak Tartar', 'Tall de filet de vedella tallat a mà, amanit amb una salsa especial de mostassa, tàperes i ceba picada, acompanyat de torrades.', 14.00, 'steak_tartar.jpg'),
(7, 'Crema de Carbassa', 'Crema suau de carbassa amb un toc de gingebre, servida amb llavors de carbassa torrades i un doll de crema fresca.', 6.00, 'crema_carbassa.jpg'),
(8, 'Sushi Assortit', 'Assortit de 12 peces de sushi, incloent maki, nigiri i sashimi, amb salmó fresc, tonyina i peix blanc, acompanyat de salsa de soja, wasabi i gingebre encurtit.', 18.00, 'sushi_assortit.jpg'),
(9, 'Risotto de Bolets', 'Risotto cremós cuinat amb una selecció de bolets silvestres, all i julivert, rematat amb parmesà ratllat.', 11.00, 'risotto_bolets.jpg'),
(10, 'Brownie de Xocolata', 'Brownie dens i humit de xocolata amb nous, servit calent amb una bola de gelat de vainilla i xarop de xocolata.', 5.00, 'brownie_chocolata.jpg'),
(11, 'Tiramisú', 'Postre tradicional italià fet amb formatge mascarpone, cafè, llicor de cafè i galetes savoiardi, cobert amb cacau en pols.', 5.00, 'tiramisu.jpg'),
(12, 'Pastís de Formatge', 'Pastís de formatge casolà amb base de galeta i cobert amb una capa de melmelada de maduixa.', 5.00, 'pastis_formatge.jpg');

INSERT INTO CATEGORIA_PRODUCTE(id, categoria_id, producte_id) VALUES
(3, 4, 1),  -- Hamburguesa Clàssica com a Esmorzars
(4, 2, 2),  -- Pizza Margarita com a Primers
(2, 1, 3),  -- Ensalada Cèsar com a Entrants
(1, 1, 4),  -- Tapas Variades com a Entrants
(5, 5, 5),  -- Paella de Marisc com a Dinars
(6, 2, 6),  -- Steak Tartar com a Primers
(7, 6, 7),  -- Crema de Carbassa com a Sopars
(8, 2, 8),  -- Sushi Assortit com a Primers
(9, 2, 9),  -- Risotto de Bolets com a Primers
(10, 3, 10), -- Brownie de Xocolata com a Postres
(11, 3, 11), -- Tiramisú com a Postres
(12, 3, 12); -- Pastís de Formatge com a Postres

INSERT INTO INGREDIENTS(id, nom, gluten, lactosa, fruits_secs, vegetariana, vegana) VALUES
(1, "Vedella", false, false, false, false, false),
(2, "Enciam", false, false, false, true, true),
(3, "Tomàquet", false, false, false, true, true),
(4, 'Ceba', false, false, false, true, true),
(5, 'Formatge Cheddar', false, true, false, true, false),
(6, 'Patates', false, false, false, true, true),
(7, 'Massa de Pizza', true, false, false, true, true),
(8, 'Mozzarella', false, true, false, true, false),
(9, 'Basilic', false, false, false, true, true),
(10, 'Pollastre', false, false, false, false, false),
(11, 'Parmesà', false, true, false, true, false),
(12, 'Pebrots del Padró', false, false, false, true, true),
(13, 'Gambes', false, false, false, false, false),
(14, 'Musclos', false, false, false, false, false),
(15, 'Calamars', false, false, false, false, false),
(16, 'Arròs', false, false, false, true, true),
(17, 'Safrà', false, false, false, true, true),
(18, 'Filet de Vedella', false, false, false, false, false),
(19, 'Mostassa', false, false, false, true, true),
(20, 'Tàperes', false, false, false, true, true),
(21, 'Carbassa', false, false, false, true, true),
(22, 'Gingebre', false, false, false, true, true),
(23, 'Salmó', false, false, false, false, false),
(24, 'Tonyina', false, false, false, false, false),
(25, 'Peix Blanc', false, false, false, false, false),
(26, 'Salsa de Soja', true, false, false, true, false),
(27, 'Wasabi', false, false, false, true, true),
(28, 'Gingebre Encurtit', false, false, false, true, true),
(29, 'Bolets', false, false, false, true, true),
(30, 'All', false, false, false, true, true),
(31, 'Julivert', false, false, false, true, true),
(32, 'Xocolata', true, true, false, true, false),
(33, 'Nous', false, false, true, true, true),
(34, 'Gelat de Vainilla', false, true, false, true, false);

INSERT INTO TIQUETS(id, link_qr, nombre_taula, restaurant_id) VALUES
(1, 'qr1', 1, 1), (2, 'qr2', 2, 1), (3, 'qr3', 3, 1),
(4, 'qr4', 20, 2), (5, 'qr5', 21, 2), (6, 'qr6', 22, 2);

INSERT INTO ITEM_TIQUET(tiquet_id, producte_id, user_id, quantitat, estat, comentari) VALUES
(1, 4, 1, 1, 'Pendent', "No formatge."), (1, 2, 3, 1, 'Pendent', null), (1, 3, 3, 1, 'Pendent', null), -- Tiquet 1 (restaurant 1) ha demanat pizza, ensalada i tapes (user 1 i 3)
(2, 6, 4, 1, 'En Preparació', null), (2, 8, 4, 1, 'En Preparació', null), (2, 9, 4, 1, 'Entregat', null), -- Tiquet 2 (restaurant 1) ha demanat steak, sushi i rissotto (user 4)
(3, 10, 5, 1, 'Entregat', null), (3, 11, 5, 1, 'Pagat', null), (3, 12, 5, 1, 'Pagat', null), -- Tiquet 3 (restaurant 1) ha demanat brownie, tiramisú i pastís de formatge (user 5)
(4, 1, 2, 2, 'Entregat', "No cogombre."), -- Tiquet 4 (restaurant 2) ha demanat dues hamburgueses (user 2)
(5, 5, 2, 1, 'En Preparació', "No gambes."), -- Tiquet 5 (restaurant 2) ha demanat 1 paella (user 2)
(6, 7, 2, 1, 'Pendent', null); -- Tiquet 6 (restaurant 2) ha demanat 1 crema de carbassa (user 2)

INSERT INTO PRODUCTE_INGREDIENT(producte_id, ingredient_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), -- Hamburguesa clàsica amb vedella, enciam, tomàquet, ceba, formatge cheddar i patates
(2, 7), (2, 8), (2, 9), (2, 3), -- Pizza margarita amb massa de pizza, mozzarella, tomàquet i basilic
(3, 2), (3, 3), (3, 10), (3, 11), -- Ensalada cèsar amb enciam, tomàquet, pollastre i parmesà
(4, 6), (4, 12), (4, 15), -- Tapas variades amb patates, calamars i pebrots del padró
(5, 13), (5, 14), (5, 15), (5, 16), (5, 17), -- Paella de marisc amb gambes, calamars, musclos, arròs i safrà
(6, 18), (6, 19), (6, 20), -- Steak tartar amb filet de vedella, mostassa i tàperes
(7, 21), (7, 22), -- Crema de carbassa amb carbassa i gingebre
(8, 23), (8, 24), (8, 25), (8, 26), (8, 27), (8, 28), -- Sushi assortit amb salmó, tonyina, peix blanc, salsa de soja, wasabi i gingebre encurtit
(9, 29), (9, 30), (9, 31), (9, 11), -- Risotto de bolets amb bolets, all, julivert i parmesà
(10, 32), (10, 33), (10, 34), -- Brownie de xocolata amb xocolata, nous i gelat de vainilla
(11, 32), (11, 33), (11, 34), -- Tiramisú amb xocolata, nous i gelat de vainilla
(12, 32), (12, 33), (12, 34); -- Pastís de formatge amb xocolata, nous i gelat de vainilla