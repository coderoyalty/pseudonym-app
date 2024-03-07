import nodemailer from "nodemailer";
import config from "../utils/config";
import { verifyEmailHTML } from "../utils/templates/email";
import EmailVerification from "../models/verification";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 6);

enum EmailInfo {
	SUCCESS,
	SENT_ALREADY,
	REJECTED,
}

const generateVerificationCode = (userId: string) => {
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

	static async sendVerificationEmail(user: {
		id: string;
		email: string;
		username: string;
	}) {
		const verificationCode = generateVerificationCode(user.id);
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
			html: verifyEmailHTML(user.username, verificationLink, verificationCode),
		});

		if (message.rejected) {
			return EmailInfo.REJECTED;
		}

		return EmailInfo.SUCCESS;
	}
}

export default EmailService;
