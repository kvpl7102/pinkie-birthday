'use client'

import React from 'react'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import styles from '../page.module.css'

interface ScrollSectionProps {
  children: React.ReactNode
  background?: string
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children, background = "#fff5f8" }) => (
  <section className={styles.snapSection} style={{ background }}>
    <div className={styles.contentWrapper}>
      {children}
    </div>
  </section>
)

export default function Introduction() {
  return (
    <div className={styles.snapParent}>
      {/* Section 1: Date Introduction */}
      <ScrollSection background="linear-gradient(135deg, #fff5f8 0%, #ffe6f0 30%, #ffd1e3 70%, #ffc1d8 100%)">
        <motion.div
          className={styles.dateSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{ fontFamily: 'var(--font-dancing)', color: '#d63384', fontSize: 'clamp(1.3rem, 4vw, 2.2rem)' }}>
            Hôm nay là 31/10, là ngày sinh nhật của một người con gái tuyệt vời.
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 2: Main Name */}
      <ScrollSection background="linear-gradient(135deg, #fef7f0 0%, #ffe6f0 30%, #ffd1e3 70%, #ffc1d8 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <TypewriterText
            text="hay Pinkie"
            delay={200}
            speed={70}
            fontFamily="var(--font-kalam)"
          />
          <br />
          <TypewriterText
            text="hay Lily Pham"
            delay={800}
            speed={70}
            fontFamily="var(--font-kalam)"
          />
        </motion.div>
      </ScrollSection>

      {/* Section 4: Favorite Name */}
      <ScrollSection background="linear-gradient(135deg, #fff5f8 0%, #fef7f0 30%, #ffe6f0 70%, #ffd1e3 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            hay cái tên mà mình thích gọi nhất
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 5: Literary Title */}
      <ScrollSection background="linear-gradient(135deg, #fef9f5 0%, #fff5f8 30%, #fef7f0 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.literarySection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#b30059',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 600,
            fontStyle: 'italic'
          }}>
            Cô gái văn chương - 文学少女
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 6: Birthday Wishes */}
      <ScrollSection background="linear-gradient(135deg, #fff2f0 0%, #fef9f5 30%, #fff5f8 70%, #fef7f0 100%)">
        <motion.div
          className={styles.birthdayWishes}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400,
            lineHeight: 1.8,
            textAlign: 'center'
          }}>
            Chúc mừng sinh nhật!<br />
            Happy Birthday!<br />
            お誕生日おめでとう!<br />
            Alles Gute zum Geburtstag!
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 7: Message Part 1 */}
      <ScrollSection background="linear-gradient(135deg, #ffe6f0 0%, #fff2f0 30%, #fef9f5 70%, #fff5f8 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400,
            lineHeight: 1.8
          }}>
            Mình có thể gửi những lời chúc mừng qua tin nhắn như mọi năm
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 8: Message Part 2 */}
      <ScrollSection background="linear-gradient(135deg, #ffd1e3 0%, #ffe6f0 30%, #fff2f0 70%, #fef9f5 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400,
            lineHeight: 1.8
          }}>
            nhưng để chúc mừng việc Linh đã hoàn thành chương trình thạc sĩ ở Anh quốc,
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 9: Message Part 3 */}
      <ScrollSection background="linear-gradient(135deg, #ffc1d8 0%, #ffd1e3 30%, #ffe6f0 70%, #fff2f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400,
            lineHeight: 1.8
          }}>
            và có khi ai đó sẽ bảo là mình nịnh nọt, nên không biết thật lòng hay không,
          </div>
        </motion.div>
      </ScrollSection>

      {/* Section 10: Message Conclusion */}
      <ScrollSection background="linear-gradient(135deg, #ffb3c7 0%, #ffc1d8 30%, #ffd1e3 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-dancing)',
            color: '#d63384',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400,
            lineHeight: 1.8
          }}>
            nên chúng ta sẽ ở đây để thêm những dẫn chứng cho những lời chúc ấy.
          </div>
        </motion.div>
      </ScrollSection>
    </div>
  )
}