import envGet from '../env'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envGet('PG_HOST'),
  port: envGet('PG_PORT'),
  username: envGet('PG_USER'),
  password: envGet('PG_PASSWORD'),
  database: envGet('PG_DATABASE'),
  logging: envGet('NODE_ENV') == 'development',
  synchronize: true,
  entities: [
    'src/app/models/**/*.ts',
  ],
  migrations: [
    'src/database/migrations/**/*.ts',
  ],
})

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize()

    console.log('Database connected:', true)
  } catch (error) {
    console.log('Database connected:', false)

    console.error('ErrorDB:', error)

    process.exit(1)
  }
}

export const closeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy()

    console.log('Database closed:', true)
  } catch (error) {
    console.log('Database closed:', false)

    console.error('ErrorDB:', error)

    process.exit(1)
  }
}