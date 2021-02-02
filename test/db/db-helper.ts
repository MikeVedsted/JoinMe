import db from '../../src/db/index'

export const createTempTables = async () => {
  await db.query('CREATE TEMPORARY TABLE category ( LIKE category );')
  await db.query('CREATE TEMPORARY TABLE address ( LIKE address );')
  await db.query('CREATE TEMPORARY TABLE userk ( LIKE userk );')
  await db.query('CREATE TEMPORARY TABLE event ( LIKE event );')
  await db.query('CREATE TEMPORARY TABLE event_request ( LIKE event_request );')
  await db.query('CREATE TEMPORARY TABLE event_participant ( LIKE event_participant );')
  await db.query('CREATE TEMPORARY TABLE user_interest ( LIKE user_interest );')
  await db.query('CREATE TEMPORARY TABLE admin ( LIKE admin );')
  await db.query('CREATE TEMPORARY TABLE banned_user ( LIKE banned_user );')
  await db.query('CREATE TEMPORARY TABLE comment ( LIKE comment );')
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
  await db.query('DROP TABLE IF EXISTS category;')
  await db.query('DROP TABLE IF EXISTS address;')
}
