import { NextFunction,Request,Response } from "express";
import { ZodSchema } from "zod";

// try to understand this syntax:
export const validate=(schema:ZodSchema<any>) => (req:Request,res:Response,next:NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch(ZodError) {
    console.log(ZodError);
    return res.status(400).json({
      'success':false,
      'message':"Invalid params received",
      'data': {},
      'error':ZodError
    });
  } 
};