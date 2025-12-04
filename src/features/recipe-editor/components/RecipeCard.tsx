'use client'

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@heroui/react'
import { IRecipe } from '@/shared/types/recipes'
import { CrossIcon } from '@/shared/icons/CrossIcon'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { UNIT_OPTIONS } from '@/shared/constants/selectOptions'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

export function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const { id, name, description, imageUrl, ingredients } = recipe
  const { removeRecipe } = useRecipesStore()

  const handleDelete = async () => {
    try {
      await removeRecipe(id)
    } catch (error) {
      console.error('Could not delete recipe: ', error)
      return
    }

    addToast({
      title: 'recipe deleted 🗑️',
      description: 'Recipe has been successfully removed from your list.',
      icon: <CrossIcon />,
    })
  }

  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_OPTIONS.find((option) => option.value === unit)
    return unitOption ? unitOption?.label : ''
  }

  return (
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
        <h3 className="text-xl text-primary-dark">{name}</h3>
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
      <CardFooter className="flex justify-between items-center gap-1">
        <Button
          as={Link}
          href={`/recipes/${recipe.id}`}
          variant="flat"
          size="md"
          radius="sm"
          type="button"
          className={twMerge(
            'min-w-1/2 text-primary-dark transition-colors',
            'hover:bg-accent hover:text-primary-white',
          )}
        >
          edit
        </Button>
        <Button
          variant="flat"
          size="md"
          radius="sm"
          type="button"
          className={twMerge(
            'min-w-1/2 text-primary-dark transition-colors',
            'hover:bg-accent hover:text-primary-white',
          )}
          onPress={handleDelete}
        >
          delete
        </Button>
      </CardFooter>
    </Card>
  )
}
