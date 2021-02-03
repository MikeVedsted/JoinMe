import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

import { AuthRequest } from '../types'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../util/secrets'
import { generateAccessToken } from '../helpers/generateToken'
import db from '../db'

export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies['x-auth-access-token']
    const refreshToken = req.cookies['x-auth-refresh-token']
    if (!accessToken || !refreshToken) {
      throw 'No Valid Token!'
    } else {
      JWT.verify(accessToken, JWT_SECRET, async (err: any, decoded: any) => {
        if (err) {
          JWT.verify(refreshToken, JWT_REFRESH_SECRET, async (err: any, decoded: any) => {
            if (err) {
              res.json({ message: err.message })
            } else {
              const newAccessToken = generateAccessToken(decoded.sub)
              res.cookie('x-auth-access-token', newAccessToken, { sameSite: 'none', secure: true })
              const DBResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [
                decoded.sub
              ])
              const authenticatedUser = DBResponse.rows[0]
              req.user = authenticatedUser
              next()
            }
          })
        } else {
          const DBResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [decoded.sub])
          const authenticatedUser = DBResponse.rows[0]
          req.user = authenticatedUser
          next()
        }
      })
    }
  } catch (error) {
    res.json({ status: 'error', message: error })
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
