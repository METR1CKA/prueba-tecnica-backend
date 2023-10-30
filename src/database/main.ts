import { initializeDatabase } from '../config/database'
import createProviders from './seeders/providers'

async function run() {
  await initializeDatabase()
  await createProviders()
}

run()
  .then(() => {
    console.log('Seeders completed')
    process.exit(0)
  })
  .catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })