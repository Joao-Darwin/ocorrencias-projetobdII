const Ocorrencia = require('../../models/Ocorrencia/index');

const saveOcorrencia = async (req, res) => {
    const ocorrenciaToSave = req.body;

    const ocorrenciaSaved = await Ocorrencia.create(ocorrenciaToSave);

    res.send(ocorrenciaSaved);
}

const findAllOcorrencias = async (req, res) => {
    const allOcorrencias = await Ocorrencia.findAll();

    res.send(allOcorrencias);
}

module.exports = {
    saveOcorrencia,
    findAllOcorrencias
}