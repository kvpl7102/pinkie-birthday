'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wishes } from '@/app/data/wishes'
import styles from './Letter.module.css'

function useTypewriterWords(text: string, playing: boolean, speed = 42, revealAll = false) {
  const words = useMemo(() => text.split(/(\s+)/), [text]) // giữ khoảng trắng
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    countRef.current = 0
    setCount(0)
  }, [text])

  useEffect(() => {
    if (revealAll) {
      countRef.current = words.length
      setCount(words.length)
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [revealAll, words.length])

  useEffect(() => {
    const len = words.length
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (!playing || countRef.current >= len) return

    let last = 0
    const step = (t: number) => {
      if (!playing) return
      if (t - last >= speed && countRef.current < len) {
        countRef.current = Math.min(len, countRef.current + 1)
        setCount(countRef.current)
        last = t
      }
      if (countRef.current < len) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, speed, words.length])

  return words.slice(0, count).join('')
}

export default function LetterSection() {
  const [opened, setOpened] = useState(false)
  const [idx, setIdx] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const saved = Number(localStorage.getItem('wish-idx') || 0)
    return Number.isFinite(saved) ? saved : 0
  })
  const [skipAnim, setSkipAnim] = useState(false)
  const current = wishes[idx]
  const isShortCentered = current?.id === 'w1' || current?.id === 'w6'

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const rendered = useTypewriterWords(current?.content ?? '', opened && !skipAnim, 38, skipAnim)

  // khóa scroll nền khi mở thư
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    if (opened) document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [opened])

  // phím tắt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!opened) return
      if (e.key === 'Escape') setOpened(false)
      if (e.key === 'ArrowRight' || e.key === 'Enter') setIdx(i => Math.min(wishes.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [opened])

  // lưu tiến độ
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wish-idx', String(idx))
    }
  }, [idx])

  const next = () => setIdx(i => Math.min(wishes.length - 1, i + 1))
  const prev = () => setIdx(i => Math.max(0, i - 1))

  return (
    <section className={styles.section}>
      {/* nút mở phong bì */}
      {!opened && (
        <motion.button
          className={styles.openButton}
          onClick={() => setOpened(true)}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Mở thư"
        >
          💌 Chạm để mở thư
        </motion.button>
      )}

      {/* overlay lá thư */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className={styles.overlay}
            initial={reduceMotion ? { opacity: 0 } : { scale: 0.98, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpened(false)}
          >
            <motion.div
              className={styles.paper}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* (optional) title nhỏ nếu cần */}
              {current?.title && (
                <div style={{ color: '#b30059', fontFamily: 'var(--font-dancing)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)' }}>
                  {current.title}
                </div>
              )}

              {/* nội dung */}
              <div className={styles.content}>
                <div className={isShortCentered ? styles.textShort : styles.text}>
                  {skipAnim ? current.content : rendered}
                  {!skipAnim && rendered.length < (current?.content?.length || 0) && (
                    <span
                      style={{
                        marginLeft: 2,
                        color: '#d63384',
                        animation: 'blink 1.06s infinite'
                      }}
                    >
                      |
                    </span>
                  )}
                </div>
              </div>

              {/* điều khiển */}
              <div className={`${styles.controls} ${styles.controlsDocked}`}>
                <button onClick={prev} disabled={idx === 0} className={styles.btnSecondary}>
                  ← Trước
                </button>
                <button onClick={() => setSkipAnim(s => !s)} className={styles.btnSecondary}>
                  {skipAnim ? 'Bật hiệu ứng' : 'Bỏ qua hiệu ứng'}
                </button>
                {idx < wishes.length - 1 ? (
                  <button onClick={next} className={styles.btnPrimary}>Tiếp →</button>
                ) : (
                  <a href="#gallery" className={styles.btnPrimary}>Mở lại album 📷</a>
                )}
              </div>

              {/* progress */}
              <div className={`${styles.counter} ${styles.counterDocked}`}>
                {idx + 1} / {wishes.length}
              </div>

              {/* nút đóng */}
              <button
                aria-label="Đóng"
                className={styles.closeBtn}
                onClick={() => setOpened(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
