import { ModalComponent } from '@/components/ui/Modal'
import { LoginForm } from '@/features/auth/components/LoginForm'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="login">
      <LoginForm onClose={onClose} />
    </ModalComponent>
  )
}
