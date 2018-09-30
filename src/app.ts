import * as express from 'express'
import { Application, Request, Response } from 'express'
import { OK } from 'http-status'
import { onError, onResourceNotFound } from './middlewares/errorHandling'

const createApp = (withRoutes: (app: Application) => void): Application => {
  const app = express()

  app.use(express.json())

  withRoutes(app)

  app.get('*', onResourceNotFound)
  app.use(onError)

  return app
}

const app = createApp((app: Application) => {
  app.get('/health', (req: Request, res: Response) => {
    return res.status(OK).send()
  })
})

export { app, createApp }
