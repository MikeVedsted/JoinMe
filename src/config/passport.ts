import passport from 'passport'
import { Pool } from 'pg'
import { v4 as uuid } from 'uuid'
const GoogleTokenStrategy = require('passport-google-id-token')

import { GOOGLE_CLIENT_ID, PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from '../util/secrets'
import { GoogleToken } from '../types'

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PW,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

passport.use(new GoogleTokenStrategy(
  {
    clientID: GOOGLE_CLIENT_ID
  },
  async (
    parsedToken: GoogleToken, 
    googleId: string, 
    done: Function
    ) => {
      const { payload } = parsedToken
      const { given_name, family_name, email, picture } = payload
      try {
        const user = await (await pool.query(
          'SELECT * FROM users WHERE email = $1', [email]
        )).rows
        if (user.length === 0) {
          const id = uuid()
          const newUser = await (await pool.query(
            'INSERT INTO users (user_id, user_photo, given_name, family_name, email) VALUES ($1, $2, $3, $4, $5)',
            [id, picture, given_name, family_name, email]
          )).rows
          done(null, newUser)
        } else {
          done(null, user)
        }
      } catch (error) {
        done(null, error)
      }
  }
))