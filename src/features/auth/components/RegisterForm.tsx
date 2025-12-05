'use client'

import { Form, Input, addToast } from '@heroui/react'
import { registerUsers } from '@/features/auth/model/actions/register'
import { SignUpFormType, signUpSchema } from '@/schema/zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrimaryButton } from '@/shared/ui/PrimaryButton'
import { TOASTS_CONTENT } from '@/shared/constants/toasts'

type RegisterFormProps = {
  onClose: () => void
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignUpFormType) => {
    const result = await registerUsers(data)

    if ('error' in result) {
      setError('root', { type: 'server', message: result.error })
      return
    }

    addToast(TOASTS_CONTENT.SUCCESSFUL_REGISTRATION)
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
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <PrimaryButton
        text="register now"
        type="submit"
        className="w-full mt-4"
      />
    </Form>
  )
}
