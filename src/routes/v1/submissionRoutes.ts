import express from 'express';

import { addSubmission } from '../../controllers/submissionController';
import { CreateSubmissionZodSchema } from '../../dtos/CreateSubmissonDTO';
import { validate } from '../../validators/createSubmission_ZodValidator';

const submissionRouter=express.Router();

submissionRouter.post("/",
  validate(CreateSubmissionZodSchema),
  addSubmission
);

export default submissionRouter;