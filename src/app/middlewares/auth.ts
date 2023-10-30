import { Request, Response, NextFunction } from 'express'
import envGet from '../../env'
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      status: 'Error',
      message: 'No autorizado',
      data: {
        existsAuthorization: false
      }
    })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    jwt.verify(token, envGet('APP_KEY'))
  } catch (error) {
    if (envGet('NODE_ENV') === 'development') {
      console.error(error)
    }

    return res.status(401).json({
      status: 'Error',
      message: 'Token inválido',
      data: {
        isValidToken: false
      }
    })
  }

  return next()
}

export default auth