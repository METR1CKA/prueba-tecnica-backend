import { signin, verificarToken, signup, refreshToken } from '../../app/controllers/Auth/AuthController'
import { signinValidator, signupValidator } from '../../app/validators/Auth/validator'
import auth from '../../app/middlewares/auth'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/sign-in', signinValidator, signin)
authRouter.post('/sign-up', signupValidator, signup)
authRouter.post('/refresh-token', refreshToken)
authRouter.get('/verify-token', auth, verificarToken)

export default authRouter