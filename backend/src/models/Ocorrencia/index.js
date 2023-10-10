const { DataTypes } = require('sequelize');
const sequelize = require('../../database/index');

const Ocorrencia = sequelize.define("Ocorrencia" ,{
    titulo: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.DATE
    },
    hora: {
        type: DataTypes.DATE
    },
    localizacaoGeografica: {
        type: DataTypes.GEOMETRY
    }
});

module.exports = Ocorrencia;