import { IngredientForm } from '@/features/ingredient-editor/components/IngredientForm'
import { pagesContent } from '@/shared/config/content.config'
import { IngredientsTable } from '@/features/ingredient-editor/components/IngredientsTable'

export default function IngredientsPage() {
  return (
    <section className="flex flex-col gap-8 w-full text-gray">
      <p>{pagesContent.ingredients.description}</p>
      <IngredientForm />
      <IngredientsTable />
    </section>
  )
}
