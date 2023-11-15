import express from "express"
import cors from "cors"
import occurencesRouters from "../routers/OccurencesRouters";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/occurences", occurencesRouters);

export default app;