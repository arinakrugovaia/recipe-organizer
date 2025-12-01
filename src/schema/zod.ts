import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .min(1, { message: 'password is required' })
    .min(8, { message: 'password must be more than 8 characters' })
    .max(32, { message: 'password must be less than 32 characters' }),
})

export type SignInFormType = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    email: z.email({ message: 'please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'password is required' })
      .min(8, 'password must be at least 8 characters')
      .max(32, 'password must be less than 32 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormType = z.infer<typeof signUpSchema>

export const ingredientSchema = z.object({
  name: z.string().min(1, 'name is required'),
  category: z.string().min(1, 'category is required'),
  unit: z.string().min(1, 'unit is required'),
  pricePerUnit: z
    .number()
    .positive('price per unit must be positive')
    .nullable()
    .transform((val) => (Number.isNaN(val) ? null : val)),
  description: z.string().optional(),
})

export type IngredientFormType = z.infer<typeof ingredientSchema>
