import mongoose from "mongoose";
import User from "../models/user";
import CustomAPIError from "../errors/custom";
import Message from "../models/message";

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
}

export default UserService;
