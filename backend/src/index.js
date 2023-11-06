import express from "express";
import cors from "cors";
import { ledsRouter } from "./routes/leds.routes.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/leds", ledsRouter);

app.listen(port, () => {
	console.log(`Server escuchando en el puerto ${port} 🔥`);
});
