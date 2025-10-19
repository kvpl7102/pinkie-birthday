'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { photos } from '@/app/data/photos'
import type { Era } from '@/app/data/photos'
import { motion } from 'framer-motion'

export default function HorizontalCarousel({ era }: { era: Era }) {
  // Lọc đúng giai đoạn & giữ thứ tự như trong photos.ts
  const data = useMemo(() => photos.filter(p => p.era === era), [era])

  const scrollerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgress(max > 0 ? el.scrollLeft / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // chuyển wheel dọc -> cuộn ngang (giữ nhẹ tay để còn thoát section)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const vertical = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      if (vertical && Math.abs(e.deltaY) < 40) {
        el.scrollBy({ left: e.deltaY, behavior: 'auto' })
        e.preventDefault()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
      <div
        ref={scrollerRef}
        tabIndex={0}
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'min(78vw, 520px)',
          gap: 18,
          overflowX: 'auto',
          padding: '0 6vw',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          outline: 'none'
        }}
      >
        {data.map((p, i) => (
          <figure key={p.src} style={{ margin: 0, scrollSnapAlign: 'center', position: 'relative' }}>
            {/* khung ảnh */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.45 }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',             // ổn cho chân dung; đổi '4/3' nếu nhiều ảnh ngang
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(179,0,89,.12)',
              }}
            >
              {/* Ken Burns rất nhẹ */}
              <motion.div
                initial={{ scale: 1.05, x: 0, y: 0 }}
                whileInView={{ scale: 1.12, x: -6, y: -4 }}
                viewport={{ once: false, amount: 0.9 }}
                transition={{ duration: 6, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width:768px) 80vw, 520px"
                  style={{ objectFit: 'cover' }}
                  priority={i < 2}               // preload 2 ảnh đầu mỗi era
                />
              </motion.div>

              {/* caption (dùng caption bạn đã nhập trong photos.ts) */}
              {p.caption && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0, right: 0, bottom: 0,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 1.35,
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 60%, rgba(0,0,0,.55) 100%)',
                    textShadow: '0 1px 2px rgba(0,0,0,.35)'
                  }}
                >
                  {p.caption}
                </div>
              )}
            </motion.div>
          </figure>
        ))}
      </div>

      {/* progress bar */}
      <div style={{ height: 4, background: 'rgba(179,0,89,.12)', borderRadius: 4, margin: '14px 6vw 0' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round(progress * 100)}%`,
            background: '#ff8fb3',
            borderRadius: 4,
            transition: 'width .2s'
          }}
        />
      </div>

      {/* hint swipe (tự mờ) */}
      <motion.div
        initial={{ opacity: 0.9, y: 0 }}
        animate={{ opacity: 0, y: -6 }}
        transition={{ duration: 2, delay: 0.6 }}
        style={{ textAlign: 'center', fontSize: 12, color: '#d63384', marginTop: 8 }}
      >
        Vuốt để xem tiếp →
      </motion.div>
    </div>
  )
}