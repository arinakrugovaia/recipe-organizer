'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '@/shared/config/site.config'
import { StarIcon } from '@/shared/icons/StarIcon'

export function PageTitle() {
  const pathname = usePathname()
  const currentSectionItem = siteConfig.navItems.find(
    (item) => item.href === pathname,
  )
  const pageTitle = currentSectionItem
    ? currentSectionItem.label
    : siteConfig.title

  return (
    <div className="relative w-full flex justify-start items-center gap-3 mt-6 mb-2">
      <h2 className="text-2xl font-semibold">{pageTitle}</h2>
      <StarIcon />
    </div>
  )
}
