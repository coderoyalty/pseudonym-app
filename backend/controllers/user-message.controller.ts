import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { Delete, Get, Patch, Post } from "../utils/route.decorator";
import { GenericRequest } from "../@types";
import { RegistrationSchema } from "../validators/auth.validator";
import { z } from "zod";
import { isLoggedIn } from "../middlewares/auth.middleware";
import UserService from "../services/user.service";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";
import UserMessageService from "../services/user-message.service";

const AuthSchema = RegistrationSchema.omit({ password: true });
type AuthUser = z.infer<typeof AuthSchema> & { id: string };

const paginationQuerySchema = z.object({
	page: z.number().min(1).default(1),
	size: z.number().min(10).max(50).default(10),
});

const messageSchema = z.object({
	content: z.string().max(300),
});

@Controller()
class UserMessageController extends BaseController {
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

	@Post("/:id/messages")
	async create(req: Request, res: Response) {
		const body = req.body;
		const { id } = req.params;
		const parsed = messageSchema.safeParse(body);
		if (!parsed.success) {
			throw new CustomAPIError("The provided data is invalid", 400);
		}

		await UserMessageService.createMessage(id, parsed.data.content);

		return res.status(201).json({
			message: "Message has been successfully created",
		});
	}

	@Get("/:id/messages", isLoggedIn)
	async fetchAll(req: GenericRequest<AuthUser>, res: Response) {
		const { id } = req.params;
		const parsed = paginationQuerySchema.safeParse(req.query);

		if (!parsed.success) {
			throw new CustomAPIError("The provided data is invalid", 400);
		}

		if (id !== req.user.id) {
			throw new CustomAPIError(
				"You're not allowed to perform this action",
				403,
			);
		}

		const data = await UserMessageService.fetchMessages(id, parsed.data);

		return res.status(200).json({
			...data,
		});
	}

	@Patch("/:id/messages/:messageId/archived", isLoggedIn)
	async archiveMessage(req: Request, res: Response) {}

	@Delete("/:id/messages/:msgId", isLoggedIn)
	async removeMessage(req: Request, res: Response) {}
}
