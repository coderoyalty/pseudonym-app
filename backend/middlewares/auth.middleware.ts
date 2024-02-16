import { Request, NextFunction, Response } from "express";
import { z } from "zod";
import { LoginSchema, RegistrationSchema } from "../validators/auth.validator";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";
import { GenericRequest } from "../@types";
import { verifyToken } from "../utils/jwt";
import rateLimit from "express-rate-limit";

const AuthSchema = RegistrationSchema.omit({ password: true });
type AuthUser = z.infer<typeof AuthSchema> & { id: string };

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

const isLoggedIn = (
	req: GenericRequest<AuthUser>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.auth;
		const decoded = verifyToken(token);
		const data = { ...(decoded as Record<string, any>) };
		delete data.iat;
		delete data.exp;
		req.user = { ...data } as any;
		return next(null);
	} catch (err) {
		next(
			new CustomAPIError(
				"You're unauthorized for this action",
				StatusCodes.UNAUTHORIZED,
			),
		);
	}
};

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15mins
	max: 5,
	message: "Too many login attempts, please try again later",
});

export {
	loginLimiter,
	validateRegistration,
	validateLogin,
	isAlreadyLoggedIn,
	isLoggedIn,
};
