import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { GenericRequest } from "../@types";
import { Post } from "../utils/route.decorator";
import { RegistrationSchema } from "../validators/auth.validator";
import AuthService from "../services/auth.service";
import {
	isAlreadyLoggedIn,
	loginLimiter,
	validateLogin,
	validateRegistration,
} from "../middlewares/auth.middleware";
import { Cookie } from "../utils/cookie";

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
}
