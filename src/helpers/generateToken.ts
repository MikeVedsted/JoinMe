import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'

const generateToken = (id: string) => {
  return jwt.sign(
    {
      iss: 'JoinMe',
      sub: id
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  )
}

export default generateToken
