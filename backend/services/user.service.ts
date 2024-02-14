import User from "../models/user";

class UserService {
	static async userByUsername(username: string) {
		const user = await User.findOne({
			username,
		}).select("-isEmailVerified");

		return user;
	}
}

export default UserService;
