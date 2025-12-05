import { Button, ButtonProps } from '@heroui/react'
import { twMerge } from 'tailwind-merge'

interface SecondaryButtonProps extends ButtonProps {
  text: string
  action: () => void
  className?: string
}

export function SecondaryButton({
  text,
  action,
  size = 'lg',
  type = 'button',
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      variant="bordered"
      size={size}
      radius="md"
      type={type}
      onPress={action}
      className={twMerge(
        'border-1 border-gray text-gray transition-colors hover:border-accent hover:text-accent-dark',
        className,
      )}
      {...props}
    >
      {text}
    </Button>
  )
}
