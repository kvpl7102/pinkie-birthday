'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function TransitionBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.6, once: false })

  return (
    <section ref={ref} style={{ position:'relative', height:'100vh' }}>
      <motion.div
        style={{
          position:'absolute', inset:0,
          display:'grid', placeItems:'center',
          zIndex: -1
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}    
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: .6, ease: 'easeOut' }}
      >
        <div style={{ 
          fontFamily: 'var(--font-dancing)',
          color:'#b30059', fontSize:'clamp(2rem,3.2vw,1.8rem)', textAlign:'center'
        }}>
          …và sau đây là những “dẫn chứng” dịu dàng nhất 
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ position:'absolute', left:0, top:0, bottom:0, width:'50%', background:
          'linear-gradient(135deg,#ffe6f0,#ffc1d8)' , zIndex:-2 }}
        initial={{ x:0 }}
        animate={{ x: inView ? '-100%' : 0 }}
        transition={{ duration:.9, ease:[.25,.8,.25,1] }}
      />
      <motion.div
        aria-hidden
        style={{ position:'absolute', right:0, top:0, bottom:0, width:'50%', background:
          'linear-gradient(135deg,#ffe6f0,#ffc1d8)' , zIndex:-2 }}
        initial={{ x:0 }}
        animate={{ x: inView ? '100%' : 0 }}
        transition={{ duration:.9, ease:[.25,.8,.25,1] }}
      />
    </section>
  )
}