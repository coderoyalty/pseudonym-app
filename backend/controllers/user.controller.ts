import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GenericRequest } from "../@types";
import UserService from "../services/user.service";
import { Get } from "../utils/route.decorator";
import BaseController from "./base.controller";
import { RegistrationSchema } from "../validators/auth.validator";
import { z } from "zod";
import Controller from "../utils/controller.decorator";

const AuthSchema = RegistrationSchema.omit({ password: true });
type AuthUser = z.infer<typeof AuthSchema> & { id: string };

@Controller()
class UserController extends BaseController {
	constructor() {
		super("/users");
	}

	@Get("/exists/:username")
	async exists(req: GenericRequest<AuthUser>, res: Response) {
		const { username } = req.params;
		const user = await UserService.userByUsername(username);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "There is no account associated with the provided username",
			});
		}

		// determine if the user is the current user
		const currentUser = req.user && req.user.username === user.username;

		res.status(StatusCodes.OK).json({
			exists: true,
			user,
			currentUser,
		});
	}
}
