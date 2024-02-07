import { Request, NextFunction, Response } from "express";
import { z } from "zod";
import { LoginSchema, RegistrationSchema } from "../validators/auth.validator";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";
import { GenericRequest } from "../@types";
import { verifyToken } from "../utils/jwt";

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

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
	const data = LoginSchema.safeParse(req.body);
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

const isAlreadyLoggedIn = (
	req: GenericRequest<AuthUser>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.auth;
		verifyToken(token);
		res.sendStatus(StatusCodes.NO_CONTENT);
	} catch (err) {
		next(null);
	}
};

export { validateRegistration, validateLogin, isAlreadyLoggedIn };
