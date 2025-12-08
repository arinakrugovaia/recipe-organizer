'use client'

import { pagesContent } from '@/shared/config/content.config'
import { Button, Tooltip } from '@heroui/react'
import Link from 'next/link'
import { RecipesList } from '@/features/recipe-editor/components/RecipesList'
import { AddIcon } from '@/shared/icons/AddIcon'
import { RecipeSearch } from '@/features/recipe-editor/components/RecipeSearch'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <section className="flex flex-col gap-8 w-full text-gray">
        <p>
          discover sample recipes, get inspired, and create your own collection
          once you <span className="font-bold text-accent">sign up</span>!
        </p>
      </section>
    )
  }

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
            className="bg-light-gray text-gray hover:bg-accent hover:text-primary-white transition-colors"
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <RecipesList />
    </section>
  )
}
