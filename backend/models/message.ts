import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
		},
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		archived: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

MessageSchema.set("toJSON", {
	transform(doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
