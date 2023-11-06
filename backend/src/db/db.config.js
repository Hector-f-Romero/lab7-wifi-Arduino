import mysql from "mysql2/promise";

export const connectToDB = async () => {
	try {
		const connection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
		});
		return connection;
	} catch (error) {
		console.log(error);
	}
};
