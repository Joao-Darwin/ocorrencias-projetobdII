import { Router } from "express";
import OccurrencesController from "../controllers/OccurrencesController";

const occurrecesRouters = Router();

occurrecesRouters.post("/save", OccurrencesController.create);
occurrecesRouters.get("/findAll", OccurrencesController.findAll);
occurrecesRouters.get("/findByType/", OccurrencesController.findByOccurrenceType);
occurrecesRouters.get("/findById/:id", OccurrencesController.findById);
occurrecesRouters.put("/:id", OccurrencesController.update);
occurrecesRouters.delete("/:id", OccurrencesController.remove);

export default occurrecesRouters;