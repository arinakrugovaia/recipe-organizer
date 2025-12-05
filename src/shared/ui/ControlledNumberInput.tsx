import { Input } from '@heroui/react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ReactNode } from 'react'

interface ControlledNumberInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  isRequired: boolean
  endContent?: ReactNode
}

export function ControlledNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  endContent,
}: ControlledNumberInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          isRequired={isRequired}
          type="number"
          aria-label={label}
          label={label}
          labelPlacement="inside"
          value={field.value ? field.value.toString() : ''}
          onChange={(e) => {
            const value = e.target.value
            field.onChange(value ? Number(value) : null)
          }}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
          endContent={endContent}
        />
      )}
    />
  )
}
