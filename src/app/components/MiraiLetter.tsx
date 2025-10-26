'use client'

import { motion, useInView } from 'framer-motion'
import {  useEffect, useRef, useState } from 'react'
import styles from './MiraiLetter.module.css'

interface Props { onOpen: () => void }


const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? '' 
export default function MiraiLetter({ onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const vidRef = useRef<HTMLVideoElement>(null)
  const [useGif, setUseGif] = useState(false)
  const inView = useInView(ref, { amount: 0.4, once: false })

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
    tryPlay()
    const onUser = () => tryPlay()
    window.addEventListener('touchstart', onUser, { once: true, passive: true })
    window.addEventListener('click', onUser, { once: true })
    return () => {
      window.removeEventListener('touchstart', onUser as any)
      window.removeEventListener('click', onUser as any)
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
        <img src={`${BP}/media/mirai.jpg`} alt="" className={styles.media} loading="lazy" />
      ) : useGif ? (
        <img src={`${BP}/media/kuriyama-mirai.gif`} alt="" className={styles.media} />
      ) : (
        <video
          ref={vidRef}
          className={styles.media}
          poster={`${BP}/media/mirai.jpg`}
          playsInline
          muted
          loop
          preload="metadata"
          autoPlay
          controls={false}
        >
          <source src={`${BP}/media/mirai.webm`} type="video/webm" />
          <source src={`${BP}/media/mirai.mp4`} type="video/mp4" />
        </video>
      )}
      <button onClick={onOpen} className={styles.letterBtn}>Mở thư</button>
    </div>
      </div>
    </section>
  )
}
