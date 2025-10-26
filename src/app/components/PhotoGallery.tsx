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
      <ScrollSection background="linear-gradient(135deg,#fff2f4,#ffe6f0)" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5 }}
         
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto',
            gridTemplateRows: '50vh',
            placeItems: 'center',
            alignContent: 'center',             
            rowGap: 12,
            minHeight: 'min(65vh, 560px)',      
            width: 'min(900px, 92vw)',
            padding: '0 clamp(16px,6vw,24px)',
            textAlign: 'center',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-dancing)',
              color: '#b30059',
              fontSize: 'clamp(1.6rem,6vw,2.2rem)',
              lineHeight: 1.6,
              maxWidth: '38ch'                    
            }}
          >
            Qua 23 năm, từ nhỏ đến lớn, mọi người bảo cậu không khác gì mấy.
            Và mình có thể thấy được phần nào đó trong những bức ảnh này
          </div>
          <div style={{ color: '#d63384', fontFamily: 'var(--font-dancing)', fontSize: 22, opacity: 0.8 }}>
            Vuốt ngang để xem tiếp ảnh nhé
          </div>
        </motion.div>
      </ScrollSection>

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