'use client'

import { Form } from '@heroui/form'
import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { validateEmail } from '@/features/auth/utils/validateEmail'

type RegisterFormProps = {
  onClose: () => void
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('form submitted: ', formData)

    onClose()
  }

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        isRequired
        aria-label="email"
        label="email"
        name="email"
        type="email"
        labelPlacement="inside"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return 'email is required'
          if (!validateEmail(value)) return 'please enter a valid email'
          return null
        }}
      />
      <Input
        isRequired
        aria-label="password"
        label="password"
        name="password"
        type="password"
        labelPlacement="inside"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'password is required'
          if (value.length < 8)
            return 'password length must be at least 8 characters'
          return null
        }}
      />
      <Input
        isRequired
        aria-label="confirm password"
        label="confirm password"
        name="confirm password"
        type="password"
        labelPlacement="inside"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({
            ...formData,
            confirmPassword: e.target.value,
          })
        }
        validate={(value) => {
          if (!value) return 'you must confirm your password'
          if (value !== formData.password) return 'passwords do not match'
          return null
        }}
      />
      <Button
        variant="flat"
        size="lg"
        radius="full"
        className="w-full mt-4 bg-primary-dark text-primary-white transition-colors hover:bg-accent"
        type="submit"
      >
        register now
      </Button>
    </Form>
  )
}
