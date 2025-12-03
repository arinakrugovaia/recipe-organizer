export const CategoryEnum = {
  VEGETABLES: 'VEGETABLES',
  FRUITS: 'FRUITS',
  MEAT: 'MEAT',
  FISH: 'FISH',
  GRAINS: 'GRAINS',
  DAIRY: 'DAIRY',
  SPICES: 'SPICES',
  OTHER: 'OTHER',
} as const

export type CategoryEnum = (typeof CategoryEnum)[keyof typeof CategoryEnum]

export const UnitEnum = {
  GRAMS: 'GRAMS',
  KILOGRAMS: 'KILOGRAMS',
  LITRES: 'LITRES',
  MILLILITRES: 'MILLILITRES',
  PIECES: 'PIECES',
  TEASPOONS: 'TEASPOONS',
  TABLESPOONS: 'TABLESPOONS',
  CUPS: 'CUPS',
} as const

export type UnitEnum = (typeof UnitEnum)[keyof typeof UnitEnum]

export interface IIngredient {
  id: string
  name: string
  category: CategoryEnum
  unit: UnitEnum
  pricePerUnit: number | null
  description: string | null
  createdAt?: Date
  updatedAt?: Date
}
