import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { GenericRequest } from "../@types";
import { Post } from "../utils/route.decorator";
import { RegistrationSchema } from "../validators/auth.validator";
import AuthService from "../services/auth.service";
import {
	isAlreadyLoggedIn,
	validateLogin,
	validateRegistration,
} from "../middlewares/auth.middleware";

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

	@Post("/login", isAlreadyLoggedIn, validateLogin)
	async login(req: GenericRequest<{}>, res: Response) {
		const { email, password } = req.body;

		const token = await AuthService.login({ email, password });
		res.cookie("auth", token, { httpOnly: true });

		return res.status(200).json({
			message: "You've signed-in successfully",
		});
	}

	@Post("/logout")
	async logout(req: GenericRequest<{}>, res: Response) {}
}
