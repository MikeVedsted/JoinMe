import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

import { JwtDecoded, AuthRequest, User } from '../types'
import { JWT_SECRET } from '../util/secrets'
import db from '../db'

export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['x-auth-token']
    if (!token) {
      throw Error
    } else {
      const decoded: JwtDecoded = JWT.verify(token, JWT_SECRET) as JwtDecoded
      const DBResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [decoded.sub])
      const authenticatedUser: User = DBResponse.rows[0]
      req.user = authenticatedUser
      next()
    }
  } catch (error) {
    return error
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
