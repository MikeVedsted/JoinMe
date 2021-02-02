import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production'

export const SESSION_SECRET = process.env['SESSION_SECRET'] as string
export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] as string
export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID']
export const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET']
export const PG_USER = process.env['PG_USER']
export const PG_HOST = process.env['PG_HOST']
export const PG_DB = process.env['PG_DB']
export const PG_PW = process.env['PG_PW']
export const PG_PORT = process.env['PG_PORT'] as number | undefined
export const PG_URI = process.env['PG_URI']

if (
  !SESSION_SECRET ||
  !JWT_SECRET ||
  !JWT_REFRESH_SECRET ||
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !PG_USER ||
  !PG_HOST ||
  !PG_DB ||
  !PG_PW ||
  !PG_PORT ||
  !PG_URI
) {
  logger.error(
    'Some environment variable is missing. Make sure to provide all of the following: SESSION_SECRET, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT, PG_URI'
  )
  process.exit(1)
}

if (!PG_URI) {
  if (prod) {
    logger.error('No PG connection string. Set PG_URI environment variable.')
  } else {
    logger.error('No PG connection string. Set PG_URI_LOCAL environment variable.')
  }
  process.exit(1)
}
