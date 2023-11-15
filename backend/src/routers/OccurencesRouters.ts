import { Router } from "express";
import OccurencesController from "../controllers/OccurencesController";

const occurencesRouters = Router();

occurencesRouters.post("/save", OccurencesController.create);
occurencesRouters.get("/", OccurencesController.findAll);
occurencesRouters.get("/:id", OccurencesController.findById);
occurencesRouters.put("/:id", OccurencesController.update);
occurencesRouters.delete("/:id", OccurencesController.remove);

export default occurencesRouters;