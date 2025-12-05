import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Select, SelectItem } from '@heroui/react'

interface ControlledSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  isRequired: boolean
  options: readonly { label: string; value: string }[]
}

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  options,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          isRequired={isRequired}
          aria-label={label}
          label={label}
          name={label}
          selectedKeys={field.value ? [field.value] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string
            field.onChange(value)
          }}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
        >
          {options.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  )
}
