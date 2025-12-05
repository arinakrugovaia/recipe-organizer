import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { useEffect, useState } from 'react'
import { Input } from '@heroui/react'
import { SearchIcon } from '@/shared/icons/SearchIcon'

export function RecipeSearch() {
  const { searchQuery, setSearchQuery } = useRecipesStore()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 500)

    return () => clearTimeout(timeout)
  }, [setSearchQuery, localSearch])

  return (
    <Input
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      placeholder="search recipes"
      startContent={<SearchIcon />}
      size="lg"
      className="max-w-[310px] w-full"
    />
  )
}
