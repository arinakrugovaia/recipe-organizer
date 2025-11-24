'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal'
import { ReactNode } from 'react'

type ModalComponentProps = {
  isOpen: boolean
  onClose: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  title: string
  children: ReactNode
}

export function ModalComponent({
  isOpen,
  onClose,
  size = 'sm',
  title,
  children,
}: ModalComponentProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b-1 border-b-light-gray">
          <h3 className="text-lg font-semibold">{title}</h3>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
