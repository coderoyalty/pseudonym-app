import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { GenericRequest } from "../@types";
import { Get, Post } from "../utils/route.decorator";
import { RegistrationSchema } from "../validators/auth.validator";
import AuthService from "../services/auth.service";
import {
	isAlreadyLoggedIn,
	loginLimiter,
	emailVerificationRateLimiter,
	validateLogin,
	validateRegistration,
	isLoggedIn,
} from "../middlewares/auth.middleware";
import { Cookie } from "../utils/cookie";
import { z } from "zod";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";
import { resolveSoa } from "dns";
import EmailService from "../services/email.service";

@Controller()
class AuthController extends BaseController {
	constructor() {
		super("/auth");
	}

	@Post("/register", validateRegistration)
	async register(req: Request, res: Response) {
		const data = RegistrationSchema.parse(req.body);
		await AuthService.register(data);

		return res.status(201).json({
			message: "Account has been created successfully.",
		});
	}

	@Post("/login", loginLimiter, isAlreadyLoggedIn, validateLogin)
	async login(req: GenericRequest<{}>, res: Response) {
		const { email, password } = req.body;

		const token = await AuthService.login({ email, password });
		const cookie = new Cookie("auth", token, {
			httpOnly: true,
			sameSite: process.env.NODE_ENV === "production" ? "none" : undefined,
			secure: process.env.NODE_ENV === "production",
		});
		cookie.set(res);

		return res.status(200).json({
			message: "You've signed-in successfully",
		});
	}

	@Post("/logout")
	async logout(req: GenericRequest<{}>, res: Response) {
		res.clearCookie("auth");
		res.status(200).json({
			message: "You've sign-out successfully",
		});
	}

	@Get("/verify-email/:token", emailVerificationRateLimiter)
	async emailVerification(req: Request, res: Response) {
		const { token } = req.params;

		const updatedUser = await AuthService.verifyEmailToken(token);

		return res.status(200).json({
			message: "Your email has been verified.",
			user: updatedUser,
		});
	}

	@Post("/request-verification-email", isLoggedIn, emailVerificationRateLimiter)
	async requestVerificationEmail(
		req: GenericRequest<{ id: string }>,
		res: Response,
	) {
		const { userId } = req.body;

		if (req.user.id !== userId) {
			throw new CustomAPIError(
				"You're not allowed to perform this operation",
				StatusCodes.FORBIDDEN,
			);
		}

		await EmailService.sendEmailVerification(userId);

		res.status(200).json({
			message: "Verification email requested successfully",
		});
	}
}
