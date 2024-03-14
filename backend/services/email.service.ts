import nodemailer from "nodemailer";
import config from "../utils/config";
import {
	generateEmailVerificationHTML,
	generateWelcomeVerificationEmailHTML,
} from "../utils/templates/email";
import EmailVerification from "../models/verification";
import { customAlphabet } from "nanoid";
import User from "../models/user";
import mongoose from "mongoose";
import CustomAPIError from "../errors/custom";
import { StatusCodes } from "http-status-codes";

const nanoid = customAlphabet("1234567890", 6);

enum EmailInfo {
	SUCCESS,
	SENT_ALREADY,
	REJECTED,
}

const generateVerificationCode = () => {
	const token = nanoid();
	return token;
};

class EmailService {
	private static transporter = nodemailer.createTransport({
		host: config.mail.HOST,
		port: config.mail.PORT,
		auth: {
			user: config.mail.USER,
			pass: config.mail.PASSWORD,
		},
	});

	static async sendWelcomeVerificationEmail(user: {
		id: string;
		email: string;
		username: string;
	}) {
		const verificationCode = generateVerificationCode();
		const verificationLink = "https://pseudonym-app.vercel.app/";

		const existing = await EmailVerification.findOne({ email: user.email });

		if (existing) {
			return EmailInfo.SENT_ALREADY;
		}

		const verification = await EmailVerification.create({
			email: user.email,
			code: verificationCode,
		});

		if (!verification) {
			return EmailInfo.REJECTED;
		}

		const message = await this.transporter.sendMail({
			from: `"Pseudonym" ${config.mail.SENDER}`,
			to: user.email,
			subject: "Welcome to Pseudonym!, Please verify your email address.",
			html: generateWelcomeVerificationEmailHTML(verificationCode),
		});

		if (message.rejected) {
			return EmailInfo.REJECTED;
		}

		return EmailInfo.SUCCESS;
	}

	static async sendEmailVerification(userId: string) {
		if (!mongoose.isValidObjectId(userId)) {
			throw new CustomAPIError("Invalid user id", 400);
		}

		const existingUser = await User.findById(userId);

		if (!existingUser) {
			throw new CustomAPIError(
				"The user id provided does not reference an existing user",
				404,
			);
		}

		if (existingUser.isEmailVerified) {
			throw new CustomAPIError(
				"User email address is already verified\n",
				StatusCodes.CONFLICT,
			);
		}

		let verificationModel = await EmailVerification.findOne({
			email: existingUser.email,
		});

		// avoid frequent verification request
		// by enforcing a two minute cooldown period
		if (verificationModel) {
			const date = new Date(verificationModel.createdAt);
			if (date.getTime() > Date.now() - 1000 * 60 * 2) {
				throw new CustomAPIError(
					"You cannot request a verification email again so soon.",
					StatusCodes.TOO_MANY_REQUESTS,
				);
			}
		}

		// delete the existing verification model
		// because we'll be creating a new one
		if (verificationModel) await verificationModel.deleteOne();

		verificationModel = await EmailVerification.create({
			email: existingUser.email,
			code: generateVerificationCode(),
		});

		if (!verificationModel) {
			throw new CustomAPIError(
				"Something wrong, do you mind retrying?",
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}

		// sends the code via email
		const message = await this.transporter.sendMail({
			from: `"Pseudonym" ${config.mail.SENDER}`,
			to: existingUser.email,
			subject: "Please verify your email address.",
			html: generateEmailVerificationHTML(
				existingUser.username,
				verificationModel.code,
			),
		});

		// delete the existing verification model if  email was not sent
		if (!message) {
			// clear
			await verificationModel.deleteOne();
			throw new CustomAPIError(
				"It's either the email address doesn't or something went wrong along the line",
				500,
			);
		}
	}
}

export default EmailService;
