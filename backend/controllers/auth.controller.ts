import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { GenericRequest } from "../@types";
import { Post } from "../utils/route.decorator";
import { RegistrationSchema } from "../validators/auth.validator";
import AuthService from "../services/auth.service";
import validateRegistration from "../middlewares/auth.middleware";

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

	@Post("/login")
	async login(req: GenericRequest<{}>, res: Response) {}

	@Post("/logout")
	async logout(req: GenericRequest<{}>, res: Response) {}
}
