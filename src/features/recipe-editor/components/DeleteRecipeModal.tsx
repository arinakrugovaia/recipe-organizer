import { ModalComponent } from '@/shared/ui/Modal'
import { SecondaryButton } from '@/shared/ui/SecondaryButton'
import { PrimaryButton } from '@/shared/ui/PrimaryButton'

interface DeleteRecipeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  name?: string
}

export function DeleteRecipeModal({
  isOpen,
  onClose,
  onConfirm,
  name = 'this recipe',
}: DeleteRecipeModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title={`delete ${name}?`}>
      <div className="flex items-center justify-between gap-4">
        <SecondaryButton
          text="delete"
          action={onConfirm}
          style={{ width: '100%' }}
        />
        <PrimaryButton
          text="cancel"
          onPress={onClose}
          style={{ width: '100%' }}
        />
      </div>
    </ModalComponent>
  )
}
