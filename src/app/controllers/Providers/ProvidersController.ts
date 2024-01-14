import { Request, Response } from 'express'
import { Provider } from '../../models/Provider'
import { AppDataSource } from '../../../config/database'

export const nearbyProviders = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body

  if (!latitude || !longitude) {
    return res.status(400).json({
      status: 'Error',
      message: 'Faltan datos',
      data: {
        latitude: latitude ?? null,
        longitude: longitude ?? null
      }
    })
  }

  const providers = await AppDataSource.getRepository(Provider)
    .createQueryBuilder('provider')
    .where(
      `
        ST_DWithin(
          provider.centroid_geometry,
          ST_MakePoint(:longitude, :latitude)::geography,
          provider.radius * 1000
        )
      `,
      {
        longitude,
        latitude
      }
    )
    .getMany()

  const existsProviders = providers.length != 0

  return res.status(200).json({
    status: 'Success',
    message: `${existsProviders ? 'Existen' : 'No existen'} proveedores cercanos`,
    data: providers
  })
}