import { Request, NextFunction, Response } from "express";
import { z } from "zod";
import { RegistrationSchema } from "../validators/auth.validator";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";

const AuthSchema = RegistrationSchema.omit({ password: true });
type AuthUser = z.infer<typeof AuthSchema>;

const validateRegistration = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const data = RegistrationSchema.safeParse(req.body);
	if (!data.success) {
		next(
			new CustomAPIError(
				"please provide all required data correctly",
				StatusCodes.BAD_REQUEST,
			),
		);
	}

	next(null);
};

export default validateRegistration;
