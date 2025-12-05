'use client'

import { Form } from '@heroui/react'
import { IRecipe } from '@/shared/types/recipes'
import { ControlledTextInput } from '@/shared/ui/ControlledTextInput'
import { ControlledTextarea } from '@/shared/ui/ControlledTextarea'
import { IngredientRow } from '@/features/recipe-editor/components/IngredientRow'
import { PrimaryButton } from '@/shared/ui/PrimaryButton'
import { SecondaryButton } from '@/shared/ui/SecondaryButton'
import { useRecipeForm } from '@/features/recipe-editor/model/hooks/useRecipeForm'

interface RecipeFromProps {
  initialRecipe?: IRecipe
}

export function RecipeForm({ initialRecipe }: RecipeFromProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    fields,
    ingredients,
    getUnitForRow,
    addIngredient,
    removeIngredient,
    onSubmit,
  } = useRecipeForm(initialRecipe)

  return (
    <Form className="max-w-[480px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextInput
        control={control}
        name="name"
        label="recipe name"
        isRequired={true}
      />
      <ControlledTextarea
        control={control}
        name="description"
        label="description (optional)"
      />
      <ControlledTextInput
        control={control}
        name="imageUrl"
        label="image url (optional)"
        isRequired={false}
        type="url"
      />
      {fields.map((f, index) => (
        <IngredientRow
          key={f.id}
          control={control}
          index={index}
          ingredients={ingredients}
          onRemove={removeIngredient}
          unit={getUnitForRow(index)}
        />
      ))}
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <div className="flex w-full items-center gap-2 justify-start mt-4">
        {fields.length < 10 && (
          <SecondaryButton
            text="add ingredient"
            size="lg"
            action={addIngredient}
            style={{ minWidth: '50%' }}
          />
        )}
        <PrimaryButton
          text="save recipe"
          size="lg"
          type="submit"
          style={{ minWidth: '50%' }}
        />
      </div>
    </Form>
  )
}
