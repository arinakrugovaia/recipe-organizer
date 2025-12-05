import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Textarea as TextareaComponent } from '@heroui/input'

interface TextareaProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
}

export function ControlledTextarea<T extends FieldValues>({
  control,
  name,
  label,
}: TextareaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextareaComponent
          {...field}
          name={name}
          aria-label={label}
          label={label}
          labelPlacement="inside"
          size="sm"
          errorMessage={fieldState?.error?.message}
          isInvalid={!!fieldState?.error}
        />
      )}
    />
  )
}
