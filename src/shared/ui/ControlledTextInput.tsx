import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Input, InputProps } from '@heroui/react'

interface TextInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  isRequired: boolean
  type?: InputProps['type']
}

export function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  type = 'text',
}: TextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          isRequired={isRequired}
          aria-label={label}
          label={label}
          labelPlacement="inside"
          type={type}
          value={field.value ?? ''}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
        />
      )}
    />
  )
}
