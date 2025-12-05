import { useForm } from 'react-hook-form'
import { IngredientFormType, ingredientSchema } from '@/schema/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryEnum, UnitEnum } from '@/shared/types/ingredients'
import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'
import { addToast } from '@heroui/react'
import { TOASTS_CONTENT } from '@/shared/constants/toasts'

export function useIngredientForm() {
  const form = useForm<IngredientFormType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      category: CategoryEnum.VEGETABLES,
      unit: UnitEnum.GRAMS,
      pricePerUnit: null,
      description: '',
    },
  })

  const { reset, setError, clearErrors } = form

  const { createIngredient } = useIngredientStore()

  const onSubmit = async (data: IngredientFormType) => {
    clearErrors('root')

    await createIngredient(data)
    const storeError = useIngredientStore.getState().error

    if (storeError) {
      setError('root', { type: 'server', message: storeError })
      return
    }

    addToast(TOASTS_CONTENT.CREATE_INGREDIENT)
    reset()
  }

  return {
    ...form,
    onSubmit,
  }
}
