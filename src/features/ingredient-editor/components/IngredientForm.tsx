'use client'

import { Form, Button, Input, Select, SelectItem } from '@heroui/react'
import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
} from '@/shared/constants/selectOptions'
import { Textarea } from '@heroui/input'
import { createIngredient } from '@/features/ingredient-editor/model/actions/createIngredient'
import { IngredientFormType, ingredientSchema } from '@/schema/zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function IngredientForm() {
  const { control, handleSubmit, reset } = useForm<IngredientFormType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      category: '',
      unit: '',
      pricePerUnit: null,
      description: '',
    },
  })

  const onSubmit = async (data: IngredientFormType) => {
    await createIngredient(data)
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
            aria-label="ingredient name"
            label="ingredient name"
            labelPlacement="inside"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />

      <div className="flex gap-2 w-full items-center">
        <div className="w-1/3">
          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <Select
                isRequired
                aria-label="category"
                label="category"
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as string
                  field.onChange(value)
                }}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="w-1/3">
          <Controller
            control={control}
            name="unit"
            render={({ field, fieldState }) => (
              <Select
                isRequired
                aria-label="unit"
                label="unit"
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as string
                  field.onChange(value)
                }}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
              >
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="w-1/3">
          <Controller
            control={control}
            name="pricePerUnit"
            render={({ field, fieldState }) => (
              <Input
                isRequired
                type="number"
                aria-label="price per unit"
                label="price per unit"
                labelPlacement="inside"
                value={field.value ? field.value.toString() : ''}
                onChange={(e) => {
                  const value = e.target.value
                  field.onChange(value ? Number(value) : null)
                }}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                endContent={
                  field.value ? (
                    <span className="text-gray-500 pr-1">$</span>
                  ) : null
                }
              />
            )}
          />
        </div>
      </div>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            aria-label="description"
            label="description (optional)"
            labelPlacement="inside"
            size="sm"
          />
        )}
      />

      <Button
        variant="flat"
        size="lg"
        radius="md"
        type="submit"
        className="w-full bg-primary-dark text-primary-white transition-colors hover:bg-accent"
      >
        add ingredient
      </Button>
    </Form>
  )
}
