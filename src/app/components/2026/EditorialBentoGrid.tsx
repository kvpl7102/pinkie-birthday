'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MontageItem, MONTAGE_ITEMS_2026 } from '../../data/2026/montage'
import VideoCard from './VideoCard'
import NoteCard from './NoteCard'
import MediaCard from './MediaCard'
import LightboxModal from './LightboxModal'

export type FilterCategory = 'all' | 'media' | 'video' | 'note'

interface EditorialBentoGridProps {
  initialFilter?: FilterCategory
}

export default function EditorialBentoGrid({
  initialFilter = 'all'
}: EditorialBentoGridProps) {
  const INITIAL_BATCH_SIZE = 18
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(initialFilter)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE)

  // Reset lightbox and pagination whenever filter changes
  React.useEffect(() => {
    setLightboxIndex(null)
    setVisibleCount(INITIAL_BATCH_SIZE)
  }, [activeFilter])

  const filteredItems: MontageItem[] = MONTAGE_ITEMS_2026.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'video') return item.type === 'video'
    if (activeFilter === 'note') return item.type === 'note'
    if (activeFilter === 'media') return item.type === 'image' || item.type === 'gif'
    return true
  })

  // When filtering videos or notes, show all; otherwise show curated batch
  const displayedItems = activeFilter === 'video' || activeFilter === 'note'
    ? filteredItems
    : filteredItems.slice(0, visibleCount)

  const hasMore = displayedItems.length < filteredItems.length

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const handleNavigateLightbox = (newIndex: number) => {
    setLightboxIndex(newIndex)
  }

  return (
    <section
      id="montage-gallery"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '24px 20px 80px',
      }}
    >
      {/* Category Filter Pills */}
      <nav
        aria-label="Bộ lọc nội dung montage"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '36px',
        }}
      >
        {[
          { key: 'all' as FilterCategory, label: 'All', count: MONTAGE_ITEMS_2026.length },
          {
            key: 'media' as FilterCategory,
            label: 'Photos',
            count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'image' || m.type === 'gif').length,
          },
          {
            key: 'video' as FilterCategory,
            label: 'Videos',
            count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'video').length,
          },
          {
            key: 'note' as FilterCategory,
            label: 'Messages',
            count: MONTAGE_ITEMS_2026.filter((m) => m.type === 'note').length,
          },
        ].map((tab) => {
          const isActive = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              style={{
                position: 'relative',
                padding: '10px 20px',
                borderRadius: '999px',
                border: isActive
                  ? '1px solid rgba(231, 111, 142, 0.4)'
                  : '1px solid rgba(231, 111, 142, 0.2)',
                background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                color: isActive ? '#C24D6F' : '#7A5C67',
                fontSize: '0.88rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isActive
                  ? '0 6px 20px -4px rgba(231, 111, 142, 0.25)'
                  : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 7px',
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

      {/* Asymmetric Bento Grid */}
      <div className="editorial-bento-grid">
        {displayedItems.map((item, idx) => {
          const spanClass = item.span === 'wide'
            ? 'bento-span-wide'
            : item.span === 'featured'
            ? 'bento-span-featured'
            : ''

          return (
            <div
              key={item.id}
              className={spanClass}
            >
              {item.type === 'video' ? (
                <VideoCard
                  item={item}
                  index={idx}
                  onOpenLightbox={() => openLightbox(idx)}
                />
              ) : item.type === 'note' ? (
                <NoteCard
                  item={item}
                  index={idx}
                  onOpenLightbox={() => openLightbox(idx)}
                />
              ) : (
                <MediaCard
                  item={item}
                  index={idx}
                  onOpenLightbox={() => openLightbox(idx)}
                />
              )}
            </div>
          )
        })}
      </div>

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
            Đang hiển thị {displayedItems.length} trên {filteredItems.length} khoảnh khắc
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 18, filteredItems.length))}
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
              <span>Khám phá thêm khoảnh khắc</span>
            </button>
            <button
              onClick={() => setVisibleCount(filteredItems.length)}
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
              Xem tất cả ({filteredItems.length})
            </button>
          </div>
        </div>
      )}

      {/* Interactive Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </section>
  )
}
