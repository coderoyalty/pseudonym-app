import mongoose from "mongoose";

interface IEmailVerification extends mongoose.Document {
	email: string;
	verificationCode: string;
	createdAt: Date;
}

const EmailVerificationSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	verificationCode: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 3600, // 1hr
	},
	messageId: {
		type: String,
		required: true,
	},
	for: {
		type: String,
		required: true,
	},
});

const EmailVerification = mongoose.model(
	"EmailVerification",
	EmailVerificationSchema,
);

export default EmailVerification;
