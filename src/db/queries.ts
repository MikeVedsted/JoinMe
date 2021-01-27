// ----------------
// REQUEST QUERIES
// ----------------

export const createParticipantQ = `
  INSERT INTO event_participant 
    (participant, event) 
  VALUES 
    ((SELECT requester FROM event_request where er_id = $1),
    (SELECT event FROM event_request WHERE er_id = $1))
  RETURNING *
`

export const deleteRequestQ = `
  DELETE FROM event_request 
  WHERE er_id = $1
`

export const findJoinRequestsByEventQ = `
  SELECT 
    er_id,
    user_id, profile_image, first_name, last_name
  FROM event_request 
  INNER JOIN userk ON event_request.requester = userk.user_id
  WHERE event = $1
`

export const findParticipantsByEventQ = `
  SELECT 
    ep_id,
    user_id, profile_image, first_name, last_name
  FROM event_participant 
  INNER JOIN userk ON event_participant.participant = userk.user_id
  WHERE event = $1
`

export const checkRequestStatusQ = `
  SELECT *
  FROM event_request
  WHERE event = $1
  AND requester = $2
`

export const createNewRequestQ = `
  INSERT INTO event_request
    (requester, event) 
  VALUES 
    ($2, $1) 
  RETURNING *
`
export const requesterByRequestIdQ = `
  SELECT requester 
  FROM event_request 
  WHERE er_id = $1
`

export const participantByParticipantIdQ = `
  SELECT participant 
  FROM event_participant 
  WHERE ep_id = $1
`

export const deleteParticipantQ = `
  DELETE FROM event_participant
  WHERE ep_id = $1
`

// ------------
// USER QUERIES
// ------------

export const findUserByEmailQ = `
  SELECT * 
  FROM userk 
  WHERE email = $1
`

export const createUserQ = `
  INSERT INTO userk
    (profile_image, first_name, last_name, email) 
  VALUES 
    ($1, $2, $3, $4) 
  RETURNING *
`

export const findUserByIdQ = `
  SELECT 
    u.*, 
    a.*, 
    array_agg(c.name) as interests
  FROM userk u
  LEFT JOIN user_interest ui ON u.user_id = ui.userk
  LEFT JOIN category c ON c.category_id = ui.interest
  LEFT JOIN address a ON u.base_address = a.address_id
  WHERE u.user_id = $1
  GROUP BY u.user_id, a.address_id;  
`

export const findAllUsersQ = `
  SELECT * 
  FROM userk
`

export const rawUserkByIdQ = `
  SELECT * 
  FROM userk
  WHERE user_id = $1
`

export const updateUserQ = `
  UPDATE userk
  SET 
    first_name = $2,
    last_name = $3,
    profile_image = $4,
    profile_text = $5,
    base_address = $6,
    date_of_birth = $7,
    gender = $8
  WHERE user_id = $1
  RETURNING *
`

export const deleteUserQ = `
  DELETE FROM userk 
  WHERE user_id = $1
`

export const findEventRequestsByUserQ = `
  SELECT 
    er_id,
    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
    street, number, postal_code, city, country, lat, lng,
    name as category,
    first_name, last_name
  FROM event
  INNER JOIN event_request ON event.event_id = event_request.event
  INNER JOIN address ON address.address_id = event.address
  INNER JOIN category ON category.category_id = event.category
  INNER JOIN userk ON event_request.requester = userk.user_id
  WHERE event_request.requester = $1
`

export const findEventParticipatingQ = `
  SELECT 
    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
    street, number, postal_code, city, country, lat, lng,
    name as category,
    first_name, last_name,
    ep_id
  FROM event
  INNER JOIN event_participant ON event.event_id = event_participant.event
  INNER JOIN address ON address.address_id = event.address
  INNER JOIN category ON category.category_id = event.category
  INNER JOIN userk ON event_participant.participant = userk.user_id
  WHERE event_participant.participant = $1
`
export const findPublicUserQ = `
  SELECT first_name, last_name, profile_image, profile_text, date_of_birth, gender
  FROM userk
  WHERE user_id = $1   
`

// -------------
// EVENT QUERIES
// -------------

export const findEventOwnerQ = `
  SELECT created_by
  FROM event
  WHERE event_id = $1
`

export const findEventOwnerByRequestQ = `
  SELECT created_by
  FROM event
  WHERE event_id = (
    SELECT event 
    FROM event_request
    WHERE er_id = $1
  )
`
export const findEventOwnerByParticipantQ = `
  SELECT created_by
  FROM event
  WHERE event_id = (
    SELECT event 
    FROM event_participant
    WHERE ep_id = $1
  )
`

export const findAllEventsPopulatedQ = `
  SELECT
    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
    street, number, postal_code, city, country, lat, lng,
    name as category,
    first_name, last_name
  FROM event
  LEFT JOIN address ON event.address = address.address_id
  LEFT JOIN category ON event.category = category.category_id
  LEFT JOIN userk ON event.created_by = userk.user_id
  LEFT JOIN event_participant ON event.event_id = event_participant.event
`

export const createEventQ = `
  INSERT INTO event 
    (title, category, date, time, description, max_participants, address, expires_at, created_by, image)
  VALUES 
    ($1, (SELECT category_id FROM category WHERE name = $2), $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING *
`

export const findEventByIdQ = `
  SELECT 
    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
    street, number, postal_code, city, country, lat, lng,
    name as category, 
    first_name, last_name
  FROM event
  LEFT JOIN address ON event.address = address.address_id
  LEFT JOIN category ON event.category = category.category_id
  LEFT JOIN userk ON event.created_by = userk.user_id
  LEFT JOIN event_participant ON event.event_id = event_participant.event
  WHERE event_id = $1
`

export const findEventsByCreatorQ = `
  SELECT 
    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
    street, number, postal_code, city, country, lat, lng,
    name as category,
    first_name, last_name  
  FROM event 
  INNER JOIN address ON address.address_id = event.address
  INNER JOIN category ON category.category_id = event.category
  INNER JOIN userk ON userk.user_id = event.created_by
  WHERE created_by = $1
`

export const findRawEventByIdQ = `
  SELECT *
  FROM event
  WHERE event_id = $1
`
export const updateEventQ = `
  UPDATE event
  SET
    title = $2,
    date = $3,
    time = $4,
    description = $5,
    max_participants = $6,
    expires_at = $7,
    image = $8,
    category = (SELECT category_id FROM category WHERE name = $9),
    address= $10
  WHERE event_id = $1
  RETURNING *
`

export const deleteEventQ = `
  DELETE FROM event
  WHERE event_id = $1
`

export const participantIdByQ = `
  SELECT ep_id
  FROM event_participant
  WHERE event = $1
  AND participant = $2
`

// ---------------
// ADDRESS QUERIES
// ---------------

export const createAddressQ = `
  INSERT INTO address
    (street, number, postal_code, city, country, lat, lng)
  VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
  RETURNING address_id
`

export const addressIdByLocQ = `
  SELECT address_id 
  FROM address 
  WHERE lat = $1 
  AND lng = $2
`

// ---------------
// COMMENT QUERIES
// ---------------

export const createCommentQ = `
  INSERT INTO comment
    (comment, userk, event)
  VALUES 
    ($1, $2, $3)
  RETURNING *
`

export const findEventCommentsQ = `
  SELECT *
  FROM comment
  LEFT JOIN userk ON comment.userk = userk.user_id
  WHERE event = $1
  ORDER BY commented_at
`

export const findCommentByIdQ = `
  SELECT *
  FROM comment
  WHERE comment_id = $1
`

export const updateCommentQ = `
  UPDATE comment
  SET
    comment = $2
  WHERE comment_id = $1
  RETURNING *
`

export const deleteCommentQ = `
  DELETE FROM comment 
  WHERE comment_id = $1
`
