import { z } from "zod";
import { RegistrationSchema } from "../validators/auth.validator";
import User from "../models/user";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";

type IAuth = z.infer<typeof RegistrationSchema>;

class AuthService {
	static async register(data: IAuth) {
		//1. find any existing user with the given username or email address

		const existingUser = await User.findOne({
			$or: [
				{
					username: data.username.toLowerCase(),
				},
				{
					email: data.email.toLowerCase(),
				},
			],
		});

		if (existingUser) {
			const error = new CustomAPIError(
				"An account already exists with the provided email or username",
				StatusCodes.CONFLICT,
			);
			if (existingUser.username === data.username) {
				error.message = "The provided username is taken already";
			} else if (existingUser && existingUser.email === data.email) {
				error.message = "An account already exists with the provided email";
			}
			throw error;
		}

		//2. In the absence of none, will proceed to create a new user.

		const user = await User.create(data);

		if (!user) {
			throw new CustomAPIError(
				"Unable to create an account at the moment",
				500,
			);
		}

		return;
	}
}

export default AuthService;
