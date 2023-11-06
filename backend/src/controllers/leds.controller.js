import { connectToDB } from "../db/db.config.js";

export const getLeds = async (req, res) => {
	try {
		const con = await connectToDB();
		const [rows, fields] = await con.execute(`SELECT * FROM ${process.env.DB_TABLE}`);
		con.end();
		console.log(rows);
		return res.status(200).json({ leds: rows });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const postLeds = async (req, res) => {
	try {
		console.log("Recibido desde Arduino");
		const { lightValue } = req.body;

		const con = await connectToDB();
		const [rows, fields] = await con.execute(
			`INSERT INTO ${process.env.DB_TABLE} VALUES (default,${lightValue},default)`
		);
		console.log(rows);
		con.end();
		return res.status(201).json({ msg: "Ok", rows });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};
