import { createServer } from "http";

import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import { ledsRouter } from "./routes/leds.routes.js";

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: "*",
});

app.use(cors());
app.use(express.json());

app.use("/leds", ledsRouter);

io.on("connection", (socket) => {
	console.log(`Cliente ${socket.id} conectado`);
});

httpServer.listen(port, () => {
	console.log(`Server escuchando en el puerto ${port} 🔥`);
});
