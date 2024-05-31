import express from "express";

import pingController from "../../controllers/pingController";

const v1router = express.Router();

v1router.get("/",pingController);

export default v1router;
