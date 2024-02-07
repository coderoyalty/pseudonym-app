import jwt from "jsonwebtoken";
import config from "./config";

const verifyToken = (token: string) => {
	return jwt.verify(token, config.jwt.SECRET);
};

export { verifyToken };
