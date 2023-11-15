import express from "express"
import cors from "cors"
import ocorencesRouters from "../routers/OccurencesRouters";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/occurences", ocorencesRouters);

export default app;