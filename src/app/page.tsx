'use client'

import { pagesContent } from '@/shared/config/content.config'
import { Button, Tooltip } from '@heroui/react'
import Link from 'next/link'
import { RecipesList } from '@/features/recipe-editor/components/RecipesList'
import { AddIcon } from '@/shared/icons/AddIcon'
import { RecipeSearch } from '@/features/recipe-editor/components/RecipeSearch'

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 w-full text-gray">
      <p>{pagesContent.recipes.description}</p>
      <div className="flex items-center gap-4">
        <RecipeSearch />
        <Tooltip content="add new recipe" delay={300}>
          <Button
            as={Link}
            href="/recipes/new"
            size="lg"
            radius="md"
            isIconOnly
            className="bg-light-gray text-gray hover:bg-primary-dark hover:text-primary-white transition-colors"
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <RecipesList />
    </section>
  )
}
