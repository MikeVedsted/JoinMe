DROP TABLE IF EXISTS event_creator;

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

CREATE TABLE userk (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name varchar(100) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  profile_image varchar(255) DEFAULT 'https://res.cloudinary.com/dahevvjff/image/upload/v1606484281/l1dsr9hikb57ukge6ehk.jpg',
  profile_text TEXT,
  base_address uuid REFERENCES address(address_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event (
  event_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  title varchar(50) NOT NULL,
  category int REFERENCES interest(interest_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  description TEXT NOT NULL,
  max_participants int check(max_participants > 0) NOT NULL,
  address uuid REFERENCES address(address_id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  image varchar(255) DEFAULT 'https://res.cloudinary.com/dahevvjff/image/upload/v1606484900/wv6nzry10xk5h0vc0mgi.jpg'
);

CREATE TABLE event_creator(
  ec_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  creator uuid REFERENCES users(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE event_request(
  er_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  requester uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE event_participant(
  ep_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  participant uuid REFERENCES users(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);

CREATE TABLE user_interest(
  ui_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  userk uuid REFERENCES users(user_id) ON DELETE CASCADE,
  interest int REFERENCES interest(interest_id) ON DELETE CASCADE
);

CREATE TABLE admin(
  admin_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE banned_user(
  banned_user_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE comment(
  comment_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  comment text NOT NULL,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE
);