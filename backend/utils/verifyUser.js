import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    // return res.status(401).json({ message: 'Unauthorized' })
    return next(errorHandler(401, 'Unauthorized'))
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      //   return res.status(401).json({ message: 'Token is not valid' })
      return next(errorHandler(401, 'Token is not valid'))
    }
    req.user = user
    next()
  })
}
