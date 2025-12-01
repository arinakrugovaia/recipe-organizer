import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
} from '@/shared/constants/selectOptions'

export type Category = (typeof CATEGORY_OPTIONS)[number]['value']

export type Unit = (typeof UNIT_OPTIONS)[number]['value']
