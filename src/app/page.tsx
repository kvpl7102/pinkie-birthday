'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'

const MainContainer = styled.main`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
`

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #ffe6f0 0%, #ffc1d8 50%, #ffb3c7 100%);
  flex-direction: column;
  text-align: center;
`

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: #ff6b87;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(255, 107, 135, 0.3);
  font-weight: 700;
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #ff91a4;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`

const ImageSection = styled(Section)`
  background: linear-gradient(135deg, #fff0f5 0%, #ffe6f0 50%, #ffc1d8 100%);
`

const BlessingsSection = styled(Section)`
  background: linear-gradient(135deg, #ffe6f0 0%, #ffb3c7 50%, #ff91a4 100%);
`

const SampleImage = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #ff91a4, #ffc1d8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 10px 30px rgba(255, 107, 135, 0.3);
`

const BlessingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(255, 107, 135, 0.2);
  backdrop-filter: blur(10px);
`

const BlessingText = styled.p`
  font-size: 1.2rem;
  color: #ff6b87;
  line-height: 1.8;
  text-align: center;
`

export default function Home() {
  return (
    <MainContainer>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🎂 Happy Birthday! 🎂
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A special celebration for the most amazing person ✨
        </Subtitle>
      </HeroSection>

      <ImageSection>
        <SampleImage
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Your Beautiful Photo Here 📸
        </SampleImage>
      </ImageSection>

      <BlessingsSection>
        <BlessingCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlessingText>
            🌸 On this special day, I want you to know how much you mean to me.
            Your smile brightens every moment, and your kindness touches every heart.
            May this year bring you endless joy and beautiful memories! 🌸
          </BlessingText>
        </BlessingCard>
      </BlessingsSection>
    </MainContainer>
  )
}