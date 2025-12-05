'use client'

import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'
import { useAuthStore } from '@/features/auth/model/auth.store'
import {
  addToast,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@heroui/react'
import { getCategoryLabel, getUnitLabel } from '@/shared/lib/ingredient'
import { DeleteIcon } from '@/shared/icons/DeleteIcon'
import { useState } from 'react'
import { TOASTS_CONTENT } from '@/shared/constants/toasts'

const columns = [
  { key: 'ingredient', label: 'ingredient' },
  { key: 'category', label: 'category' },
  { key: 'unit', label: 'unit' },
  { key: 'pricePerUnit', label: 'price per unit' },
  { key: 'description', label: 'description' },
  { key: 'actions', label: 'actions' },
]

export function IngredientsTable() {
  const [error, setError] = useState<string | null>(null)
  const { ingredients, isLoading, removeIngredient } = useIngredientStore()
  const { isAuth } = useAuthStore()

  const handleDelete = async (id: string) => {
    setError(null)

    await removeIngredient(id)
    const storeError = useIngredientStore.getState().error

    if (storeError) {
      setError(storeError)
      return
    }

    addToast(TOASTS_CONTENT.DELETE_INGREDIENT)
  }

  if (isLoading) {
    return (
      <Spinner
        label="loading ingredients..."
        variant="wave"
        classNames={{
          dots: 'bg-accent',
          label: 'text-gray',
        }}
      />
    )
  }

  if (!isAuth) {
    return (
      <p className="text-gray">
        you are not logged in. Log in to save ingredients and use them in
        recipes.
      </p>
    )
  }

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Table
        removeWrapper
        aria-label="ingredients list"
        classNames={{
          wrapper: 'mt-4',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            '📦 no ingredients yet. Add your first one to start creating recipes!'
          }
        >
          {ingredients.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{getCategoryLabel(i.category)}</TableCell>
              <TableCell>{getUnitLabel(i.unit)}</TableCell>
              <TableCell>
                {i.pricePerUnit !== null ? `${i.pricePerUnit} $` : '-'}
              </TableCell>
              <TableCell>{i.description || '-'}</TableCell>
              <TableCell>
                <Tooltip content="delete ingredient" delay={500}>
                  <Button
                    isIconOnly
                    onPress={() => handleDelete(i.id)}
                    className="bg-light-gray text-gray hover:bg-accent hover:text-primary-white transition-colors"
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
