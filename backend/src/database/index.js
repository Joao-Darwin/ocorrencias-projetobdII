const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("projetobdii", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"
});

module.exports = sequelize;