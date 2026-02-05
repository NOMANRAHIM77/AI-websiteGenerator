import { z } from "zod";

export const LoginSchemas = z.object({
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
password: z.string().nonempty("password is required"),
})
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"], // show error under confirmPassword
// });
