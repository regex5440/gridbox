import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please provide valid credentials").trim(),
  password: z.string().min(8, "Please provide valid credentials").trim(),
});
export const SignupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().trim().optional().default(""),
    email: z.string().email({ message: "Please provide a valid email" }).trim(),
    dob: z
      .date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
        "Minimum age should be more than 16"
      )
      .optional()
      .default(new Date("1 Jan 2000")),
    gender: z.enum(["male", "female", "other"]).optional().default("other"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[^a-zA-Z0-9]+/,
        "Password must contain at least one special character"
      )
      .regex(/[A-Z]+/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]+/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]+/, "Password must contain at least one digit")
      .trim(),
    passwordConfirm: z.string().trim(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

export const CartProductAddSchema = z.object({
  productId: z.string({ message: "Invalid product id" }).min(1).trim(),
  quantity: z.number().int("Invalid quantity").min(1).max(30),
});

export const AddressSchema = z.object({
  fullName: z.string().min(3, "Full name is required").trim(),
  address: z.string().min(3, "Address is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  zip: z.string().length(6, "Zip is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
  phone: z
    .string()
    .regex(/\d{5,12}/, "Phone is required")
    .trim(),
});
