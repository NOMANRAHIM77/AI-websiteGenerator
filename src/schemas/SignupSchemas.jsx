import { z } from "zod";

export const SignupSchemas = z.object({
  firstname: z.string().nonempty("firstname is required").min(3, "At least 3 characters"),
  surname:z.string(),
  date:z.string(),
  month:z.string(),
  year:z.string(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
    // ✅ Gender validation
  gender: z.enum(["female", "male", "custom"], {
    errorMap: () => ({ message: "Please select your gender" }),
  }),
    password: z.string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&#)"),
})
