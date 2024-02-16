import { z } from "zod";

const RegistrationSchema = z.object({
	email: z
		.string()
		.email()
		.transform(data => data.toLowerCase()),
	username: z
		.string()
		.min(2)
		.max(50)
		.transform(data => data.toLowerCase()),
	password: z.string().min(8),
});

const LoginSchema = RegistrationSchema.omit({ username: true });

export { RegistrationSchema, LoginSchema };
