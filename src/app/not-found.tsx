'use client'

import React from 'react'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center self-center h-full flex-1">
      <h1 className="text-6xl font-bold text-primary-dark mb-4 animate-bounce">
        404
      </h1>
      <p className="text-base text-foreground text-center mb-6">
        oops! this recipe seems to have gone missing… 😅 <br />
        try heading back to the homepage to find something delicious!
      </p>
      <Button
        as={Link}
        href="/"
        variant="flat"
        radius="md"
        size="lg"
        className="bg-primary-dark text-primary-white transition-colors hover:bg-accent"
      >
        take me home
      </Button>
    </div>
  )
}
