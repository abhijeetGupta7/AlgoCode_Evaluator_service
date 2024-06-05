import express from "express";

import pingController from "../../controllers/pingController";
import submissionRouter from "./submissionRoutes";

const v1router = express.Router();

v1router.use("/submissions",submissionRouter);

v1router.get("/",pingController);

export default v1router;
