import async from "async";
import { Request, Response, NextFunction } from "express";
import EventService from "../services/event";

export const findAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req);
  } catch (error) {
    console.log(error);
  }
};
export const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req);
  } catch (error) {
    console.log(error);
  }
};
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req);
  } catch (error) {
    console.log(error);
  }
};
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req);
  } catch (error) {
    console.log(error);
  }
};
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("something should happen when this is called. Req: ", req);
  } catch (error) {
    console.log(error);
  }
};
