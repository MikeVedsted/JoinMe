import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import { Pool } from 'pg'

import {
  PG_USER,
  PG_HOST,
  PG_DB,
  PG_PW,
  PG_PORT,
  JWT_SECRET
} from '../util/secrets'
import { JwtDecoded, CustomRequest } from '../types'

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

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['x-auth-token']
    if (!token) {
      throw Error
    } else {
      const decoded: JwtDecoded = JWT.verify(token, JWT_SECRET) as JwtDecoded
      const authenticatedUser = await (
        await pool.query('SELECT * FROM userk WHERE user_id = $1', [
          decoded.sub
        ])
      ).rows[0]
      req.user = authenticatedUser
      next()
    }
  } catch (error) {
    res.json({ message: 'Token invalid' })
  }
}

export const isOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('check ownership')
    next()
  } catch (err) {
    res.status(400).json({ message: 'Not authorized' })
  }
}
