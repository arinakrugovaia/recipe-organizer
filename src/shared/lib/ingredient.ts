import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
} from '@/shared/constants/selectOptions'

export const getCategoryLabel = (value: string) => {
  const option = CATEGORY_OPTIONS.find((option) => option.value === value)
  return option ? option.label : value
}

export const getUnitLabel = (value: string) => {
  const option = UNIT_OPTIONS.find((option) => option.value === value)
  return option ? option.label : value
}
