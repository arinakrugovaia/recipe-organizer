'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { siteConfig } from '@/config/site.config'
import { layoutConfig } from '@/config/layout.config'

export const Logo = () => {
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

export default function Header() {
  const pathName = usePathname()

  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActivePath = item.href === pathName
      return (
        <NavbarItem key={item.href} isActive={isActivePath}>
          <Link
            href={item.href}
            className={twMerge(
              isActivePath ? 'text-accent' : 'text-primary-dark',
              'hover:text-accent-dark',
              'transition-colors',
            )}
          >
            {item.label}
          </Link>
        </NavbarItem>
      )
    })
  }

  return (
    <Navbar
      style={{
        backgroundColor: 'inherit',
        height: layoutConfig.headerHeight,
      }}
    >
      <NavbarBrand>
        <Link href="/" className="flex gap-px items-center">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            href="#"
            variant="flat"
            radius="full"
            className={twMerge(
              'bg-accent text-primary-white transition-colors',
            )}
          >
            login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="#"
            variant="bordered"
            radius="full"
            className={twMerge(
              'border-accent text-accent transition-colors',
              'hover:bg-accent hover:text-primary-white',
            )}
          >
            sign up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
