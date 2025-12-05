import { IRecipe } from '@/shared/types/recipes'
import { useRouter } from 'next/navigation'
import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { RecipeFormType, recipeSchema } from '@/schema/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast } from '@heroui/react'
import { TOASTS_CONTENT } from '@/shared/constants/toasts'

export function useRecipeForm(initialRecipe?: IRecipe) {
  const router = useRouter()
  const { ingredients } = useIngredientStore()
  const { createRecipe, editRecipe } = useRecipesStore()

  const form = useForm<RecipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: initialRecipe?.name || '',
      description: initialRecipe?.description || '',
      imageUrl: initialRecipe?.imageUrl || '',
      ingredients: initialRecipe?.ingredients
        ? initialRecipe.ingredients.map((i) => ({
            ingredientId: i.ingredientId,
            quantity: i.quantity,
          }))
        : [{ ingredientId: '', quantity: 0 }],
    },
  })

  const { control, reset, setError, clearErrors } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  const watchedIngredients = useWatch({
    control,
    name: 'ingredients',
  })

  const getUnitForRow = (index: number) => {
    const id = watchedIngredients[index]?.ingredientId
    return ingredients.find((i) => i.id === id)?.unit
  }

  const addIngredient = () => {
    if (fields.length < 10) {
      append({ ingredientId: '', quantity: 0 })
    }
  }

  const removeIngredient = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = async (data: RecipeFormType) => {
    clearErrors('root')

    if (initialRecipe) {
      await editRecipe(initialRecipe.id, data)
    } else {
      await createRecipe(data)
    }

    const storeError = useIngredientStore.getState().error

    if (storeError) {
      setError('root', { type: 'server', message: storeError })
      return
    }

    router.push('/')
    addToast(
      initialRecipe ? TOASTS_CONTENT.EDIT_RECIPE : TOASTS_CONTENT.CREATE_RECIPE,
    )
    reset()
  }

  return {
    ...form,
    fields,
    ingredients,
    getUnitForRow,
    addIngredient,
    removeIngredient,
    onSubmit,
  }
}
