import { Control, Controller } from 'react-hook-form'
import { Button, Input, Select, SelectItem, Tooltip } from '@heroui/react'
import { DeleteIcon } from '@/shared/icons/DeleteIcon'
import { IIngredient } from '@/shared/types/ingredients'
import { RecipeFormType } from '@/schema/zod'
import { getUnitLabel } from '@/shared/lib/ingredient'

interface IngredientRowProps {
  control: Control<RecipeFormType>
  index: number
  ingredients: IIngredient[]
  onRemove: (index: number) => void
  unit?: string
}

export function IngredientRow({
  control,
  index,
  ingredients,
  onRemove,
  unit,
}: IngredientRowProps) {
  return (
    <div className="flex w-full flex-col sm:flex-row items-center justify-start gap-2">
      <Controller
        control={control}
        name={`ingredients.${index}.ingredientId`}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            isRequired
            aria-label="ingredient"
            label="choose ingredient"
            name="ingredient"
            className="w-full sm:w-1/2"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0]
              field.onChange(value)
            }}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          >
            {ingredients.map((i) => (
              <SelectItem key={i.id}>{i.name}</SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="flex gap-2 w-full sm:w-1/2">
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
            className="min-w-1/3 flex-1"
            endContent={
              unit ? (
                <span className="text-gray-500 pr-1">{getUnitLabel(unit)}</span>
              ) : null
            }
          />
        )}
      />

        <Tooltip content="delete ingredient" delay={500}>
          <Button
            isIconOnly
            onPress={() => onRemove(index)}
            className="h-[56px] w-1/4 bg-light-gray text-gray hover:bg-primary-dark hover:text-primary-white transition-colors"
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
