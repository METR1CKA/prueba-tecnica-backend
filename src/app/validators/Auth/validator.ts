import { Request, Response, NextFunction } from 'express'
import { Result, ValidationError, check, validationResult } from 'express-validator'
import envGet from '../../../env'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
  } catch (err) {
    const errors = (err as Result<ValidationError>).array()

    if (envGet('NODE_ENV') == 'development') {
      console.log(errors)
    }

    return res.status(400).json({
      status: 'Error',
      message: 'Error de validación',
      data: {
        errors: errors.map(({ msg }) => msg).join(', ')
      }
    })
  }

  return next()
}

export const signupValidator = [
  check('email')
    .exists()
    .isEmail()
    .isLength({ max: 100 })
    .not().isEmpty()
    .withMessage('El correo electrónico debe existir y ser valido'),
  check('password')
    .exists()
    .isLength({ max: 15 })
    .not().isEmpty()
    .withMessage('La contraseña debe existir y tener como maximo 15 caracteres'),
  check('username')
    .exists()
    .isLength({ max: 100 })
    .not().isEmpty()
    .withMessage('El nombre de usuario debe existir y no estar vacio'),
  validator
]

export const signinValidator = [
  check('email')
    .exists()
    .isEmail()
    .isLength({ max: 100 })
    .not().isEmpty()
    .withMessage('El correo electrónico debe existir y ser valido'),
  check('password')
    .exists()
    .isLength({ max: 15 })
    .not().isEmpty()
    .withMessage('La contraseña debe existir y tener como maximo 15 caracteres'),
  validator
]