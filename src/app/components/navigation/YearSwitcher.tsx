'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface YearOption {
  year: string
  label: string
  badge: string
  href: string
}

const YEARS: YearOption[] = [
  {
    year: '2025',
    label: '2025',
    badge: 'Kỷ niệm',
    href: '/2025'
  },
  {
    year: '2026',
    label: '2026',
    badge: 'Sinh nhật ✨',
    href: '/'
  }
]

export default function YearSwitcher() {
  const pathname = usePathname()
  const is2025 = pathname?.startsWith('/2025')
  const activeYear = is2025 ? '2025' : '2026'

  return (
    <aside
      aria-label="Điều hướng theo năm"
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          border: '1px solid rgba(231, 111, 142, 0.22)',
          boxShadow: '0 10px 32px -4px rgba(142, 50, 75, 0.15)',
        }}
      >
        {YEARS.map((item) => {
          const isActive = activeYear === item.year

          return (
            <Link
              key={item.year}
              href={item.href}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : '#7A5C67',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                minHeight: '38px',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeYearPill"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #E76F8E 0%, #D65A7B 100%)',
                    boxShadow: '0 4px 16px rgba(231, 111, 142, 0.4)',
                    zIndex: -1,
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1, letterSpacing: '0.02em' }}>
                {item.label}
              </span>
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '0.7rem',
                  opacity: isActive ? 0.95 : 0.75,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(255, 255, 255, 0.22)' : 'rgba(231, 111, 142, 0.08)',
                  color: isActive ? '#FFFFFF' : '#964860',
                }}
              >
                {item.badge}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
