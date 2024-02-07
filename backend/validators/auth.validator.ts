import { z } from "zod";

const RegistrationSchema = z.object({
	email: z.string().email(),
	username: z.string().min(2).max(50),
	password: z.string().min(8),
});

export { RegistrationSchema };
