import { ModalComponent } from '@/components/ui/Modal'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

type RegisterModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="sign up">
      <RegisterForm onClose={onClose} />
    </ModalComponent>
  )
}
