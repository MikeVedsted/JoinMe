import db from '../../src/db/index'

export const createTempTables = async () => {
  await db.query('CREATE TEMPORARY TABLE userk ( LIKE userk );')
  await db.query('CREATE TEMPORARY TABLE event_request ( LIKE event_request );')
  await db.query('CREATE TEMPORARY TABLE event_participant ( LIKE event_participant );')
  await db.query('CREATE TEMPORARY TABLE user_interest ( LIKE user_interest );')
  await db.query('CREATE TEMPORARY TABLE admin ( LIKE admin );')
  await db.query('CREATE TEMPORARY TABLE banned_user ( LIKE banned_user );')
  await db.query('CREATE TEMPORARY TABLE comment ( LIKE comment );')
  await db.query('CREATE TEMPORARY TABLE event ( LIKE event );')
  await db.query('CREATE TEMPORARY TABLE interest ( LIKE interest );')
  await db.query('CREATE TEMPORARY TABLE address ( LIKE address );')
  await db.query('CREATE TEMPORARY TABLE postal_code ( LIKE postal_code );')
  await db.query('CREATE TEMPORARY TABLE city ( LIKE city );')
  await db.query('CREATE TEMPORARY TABLE country ( LIKE country );')
}

export const dropTempTables = async () => {
  await db.query('DROP TABLE IF EXISTS userk;')
  await db.query('DROP TABLE IF EXISTS event_request;')
  await db.query('DROP TABLE IF EXISTS event_participant;')
  await db.query('DROP TABLE IF EXISTS user_interest;')
  await db.query('DROP TABLE IF EXISTS admin;')
  await db.query('DROP TABLE IF EXISTS banned_user;')
  await db.query('DROP TABLE IF EXISTS comment;')
  await db.query('DROP TABLE IF EXISTS event;')
  await db.query('DROP TABLE IF EXISTS interest;')
  await db.query('DROP TABLE IF EXISTS address;')
  await db.query('DROP TABLE IF EXISTS postal_code;')
  await db.query('DROP TABLE IF EXISTS city;')
  await db.query('DROP TABLE IF EXISTS country;')
}
