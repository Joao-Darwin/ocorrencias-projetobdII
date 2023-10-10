const express = require('express');
const ocorrenciaRouter = express.Router();

const ocorrenciaController = require('../../controllers/Ocorrencia/index');

ocorrenciaRouter.post("/save", ocorrenciaController.saveOcorrencia);
ocorrenciaRouter.get("/", ocorrenciaController.findAllOcorrencias);

module.exports = ocorrenciaRouter;