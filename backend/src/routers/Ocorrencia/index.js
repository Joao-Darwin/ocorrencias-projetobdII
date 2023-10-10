const express = require('express');
const ocorrenciaRouter = express.Router();

const ocorrenciaController = require('../../controllers/Ocorrencia/index');

ocorrenciaRouter.post("/save", ocorrenciaController.saveOcorrencia);
ocorrenciaRouter.get("/", ocorrenciaController.findAllOcorrencias);
ocorrenciaRouter.put("/:id", ocorrenciaController.updateOcorrencia);
ocorrenciaRouter.delete("/:id", ocorrenciaController.removeOcorrencia);

module.exports = ocorrenciaRouter;