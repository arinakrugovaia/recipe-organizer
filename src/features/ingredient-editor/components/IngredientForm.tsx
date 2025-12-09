'use client'

import { Form } from '@heroui/react'
import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
} from '@/shared/constants/selectOptions'
import { ControlledTextInput } from '@/shared/ui/ControlledTextInput'
import { ControlledTextarea } from '@/shared/ui/ControlledTextarea'
import { PrimaryButton } from '@/shared/ui/PrimaryButton'
import { ControlledSelect } from '@/shared/ui/ControlledSelect'
import { ControlledNumberInput } from '@/shared/ui/ControlledNumberInput'
import { useIngredientForm } from '@/features/ingredient-editor/model/hooks/useIngredientForm'

export function IngredientForm() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
  } = useIngredientForm()

  return (
    <Form className="md:max-w-[480px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextInput
        control={control}
        name="name"
        label="ingredient name"
        isRequired={true}
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <div className="w-full sm:w-1/3">
          <ControlledSelect
            control={control}
            name="category"
            label="category"
            isRequired
            options={CATEGORY_OPTIONS}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <ControlledSelect
            control={control}
            name="unit"
            label="unit"
            isRequired
            options={UNIT_OPTIONS}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <ControlledNumberInput
            control={control}
            name="pricePerUnit"
            label="price per unit"
            isRequired
            endContent={<span className="text-gray-500 pr-1">$</span>}
          />
        </div>
      </div>
      <ControlledTextarea
        control={control}
        name="description"
        label="description (optional)"
      />
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <PrimaryButton
        text="add ingredient"
        type="submit"
        style={{ width: '100%' }}
      />
    </Form>
  )
}
