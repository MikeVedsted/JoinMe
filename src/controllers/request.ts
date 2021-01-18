import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../helpers/apiError'
import RequestService from '../services/request'

export const acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { requestId } = req.params
    res.json(await RequestService.acceptRequest(requestId))
  } catch (error) {
    next(new NotFoundError('Request not found', error))
  }
}
