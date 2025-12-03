import { CategoryEnum, UnitEnum } from '@/shared/types/ingredients'

export const CATEGORY_OPTIONS = [
  { value: CategoryEnum.VEGETABLES, label: 'vegetables' },
  { value: CategoryEnum.FRUITS, label: 'fruits' },
  { value: CategoryEnum.MEAT, label: 'meat' },
  { value: CategoryEnum.FISH, label: 'fish & seafood' },
  { value: CategoryEnum.GRAINS, label: 'grains & pasta' },
  { value: CategoryEnum.DAIRY, label: 'dairy' },
  { value: CategoryEnum.SPICES, label: 'spices' },
  { value: CategoryEnum.OTHER, label: 'other' },
] as const

export const UNIT_OPTIONS = [
  { value: UnitEnum.GRAMS, label: 'g' },
  { value: UnitEnum.KILOGRAMS, label: 'kg' },
  { value: UnitEnum.LITRES, label: 'L' },
  { value: UnitEnum.MILLILITRES, label: 'ml' },
  { value: UnitEnum.PIECES, label: 'pcs' },
  { value: UnitEnum.TEASPOONS, label: 'tsp' },
  { value: UnitEnum.TABLESPOONS, label: 'tbsp' },
  { value: UnitEnum.CUPS, label: 'cup' },
] as const
