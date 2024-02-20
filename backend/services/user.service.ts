import mongoose from "mongoose";
import User from "../models/user";
import CustomAPIError from "../errors/custom";
import Message from "../models/message";
import { StatusCodes } from "http-status-codes";

class UserService {
	static async userByUsername(username: string) {
		const user = await User.findOne({
			username,
		}).select("-isEmailVerified");

		return user;
	}

	static async userStats(userId: string) {
		if (!mongoose.isValidObjectId(userId)) {
			throw new CustomAPIError("the id provided is invalid", 400);
		}

		const user = await User.findById(userId).select("-isEmailVerified");

		if (!user) {
			throw new CustomAPIError(
				"the user id provided is not associated with an account",
				404,
			);
		}
		const limit = 5;
		const [messagesCount, archivedCount, recentMessages] = await Promise.all([
			Message.countDocuments({ owner: user.id, archived: false }),
			Message.countDocuments({ owner: user.id, archived: true }),
			Message.find({
				owner: user.id,
				archived: false,
			})
				.sort({
					_id: "desc",
				})
				.limit(limit)
				.skip(0),
		]);

		const data = {
			user,
			messagesCount,
			archivedCount,
			recentMessages,
		};

		return data;
	}

	static async updateUser(id: string, username: string) {
		//. verify user ID
		//. make username isn't takne

		const [user, existing] = await Promise.all([
			User.findById(id),
			User.findOne({ username: username }),
		]);

		if (!user) {
			//.. can't update for a non-existing user
			throw new CustomAPIError(
				"The id isn't associated with any available user",
				404,
			);
		}
		if (existing) {
			//.. can't user an existing username
			throw new CustomAPIError(
				"Can't use the provided username because it's occupied already",
				StatusCodes.CONFLICT,
			);
		}

		await user.updateOne({ username }).select("-isEmailVerified");
		await user.save();
		return;
	}
}

export default UserService;
