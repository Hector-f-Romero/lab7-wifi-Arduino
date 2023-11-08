import { connectToDB } from "../db/db.config.js";
import { io } from "../index.js";

export const getLeds = async (req, res) => {
	try {
		const con = await connectToDB();
		const [rows, fields] = await con.execute(
			`SELECT number_leds, COUNT(*) AS count FROM ${process.env.DB_TABLE} GROUP BY number_leds ORDER BY number_leds`
		);
		con.end();
		console.log(rows);
		return res.status(200).json({ values: rows });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const postLeds = async (req, res) => {
	try {
		console.log("Recibido desde Arduino");
		const { number_leds } = req.body;

		const con = await connectToDB();

		// Insert data in DB
		const [rows] = await con.execute(`INSERT INTO ${process.env.DB_TABLE} VALUES (default,${number_leds},default)`);

		// Get all the number of leds saved in BD.
		const [allData] = await con.execute(
			`SELECT number_leds, COUNT(*) AS count FROM ${process.env.DB_TABLE} GROUP BY number_leds ORDER BY number_leds`
		);

		con.end();

		// Notify client to new data has been inserted.
		io.emit("new-data", { data: allData });

		return res.status(201).json({ msg: "Valor registrado con éxito." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};
