import mongoose, { Connection } from "mongoose";
import config from "./config";

const connectDB = async (): Promise<Connection> => {
	try {
		const url = config.db.URI;
		const connection = await mongoose.connect(url, {
			appName: config.db.NAME,
		});
		console.log("✅ - Database connection was successful");
		return connection.connection;
	} catch (error) {
		console.log("Error connecting to the database:", error);
		throw error;
	}
};

export default connectDB;
