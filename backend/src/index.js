import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/leds", (req, res) => {
	console.log("Recibido desde Arduino");
    res.status(200).json({msg:"Ok"})
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
