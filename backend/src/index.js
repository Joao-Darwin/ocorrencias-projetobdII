const cors = require('cors');
const express = require('express');
const sequelize = require('./database/index');

const app = express();
app.use(express.json());
app.use(cors());

// Models
const Ocorrencia = require('./models/Ocorrencia/index');

// Routers
const ocorrenciaRouter = require('./routers/Ocorrencia/index');

app.use("/ocorrencias", ocorrenciaRouter);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Aplicação rodando na porta 3000`);
        });
    })
    .catch((err) => {
        console.log("Erro ao iniciar aplicação: " + err);
    });