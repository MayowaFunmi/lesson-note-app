import { z } from 'zod';

export const userRegistrationSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10).regex(/^\d+$/, "Phone number must be a at least 10 valid numbers"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const userLoginSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type UserRegistrationDto = z.infer<typeof userRegistrationSchema>;
export type UserLoginDto = z.infer<typeof userLoginSchema>;