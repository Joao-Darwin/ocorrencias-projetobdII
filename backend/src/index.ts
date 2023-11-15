import "dotenv/config"
import app from "./app/index"
import connectToMongo from "./database";

const PORT = process.env.PORT;

connectToMongo();
app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));