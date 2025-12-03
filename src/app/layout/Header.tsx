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
import { siteConfig } from '@/shared/config/site.config'
import { layoutConfig } from '@/shared/config/layout.config'
import { RegisterModal } from '@/features/auth/components/RegisterModal'
import { LoginModal } from '@/features/auth/components/LoginModal'
import { useState } from 'react'
import { signOutUser } from '@/features/auth/model/actions/signOut'
import { useAuthStore } from '@/features/auth/model/auth.store'

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

  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { isAuth, session, setAuthState } = useAuthStore()

  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error('Auth error:', error)
    }

    setAuthState('unauthenticated', null)
  }

  const getNavItems = () => {
    return siteConfig.navItems
      .filter((item) => {
        return item.href === '/ingredients' ? isAuth : true
      })
      .map((item) => {
        const isActivePath = item.href === pathName
        return (
          <NavbarItem key={item.href} isActive={isActivePath}>
            <Link
              href={item.href}
              className={twMerge(
                isActivePath ? 'text-accent' : 'text-primary-dark',
                'hover:text-accent-dark',
                'font-normal transition-colors',
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
        borderBottom: '1px solid var(--color-light-gray)',
        backgroundColor: 'inherit',
        height: layoutConfig.headerHeight,
      }}
    >
      <NavbarBrand>
        <Link href="/public" className="flex gap-px items-center">
          <Logo />
          <h2>{siteConfig.title}</h2>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuth && <p>Hello, {session?.user?.email}!</p>}
        {isAuth ? (
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href="#"
              variant="flat"
              radius="md"
              className="bg-primary-dark text-primary-white transition-colors hover:bg-accent"
              onPress={handleSignOut}
            >
              logout
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                href="#"
                variant="flat"
                radius="md"
                className="bg-primary-dark text-primary-white transition-colors hover:bg-accent"
                onPress={() => setIsLoginOpen(true)}
              >
                login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="#"
                variant="bordered"
                radius="md"
                className={twMerge(
                  'border-1 border-primary-dark text-primary-dark transition-colors',
                  'hover:border-accent hover:text-accent-dark',
                )}
                onPress={() => setIsRegisterOpen(true)}
              >
                sign up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  )
}
