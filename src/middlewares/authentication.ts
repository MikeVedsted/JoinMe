import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken"
import { JWT_SECRET } from "../util/secrets"

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token")
  if (!token) {
    return res.status(401).json({
      message: "No id token, authorization denied",
    })
  }
  try {
    // const decoded = JWT.verify(token, JWT_SECRET);
    // req.user = decoded;
    next()
  } catch (err) {
    res.status(400).json({ message: "Token invalid" })
  }
}

export function isOwner(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("check ownership")
    next()
  } catch (err) {
    res.status(400).json({ message: "Not authorized" })
  }
}
