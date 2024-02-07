import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";

interface IUser extends mongoose.Document {
	username: string;
	email: string;
	password: string;
	isEmailVerified: boolean;
	isValidPassword(password: string): Promise<boolean>;
	createToken(): string;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

UserSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const hash = await bcrypt.hash(this.password, 10);
			this.password = hash;
		}
		next();
	} catch (error: any) {
		next(error);
	}
});

UserSchema.methods.isValidPassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createToken = async function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			username: this.username,
		},
		config.jwt.SECRET,
		{
			expiresIn: config.jwt.EXPIRES_IN,
		},
	);
};

UserSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.password;
		delete ret.__v;
	},
});

UserSchema.index({ username: 1 });

const User = mongoose.model("user", UserSchema);
export default User;
