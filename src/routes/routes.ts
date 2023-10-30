import { Router } from 'express'
import authRouter from './Auth/routes'
import providerRouter from './Providers/routes'

const router = Router()
const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/providers', providerRouter)

router.use('/api/v1', apiRouter)

router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'DOCHMART',
    data: null
  })
})

router.get('/api/v1', (_req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'API V1',
    data: {
      version: '1.0.0'
    }
  })
})

router.all('*', (req, res) => {
  res.status(404).json({
    status: 'Error',
    message: 'Recurso no encontrado',
    data: {
      url: req.url,
      method: req.method
    }
  })
})

export default router