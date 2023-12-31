import "dotenv/config"
import app from "./app/index"
import connectToMongo from "./database/mongo";

const PORT = process.env.PORT;

connectToMongo();
app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
