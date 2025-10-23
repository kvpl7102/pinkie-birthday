'use client'

import ScrollSection from './ScrollSection'
import HorizontalCarousel from './HorizontalCarousel'
import { motion } from 'framer-motion'

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{
      textAlign: 'center',
      margin: '0 0 16px',
      position: 'relative',
      zIndex: 100,
      isolation: 'isolate',
      background: 'inherit',
      paddingTop: 8,
      paddingBottom: 8
    }}>
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
      {/* (tuỳ chọn) một section "mở đầu" cho album */}
      <ScrollSection background="linear-gradient(135deg,#fff2f4,#ffe6f0)" style={{ zIndex: 10 }}>
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
            Qua 23 năm, những nét đẹp ấy không thay đổi chút nào.
          </div>
          <div style={{ color: '#d63384', fontSize: 16, opacity: 0.8 }}>
            Vuốt ngang để xem ảnh
          </div>
        </motion.div>
      </ScrollSection>

      {/* 4 giai đoạn */}
      <ScrollSection background="#fff5f8" style={{ zIndex: 20 }}>
        <SectionTitle title="Hồi bé nè" />
        <HorizontalCarousel era="childhood" />
      </ScrollSection>

      <ScrollSection background="#fff2f4" style={{ zIndex: 30 }}>
        <SectionTitle title="Amser" />
        <HorizontalCarousel era="ams" />
      </ScrollSection>

      <ScrollSection background="#fff0f8" style={{ zIndex: 40 }}>
        <SectionTitle title="FTUer" />
        <HorizontalCarousel era="ftu" />
      </ScrollSection>

      <ScrollSection background="#fff3fb" style={{ zIndex: 50 }}>
        <SectionTitle title="Bristol" />
        <HorizontalCarousel era="uk" />
      </ScrollSection>
    </>
  )
}