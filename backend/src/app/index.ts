import express from "express"
import cors from "cors"
import occurrencesRouters from "../routers/OccurrencesRouters";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/occurrences", occurrencesRouters);

export default app;