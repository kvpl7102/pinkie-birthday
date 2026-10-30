'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MontageItem, MONTAGE_ITEMS_2026 } from '../../data/2026/montage'
import PolaroidCard from './PolaroidCard'
import StationeryNoteCard from './StationeryNoteCard'
import LightboxModal from './LightboxModal'

export type ScrapbookFilter = 'all' | 'photo' | 'video' | 'note'
export type ScrapbookLayout = 'scatter' | 'grid'

export default function PolaroidScrapbook() {
  const [filter, setFilter] = useState<ScrapbookFilter>('all')
  const [layoutMode, setLayoutMode] = useState<ScrapbookLayout>('scatter')
  const [shuffleKey, setShuffleKey] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(18)

  React.useEffect(() => {
    setLightboxIndex(null)
    setVisibleCount(18)
  }, [filter])

  const filteredItems: MontageItem[] = MONTAGE_ITEMS_2026.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'video') return item.type === 'video'
    if (filter === 'note') return item.type === 'note'
    if (filter === 'photo') return item.type === 'image' || item.type === 'gif'
    return true
  })

  // Genuine seeded shuffle when user clicks "Trộn ngẫu hứng"
  const shuffledFilteredItems = React.useMemo(() => {
    if (shuffleKey === 0) return filteredItems
    const array = [...filteredItems]
    let seed = shuffleKey * 9301 + 49297
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }, [filteredItems, shuffleKey])

  // For video and note, display all directly; otherwise batch 18
  const displayedItems = filter === 'video' || filter === 'note'
    ? shuffledFilteredItems
    : shuffledFilteredItems.slice(0, visibleCount)

  const hasMore = displayedItems.length < shuffledFilteredItems.length

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const handleNavigateLightbox = (newIndex: number) => {
    setLightboxIndex(newIndex)
  }

  const handleShuffle = () => {
    setShuffleKey((prev) => prev + 1)
  }

  return (
    <section
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(90px, 12vw, 120px) 20px 80px',
      }}
    >
      {/* Editorial Header */}
      <header
        style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Direction 2 Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(231, 111, 142, 0.28)',
            boxShadow: '0 4px 16px rgba(120, 50, 75, 0.08)',
            marginBottom: '20px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#C24D6F',
            textTransform: 'uppercase',
          }}
        >
          <span>📸 HƯỚNG THIẾT KẾ 2</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>POLAROID SCRAPBOOK & SCATTER TABLE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            fontWeight: 600,
            lineHeight: 1.18,
            color: '#2C1820',
            marginBottom: '16px',
          }}
        >
          Bàn Kỷ Niệm Polaroid Của Pinkie
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#6A4554',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          “Những bức ảnh polaroid dán băng washi, những tấm thiệp viết tay vương vấn hương trà chiều — hãy thử chạm và kéo thả để tự xếp góc bàn kỷ niệm của riêng cậu.”
        </motion.p>

        {/* Tactile Control Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            borderRadius: '999px',
            border: '1px solid rgba(231, 111, 142, 0.35)',
            boxShadow: '0 10px 30px -4px rgba(120, 50, 75, 0.16)',
            marginBottom: '28px',
          }}
        >
          {/* Mode Switcher */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(231, 111, 142, 0.12)',
              borderRadius: '999px',
              padding: '4px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setLayoutMode('scatter')}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                border: 'none',
                background: layoutMode === 'scatter' ? '#FFFFFF' : 'transparent',
                color: layoutMode === 'scatter' ? '#C24D6F' : '#6A4554',
                fontWeight: layoutMode === 'scatter' ? 700 : 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: layoutMode === 'scatter' ? '0 2px 10px rgba(194, 77, 111, 0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              🍃 Bàn phân tán
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                border: 'none',
                background: layoutMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: layoutMode === 'grid' ? '#C24D6F' : '#6A4554',
                fontWeight: layoutMode === 'grid' ? 700 : 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: layoutMode === 'grid' ? '0 2px 10px rgba(194, 77, 111, 0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              🗂️ Xếp ngăn nắp
            </button>
          </div>

          {/* Shuffle button */}
          <button
            onClick={handleShuffle}
            title="Trộn ngẫu nhiên vị trí các tấm ảnh trên bàn"
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(231, 111, 142, 0.35)',
              background: '#FFF5F8',
              color: '#C24D6F',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(231, 111, 142, 0.15)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>🎲 Trộn ngẫu hứng</span>
          </button>

          {/* Link to Direction 1 */}
          <Link
            href="/"
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              border: '1px dashed rgba(122, 92, 103, 0.4)',
              background: '#FFFFFF',
              color: '#5C3848',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <span>📐 Thử Hướng 1: Bento Grid</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Category Filter Pills */}
        <nav
          aria-label="Bộ lọc nội dung scrapbook"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {[
            { key: 'all' as ScrapbookFilter, label: 'Tất cả kỷ niệm', count: MONTAGE_ITEMS_2026.length },
            {
              key: 'photo' as ScrapbookFilter,
              label: 'Ảnh Polaroid',
              count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'image' || m.type === 'gif').length,
            },
            {
              key: 'video' as ScrapbookFilter,
              label: 'Thước phim',
              count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'video').length,
            },
            {
              key: 'note' as ScrapbookFilter,
              label: 'Ghi chú & Thơ',
              count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'note').length,
            },
          ].map((tab) => {
            const isActive = filter === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: isActive
                    ? '1px solid rgba(231, 111, 142, 0.5)'
                    : '1px solid rgba(231, 111, 142, 0.2)',
                  background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                  color: isActive ? '#C24D6F' : '#7A5C67',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isActive ? '0 4px 16px rgba(231, 111, 142, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(231, 111, 142, 0.15)' : 'rgba(122, 92, 103, 0.1)',
                    color: isActive ? '#C24D6F' : '#7A5C67',
                    fontWeight: 700,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </nav>
      </header>

      {/* Interactive Helper Banner */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '0.82rem',
          color: '#8A6876',
          fontStyle: 'italic',
        }}
      >
        💡 Gợi ý: Cậu có thể giữ chuột hoặc ngón tay để <strong>kéo thả</strong> các tấm ảnh tự do trên bàn nhé!
      </div>

      {/* Main Scatter & Scrapbook Table */}
      <motion.div
        key={shuffleKey}
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: layoutMode === 'scatter'
            ? 'repeat(auto-fill, minmax(280px, 1fr))'
            : 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: layoutMode === 'scatter' ? '36px 28px' : '28px 24px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 10px 40px',
        }}
      >
        <AnimatePresence>
          {displayedItems.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.3) }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.type === 'note' ? (
                  <StationeryNoteCard
                    item={item}
                    index={idx}
                    onOpenLightbox={() => openLightbox(idx)}
                    isScatterMode={layoutMode === 'scatter'}
                  />
                ) : (
                  <PolaroidCard
                    item={item}
                    index={idx}
                    onOpenLightbox={() => openLightbox(idx)}
                    isScatterMode={layoutMode === 'scatter'}
                  />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Progressive Load More / Curation controls */}
      {hasMore && (
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              fontSize: '0.88rem',
              color: '#7A5C67',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
            }}
          >
            Đang bày {displayedItems.length} trên {shuffledFilteredItems.length} kỷ niệm trên bàn
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 18, shuffledFilteredItems.length))}
              style={{
                padding: '12px 28px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #E76F8E 0%, #D65A7B 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px -4px rgba(231, 111, 142, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Trải thêm ảnh lên bàn</span>
              <span>✦</span>
            </button>
            <button
              onClick={() => setVisibleCount(shuffledFilteredItems.length)}
              style={{
                padding: '12px 20px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(231, 111, 142, 0.3)',
                color: '#7A5C67',
                fontWeight: 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Mở tất cả ({shuffledFilteredItems.length})
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal for full inspection */}
      <LightboxModal
        items={shuffledFilteredItems}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </section>
  )
}
