import { Application, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status'
import * as supertest from 'supertest'
import { app, createApp } from '../../../src/app'

describe('middleware', () => {
  const createDummyApp = () => {
    return createApp((app: Application) => {
      app.get('/throws-error', (req: Request, res: Response) => { throw new Error() })
    })
  }
  let response: supertest.Response

  describe('when internal server error', () => {
    beforeEach(async () => {
      response = await supertest(createDummyApp()).get('/throws-error')
    })

    test('returns http status code INTERNAL_SERVER_ERROR', async () => {
    expect(response.status).toEqual(INTERNAL_SERVER_ERROR)
    })

    test('returns json body', async () => {
      expect(response.get('content-type')).toEqual('application/json; charset=utf-8')
    })
  })

  describe('when resource not found', () => {
    beforeEach(async () => {
      response = await supertest(createDummyApp()).get('/unknown-path')
    })

    test('returns http status code NOT_FOUND', async () => {
      expect(response.status).toEqual(NOT_FOUND)
    })

    test('returns json body', async () => {
      expect(response.get('content-type')).toEqual('application/json; charset=utf-8')
    })
  })
})
