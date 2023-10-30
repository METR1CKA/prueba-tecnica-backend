import { Request, Response } from 'express'
import { User } from '../../models/User'
import envGet from '../../../env'
import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const userExists = await User.findOneBy({ email })

  if (userExists) {
    return res.status(400).json({
      status: 'Error',
      message: 'El usuario ya existe',
      data: null
    })
  }

  const user = new User()
  user.email = email
  user.password = password
  user.username = username
  await user.save()

  return res.status(200).json({
    status: 'Success',
    message: 'Usuario registrado correctamente',
    data: null
  })
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOneBy({ email })

  if (!user) {
    return res.status(400).json({
      status: 'Error',
      message: 'Credenciales incorrectas',
      data: null
    })
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.status(400).json({
      status: 'Error',
      message: 'Credenciales incorrectas',
      data: null
    })
  }

  const token = jwt.sign({ user }, envGet('APP_KEY'), {
    expiresIn: '1h'
  })

  return res.status(200).json({
    status: 'Success',
    message: 'Inicio de sesión éxitoso',
    data: {
      token
    }
  })
}

export const refreshToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      status: 'Error',
      message: 'Header de autorización no encontrado',
      data: {
        existsAuthorization: false
      }
    })
  }

  const token = authorization.replace('Bearer', '').trim()

  let verify

  try {
    verify = jwt.verify(token, envGet('APP_KEY'))
  } catch (error) {
    if (envGet('NODE_ENV') === 'development') {
      console.error(error)
    }

    const token = jwt.sign({ user: verify }, envGet('APP_KEY'), {
      expiresIn: '1h'
    })

    return res.status(200).json({
      status: 'Success',
      message: 'Token refrescado',
      data: {
        token
      }
    })
  }

  return res.status(200).json({
    status: 'Success',
    message: 'Token aun válido',
    data: {
      isValidToken: true
    }
  })
}

export const verificarToken = async (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'Success',
    message: 'Token válido',
    data: {
      isValidToken: true
    }
  })
}