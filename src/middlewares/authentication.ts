import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

import { JwtDecoded, AuthRequest } from '../types'
import { JWT_SECRET } from '../util/secrets'
import db from '../db'

export const isAuthenticated = async (
  req: AuthRequest,
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
        await db.query('SELECT * FROM userk WHERE user_id = $1', [decoded.sub])
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
