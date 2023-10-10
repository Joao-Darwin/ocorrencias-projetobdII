const Ocorrencia = require('../../models/Ocorrencia/index');

const saveOcorrencia = async (req, res) => {
    try {
        const ocorrenciaToSave = req.body;

        const ocorrenciaSaved = await Ocorrencia.create(ocorrenciaToSave);

        res.send(ocorrenciaSaved);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const findAllOcorrencias = async (req, res) => {
    try {
        const allOcorrencias = await Ocorrencia.findAll();

        res.send(allOcorrencias);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const findOcorrenciaById = async (req, res) => {
    try {
        const idOcorrencia = req.params.id;

        const ocorrencia = await Ocorrencia.findOne({ where: { id: idOcorrencia } });

        res.send(ocorrencia);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const updateOcorrencia = async (req, res) => {
    try {
        const idOcorrencia = req.params.id;
        const ocorrenciaUpdated = req.body;

        await Ocorrencia.update(ocorrenciaUpdated, { where: { id: idOcorrencia } });

        res.send(ocorrenciaUpdated);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

const removeOcorrencia = async (req, res) => {
    try {
        const idOcorrencia = req.params.id;

        await Ocorrencia.destroy({ where: { id: idOcorrencia } });

        res.send(`Ocorrencia de ID #${idOcorrencia} removido`);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports = {
    saveOcorrencia,
    findAllOcorrencias,
    findOcorrenciaById,
    updateOcorrencia,
    removeOcorrencia
}