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

const updateOcorrencia = async (req, res) => {
    const idOcorrencia = req.params.id;
    const ocorrenciaUpdated = req.body;

    await Ocorrencia.update(ocorrenciaUpdated, {where: {id: idOcorrencia}});

    res.send(ocorrenciaUpdated);
};

const removeOcorrencia = async (req, res) => {
    const idOcorrencia = req.params.id;

    await Ocorrencia.destroy({where: {id: idOcorrencia}});

    res.send(`Ocorrencia de ID #${idOcorrencia} removido`);
}

module.exports = {
    saveOcorrencia,
    findAllOcorrencias,
    updateOcorrencia,
    removeOcorrencia
}