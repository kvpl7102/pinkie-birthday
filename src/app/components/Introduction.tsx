'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>Hôm nay là 31/10, là ngày sinh nhật của một người con gái tuyệt vời.</p>
        </motion.div>
      </ScrollSection>

      {/* Section 2: Main Name */}
      <ScrollSection background="linear-gradient(135deg, #fef7f0 0%, #ffe6f0 30%, #ffd1e3 70%, #ffc1d8 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h1>Phạm Vũ Diệu Linh</h1>
        </motion.div>
      </ScrollSection>

      {/* Section 3: Nicknames */}
      <ScrollSection background="linear-gradient(135deg, #fef9f5 0%, #fff2f0 30%, #ffe6f0 70%, #ffd1e3 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className={styles.nameVariations}>
            hay Pinkie<br />
            hay Lily Pham
          </p>
        </motion.div>
      </ScrollSection>

      {/* Section 4: Favorite Name */}
      <ScrollSection background="linear-gradient(135deg, #fff5f8 0%, #fef7f0 30%, #ffe6f0 70%, #ffd1e3 100%)">
        <motion.div
          className={styles.nameSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className={styles.favoriteName}>hay cái tên mà mình thích gọi nhất</p>
        </motion.div>
      </ScrollSection>

      {/* Section 5: Literary Title */}
      <ScrollSection background="linear-gradient(135deg, #fef9f5 0%, #fff5f8 30%, #fef7f0 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.literarySection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className={styles.literaryTitle}>Cô gái văn chương - 文学少女</p>
        </motion.div>
      </ScrollSection>

      {/* Section 6: Birthday Wishes */}
      <ScrollSection background="linear-gradient(135deg, #fff2f0 0%, #fef9f5 30%, #fff5f8 70%, #fef7f0 100%)">
        <motion.div
          className={styles.birthdayWishes}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className={styles.wish}>Chúc mừng sinh nhật!</p>
          <p className={styles.wish}>Happy Birthday!</p>
          <p className={styles.wish}>お誕生日おめでとう!</p>
          <p className={styles.wish}>Alles Gute zum Geburtstag!</p>
        </motion.div>
      </ScrollSection>

      {/* Section 7: Message Part 1 */}
      <ScrollSection background="linear-gradient(135deg, #ffe6f0 0%, #fff2f0 30%, #fef9f5 70%, #fff5f8 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>Mình có thể gửi những lời chúc mừng qua tin nhắn như mọi năm</p>
        </motion.div>
      </ScrollSection>

      {/* Section 8: Message Part 2 */}
      <ScrollSection background="linear-gradient(135deg, #ffd1e3 0%, #ffe6f0 30%, #fff2f0 70%, #fef9f5 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>nhưng để chúc mừng việc Linh đã hoàn thành chương trình thạc sĩ ở Anh quốc,</p>
        </motion.div>
      </ScrollSection>

      {/* Section 9: Message Part 3 */}
      <ScrollSection background="linear-gradient(135deg, #ffc1d8 0%, #ffd1e3 30%, #ffe6f0 70%, #fff2f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>và có khi ai đó sẽ bảo là mình nịnh nọt, nên không biết thật lòng hay không,</p>
        </motion.div>
      </ScrollSection>

      {/* Section 10: Message Conclusion */}
      <ScrollSection background="linear-gradient(135deg, #ffb3c7 0%, #ffc1d8 30%, #ffd1e3 70%, #ffe6f0 100%)">
        <motion.div
          className={styles.messageSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>nên chúng ta sẽ ở đây để thêm những dẫn chứng cho những lời chúc ấy.</p>
        </motion.div>
      </ScrollSection>
    </div>
  )
}