import { nearbyProviders } from '../../app/controllers/Providers/ProvidersController'
import auth from '../../app/middlewares/auth'
import { Router } from 'express'

const providersRouter = Router()

providersRouter.get('/nearby', auth, nearbyProviders)

export default providersRouter