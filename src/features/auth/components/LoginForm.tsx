'use client'

import { Form } from '@heroui/form'
import React, { useState } from 'react'
import { Button, Input } from '@heroui/react'
import { signInWithCredentials } from '@/features/auth/model/actions/signIn'
import { useSession } from 'next-auth/react'

type LoginFormProps = {
  onClose: () => void
}

export function LoginForm({ onClose }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { update } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await signInWithCredentials(formData.email, formData.password)

    try {
      await update()
    } catch (error) {
      console.error('Session update failed:', error)
    }
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
        login
      </Button>
    </Form>
  )
}
