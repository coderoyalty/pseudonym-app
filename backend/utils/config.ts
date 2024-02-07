import dotenv from "dotenv";
dotenv.config();

const config = {
	db: {
		URI: process.env.DB_URI || "",
		NAME: process.env.DB_NAME || "pseudonym",
	},
	jwt: {
		SECRET: process.env.JWT_SECRET || "582d0605f473",
		EXPIRES_IN: process.env.JWT_DURATION || "1h",
	},
	COOKIE_SECRET: process.env.COOKIE_SECRET || "secret_phrase",
	allowedOrigins: process.env.ALLOWED_ORIGINS
		? process.env.ALLOWED_ORIGINS.split(",")
		: [],
};

export default config;
