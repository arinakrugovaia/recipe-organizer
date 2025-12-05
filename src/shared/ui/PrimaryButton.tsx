import { Button, ButtonProps } from '@heroui/react'
import { twMerge } from 'tailwind-merge'

interface PrimaryButtonProps extends ButtonProps {
  text: string
  className?: string
}

export function PrimaryButton({
  text,
  size = 'lg',
  type = 'button',
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      variant="flat"
      size={size}
      radius="md"
      type={type}
      className={twMerge(
        'bg-primary-dark text-primary-white transition-colors hover:bg-accent',
        className,
      )}
      {...props}
    >
      {text}
    </Button>
  )
}
