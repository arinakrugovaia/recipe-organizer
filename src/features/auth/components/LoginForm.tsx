'use client'

import { Form, Button, Input } from '@heroui/react'
import { signInWithCredentials } from '@/features/auth/model/actions/signIn'
import { useSession } from 'next-auth/react'
import { SignInFormType, signInSchema } from '@/schema/zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type LoginFormProps = {
  onClose: () => void
}

export function LoginForm({ onClose }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })
  const { update } = useSession()

  const onSubmit = async (data: SignInFormType) => {
    const result = await signInWithCredentials(data.email, data.password)

    if (!result.success) {
      setError('root', { type: 'manual', message: result.message })
      return
    }

    await update()
    reset()
    onClose()
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
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <Button
        variant="flat"
        size="lg"
        radius="md"
        className="w-full mt-4 bg-primary-dark text-primary-white transition-colors hover:bg-accent"
        type="submit"
      >
        login
      </Button>
    </Form>
  )
}
