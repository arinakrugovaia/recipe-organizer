'use client'

import { pagesContent } from '@/shared/config/content.config'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { RecipesList } from '@/features/recipe-editor/components/RecipesList'

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 w-full text-gray">
      <p>{pagesContent.recipes.description}</p>
      <Button
        as={Link}
        href="/recipes/new"
        variant="flat"
        size="lg"
        radius="md"
        className="max-w-[200px] bg-primary-dark text-primary-white transition-colors hover:bg-accent"
      >
        add new recipe
      </Button>

      <RecipesList />
    </section>
  )
}
