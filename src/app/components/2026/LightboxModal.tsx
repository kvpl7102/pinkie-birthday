'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MontageItem, BaseMediaItem } from '../../data/2026/montage'
import { getImagePath } from '@/app/utils/paths'

interface LightboxModalProps {
  items: MontageItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function LightboxModal({
  items,
  activeIndex,
  onClose,
  onNavigate
}: LightboxModalProps) {
  const [mounted, setMounted] = useState(false)
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length
  const currentItem = isOpen ? items[activeIndex] : null

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isMedia = currentItem && currentItem.type !== 'note'
  const mediaItem = isMedia ? (currentItem as BaseMediaItem) : null

  // Keyboard navigation with circular looping
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || items.length === 0) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        if (activeIndex !== null) {
          onNavigate((activeIndex + 1) % items.length)
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeIndex !== null) {
          onNavigate((activeIndex - 1 + items.length) % items.length)
        }
      }
    },
    [isOpen, activeIndex, items.length, onClose, onNavigate]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(
        new CustomEvent('montage-lightbox-state', { detail: { open: true } })
      )
    } else {
      document.body.style.overflow = 'unset'
      window.dispatchEvent(
        new CustomEvent('montage-lightbox-state', { detail: { open: false } })
      )
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      window.dispatchEvent(
        new CustomEvent('montage-lightbox-state', { detail: { open: false } })
      )
    }
  }, [handleKeyDown, isOpen])

  // Reset video state when active item changes, with autoplay policy fallback
  useEffect(() => {
    if (mediaItem?.type === 'video') {
      setIsPlaying(true)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true
            setIsMuted(true)
            videoRef.current.play().catch(() => setIsPlaying(false))
          }
        })
      }
    }
  }, [mediaItem])

  const toggleVideoPlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || activeIndex === null || items.length <= 1) return
    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd
    if (distance > 50) {
      onNavigate((activeIndex + 1) % items.length)
    } else if (distance < -50) {
      onNavigate((activeIndex - 1 + items.length) % items.length)
    }
    setTouchStart(null)
  }

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(18, 10, 14, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            userSelect: 'none',
          }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '8px 12px',
              color: '#F4C2CE',
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                  color: '#FCF8F7',
                }}
              >
                {activeIndex! + 1} / {items.length}
              </span>
              {mediaItem && (
                <span
                  style={{
                    background: 'rgba(231, 111, 142, 0.25)',
                    border: '1px solid rgba(231, 111, 142, 0.4)',
                    color: '#FFB8CA',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {mediaItem.type === 'video' ? 'Video' : mediaItem.type === 'gif' ? 'GIF' : 'Photo'}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Đóng"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FCF8F7',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(231, 111, 142, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Main Media Stage */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button with circular loop */}
            {items.length > 1 && (
              <button
                onClick={() => onNavigate((activeIndex! - 1 + items.length) % items.length)}
                aria-label="Ảnh trước"
                style={{
                  position: 'absolute',
                  left: '12px',
                  zIndex: 20,
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next button with circular loop */}
            {items.length > 1 && (
              <button
                onClick={() => onNavigate((activeIndex! + 1) % items.length)}
                aria-label="Ảnh kế tiếp"
                style={{
                  position: 'absolute',
                  right: '12px',
                  zIndex: 20,
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Media Content */}
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                maxHeight: '78vh',
                maxWidth: '92vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {currentItem.type === 'video' ? (
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <video
                    ref={videoRef}
                    src={getImagePath(currentItem.src)}
                    poster={getImagePath(currentItem.poster || currentItem.thumb)}
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    style={{
                      maxHeight: '74vh',
                      maxWidth: '90vw',
                      minWidth: 'min(88vw, 320px)',
                      minHeight: currentItem.aspectRatio === 'tall' ? 'min(70vh, 520px)' : 'min(45vh, 260px)',
                      aspectRatio: currentItem.aspectRatio === 'tall' ? '9/16' : '16/9',
                      borderRadius: '16px',
                      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                      background: '#0B0709',
                      objectFit: 'contain',
                    }}
                    onClick={toggleVideoPlay}
                  />

                  {/* Video In-Lightbox Controls */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(20, 10, 16, 0.75)',
                      backdropFilter: 'blur(12px)',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: '1px solid rgba(231, 111, 142, 0.3)',
                    }}
                  >
                    <button
                      onClick={toggleVideoPlay}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                          <span>Phát tiếp</span>
                        </>
                      )}
                    </button>

                    <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

                    <button
                      onClick={toggleMute}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isMuted ? '#FFB8CA' : '#A7E8BD',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                      }}
                    >
                      {isMuted ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                          </svg>
                          <span>Bật âm thanh</span>
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                          <span>Đang bật tiếng</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : currentItem.type === 'note' ? (
                /* Note Card Fullscreen View */
                <div
                  style={{
                    background: '#FCF8F7',
                    padding: '36px 32px',
                    borderRadius: '20px',
                    maxWidth: '540px',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(231, 111, 142, 0.25)',
                    textAlign: 'center',
                    color: '#2C1820',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#E76F8E',
                      fontWeight: 600,
                    }}
                  >
                    {currentItem.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.9rem',
                      margin: '14px 0 18px',
                      color: '#2C1820',
                    }}
                  >
                    {currentItem.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      lineHeight: '1.7',
                      color: '#4A333D',
                      whiteSpace: 'pre-line',
                      fontStyle: 'italic',
                    }}
                  >
                    {currentItem.content}
                  </p>
                  <div
                    style={{
                      marginTop: '24px',
                      paddingTop: '16px',
                      borderTop: '1px dashed rgba(231, 111, 142, 0.3)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      color: '#7A5C67',
                    }}
                  >
                    <span>{currentItem.author}</span>
                    <span
                      style={{
                        background: 'rgba(223, 186, 115, 0.2)',
                        color: '#9C782E',
                        border: '1px solid #DFBA73',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontWeight: 600,
                      }}
                    >
                      {currentItem.stamp}
                    </span>
                  </div>
                </div>
              ) : (
                /* Image or GIF */
                <img
                  src={getImagePath(currentItem.src)}
                  alt={currentItem.alt}
                  style={{
                    maxHeight: '74vh',
                    maxWidth: '90vw',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                  }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
