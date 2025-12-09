import { z } from 'zod'
import { CategoryEnum, UnitEnum } from '@/shared/types/ingredients'

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
  category: z.enum(CategoryEnum),
  unit: z.enum(UnitEnum),
  pricePerUnit: z
    .number()
    .positive('price per unit must be positive')
    .nullable()
    .transform((val) => (Number.isNaN(val) ? null : val)),
  description: z.string().optional(),
})

export type IngredientFormType = z.infer<typeof ingredientSchema>

export const recipeSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  imageUrl: z.url().or(z.literal('')).nullable().optional(),
  isPublic: z.boolean(),
  ingredients: z
    .array(
      z.object({
        ingredientId: z.string().min(1, 'ingredient is required'),
        quantity: z.number().positive('quantity must be positive'),
      }),
    )
    .min(1, 'at least one ingredient is required'),
})

export type RecipeFormType = z.infer<typeof recipeSchema>
