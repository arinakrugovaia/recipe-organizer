'use client'

import React from 'react'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4 text-center">
      <h1 className="text-6xl font-bold text-indigo-300 mb-4 animate-bounce">
        404
      </h1>
      <p className="text-base text-foreground mb-6">
        oops! this recipe seems to have gone missing… 😅 <br />
        try heading back to the homepage to find something delicious!
      </p>
      <Button
        as={Link}
        href="/"
        variant="flat"
        radius="full"
        className={twMerge(
          'bg-indigo-300 text-neutral-900 transition-colors',
          'hover:bg-indigo-400',
          'active:bg-indigo-300',
        )}
      >
        back to recipes
      </Button>
    </div>
  )
}
