import * as supertest from 'supertest'
import { OK } from 'http-status'  
import { app } from '../../src/app'

describe('health endpoint', () => {
  test('returns http status code OK', async () => {
    const response = await supertest(app).get('/health')

    expect(response.status).toEqual(OK)
  })
})