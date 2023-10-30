import { initializeDatabase, closeDatabase } from '../config/database'
import makeRandomString from '../app/services/service'
import request from 'supertest'
import app from '../app'

describe('SignUp', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  test('should return 200 and create user', async () => {
    const register = await request(app)
      .post('/api/v1/auth/sign-up')
      .send({
        email: `${makeRandomString(5)}@gmail.com`,
        password: '123',
        username: `${makeRandomString(5)}`,
      })

    expect(register.statusCode).toEqual(200)
    expect(register.body).toHaveProperty('status', 'Success')
    expect(register.body).toHaveProperty('message', 'Usuario registrado correctamente')
    expect(register.body).toHaveProperty('data', null)
  })

  test('should return error and status code 400', async () => {
    const register = await request(app)
      .post('/api/v1/auth/sign-up')
      .send({
        email: `${makeRandomString(5)}@gmail.com`,
        password: '123',
        username: '',
      })

    expect(register.statusCode).toEqual(400)
    expect(register.body).toHaveProperty('status', 'Error')
    expect(register.body).toHaveProperty('message', 'Error de validación')
    expect(register.body).toHaveProperty('data.errors', 'El nombre de usuario debe existir y no estar vacio')
  })
})

describe('SignIn', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  test('should return 200 and a token when provided valid credentials', async () => {
    const login = await request(app)
      .post('/api/v1/auth/sign-in')
      .send({
        email: 'fer@gmail.com',
        password: '123'
      })

    expect(login.statusCode).toEqual(200)
    expect(login.body).toHaveProperty('status', 'Success')
    expect(login.body).toHaveProperty('message', 'Inicio de sesión éxitoso')
    expect(login.body).toHaveProperty('data.token')
  })

  test('should return error and status code 400', async () => {
    const register = await request(app)
      .post('/api/v1/auth/sign-in')
      .send({
        email: 'fergmail',
        password: '123',
      })

    expect(register.statusCode).toEqual(400)
    expect(register.body).toHaveProperty('status', 'Error')
    expect(register.body).toHaveProperty('message', 'Error de validación')
  })
})

describe('RefreshTokens', () => {
  test('should return refresh token', async () => {
    const old_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImZlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0NDBXd1gwMDRFUVN6SnIzb2Y0SjIuY3IwdGZ2ZldsQVZjdXZpRU9OUTZkdDczSGlYRS9VMiIsInVzZXJuYW1lIjoibWV0cmlja2EifSwiaWF0IjoxNjk4NjE2NTYwLCJleHAiOjE2OTg2MjAxNjB9.TVD6CwL2lb1F4aEXheHDkEisyO8MzO3D0GVv_zlkuDk`

    const refresh_token = await request(app)
      .post('/api/v1/auth/refresh-token')
      .auth(old_token, { type: 'bearer' })

    expect(refresh_token.statusCode).toEqual(200)
    expect(refresh_token.body).toHaveProperty('status', 'Success')
    expect(refresh_token.body).toHaveProperty('message', 'Token refrescado')
    expect(refresh_token.body).toHaveProperty('data.token')
  })
})

describe('VerifyToken', () => {
  test('should verify token', async () => {
    const old_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImZlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0NDBXd1gwMDRFUVN6SnIzb2Y0SjIuY3IwdGZ2ZldsQVZjdXZpRU9OUTZkdDczSGlYRS9VMiIsInVzZXJuYW1lIjoibWV0cmlja2EifSwiaWF0IjoxNjk4NjE2NTYwLCJleHAiOjE2OTg2MjAxNjB9.TVD6CwL2lb1F4aEXheHDkEisyO8MzO3D0GVv_zlkuDk`

    const refresh_token = await request(app)
      .post('/api/v1/auth/refresh-token')
      .auth(old_token, { type: 'bearer' })

    const verify_token = await request(app)
      .get('/api/v1/auth/verify-token')
      .auth(refresh_token.body.data.token, { type: 'bearer' })

    expect(verify_token.statusCode).toEqual(200)
    expect(verify_token.body).toHaveProperty('status', 'Success')
    expect(verify_token.body).toHaveProperty('message', 'Token válido')
    expect(verify_token.body).toHaveProperty('data.isValidToken', true)
  })
})

describe('ProvidersController', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  test('should return nearby providers', async () => {
    const login = await request(app)
      .post('/api/v1/auth/sign-in')
      .send({
        email: 'fer@gmail.com',
        password: '123'
      })

    const providers = await request(app)
      .get('/api/v1/providers/nearby')
      .auth(login.body.data.token, { type: 'bearer' })
      .query({
        latitude: 19.432683,
        longitude: -99.133205
      })

    expect(providers.statusCode).toEqual(200)
    expect(providers.body).toHaveProperty('status', 'Success')
    expect(providers.body).toHaveProperty('message', 'Existen proveedores cercanos')
    expect(providers.body).toHaveProperty('data')
  })
})