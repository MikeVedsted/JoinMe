"use strict";
// ----------------
// REQUEST QUERIES
// ----------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentQ = exports.updateCommentQ = exports.findCommentByIdQ = exports.findEventCommentsQ = exports.createCommentQ = exports.addressIdByLocQ = exports.createAddressQ = exports.participantIdByQ = exports.deleteEventQ = exports.updateEventQ = exports.findRawEventByIdQ = exports.findEventsByCreatorQ = exports.findEventByIdQ = exports.createEventQ = exports.findAllEventsPopulatedQ = exports.findEventOwnerByParticipantQ = exports.findEventOwnerByRequestQ = exports.findEventOwnerQ = exports.findPublicUserQ = exports.findEventParticipatingQ = exports.findEventRequestsByUserQ = exports.deleteUserQ = exports.updateUserQ = exports.rawUserkByIdQ = exports.findAllUsersQ = exports.findUserByIdQ = exports.createUserQ = exports.findUserByEmailQ = exports.deleteParticipantQ = exports.participantByParticipantIdQ = exports.requesterByRequestIdQ = exports.createNewRequestQ = exports.checkRequestStatusQ = exports.findParticipantsByEventQ = exports.findJoinRequestsByEventQ = exports.deleteRequestQ = exports.createParticipantQ = void 0;
exports.createParticipantQ = `
  INSERT INTO event_participant 
    (participant, event) 
  VALUES 
    ((SELECT requester FROM event_request where er_id = $1),
    (SELECT event FROM event_request WHERE er_id = $1))
  RETURNING *
`;
exports.deleteRequestQ = `
  DELETE FROM event_request 
  WHERE er_id = $1
`;
exports.findJoinRequestsByEventQ = `
  SELECT 
    er_id,
    user_id, profile_image, first_name, last_name
  FROM event_request 
  INNER JOIN userk ON event_request.requester = userk.user_id
  WHERE event = $1
`;
exports.findParticipantsByEventQ = `
  SELECT 
    ep_id,
    user_id, profile_image, first_name, last_name
  FROM event_participant 
  INNER JOIN userk ON event_participant.participant = userk.user_id
  WHERE event = $1
`;
exports.checkRequestStatusQ = `
  SELECT *
  FROM event_request
  WHERE event = $1
  AND requester = $2
`;
exports.createNewRequestQ = `
  INSERT INTO event_request
    (requester, event) 
  VALUES 
    ($2, $1) 
  RETURNING *
`;
exports.requesterByRequestIdQ = `
  SELECT requester 
  FROM event_request 
  WHERE er_id = $1
`;
exports.participantByParticipantIdQ = `
  SELECT participant 
  FROM event_participant 
  WHERE ep_id = $1
`;
exports.deleteParticipantQ = `
  DELETE FROM event_participant
  WHERE ep_id = $1
`;
// ------------
// USER QUERIES
// ------------
exports.findUserByEmailQ = `
  SELECT 
    u.*, 
    street, number, city, postal_code, country, lat, lng,
    array_agg(c.name) as interests
  FROM userk u
  LEFT JOIN user_interest ui ON u.user_id = ui.userk
  LEFT JOIN category c ON c.category_id = ui.interest
  LEFT JOIN address a ON u.base_address = a.address_id
  WHERE u.email = $1
  GROUP BY u.user_id, a.address_id;  
`;
exports.createUserQ = `
  INSERT INTO userk
    (profile_image, first_name, last_name, email) 
  VALUES 
    ($1, $2, $3, $4) 
  RETURNING *
`;
exports.findUserByIdQ = `
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
`;
exports.findAllUsersQ = `
  SELECT * 
  FROM userk
`;
exports.rawUserkByIdQ = `
  SELECT * 
  FROM userk
  WHERE user_id = $1
`;
exports.updateUserQ = `
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
`;
exports.deleteUserQ = `
  DELETE FROM userk 
  WHERE user_id = $1
`;
exports.findEventRequestsByUserQ = `
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
`;
exports.findEventParticipatingQ = `
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
`;
exports.findPublicUserQ = `
  SELECT first_name, last_name, profile_image, profile_text, date_of_birth, gender
  FROM userk
  WHERE user_id = $1   
`;
// -------------
// EVENT QUERIES
// -------------
exports.findEventOwnerQ = `
  SELECT created_by
  FROM event
  WHERE event_id = $1
`;
exports.findEventOwnerByRequestQ = `
  SELECT created_by
  FROM event
  WHERE event_id = (
    SELECT event 
    FROM event_request
    WHERE er_id = $1
  )
`;
exports.findEventOwnerByParticipantQ = `
  SELECT created_by
  FROM event
  WHERE event_id = (
    SELECT event 
    FROM event_participant
    WHERE ep_id = $1
  )
`;
exports.findAllEventsPopulatedQ = `
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
`;
exports.createEventQ = `
  INSERT INTO event 
    (title, category, date, time, description, max_participants, address, expires_at, created_by, image)
  VALUES 
    ($1, (SELECT category_id FROM category WHERE name = $2), $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING *
`;
exports.findEventByIdQ = `
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
`;
exports.findEventsByCreatorQ = `
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
`;
exports.findRawEventByIdQ = `
  SELECT *
  FROM event
  WHERE event_id = $1
`;
exports.updateEventQ = `
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
`;
exports.deleteEventQ = `
  DELETE FROM event
  WHERE event_id = $1
`;
exports.participantIdByQ = `
  SELECT ep_id
  FROM event_participant
  WHERE event = $1
  AND participant = $2
`;
// ---------------
// ADDRESS QUERIES
// ---------------
exports.createAddressQ = `
  INSERT INTO address
    (street, number, postal_code, city, country, lat, lng)
  VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
  RETURNING address_id
`;
exports.addressIdByLocQ = `
  SELECT address_id 
  FROM address 
  WHERE lat = $1 
  AND lng = $2
`;
// ---------------
// COMMENT QUERIES
// ---------------
exports.createCommentQ = `
  INSERT INTO comment
    (comment, userk, event)
  VALUES 
    ($1, $2, $3)
  RETURNING *
`;
exports.findEventCommentsQ = `
  SELECT *
  FROM comment
  LEFT JOIN userk ON comment.userk = userk.user_id
  WHERE event = $1
  ORDER BY commented_at
`;
exports.findCommentByIdQ = `
  SELECT *
  FROM comment
  WHERE comment_id = $1
`;
exports.updateCommentQ = `
  UPDATE comment
  SET
    comment = $2
  WHERE comment_id = $1
  RETURNING *
`;
exports.deleteCommentQ = `
  DELETE FROM comment 
  WHERE comment_id = $1
`;
//# sourceMappingURL=queries.js.map