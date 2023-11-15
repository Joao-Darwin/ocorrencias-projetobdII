import "dotenv/config"
import app from "./app/index"

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));