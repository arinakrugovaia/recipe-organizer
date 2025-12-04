'use client'

import {
  addToast,
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
} from '@heroui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { RecipeFormType, recipeSchema } from '@/schema/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'
import { PlusIcon } from '@/shared/icons/PlusIcon'
import { IRecipe } from '@/shared/types/recipes'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { DeleteIcon } from '@/shared/icons/DeleteIcon'
import { twMerge } from 'tailwind-merge'

const TOASTS = {
  create: {
    title: 'new recipe created! 🎉',
    description: 'Recipe added! You can edit it anytime.',
    icon: <PlusIcon />,
  },
  edit: {
    title: 'recipe updated! ✏️',
    description: 'Changes saved successfully.',
    icon: <PlusIcon />,
  },
}

interface RecipeFromProps {
  initialRecipe?: IRecipe
}

export function RecipeForm({ initialRecipe }: RecipeFromProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RecipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: initialRecipe?.name || '',
      description: initialRecipe?.description || '',
      imageUrl: initialRecipe?.imageUrl || '',
      ingredients: initialRecipe?.ingredients
        ? initialRecipe.ingredients.map((ingr) => ({
            ingredientId: ingr.ingredientId,
            quantity: ingr.quantity,
          }))
        : [{ ingredientId: '', quantity: 0 }],
    },
  })

  const { ingredients } = useIngredientStore()
  const { createRecipe, editRecipe } = useRecipesStore()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  const handleAddIngredientField = () => {
    if (fields.length < 10) {
      append({ ingredientId: '', quantity: 0 })
    }
  }

  const handleRemoveIngredientField = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = async (data: RecipeFormType) => {
    clearErrors('root')

    startTransition(async () => {
      const result = initialRecipe
        ? await editRecipe(initialRecipe.id, data)
        : await createRecipe(data)
      const storeError = useIngredientStore.getState().error

      if (storeError) {
        setError('root', { type: 'server', message: storeError })
        return
      }
    })

    router.push('/')
    addToast(initialRecipe ? TOASTS.edit : TOASTS.create)
    reset()
  }

  return (
    <Form className="max-w-[480px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            aria-label="recipe name"
            label="recipe name"
            labelPlacement="inside"
            type="text"
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            name="description"
            aria-label="description"
            label="description (optional)"
            labelPlacement="inside"
            size="sm"
          />
        )}
      />
      <Controller
        control={control}
        name="imageUrl"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            aria-label="image url"
            label="image url (optional)"
            labelPlacement="inside"
            type="url"
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      {fields.map((ingr, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-start gap-2"
        >
          <Controller
            control={control}
            name={`ingredients.${index}.ingredientId`}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                aria-label="ingredient"
                label="choose ingredient"
                name="ingredient"
                className="w-1/2"
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0]
                  field.onChange(value)
                }}
              >
                {ingredients.map((i) => (
                  <SelectItem key={i.id}>{i.name}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name={`ingredients.${index}.quantity`}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isRequired
                type="number"
                aria-label="quantity"
                label="quantity"
                labelPlacement="inside"
                value={field.value ? field.value.toString() : ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                className="min-w-1/4 flex-1"
              />
            )}
          />
          <Tooltip content="delete ingredient" delay={300}>
            <Button
              isIconOnly
              onPress={() => handleRemoveIngredientField(index)}
              className="h-[56px] w-1/6 bg-light-gray text-primary-dark hover:bg-primary-dark hover:text-primary-white transition-colors"
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      ))}
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <div className="flex w-full items-center gap-2 justify-start mt-4">
        {fields.length < 10 && (
          <Button
            variant="bordered"
            size="lg"
            radius="md"
            type="button"
            onPress={handleAddIngredientField}
            className={twMerge(
              'min-w-1/2 border-1 border-primary-dark text-primary-dark transition-colors',
              'hover:border-accent hover:text-accent-dark',
            )}
          >
            add ingredient
          </Button>
        )}

        <Button
          variant="flat"
          size="lg"
          radius="md"
          type="submit"
          isLoading={isPending}
          className="min-w-1/2 bg-primary-dark text-primary-white transition-colors hover:bg-accent"
        >
          save recipe
        </Button>
      </div>
    </Form>
  )
}
