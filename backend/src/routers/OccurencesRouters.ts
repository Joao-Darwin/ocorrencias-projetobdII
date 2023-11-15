import { Router } from "express";
import OccurencesController from "../controllers/OccurencesController";

const ocorrencesRouters = Router();

ocorrencesRouters.post("/save", OccurencesController.create);
ocorrencesRouters.get("/", OccurencesController.findAll);

export default ocorrencesRouters;