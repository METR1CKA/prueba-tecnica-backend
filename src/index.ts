import 'reflect-metadata'
import { initializeDatabase } from './config/database'
import envGet from './env'
import app from './app'
import fs from 'fs'

const PORT = envGet('PORT')
const HOST = envGet('HOST')

const main = async (): Promise<void> => {
  const filename = '.env'

  if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist`)
  }

  const env = fs.readFileSync(filename, 'utf-8')

  if (!env.includes('APP_KEY')) {
    throw new Error('APP_KEY does not exist')
  }

  await initializeDatabase()

  app.listen(PORT, HOST)
}

main()
  .then(() => console.log(`Server started on ${HOST}:${PORT}`))
  .catch(error => console.error('Server error:', error))