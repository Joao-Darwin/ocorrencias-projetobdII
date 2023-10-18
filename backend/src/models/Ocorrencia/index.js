const { DataTypes } = require('sequelize');
const sequelize = require('../../database/index');

const Ocorrencia = sequelize.define("Ocorrencia", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.DATE
    },
    localizacaoGeografica: {
        type: DataTypes.GEOMETRY
    }
});

module.exports = Ocorrencia;