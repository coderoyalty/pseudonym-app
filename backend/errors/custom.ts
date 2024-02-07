import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
	statusCode: number;
	constructor(
		message: string,
		statusCode?: number,
		public data?: Record<string, any>,
	) {
		super(message);
		this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	}
}

export default CustomAPIError;
