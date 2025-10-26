'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FloatingPetals from './FloatingPetals'
import BackgroundTexture from './BackgroundTexture'
import styles from '../page.module.css'

interface ScrollSectionProps {
  children: React.ReactNode
  background?: string
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children, background = "#fff5f8" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
    margin: "-10% 0px"
  })

  return (
    <motion.section
      ref={ref}
      className={styles.smoothSection}
      style={{
        background,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      initial={{ opacity: 0.6 }}
      animate={{
        opacity: isInView ? 1 : 0.6,
        scale: isInView ? 1 : 0.98
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </motion.section>
  )
}

export default function Introduction() {
  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Animated Background Elements */}
      <BackgroundTexture />
      <FloatingPetals count={10} />

      {/* Main Scrollable Content */}
      <div className={styles.smoothContainer} style={{ position: 'relative', width: '100%', height: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Date Introduction */}
      <ScrollSection background="linear-gradient(135deg, #fff5f8 0%, #ffe6f0 30%, #ffd1e3 70%, #ffc1d8 100%)">
        <motion.div
          className={styles.dateSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ fontFamily: 'var(--font-dancing)', color: '#d63384', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
            Hôm nay là 31/10, là ngày sinh nhật của một người con gái tuyệt vời.
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 2: Main Name */}
      <ScrollSection background="linear-gradient(135deg, #fef7f0 0%, #ffe6f0 30%, #ffd1e3 70%, #ffc1d8 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ fontFamily: 'var(--font-dancing)', color: '#b30059', fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700 }}>
            Phạm Vũ Diệu Linh
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 3: Nicknames */}
      <ScrollSection background="linear-gradient(135deg, #fef9f5 0%, #fff2f0 30%, #ffe6f0 70%, #ffd1e3 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{ fontFamily: 'var(--font-kalam)', color: '#d63384', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 400 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            hay Pinkie
          </motion.div>
          <br />
          <motion.div
            style={{ fontFamily: 'var(--font-kalam)', color: '#d63384', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 400 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            hay Lily Pham
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 4: Favorite Name */}
      <ScrollSection background="linear-gradient(135deg, #fff5f8 0%, #fef7f0 30%, #ffe6f0 70%, #ffd1e3 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, x: -100, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            x: { duration: 0.7, ease: "easeOut" }
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 500,
              lineHeight: 1.6
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            hay cái tên mà mình thích gọi nhất
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 5: Literary Title */}
      <ScrollSection background="linear-gradient(135deg, #fef9f5 0%, #fff5f8 30%, #fef7f0 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.literarySection}
          initial={{ opacity: 0, rotateX: -20, y: 20 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
            rotateX: { duration: 0.7 }
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#b30059',
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 600,
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Cô gái văn chương <br /> 
            文学少女
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 6: Birthday Wishes */}
      <ScrollSection background="linear-gradient(135deg, #fff2f0 0%, #fef9f5 30%, #fff5f8 70%, #fef7f0 100%)">
        <motion.div
          className={styles.birthdayWishes}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.68, -0.55, 0.265, 1.55],
            scale: { duration: 0.6, ease: "easeOut" }
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 400,
              lineHeight: 1.8,
              textAlign: 'center'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Chúc mừng sinh nhật!<br />
            Happy Birthday!<br />
            お誕生日おめでとう!<br />
            Alles Gute zum Geburtstag!
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 7: Message Part 1 */}
      <ScrollSection background="linear-gradient(135deg, #ffe6f0 0%, #fff2f0 30%, #fef9f5 70%, #fff5f8 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, x: 50, rotateZ: 2 }}
          whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            rotateZ: { duration: 0.6 }
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(2rem, 4vw, 2.2rem)',
              fontWeight: 400,
              lineHeight: 1.8
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Mình có thể gửi những lời chúc mừng qua tin nhắn như mọi năm,
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 8: Message Part 2 */}
      <ScrollSection background="linear-gradient(135deg, #ffd1e3 0%, #ffe6f0 30%, #fff2f0 70%, #fef9f5 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(2rem, 4vw, 2.2rem)',
              fontWeight: 400,
              lineHeight: 1.8
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            nhưng để chúc mừng việc Linh đã hoàn thành chương trình thạc sĩ ở Anh quốc,
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 9: Message Part 3 */}
      <ScrollSection background="linear-gradient(135deg, #ffc1d8 0%, #ffd1e3 30%, #ffe6f0 70%, #fff2f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, x: -30, rotateZ: -1 }}
          whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(2rem, 4vw, 2.2rem)',
              fontWeight: 400,
              lineHeight: 1.8
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            ...và có khi ai đó sẽ bảo là mình nịnh nọt, nên không biết thật lòng hay không,
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Section 10: Message Conclusion */}
      <ScrollSection background="linear-gradient(135deg, #ffb3c7 0%, #ffc1d8 30%, #ffd1e3 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.34, 1.56, 0.64, 1],
            scale: { duration: 0.8, ease: "easeOut" }
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#d63384',
              fontSize: 'clamp(2rem, 4vw, 2.2rem)',
              fontWeight: 400,
              lineHeight: 1.8
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            nên mình sẽ cho thấy là mình thật lòng, và không hề nịnh nọt gì hết.
          </motion.div>
        </motion.div>
      </ScrollSection>
      </div>
    </div>
  )
}