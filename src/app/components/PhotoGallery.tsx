'use client'

import ScrollSection from './ScrollSection'
import HorizontalCarousel from './HorizontalCarousel'
import { motion } from 'framer-motion'

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: 'center', margin: '0 0 16px' }}>
      <div
        style={{
          fontFamily: 'var(--font-dancing)',
          color: '#b30059',
          fontSize: 'clamp(1.4rem,4.6vw,2.2rem)',
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div style={{ color: '#d63384', fontSize: 14, opacity: 0.8 }}>{subtitle}</div>
      )}
    </div>
  )
}

export default function StoryGallery() {
  return (
    <>
      {/* (tuỳ chọn) một section “mở đầu” cho album */}
      <ScrollSection background="linear-gradient(135deg,#fff2f4,#ffe6f0)">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#b30059',
              fontSize: 'clamp(2rem,3.2vw,1.8rem)',
              marginBottom: 12,
            }}
          >
            Qua 23 năm, những nét đẹp ấy luôn có trong từng khoảnh khắc của cậu.
          </div>
          <div style={{ color: '#d63384', fontSize: 14, opacity: 0.8 }}>
            Dưới đây là những dẫn chứng nè 🌸 – vuốt ngang để xem ảnh
          </div>
        </motion.div>
      </ScrollSection>

      {/* 4 giai đoạn */}
      <ScrollSection background="#fff5f8">
        <SectionTitle title="Childhood / THCS" subtitle="những hạt nắng đầu tiên" />
        <HorizontalCarousel era="childhood" />
      </ScrollSection>

      <ScrollSection background="#fff2f4">
        <SectionTitle title="Hanoi - Amsterdam" subtitle="trong veo và tươi tắn" />
        <HorizontalCarousel era="ams" />
      </ScrollSection>

      <ScrollSection background="#fff0f8">
        <SectionTitle title="FTU" subtitle="rực rỡ tuổi đôi mươi" />
        <HorizontalCarousel era="ftu" />
      </ScrollSection>

      <ScrollSection background="#fff3fb">
        <SectionTitle title="Bristol" subtitle="chín muồi & thanh lịch" />
        <HorizontalCarousel era="uk" />
      </ScrollSection>
    </>
  )
}