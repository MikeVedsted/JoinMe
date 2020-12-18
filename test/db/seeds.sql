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

INSERT INTO
  address (
    street,
    number,
    postal_code,
    city,
    country,
    lat,
    lng
  )
VALUES
  (
    'Street1',
    1,
    11111,
    'Helsinki',
    'Finland',
    60.1234567,
    50.1234567
  ),
  (
    'Street2',
    2,
    22222,
    'Tampere',
    'Finland',
    59.1234567,
    50.1234567
  ),
  (
    'Street3',
    3,
    33333,
    'Oulu',
    'Finland',
    58.1234567,
    50.1234567
  ),
  (
    'Street4',
    4,
    44444,
    'Berlin',
    'Germany',
    52.1234567,
    50.1234567
  ),
  (
    'Street5',
    5,
    55555,
    'Hamburg',
    'Germany',
    51.1234567,
    50.1234567
  );

INSERT INTO
  category (name)
VALUES
  ('Football'),
  ('Tennis'),
  ('Basketball'),
  ('Running'),
  ('waterpolo');

INSERT INTO
  userk (
    first_name,
    last_name,
    email,
    gender,
    date_of_birth,
    profile_image,
    profile_text,
    base_address,
  )
VALUES
  (
    'Chiran',
    'Chapagain',
    'chiran@gmail.com',
    'male',
    '01-01-1100',
    'https://example.io/image.jpg',
    'Test user Chiran',
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 1
    )
  ),
  (
    'Marina',
    'Costa',
    'marina@gmail.com',
    'Female',
    '01-01-1100',
    'https://example.io/image.jpg',
    'Test user Marina',
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 2
    )
  ),
  (
    'Nanna',
    'Dao',
    'nanna@gmail.com',
    'Female',
    '01-01-1100',
    'https://example.io/image.jpg',
    'Test user Nanna',
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 3
    )
  ),
  (
    'Mike',
    'Vedsted',
    'mike@gmail.com',
    'Male',
    '01-01-1100',
    'https://example.io/image.jpg',
    'Test user Mike',
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 4
    )
  ),
  (
    'Rost',
    'Petrenko',
    'rost@gmail.com',
    'Male',
    '01-01-1100',
    'https://example.io/image.jpg',
    'Test user Rost',
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 5
    )
  );

INSERT INTO
  event (
    title,
    category,
    date,
    time,
    description,
    max_participants,
    address,
    created_by,
    expires_at,
    image
  )
VALUES
  (
    'Test title 1',
    1,
    '01-07-2021',
    '04:00:00',
    'Test description 1',
    21,
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 1
    ),
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Chiran'
    ),
    '10-10-2021',
    'https://example.io/image.jpg'
  ),
  (
    'Test title 2',
    2,
    '01-07-2021',
    '04:00:00',
    'Test description 2',
    11,
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 2
    ),
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Marina'
    ),
    '10-10-2021',
    'https://example.io/image.jpg'
  ),
  (
    'Test title 3',
    3,
    '01-07-2021',
    '04:00:00',
    'Test description 3',
    5,
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 3
    ),
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Nanna'
    ),
    '10-10-2021',
    'https://example.io/image.jpg'
  ),
  (
    'Test title 4',
    4,
    '01-07-2021',
    '04:00:00',
    'Test description 4',
    8,
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 4
    ),
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    '10-10-2021',
    'https://example.io/image.jpg'
  ),
  (
    'Test title 5',
    5,
    '01-07-2021',
    '04:00:00',
    'Test description 5',
    13,
    (
      SELECT
        address_id
      FROM
        address
      WHERE
        number = 5
    ),
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    '10-10-2021',
    'https://example.io/image.jpg'
  );

INSERT INTO
  event_request (requester, event)
VALUES
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Chiran'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 3'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Marina'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 4'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Nanna'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 5'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 1'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 2'
    )
  );

INSERT INTO
  event_participant (participant, event)
VALUES
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Chiran'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 4'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Marina'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 5'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Nanna'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 1'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 2'
    )
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 3'
    )
  );

INSERT INTO
  user_interest (userk, interest)
VALUES
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Chiran'
    ),
    1
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Marina'
    ),
    2
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Nanna'
    ),
    3
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    4
  ),
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    5
  );

INSERT INTO
  admin (userk)
VALUES
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    )
  );

INSERT INTO
  banned_user (userk)
VALUES
  (
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    )
  );

INSERT INTO
  comment (comment, userk, event)
VALUES
  (
    'Awesome!',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 3'
    )
  ),
  (
    'Let me join!',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 2'
    )
  ),
  (
    'When is it?',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 5'
    )
  ),
  (
    'Could it be Thursday instead?',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 4'
    )
  ),
  (
    'I am vegan, is the ball made of leather?',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 1'
    )
  ),
  (
    'I will be late... Sorry, not sorry',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 1'
    )
  ),
  (
    'How much does it cost?',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Mike'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 4'
    )
  ),
  (
    ':shipit:',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 1'
    )
  ),
  (
    ':shipit:',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 2'
    )
  ),
  (
    ':shipit:',
    (
      SELECT
        user_id
      FROM
        userk
      WHERE
        first_name = 'Rost'
    ),
    (
      SELECT
        event_id
      FROM
        event
      WHERE
        title = 'Test title 3'
    )
  );
