import { Request,Response } from "express";


function pingController(_req:Request,res:Response) {
  res.status(200).json({
    msg:"Ping controller is up"
  });
}

export default pingController;