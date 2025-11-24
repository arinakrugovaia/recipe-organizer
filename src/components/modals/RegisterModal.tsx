import { ModalComponent } from '@/components/ui/Modal'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

type RegisterModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="create account">
      <RegisterForm onClose={onClose} />
    </ModalComponent>
  )
}
