DROP TABLE IF EXISTS event_request;
DROP TABLE IF EXISTS event_participant;
DROP TABLE IF EXISTS user_interest;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS banned_user;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS userk;
DROP TABLE IF EXISTS address;
CREATE TYPE gender AS ENUM ('Female', 'Male', 'Prefer not to say', 'Other');

CREATE TABLE address(
  address_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  street varchar(50) NOT NULL,
  number int,
  postal_code int NOT NULL,
  city varchar(50) NOT NULL,
  country varchar(50) NOT NULL,
  lat numeric NOT NULL,
  lng numeric NOT NULL
);

CREATE TABLE category(
  category_id SERIAL UNIQUE PRIMARY KEY,
  name varchar(50) UNIQUE NOT NULL
);

CREATE TABLE userk(
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
date_of_birth DATE,
gender gender,
  profile_image varchar(255),
  profile_text varchar(255),
  base_address uuid REFERENCES address(address_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE event(
  event_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  title varchar(50) NOT NULL,
  category int REFERENCES category(category_id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  description TEXT NOT NULL,
  max_participants int check(max_participants > 0) NOT NULL,
  address uuid REFERENCES address(address_id) ON DELETE CASCADE NOT NULL,
  created_by uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL,
  expires_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  image varchar(255) DEFAULT 'https://res.cloudinary.com/dahevvjff/image/upload/v1606484900/wv6nzry10xk5h0vc0mgi.jpg'
);

CREATE TABLE event_request(
  er_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  requester uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE NOT NULL,
  requested_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE event_participant(
  ep_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  participant uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE user_interest(
  ui_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL,
  interest int REFERENCES category(category_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE admin(
  admin_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE banned_user(
  banned_user_id SERIAL PRIMARY KEY,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE comment(
  comment_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  comment text NOT NULL,
  userk uuid REFERENCES userk(user_id) ON DELETE CASCADE NOT NULL,
  event uuid REFERENCES event(event_id) ON DELETE CASCADE NOT NULL,
  commented_at TIMESTAMP DEFAULT NOW()
);
