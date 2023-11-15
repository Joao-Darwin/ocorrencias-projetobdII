import { Router } from "express";
import OccurencesController from "../controllers/OccurencesController";

const ocorrencesRouters = Router();

ocorrencesRouters.post("/save", OccurencesController.create);

export default ocorrencesRouters;