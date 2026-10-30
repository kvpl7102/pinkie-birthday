'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MONTAGE_STATS_2026 } from '../../data/2026/montage'

export default function MontageHeader() {
  const scrollToGallery = () => {
    const el = document.getElementById('montage-gallery')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      style={{
        position: 'relative',
        padding: 'clamp(100px, 14vw, 124px) 20px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Editorial Masthead Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(231, 111, 142, 0.25)',
          boxShadow: '0 4px 16px rgba(120, 50, 75, 0.06)',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#E76F8E',
          }}
        >
          VOLUME XXIV
        </span>
        <span style={{ color: 'rgba(231, 111, 142, 0.4)' }}>•</span>
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#7A5C67',
          }}
        >
          OCTOBER 2026
        </span>
        <span style={{ color: 'rgba(231, 111, 142, 0.4)' }}>•</span>
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#9C782E',
            background: 'rgba(223, 186, 115, 0.2)',
            padding: '2px 8px',
            borderRadius: '999px',
          }}
        >
          HAPPY BIRTHDAY ✨
        </span>
      </motion.div>

      {/* Main Title in Cormorant Garamond */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
          fontWeight: 600,
          lineHeight: '1.15',
          color: '#2C1820',
          maxWidth: '920px',
          margin: '0 auto 20px',
          letterSpacing: '-0.02em',
        }}
      >
        Pinkie’s 2026 Montage
      </motion.h1>

      {/* Subtitle in Cormorant Italic */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
          lineHeight: '1.6',
          color: '#5C3848',
          maxWidth: '680px',
          margin: '0 auto 32px',
        }}
      >
        “Tuyển tập những khoảnh khắc dịu dàng, những thước phim tràn ngập nụ cười và những lời nhắn gửi mùa thu tuổi 24.”
      </motion.p>

      {/* Statistics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <div
          style={{
            padding: '8px 18px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(231, 111, 142, 0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>📸</span>
          <span style={{ fontSize: '0.86rem', color: '#7A5C67', fontWeight: 500 }}>
            <strong style={{ color: '#2C1820' }}>{MONTAGE_STATS_2026.totalPhotos}</strong> Bức ảnh
          </span>
        </div>

        <div
          style={{
            padding: '8px 18px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(231, 111, 142, 0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🎬</span>
          <span style={{ fontSize: '0.86rem', color: '#7A5C67', fontWeight: 500 }}>
            <strong style={{ color: '#2C1820' }}>{MONTAGE_STATS_2026.totalVideos}</strong> Thước phim
          </span>
        </div>

        {MONTAGE_STATS_2026.totalGifs > 0 && (
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(231, 111, 142, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>✨</span>
            <span style={{ fontSize: '0.86rem', color: '#7A5C67', fontWeight: 500 }}>
              <strong style={{ color: '#2C1820' }}>{MONTAGE_STATS_2026.totalGifs}</strong> Ảnh động GIF
            </span>
          </div>
        )}

        <div
          style={{
            padding: '8px 18px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(231, 111, 142, 0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>💌</span>
          <span style={{ fontSize: '0.86rem', color: '#7A5C67', fontWeight: 500 }}>
            <strong style={{ color: '#2C1820' }}>{MONTAGE_STATS_2026.totalNotes}</strong> Lời chúc
          </span>
        </div>
      </motion.div>

      {/* CTA Button and A/B Direction 2 Teaser */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <motion.button
          onClick={scrollToGallery}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'linear-gradient(135deg, #E76F8E 0%, #D65A7B 100%)',
            color: '#FFFFFF',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '999px',
            fontSize: '0.94rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(231, 111, 142, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Ngắm nhìn kỷ niệm</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.button>

        <Link
          href="/2026/scrapbook"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            color: '#C24D6F',
            textDecoration: 'none',
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(231, 111, 142, 0.08)',
            border: '1px dashed rgba(231, 111, 142, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <span>📸 Trải nghiệm Hướng 2: Bàn Scrapbook Polaroid tương tác</span>
          <span>→</span>
        </Link>
      </div>
    </header>
  )
}
