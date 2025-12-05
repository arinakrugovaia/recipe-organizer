import { PlusIcon } from '@/shared/icons/PlusIcon'
import { CrossIcon } from '@/shared/icons/CrossIcon'
import { HeartIcon } from '@/shared/icons/HeartIcon'

export const TOASTS_CONTENT = {
  CREATE_INGREDIENT: {
    title: 'new ingredient cr️eated! 🎉',
    description: 'Ingredient added! You can now use it in recipes.',
    icon: <PlusIcon />,
  },
  DELETE_INGREDIENT: {
    title: 'ingredient deleted 🗑️',
    description: 'Ingredient has been successfully removed from your list.',
    icon: <CrossIcon />,
  },
  CREATE_RECIPE: {
    title: 'new recipe created! 🎉',
    description: 'Recipe added! You can edit it anytime.',
    icon: <PlusIcon />,
  },
  EDIT_RECIPE: {
    title: 'recipe updated! ✏️',
    description: 'Changes saved successfully.',
    icon: <PlusIcon />,
  },
  DELETE_RECIPE: {
    title: 'recipe deleted 🗑️',
    description: 'Recipe has been successfully removed from your list.',
    icon: <CrossIcon />,
  },
  SUCCESSFUL_REGISTRATION: {
    title: 'successful registration! ❤️',
    description: 'You successfully created a new account. You can login now.',
    icon: <HeartIcon />,
  },
}
