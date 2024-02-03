import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends mongoose.Document {
	username: string;
	email: string;
	password: string;
	isEmailVerified: boolean;
	isValidPassword(password: string): Promise<boolean>;
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

UserSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.password;
		delete ret.__v;
	},
});

const User = mongoose.model("user", UserSchema);
export default User;
