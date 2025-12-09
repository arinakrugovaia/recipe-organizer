import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Recipe Organizer Logo"
      width={32}
      height={32}
      priority
    />
  )
}