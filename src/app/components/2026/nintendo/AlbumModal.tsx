'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EditorialBentoGrid from '@/app/components/2026/EditorialBentoGrid'

interface AlbumModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AlbumModal({ isOpen, onClose }: AlbumModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Static Blur Backdrop - decoupled from scroll for 60fps/120fps performance */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(16, 8, 14, 0.94)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              transform: 'translateZ(0)',
            }}
          />

          {/* Dedicated Smooth Scroll Container */}
          <div
            className="album-scroll-container"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateZ(0)',
            }}
          >
            {/* Top Sticky Retro HUD Control Bar */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(32, 14, 24, 0.96)',
                borderBottom: '3px solid #E76F8E',
                padding: '12px clamp(12px, 3vw, 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: '#FFFFFF',
                    fontSize: 'clamp(0.95rem, 3.6vw, 1.25rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Vài hình ảnh của bọn mình trong 2026 nè
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="nintendo-btn nintendo-btn-no"
                style={{
                  padding: '7px clamp(10px, 2.5vw, 16px)',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                  borderWidth: '2px',
                  background: '#FFFFFF',
                  color: '#3E202E',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
                aria-label="Đóng Album"
              >
                [B] ĐÓNG ALBUM
              </button>
            </div>

            {/* Modal Body: Bento Grid Layout */}
            <div
              style={{
                flex: 1,
                maxWidth: '1280px',
                width: '100%',
                margin: '0 auto',
                padding: '24px clamp(12px, 3vw, 20px) 80px',
              }}
            >
              <EditorialBentoGrid />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
