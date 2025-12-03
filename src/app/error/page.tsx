'use client'

import { useSearchParams } from 'next/navigation'
import { SadFaceIcon } from '@/shared/icons/SadFaceIcon'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function ErrorPage() {
  const params = useSearchParams()
  const message = params.get('message') || 'Something went wrong.'
  const redirectTo = params.get('redirectTo') || '/'

  return (
    <div className="flex flex-col justify-center items-center gap-2 flex-1">
      <div className="h-full flex gap-2 items-center justify-center">
        <p>{message}</p>
        <SadFaceIcon />
      </div>
      <Button
        variant="flat"
        size="lg"
        radius="md"
        className="w-full bg-primary-dark text-primary-white transition-colors hover:bg-accent"
        as={Link}
        href={redirectTo}
      >
        take me home
      </Button>
    </div>
  )
}
