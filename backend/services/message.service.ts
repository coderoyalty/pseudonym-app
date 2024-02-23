import mongoose from "mongoose";
import Message from "../models/message";
import CustomAPIError from "../errors/custom";
import User from "../models/user";
import { z } from "zod";

interface PaginationInfo {
	page: number;
	size: number;
}

class MessageService {
	static async createMessage(ownerID: string, content: string) {
		if (!mongoose.isValidObjectId(ownerID)) {
			throw new CustomAPIError("The provided ID is invalid", 400);
		}

		const owner = await User.findById(ownerID);
		if (!owner) {
			throw new CustomAPIError(
				"The provided id is not associated with any account",
				404,
			);
		}

		const message = await Message.create({
			owner: owner.id,
			content,
		});

		return message;
	}

	static async fetchMessages(
		ownerID: string,
		{ page = 1, size = 10 }: PaginationInfo,
	) {
		if (!mongoose.isValidObjectId(ownerID)) {
			throw new CustomAPIError("The provided ID is invalid", 400);
		}
		if (page === 0) {
			page = 1;
		}
		const skip = size * (page - 1);
		const [total, messages] = await Promise.all([
			Message.countDocuments({
				owner: ownerID,
				archived: false,
			}),
			Message.find({ owner: ownerID, archived: false })
				.select("-archived")
				.sort({
					_id: "desc",
				})
				.skip(skip)
				.limit(size),
		]);

		const offset = (page - 1) * size;

		const noPages = Math.floor(total / size) + 1;
		const next = offset + size < total ? page + 1 : null;
		const prev = page - 1 > 0 ? page - 1 : null;

		return {
			data: messages,
			count: messages.length,
			total,
			next,
			prev: prev && prev > noPages ? noPages : prev,
			error: page > noPages ? "out-of-range page" : undefined,
		};
	}

	static async archiveMessage(ownerId: string, messageId: string, action: any) {
		if (action === undefined) {
			throw new CustomAPIError(`query parameter 'action' is required`, 400);
		}

		const querySchema = z.enum(["unarchive", "archive"]);
		const parsed = querySchema.safeParse(action);
		if (!parsed.success) {
			throw new CustomAPIError(
				`query parameter 'action' must be 'archive' or 'unarchive'`,
				400,
			);
		}

		const update = {
			archived: false,
		};
		if (parsed.data === "archive") {
			update.archived = true;
		}

		const message = await Message.findOneAndUpdate(
			{
				_id: messageId,
				owner: ownerId,
			},
			update,
		);

		if (!message) {
			throw new CustomAPIError(
				"the provided ID is referring to a non-existing model",
				404,
			);
		}
	}
}

export default MessageService;
