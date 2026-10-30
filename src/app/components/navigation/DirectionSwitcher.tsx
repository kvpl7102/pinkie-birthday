'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function DirectionSwitcher() {
  const pathname = usePathname()
  // Only display on 2026 routes (not on /2025 archive)
  const is2025 = pathname?.startsWith('/2025')
  if (is2025) return null

  const isDate = pathname?.includes('date')
  const isQuest = !isDate

  const NAV_ITEMS = [
    { id: 'quest', label: 'Quest', href: '/' },
    { id: 'date', label: 'Hẹn hò', href: '/2026/date/' },
  ]

  return (
    <aside
      aria-label="Chuyển đổi màn hình 2026"
      className="direction-switcher-aside"
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          border: '1px solid rgba(231, 111, 142, 0.28)',
          boxShadow: '0 10px 32px -4px rgba(142, 50, 75, 0.16)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            (item.id === 'quest' && isQuest) ||
            (item.id === 'date' && isDate)

          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : '#7A5C67',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                userSelect: 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDirectionPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #E76F8E 0%, #D65A7B 100%)',
                    boxShadow: '0 4px 14px rgba(231, 111, 142, 0.4)',
                    zIndex: -1,
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
