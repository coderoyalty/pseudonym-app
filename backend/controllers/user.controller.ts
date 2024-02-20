import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GenericRequest } from "../@types";
import UserService from "../services/user.service";
import { Get, Patch } from "../utils/route.decorator";
import BaseController from "./base.controller";
import { RegistrationSchema } from "../validators/auth.validator";
import { z } from "zod";
import Controller from "../utils/controller.decorator";
import { isLoggedIn } from "../middlewares/auth.middleware";
import CustomAPIError from "../errors/custom";

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

	@Get("/me/stats", isLoggedIn)
	async userStats(req: GenericRequest<AuthUser>, res: Response) {
		const data = await UserService.userStats(req.user.id);

		return res.status(200).json(data);
	}

	@Patch("/:id", isLoggedIn)
	async updateUser(req: GenericRequest<AuthUser>, res: Response) {
		const id = req.params.id;
		const { username } = req.body;

		if (!username) {
			throw new CustomAPIError("Invalid username provided", 400);
		}

		if (req.user.id !== id) {
			throw new CustomAPIError("You can't update another user", 403);
		}

		await UserService.updateUser(id, username);

		res.status(200).json({
			message: "Successfully updated the username",
		});
	}
}
