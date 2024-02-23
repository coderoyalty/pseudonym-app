import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "../utils/controller.decorator";
import { Delete, Get, Patch, Post } from "../utils/route.decorator";
import { GenericRequest } from "../@types";
import { RegistrationSchema } from "../validators/auth.validator";
import { z } from "zod";
import { isLoggedIn } from "../middlewares/auth.middleware";
import CustomAPIError from "../errors/custom";
import MessageService from "../services/message.service";
import { isValidObjectId } from "mongoose";

const AuthSchema = RegistrationSchema.omit({ password: true });
type AuthUser = z.infer<typeof AuthSchema> & { id: string };

const paginationQuerySchema = z.object({
	page: z.number().min(0).optional().default(1),
	size: z.number().min(10).max(50).optional().default(10),
});

const messageSchema = z.object({
	content: z.string().max(300),
});

@Controller()
class MessageController extends BaseController {
	constructor() {
		super("");
	}

	@Post("/users/:id/messages")
	async create(req: Request, res: Response) {
		const body = req.body;
		const { id } = req.params;
		const parsed = messageSchema.safeParse(body);
		if (!parsed.success) {
			throw new CustomAPIError("The provided data is invalid", 400);
		}

		await MessageService.createMessage(id, parsed.data.content);

		return res.status(201).json({
			message: "Message has been successfully created",
		});
	}

	@Get("/users/:id/messages", isLoggedIn)
	async fetchAll(req: GenericRequest<AuthUser>, res: Response) {
		const { id } = req.params;
		const { page, size } = req.query;
		const parsed = paginationQuerySchema.safeParse({
			page: parseInt(page as any),
			size: parseInt(size as any),
		});

		if (!parsed.success) {
			throw new CustomAPIError("The provided data is invalid", 400);
		}

		if (id !== req.user.id) {
			throw new CustomAPIError(
				"You're not allowed to perform this action",
				403,
			);
		}

		const data = await MessageService.fetchMessages(id, parsed.data);

		return res.status(200).json({
			...data,
		});
	}

	@Patch("/users/:id/messages/:messageId", isLoggedIn)
	async archiveMessage(req: GenericRequest<AuthUser>, res: Response) {
		const { id, messageId } = req.params;
		const { action } = req.query;

		if (!isValidObjectId(id) || !isValidObjectId(messageId)) {
			throw new CustomAPIError("The provided ID is invalid", 400);
		}

		if (id !== req.user.id) {
			throw new CustomAPIError(
				"You're not allowed to perform this action",
				403,
			);
		}

		await MessageService.archiveMessage(id, messageId, action);

		return res.status(200).json({
			message: "Message has been archived",
		});
	}

	@Delete("/users/:id/messages/:msgId", isLoggedIn)
	async removeMessage(req: Request, res: Response) {}
}
