import jwt from 'jsonwebtoken'

import { JWT_SECRET, JWT_REFRESH_SECRET } from '../util/secrets'
//Generate access Token
export const generateAccessToken = (id: string) => {
  return jwt.sign(
    {
      iss: 'JoinMe',
      sub: id
    },
    JWT_SECRET,
    { expiresIn: 60 * 60 }
  )
}

export const generateRefreshToken = (id: string) => {
  return jwt.sign(
    {
      iss: 'JoinMe',
      sub: id
    },
    JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  )
}
