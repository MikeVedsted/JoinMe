import async from "async"
import { Request, Response, NextFunction } from "express"

// POST /User
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('request--', req.body)
}

