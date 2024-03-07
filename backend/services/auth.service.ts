import { z } from "zod";
import { LoginSchema, RegistrationSchema } from "../validators/auth.validator";
import User from "../models/user";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";
import EmailService from "./email.service";
import EmailVerification from "../models/verification";

type IAuth = z.infer<typeof RegistrationSchema>;

class AuthService {
	static async register(data: IAuth) {
		//1. find any existing user with the given username or email address

		const existingUser = await User.findOne({
			$or: [{ username: data.username }, { email: data.email }],
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

		//3. send a verification mail
		await EmailService.sendVerificationEmail({ id: user.id, ...data });
		return;
	}

	static async login(data: z.infer<typeof LoginSchema>) {
		//1. find the user by its email
		const user = await User.findOne({ email: data.email });
		if (!user) {
			throw new CustomAPIError(
				"The email address you provided does not match any account in our system. Please double-check your email address or sign up for a new account.",
				StatusCodes.NOT_FOUND,
			);
		}
		//2. confirm the password
		const valid = await user.isValidPassword(data.password);
		if (!valid) {
			throw new CustomAPIError(
				"The password you provided is incorrect. Please double-check your password and try again.",
				StatusCodes.UNAUTHORIZED,
			);
		}
		//3. create and return the token
		const token = user.createToken();

		return token;
	}

	static async verifyEmailToken(token: string) {
		const emailModel = await EmailVerification.findOne({ code: token });

		if (!emailModel) {
			throw new CustomAPIError("Invalid or expired token.", 400);
		}

		const updatedUser = await User.findOneAndUpdate(
			{
				email: emailModel.email,
				isEmailVerified: { $ne: true },
			},
			{ isEmailVerified: true },
			{
				new: true,
			},
		);

		if (!updatedUser) {
			throw new CustomAPIError(
				"User not found or email already verified.",
				404,
			);
		}

		await emailModel.deleteOne();
		return updatedUser;
	}
}

export default AuthService;
