import { Request, Response, NextFunction, response } from "express"

import UserService from "../services/user"

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const googleCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req)
  } catch (error) {
    console.log(error)
  }
}