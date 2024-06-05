import { Request,Response } from "express";

import { CreateSubmissionDTO } from "../dtos/CreateSubmissonDTO";

export function addSubmission(req:Request,res:Response) {
  const submissonDTO= req.body as CreateSubmissionDTO;  // didnt get the syntax
  console.log(submissonDTO);
  
  // TODO: Add validation using ZOD

  res.status(201).json({
    success:true,
    error:{},
    message: "Successfully collected the subission",
    data: submissonDTO
  });
}