'use client'

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Tooltip,
} from '@heroui/react'
import { IRecipe } from '@/shared/types/recipes'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import Link from 'next/link'
import { TOASTS_CONTENT } from '@/shared/constants/toasts'
import { DeleteIcon } from '@/shared/icons/DeleteIcon'
import { EditIcon } from '@/shared/icons/EditIcon'
import { useState } from 'react'
import { getUnitLabel } from '@/shared/lib/ingredient'
import { DeleteRecipeModal } from '@/features/recipe-editor/components/DeleteRecipeModal'

export function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const { id, name, description, imageUrl, ingredients } = recipe
  const { removeRecipe } = useRecipesStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await removeRecipe(id)
    } catch (error) {
      console.error('Could not delete recipe: ', error)
      return
    }

    addToast(TOASTS_CONTENT.DELETE_RECIPE)
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <Card className="min-w-1/3 w-full h-[480px] flex flex-col items-center text-gray text-sm">
        <CardHeader className="flex flex-col items-start justify-center gap-1">
          <Image
            alt="recipe image"
            fallbackSrc="/default-recipe.png"
            src={
              imageUrl && imageUrl.trim() !== ''
                ? imageUrl
                : '/default-recipe.png'
            }
            isZoomed
            className={imageUrl ? 'object-cover' : 'object-contain'}
            width={300}
            height={160}
          />
          <div className="flex w-full items-center gap-2">
            <h3 className="text-xl text-primary-dark mr-auto">{name}</h3>
            <Tooltip content="edit recipe" delay={500}>
              <Button
                as={Link}
                href={`/recipes/${recipe.id}`}
                isIconOnly
                size="md"
                radius="sm"
                type="button"
                className="bg-light-gray text-gray hover:bg-accent hover:text-primary-white transition-colors"
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip content="delete recipe" delay={500}>
              <Button
                isIconOnly
                size="md"
                radius="sm"
                type="button"
                onPress={() => setIsDeleteModalOpen(true)}
                className="bg-light-gray text-gray hover:bg-accent hover:text-primary-white transition-colors"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <p>{description || 'No description'}</p>
          <h4 className="text-base text-primary-dark">ingredients:</h4>
          <ul>
            {ingredients.map((i) => (
              <li key={i.id} className="flex items-center gap-2">
                ○ {i.ingredient.name}: {i.quantity}
                {''}
                {getUnitLabel(i.ingredient.unit)}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <DeleteRecipeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        name={recipe.name}
      />
    </>
  )
}
