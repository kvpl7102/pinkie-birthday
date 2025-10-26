'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wishes } from '@/app/data/wishes'
import styles from './Letter.module.css'
import MiraiLetter from './MiraiLetter'

function useTypewriterWords(text: string, playing: boolean, speed = 42, revealAll = false) {
  const words = useMemo(() => text.split(/(\s+)/), [text])
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => { countRef.current = 0; setCount(0) }, [text])

  useEffect(() => {
    if (revealAll) {
      countRef.current = words.length
      setCount(words.length)
      if (rafRef.current != null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    }
  }, [revealAll, words.length])

  useEffect(() => {
    const len = words.length
    if (rafRef.current != null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    if (!playing || countRef.current >= len) return

    let last = 0
    const step = (t: number) => {
      if (!playing) return
      if (t - last >= speed && countRef.current < len) {
        countRef.current = Math.min(len, countRef.current + 1)
        setCount(countRef.current)
        last = t
      }
      if (countRef.current < len) rafRef.current = requestAnimationFrame(step)
      else rafRef.current = null
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current) }
  }, [playing, speed, words.length])

  return words.slice(0, count).join('')
}

export default function LetterSection() {
  const [opened, setOpened] = useState(false)
  const [idx, setIdx] = useState<number>(0)        
  const [skipAnim, setSkipAnim] = useState(false)

  const startX = useRef(0)
  const startY = useRef(0)
  const swiping = useRef(false)
  const handled = useRef(false)     
  const COOLDOWN = 220
  const lastSwipeAt = useRef(0)

  const current = wishes[idx]
  const isShortCentered = current?.id === 'w1' || current?.id === 'w6'

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const rendered = useTypewriterWords(current?.content ?? '', opened && !skipAnim, 20, skipAnim)

  const beginSwipe = (x: number, y: number) => {
    startX.current = x
    startY.current = y
    swiping.current = true
    handled.current = false
  }

  const moveSwipe = (x: number, y: number, e?: Event) => {
    if (!swiping.current) return
    const dx = x - startX.current
    const dy = y - startY.current
    if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 8 && e) {
      // @ts-ignore
      if (e.cancelable) e.preventDefault()
    }
  }

  const endSwipe = (x: number, y: number) => {
    if (!swiping.current) return
    swiping.current = false
    const now = Date.now()
    if (now - lastSwipeAt.current < COOLDOWN) return

    const dx = x - startX.current
    const dy = y - startY.current
    const horizontal = Math.abs(dx) > Math.abs(dy) * 1.2
    const THRESHOLD = 48

    if (horizontal && Math.abs(dx) >= THRESHOLD) {
      if (dx < 0) {
        setIdx(i => Math.min(wishes.length - 1, i + 1))
      } else {
        setIdx(i => Math.max(0, i - 1))
      }
      lastSwipeAt.current = now
      handled.current = true
    }
  }

  useEffect(() => {
    const prev = document.documentElement.style.overflow
    if (opened) document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [opened])

  useEffect(() => {
    if (opened) { setIdx(0); setSkipAnim(false) }
  }, [opened])

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

  const next = () => setIdx(i => Math.min(wishes.length - 1, i + 1))
  const prev = () => setIdx(i => Math.max(0, i - 1))
  const atLast = idx >= wishes.length - 1
  const progress = ((idx + 1) / wishes.length) * 100

  return (
    <section className={styles.section}>
      {!opened && <MiraiLetter onOpen={() => setOpened(true)} />}

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
              onTouchStart={(e) => {
                const t = e.touches[0]
                beginSwipe(t.clientX, t.clientY)
              }}
              onTouchMove={(e) => {
                const t = e.touches[0]
                moveSwipe(t.clientX, t.clientY, e.nativeEvent)
              }}
              onTouchEnd={(e) => {
                const t = e.changedTouches[0]
                endSwipe(t.clientX, t.clientY)
              }}
              onPointerDown={(e) => {
                if (e.pointerType === 'mouse') return
                beginSwipe(e.clientX, e.clientY)
              }}
              onPointerMove={(e) => {
                if (e.pointerType === 'mouse') return
                moveSwipe(e.clientX, e.clientY)
              }}
              onPointerUp={(e) => {
                if (e.pointerType === 'mouse') return
                endSwipe(e.clientX, e.clientY)
              }}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {current?.title && (
                <div style={{ color: '#b30059', fontFamily: 'var(--font-dancing)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)' }}>
                  {current.title}
                </div>
              )}

              <div className={styles.content}>
                <div className={isShortCentered ? styles.textShort : styles.text}>
                  {skipAnim ? current.content : rendered}
                  {!skipAnim && rendered.length < (current?.content?.length || 0) && (
                    <span style={{ marginLeft: 2, color: '#d63384', animation: 'blink 1.06s infinite' }}>|</span>
                  )}
                </div>
              </div>

              <div className={`${styles.controls} ${styles.controlsDocked}`}>
                <button onClick={() => setSkipAnim(s => !s)} className={styles.btnSecondary}>
                  {skipAnim ? 'Bật hiệu ứng' : 'Tắt hiệu ứng'}
                </button>
                <button onClick={prev} disabled={idx === 0} className={styles.btnSecondary}>
                  ← Trước
                </button>
                {!atLast ? (
                  <button onClick={next} className={styles.btnPrimary}>Tiếp →</button>
                ) : (
                  <button onClick={() => setOpened(false)} className={styles.btnPrimary}>Đóng thư</button>
                )}
              </div>

              <div className={`${styles.counter} ${styles.counterDocked}`}>
                {idx + 1} / {wishes.length}
              </div>

              <div className={styles.progress}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>

              <button aria-label="Đóng" className={styles.closeBtn} onClick={() => setOpened(false)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
