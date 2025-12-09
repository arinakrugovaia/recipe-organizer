import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Checkbox } from '@heroui/react'

interface ControlledCheckboxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
}

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  label,
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          isSelected={field.value ?? false}
          onValueChange={field.onChange}
          size="md"
        >
          {label}
        </Checkbox>
      )}
    />
  )
}
