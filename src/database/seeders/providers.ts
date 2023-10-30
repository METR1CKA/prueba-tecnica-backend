import { Provider } from '../../app/models/Provider'

const providers = [
  {
    name: 'Concretos La Roca',
    radius: 25,
    centroid_geometry: {
      type: 'Point' as const,
      coordinates: [-99.134048, 19.466447]
    }
  },
  {
    name: 'Concretos Durables',
    radius: 5,
    centroid_geometry: {
      type: 'Point' as const,
      coordinates: [19.314582, -99.088583]
    }
  },
  {
    name: 'Concretos de mañana',
    radius: 20,
    centroid_geometry: {
      type: 'Point' as const,
      coordinates: [19.379926, -99.202143]
    }
  },
  {
    name: 'Concretos Sofisticados',
    radius: 20,
    centroid_geometry: {
      type: 'Point' as const,
      coordinates: [19.622268, -98.998573]
    }
  }
]

const createProviders = async (): Promise<void> => {
  for (const provider of providers) {
    const { name, radius, centroid_geometry } = provider

    const newProvider = new Provider()
    newProvider.name = name
    newProvider.radius = radius
    newProvider.centroid_geometry = centroid_geometry

    await newProvider.save()
  }
}

export default createProviders