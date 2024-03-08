import mongoose from "mongoose";

interface IEmailVerification extends mongoose.Document {
	email: string;
	code: string;
	createdAt: Date;
}

const emailVerificationSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	code: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 600, // 10mins
	},
});

const EmailVerification = mongoose.model(
	"VerifyEmail",
	emailVerificationSchema,
);

export default EmailVerification;
