import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'

const onResourceNotFound = (req: Request, res: Response) => {
  return res.status(NOT_FOUND).json({ message: 'Resource not found' })
}

const onError = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
}

export {
  onError,
  onResourceNotFound
}
