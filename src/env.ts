import 'dotenv/config'
import makeRandomString from './app/services/service'

type Env = 'HOST' | 'PORT' | 'NODE_ENV' | 'APP_KEY' | 'DB_CONNECTION' | 'PG_HOST' | 'PG_PORT' | 'PG_USER' | 'PG_PASSWORD' | 'PG_DATABASE'

type EnvDefault = {
  [env in Env]: string | number
}

const env_default: EnvDefault = {
  HOST: '127.0.0.1',
  PORT: 3333,
  NODE_ENV: 'development',
  APP_KEY: makeRandomString(32),
  DB_CONNECTION: 'postgres',
  PG_HOST: 'localhost',
  PG_PORT: 5432,
  PG_USER: 'postgres',
  PG_PASSWORD: '',
  PG_DATABASE: 'example',
}

const envGet = (key: Env): any => {
  const env = process.env[key] ?? env_default[key]

  return key == 'PORT' || key == 'PG_PORT'
    ? Number(env)
    : env
}

export default envGet