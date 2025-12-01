'use client'

import { Form, Button, Input } from '@heroui/react'
import { registerUsers } from '@/features/auth/model/actions/register'
import { SignUpFormType, signUpSchema } from '@/schema/zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type RegisterFormProps = {
  onClose: () => void
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const { control, handleSubmit, reset } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignUpFormType) => {
    await registerUsers(data)
    onClose()
    reset()
  }

  return (
    <Form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            aria-label="email"
            label="email"
            type="email"
            labelPlacement="inside"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            aria-label="password"
            label="password"
            type="password"
            labelPlacement="inside"
            autoComplete="new-password"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            aria-label="confirm password"
            label="confirm password"
            type="password"
            labelPlacement="inside"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      <Button
        variant="flat"
        size="md"
        radius="full"
        className="w-full mt-4 bg-primary-dark text-primary-white transition-colors hover:bg-accent"
        type="submit"
      >
        register now
      </Button>
    </Form>
  )
}
