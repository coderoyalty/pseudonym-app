import mongoose from "mongoose";
import Message from "../models/message";
import CustomAPIError from "../errors/custom";
import User from "../models/user";

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
			}),
			Message.find({ ownerID })
				.sort({
					_id: "desc",
				})
				.skip(skip)
				.limit(size),
		]);

		const offset = (page - 1) * size;

		const next = offset + size < total ? page + 1 : null;
		const prev = page - 1 > 0 ? page - 1 : null;

		return {
			data: messages,
			count: messages.length,
			total,
			next,
			prev,
		};
	}
}

export default MessageService;
