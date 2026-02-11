import {z} from "zod";

export const registerUserSchema = z.object({
    firstName: z.string().min(2, "First Name Too Short!"),
    lastName: z.string(),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be 8+ characters")
})



export const signinUserSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string()
})


export type registerUserInput = z.infer<typeof registerUserSchema>;
export type signinuserInput = z.infer<typeof signinUserSchema>