import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/custom";

function errorMiddleWare(
	error: CustomAPIError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const status = error.statusCode || 500;
	const message = error.message;
	if (message.length === 0) {
		return res.sendStatus(status);
	}
	let resBody: Record<string, any> = { status, message };

	if (error.data) {
		resBody.data = error.data;
	}
	return res.status(status).json(resBody);
}

export default errorMiddleWare;
