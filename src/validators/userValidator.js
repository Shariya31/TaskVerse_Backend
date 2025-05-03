import { z } from 'zod';
export const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, { message: 'Must contain a capital letter' })
      .regex(/[0-9]/, { message: 'Must contain a number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Must contain a special character' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dont match',
    path: ['confirmPassword'],
  });
