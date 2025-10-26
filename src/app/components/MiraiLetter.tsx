'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './MiraiLetter.module.css'
import { getImagePath } from '@/app/utils/paths'

interface Props { onOpen: () => void }

export default function MiraiLetter({ onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const vidRef = useRef<HTMLVideoElement>(null)
  const [useGif, setUseGif] = useState(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced || !vidRef.current) return
    const v = vidRef.current
    
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          setUseGif(true)
        })
      }
    }
    
    // Add a small delay to ensure video is loaded
    const timer = setTimeout(tryPlay, 100)
    
    const onUser = () => {
      clearTimeout(timer)
      tryPlay()
    }
    
    window.addEventListener('touchstart', onUser, { once: true, passive: true })
    window.addEventListener('click', onUser, { once: true })
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('touchstart', onUser)
      window.removeEventListener('click', onUser)
    }
  }, [prefersReduced])

  return (
    <section className={styles.section}>
      <div ref={ref} className={styles.wrap}>
        <motion.div
          className={styles.caption}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Mirai có thư muốn gửi cho cậu nè!
        </motion.div>

        <div className={styles.mediaBox}>
          {prefersReduced ? (
            <img 
              key="static"
              src={getImagePath('/media/mirai.jpg')} 
              alt="" 
              className={styles.media} 
              loading="lazy" 
            />
          ) : useGif ? (
            <img 
              key="gif"
              src={getImagePath('/media/kuriyama-mirai.gif')} 
              alt="" 
              className={styles.media}
            />
          ) : (
            <video
              key="video"
              ref={vidRef}
              className={styles.media}
              poster={getImagePath('/media/mirai.jpg')}
              playsInline
              muted
              loop
              preload="auto"
              autoPlay
              controls={false}
              webkit-playsinline="true"
            >
              <source src={getImagePath('/media/mirai.webm')} type="video/webm" />
              <source src={getImagePath('/media/mirai.mp4')} type="video/mp4" />
            </video>
          )}
          <button onClick={onOpen} className={styles.letterBtn}>Mở thư</button>
        </div>
      </div>
    </section>
  )
}