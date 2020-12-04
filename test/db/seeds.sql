DROP TABLE IF EXISTS event_request;
DROP TABLE IF EXISTS event_participant;
DROP TABLE IF EXISTS user_interest;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS banned_user;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS interest;
DROP TABLE IF EXISTS userk;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS postal_code;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS country;

CREATE TABLE country(
  country_id SERIAL PRIMARY KEY,
  country varchar(50) UNIQUE NOT NULL
);

CREATE TABLE city(
  city_id SERIAL PRIMARY KEY,
  city varchar(50) NOT NULL,
  country int REFERENCES country(country_id) ON DELETE CASCADE
);

CREATE TABLE postal_code(
  postal_code_id SERIAL PRIMARY KEY,
  postal_code int NOT NULL,
  city int REFERENCES city(city_id) ON DELETE CASCADE
);

CREATE TABLE address(
  address_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  street varchar(50) NOT NULL,
  number int,
  city int REFERENCES city(city_id) ON DELETE CASCADE,
  postal_code int REFERENCES postal_code(postal_code_id) ON DELETE CASCADE
);

CREATE TABLE interest(
  interest_id SERIAL UNIQUE PRIMARY KEY,
  name varchar(50) UNIQUE NOT NULL
);

CREATE TABLE userk(
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name varchar(100) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  profile_image varchar(255) DEFAULT 'https://res.cloudinary.com/dahevvjff/image/upload/v1606484281/l1dsr9hikb57ukge6ehk.jpg',
  profile_text TEXT,
  base_address uuid REFERENCES address(address_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event(
  event_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  title varchar(50) NOT NULL,
  category int REFERENCES interest(interest_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  description TEXT NOT NULL,
  max_participants int check(max_participants > 0) NOT NULL,
  address uuid REFERENCES address(address_id) ON DELETE CASCADE,
  created_by uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  image varchar(255) DEFAULT 'https://res.cloudinary.com/dahevvjff/image/upload/v1606484900/wv6nzry10xk5h0vc0mgi.jpg'
);

CREATE TABLE event_request(
  er_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  requester uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE event_participant(
  ep_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  participant uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE user_interest(
  ui_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  interest int REFERENCES interest(interest_id) ON DELETE CASCADE
);

CREATE TABLE admin(
  admin_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE
);

CREATE TABLE banned_user(
  banned_user_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE
);

CREATE TABLE comment(
  comment_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  comment text NOT NULL,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

INSERT INTO 
  country (country) 
VALUES 
  ('Finland'),
  ('Germany'),
  ('Nepal'),
  ('Brazil'),
  ('Vietnam'),
  ('Kazakhstan'),
  ('Denmark');

INSERT INTO 
  city (city, country) VALUES ('Helsinki', 1),('Oulu', 1),('Tampere', 1),('Berlin',2),('Kathmandu',3),('Lumbini',3),('São Paulo',4),('Belo Horizonte',4),('Hanoi',5),('Kon Tum',5),('Karagandy',6),('Aralsk',6),('Nykøbing Falster',7),('København',7);

INSERT INTO 
  postal_code (postal_code, city) 
VALUES
  (12345, 1), (98765, 1), (33333, 1),
  (12345, 2), (98765, 2), (33333, 2), 
  (12345, 3), (98765, 3), (33333, 3), 
  (12345, 4), (98765, 4), (33333, 4), 
  (12345, 5), (98765, 5), (33333, 5), 
  (12345, 6), (98765, 6), (33333, 6),
  (12345, 7), (98765, 7), (33333, 7),
  (12345, 8), (98765, 8), (33333, 8),
  (12345, 9), (98765, 9), (33333, 9), 
  (12345, 10), (98765, 10), (33333, 10),
  (12345, 11), (98765, 11), (33333, 11), 
  (12345, 12), (98765, 12), (33333, 12), 
  (12345, 13), (98765, 13), (33333, 13), 
  (12345, 14), (98765, 14), (33333, 14);


INSERT INTO 
  address (street, number, city,postal_code)
VALUES 
  ('Street1', 1, 1,1),
  ('Street2', 2, 2, 2),
  ('Street3', 3, 3,3),
  ('Street4', 4,4,4),
  ('Street5', 5,5,5),
  ('Street6', 6,6,6),
  ('Street7', 7,7,7),
  ('Street8', 8,8,8),
  ('Street9', 9,9,9),
  ('Street10', 10, 10, 10),
  ('Street11', 11, 11, 11),
  ('Street12', 12, 12, 12),
  ('Street13', 13, 13, 13),
  ('Street14', 14, 14, 14);

INSERT INTO 
  interest (name) 
VALUES 
  ('Football'),
  ('Tennis'),
  ('Bouldering'),
  ('Basketball'),
  ('Running');

INSERT INTO 
  userk (first_name, last_name, email, profile_text, base_address) 
VALUES 
('Chiran','Chapagain','chiran@gmail.com', 'Test user Chiran', 
  (SELECT address_id FROM address WHERE number = 1)), 
('Marina','Costa','marina@gmail.com', 'Test user Marina', 
  (SELECT address_id FROM address WHERE number = 2)),
('Nanna','Dao','nanna@gmail.com', 'Test user Nanna', 
  (SELECT address_id FROM address WHERE number = 3)),
('Rost','Petrenko','rost@gmail.com', 'Test user Rost', 
  (SELECT address_id FROM address WHERE number = 4)),
('Mike','Vedsted','mike@gmail.com', 'Test user Mike', 
  (SELECT address_id FROM address WHERE number = 5));

INSERT INTO 
  event (title, category, date, time, description, max_participants, address, created_by, expires_at) 
VALUES 
  (
    'Test title 1', 1, '01-07-2021', '04:00:00', 'Test description 1', 21, 
    (SELECT address_id FROM address WHERE number = 1), 
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    '10-10-2021'
  ),
  (
    'Test title 2', 2, '01-07-2021', '04:00:00', 'Test description 2', 1, 
    (SELECT address_id FROM address WHERE number = 2), 
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    '10-10-2021'
  ),
  (
    'Test title 3', 3, '01-07-2021', '04:00:00', 'Test description 3', 5, 
    (SELECT address_id FROM address WHERE number = 3), 
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    '10-10-2021'
  ),
  (
    'Test title 4', 4, '01-07-2021', '04:00:00', 'Test description 4', 9, 
    (SELECT address_id FROM address WHERE number = 4), 
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    '10-10-2021'
  ),
  (
    'Test title 5', 5, '01-07-2021', '04:00:00', 'Test description 5', 99, 
    (SELECT address_id FROM address WHERE number = 5), 
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'),
    '10-10-2021'
  ),
  (
    'Test title 6', 1, '01-07-2021', '04:00:00', 'Test description 6', 21,
    (SELECT address_id FROM address WHERE number = 6), 
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'), 
    '10-10-2021'
  ),
  (
    'Test title 7', 2, '01-07-2021', '04:00:00', 'Test description 7', 1,
    (SELECT address_id FROM address WHERE number = 7), 
    (SELECT user_id FROM userk WHERE first_name = 'Rost'), 
    '10-10-2021'
  ),
  (
    'Test title 8', 3, '01-07-2021', '04:00:00', 'Test description 8', 5, 
    (SELECT address_id FROM address WHERE number = 8), 
    (SELECT user_id FROM userk WHERE first_name = 'Rost'), 
    '10-10-2021'
  ),
  (
    'Test title 9', 4, '01-07-2021', '04:00:00', 'Test description 9', 9, 
    (SELECT address_id FROM address WHERE number = 9), 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    '10-10-2021'
  ), 
  (
    'Test title 10', 5, '01-07-2021', '04:00:00', 'Test description 10', 99, 
    (SELECT address_id FROM address WHERE number = 10), 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    '10-10-2021'
  );

INSERT INTO 
  event_request (requester, event) 
  VALUES 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 3')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 4')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 5')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 6')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'),
    (SELECT event_id FROM event WHERE title = 'Test titel 7')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'),
    (SELECT event_id FROM event WHERE title = 'Test titel 8')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test titel 9')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test titel 10')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 1')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 2')
  );

INSERT INTO 
  event_participant (participant, event) 
VALUES 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 6')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 7')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    (SELECT event_id FROM event WHERE title = 'Test titel 8')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'),
    (SELECT event_id FROM event WHERE title = 'Test titel 9')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'),
   (SELECT event_id FROM event WHERE title = 'Test titel 10')
  ),
  (
     (SELECT user_id FROM userk WHERE first_name = 'Nanna'), 
     (SELECT event_id FROM event WHERE title = 'Test titel 1')
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test titel 2')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test titel 3')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test titel 4')
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test titel 5')
  );

INSERT INTO 
  user_interest (userk, interest) 
VALUES 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'), 
    1
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'), 
    2
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'), 
    3
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'), 
    4
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    5
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Chiran'),
    3
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Marina'),
    1
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Nanna'),
    4
  ), 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost'), 
    5
  ),
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    2
  );

INSERT INTO 
  admin (userk) 
VALUES 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Rost')
  );

INSERT INTO 
  banned_user (userk) 
VALUES 
  (
    (SELECT user_id FROM userk WHERE first_name = 'Mike')
  );

INSERT INTO 
  comment (comment, userk, event) 
VALUES 
  (
    'Awesome!', 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    (SELECT event_id FROM event WHERE title = 'Test title 3')
  ), 
  (
    'Let me join!', 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    (SELECT event_id FROM event WHERE title = 'Test title 2')
  ), 
    ('When is it?',
    (SELECT user_id FROM userk WHERE first_name = 'Mike'), 
    (SELECT event_id FROM event WHERE title = 'Test title 5')
  ), 
  (
    'Could it be Thursday instead?', 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test title 4')
  ), 
    ('I am vegan, is the ball made of leather?',
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test title 1')
  ),
  (
    'I will be late... Sorry, not sorry',
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test title 6')
  ),
  (
    'How much does it cost?', 
    (SELECT user_id FROM userk WHERE first_name = 'Mike'),
    (SELECT event_id FROM event WHERE title = 'Test title 7')
  ), 
  (
    ':shipit:',
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test title 8')
  ),
  (
    ':shipit:',
    (SELECT user_id FROM userk WHERE first_name = 'Rost'),
    (SELECT event_id FROM event WHERE title = 'Test title 9')
  ),
  (
    ':shipit:', 
    (SELECT user_id FROM userk WHERE first_name = 'Rost'), 
    (SELECT event_id FROM event WHERE title = 'Test title 10')
  );