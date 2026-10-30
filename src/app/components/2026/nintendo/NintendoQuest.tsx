'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import FloatingPetals from '@/app/components/FloatingPetals'
import BackgroundTexture from '@/app/components/BackgroundTexture'
import { DATE_PLAN_2026 } from '@/app/data/2026/datePlan'

const NO_BUTTON_LABELS = [
  'Không <No>',
  'Ơ kìa:<',
  'Nút YES bên cạnh to và đẹp hơn nè!',
  'Chắc là bấm nhầm đúng không? Cho chọn lại nè!',
  'Nhất định không chịu luôn sao?',
  'Dỗi rùi đấy nhé! Nhưng vẫn đợi cậu đổi ý thui...',
  'Nút nỳ sắp biến mất rồi đó nha!',
  'Hết đường lui rồi, chọn YES thôi!',
  'YAY WE DID IT CHAT! SHE CHOSE YES',
]

const DIALOG_REACTIONS = [
  'Nè nè, hôm nay là sinh nhật của một người rất đặc biệt đó! Cậu có muốn cùng mình đi chơi sinh nhật không ạ?',
  'Ủa sao chọn vậy vậy à?! Chọn lại đi nèo, hôm nay sinh nhật cơ mà!',
  'Cậu nhìn xem kìa, nút YES bên cạnh đang to lên và mời gọi lắm luôn á!',
  'Tay lỡ trượt trúng nút thôi đúng không? Cho cậu bấm lại nè!',
  'Cậu kiên quyết dữ vậy sao... Nhưng mà mình biết thừa cậu cũng muốn đi mà!',
  'Nút NO đang nhỏ xíu lại rồi kìa, cố chấp là nó biến mất tiêu luôn á nha!',
  'Thôi mừ, đồng ý đi mà người đẹp ơi!',
  'Không còn lựa chọn nào đâu, bấm YES đi mừ:<',
]

export default function NintendoQuest() {
  const [noCount, setNoCount] = useState<number>(0)
  const [isAccepted, setIsAccepted] = useState<boolean>(false)
  const [isWiggling, setIsWiggling] = useState<boolean>(false)

  // Dynamic button scaling
  // "Yes" starts small (0.85), expands dynamically with every "No" click
  const yesScale = Math.min(2.6, 0.85 + noCount * 0.22)

  // "No" starts significant (1.45), shrinks with every click
  const noScale = Math.max(0.12, 1.45 - noCount * 0.17)

  // Dynamic label for "No"
  const currentNoLabel =
    noCount < NO_BUTTON_LABELS.length
      ? NO_BUTTON_LABELS[noCount]
      : NO_BUTTON_LABELS[NO_BUTTON_LABELS.length - 1]

  const currentDialog =
    noCount < DIALOG_REACTIONS.length
      ? DIALOG_REACTIONS[noCount]
      : DIALOG_REACTIONS[DIALOG_REACTIONS.length - 1]

  const handleNoClick = () => {
    setIsWiggling(true)
    setNoCount((prev) => prev + 1)
    setTimeout(() => setIsWiggling(false), 300)
  }

  const handleYesClick = () => {
    setIsAccepted(true)
  }

  const { birthdayWish } = DATE_PLAN_2026

  return (
    <div
      className={`sakura-pixel-bg nintendo-quest-wrapper ${isAccepted ? 'is-accepted' : ''}`}
    >
      <BackgroundTexture sparkleCount={10} />
      <FloatingPetals count={8} />

      {/* Retro Game Top Status HUD */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="retro-status-hud"
        style={{
          gap: 'clamp(6px, 1.8vw, 12px)',
          padding: '6px clamp(10px, 2.5vw, 16px)',
          background: '#FFF8FA',
          border: '3px solid var(--retro-dark)',
          boxShadow: '3px 3px 0px var(--retro-dark)',
          borderRadius: '999px',
          fontSize: 'clamp(0.7rem, 2.4vw, 0.82rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-pixel), monospace',
          color: 'var(--retro-dark)',
          maxWidth: 'calc(100vw - 32px)',
          flexWrap: 'nowrap',
        }}
      >
        <span style={{ color: '#E74C6F' }}>
          HP 100/100
        </span>
        <span style={{ color: '#C24D6F' }}>|</span>
        <span style={{ color: '#D97706' }}>LV. 24</span>
        <span style={{ color: '#C24D6F' }}>|</span>
        <span style={{ color: '#5C3A4D' }}>
          {isAccepted ? 'STAGE 2: BIRTHDAY WISH' : 'STAGE 1: THE INVITATION'}
        </span>
      </motion.header>

      {/* Main Quest Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            /* ============================================================
               STAGE 1: Playful Yes / No Game Interface
               ============================================================ */
            <motion.div
              key="game-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{ width: '100%' }}
            >
              {/* Nintendo RPG Quest Dialog Box */}
              <div
                className="nintendo-dialog-box"
                style={{
                  padding: '32px 28px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)',
                }}
              >
                {/* Character Header / Avatar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '20px',
                    paddingBottom: '14px',
                    borderBottom: '2px dashed rgba(62, 32, 46, 0.2)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #FFE4E8 0%, #FFCCD5 100%)',
                      border: '3px solid var(--retro-dark)',
                      boxShadow: '2px 2px 0px var(--retro-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-pixel), monospace',
                      fontWeight: 700,
                      color: '#E74C6F',
                    }}
                  >
                    PK
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-pixel), monospace',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#E74C6F',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      SPECIAL QUEST
                    </div>
                    <h1
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-retro-title), var(--font-pixel), sans-serif',
                        fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                        fontWeight: 700,
                        color: 'var(--retro-dark)',
                        lineHeight: 1.3,
                      }}
                    >
                      PINKIE'S BIRTHDAY INVITATION
                    </h1>
                  </div>
                </div>

                {/* RPG Dialogue Text */}
                <motion.div
                  key={noCount}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                      lineHeight: '1.7',
                      color: '#4A2838',
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {currentDialog}
                  </p>
                </motion.div>

                {/* Subtle Prompt Indicator */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-pixel), monospace',
                    color: '#9E5874',
                  }}
                >
                  <span>Nhấn để chọn</span>
                </div>
              </div>

              {/* Action Buttons: Playful YES and NO Button Tricks */}
              <div
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  minHeight: '140px',
                  position: 'relative',
                  flexWrap: 'wrap',
                }}
              >
                {/* YES BUTTON (Starts small, progressively increases in size) */}
                <motion.button
                  onClick={handleYesClick}
                  className="nintendo-btn nintendo-btn-yes"
                  animate={{
                    scale: yesScale,
                    boxShadow:
                      noCount > 0
                        ? [
                            '4px 4px 0px #3E202E, 0 0 16px rgba(255, 117, 143, 0.4)',
                            '4px 4px 0px #3E202E, 0 0 28px rgba(255, 117, 143, 0.8)',
                            '4px 4px 0px #3E202E, 0 0 16px rgba(255, 117, 143, 0.4)',
                          ]
                        : '4px 4px 0px #3E202E',
                  }}
                  transition={{
                    scale: { type: 'spring', damping: 14, stiffness: 280 },
                    boxShadow: { repeat: Infinity, duration: 1.5 },
                  }}
                  style={{
                    padding: 'clamp(10px, 2.8vw, 14px) clamp(18px, 4.5vw, 30px)',
                    fontSize: 'clamp(0.92rem, 3vw, 1.05rem)',
                    zIndex: 10,
                    maxWidth: 'min(88vw, 420px)',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                  aria-label="Đồng ý đi chơi sinh nhật"
                >
                  ĐỒNG Ý (YES)
                </motion.button>

                {/* NO BUTTON (Starts significant, progressively reduces in size) */}
                {noScale > 0.08 && (
                  <motion.button
                    onClick={handleNoClick}
                    className="nintendo-btn nintendo-btn-no"
                    animate={{
                      scale: noScale,
                      x: isWiggling ? [-6, 6, -6, 6, 0] : 0,
                    }}
                    transition={{
                      scale: { type: 'spring', damping: 16, stiffness: 320 },
                      x: { duration: 0.25 },
                    }}
                    style={{
                      padding: 'clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 28px)',
                      fontSize: 'clamp(0.85rem, 2.8vw, 1rem)',
                      zIndex: 5,
                      transformOrigin: 'center center',
                      maxWidth: '85vw',
                    }}
                    aria-label="Từ chối lời mời"
                  >
                    {currentNoLabel}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            /* ============================================================
               STAGE 2: Congrats Transition & Birthday Card with Wishes
               ============================================================ */
            <motion.div
              key="accepted-card"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 280 }}
              style={{ width: '100%', marginTop: '24px' }}
            >
              {/* Nintendo Congratulatory Dialogue / Birthday Card */}
              <div
                className="nintendo-dialog-box"
                style={{
                  padding: '36px 30px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8FA 100%)',
                  textAlign: 'center',
                }}
              >
                {/* Celebration Stamp */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #FFE066 0%, #FFCC00 100%)',
                    border: '2px solid var(--retro-dark)',
                    boxShadow: '2px 2px 0px var(--retro-dark)',
                    fontFamily: 'var(--font-pixel), monospace',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--retro-dark)',
                    marginBottom: '18px',
                  }}
                >
                  {birthdayWish.badge}
                </div>

                {/* Card Title */}
                <h2
                  style={{
                    margin: '0 0 16px',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    color: '#2C1820',
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  {birthdayWish.title}
                </h2>

                {/* Greeting */}
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: '#C24D6F',
                    fontWeight: 600,
                    marginBottom: '20px',
                  }}
                >
                  {birthdayWish.greeting}
                </div>

                {/* Message Paragraphs (Customizable by user in datePlan.ts) */}
                <div
                  style={{
                    textAlign: 'left',
                    background: 'rgba(255, 240, 245, 0.6)',
                    border: '2px dashed rgba(231, 111, 142, 0.35)',
                    borderRadius: '16px',
                    padding: '24px 22px',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {birthdayWish.messageParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        lineHeight: '1.75',
                        color: '#4A2838',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      {para}
                    </p>
                  ))}

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      color: '#C24D6F',
                      fontWeight: 600,
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                    }}
                  >
                    {birthdayWish.closingWish}
                  </p>
                </div>

                {/* Signature & Date */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 8px',
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    gap: '8px',
                    fontSize: '0.9rem',
                    color: '#8A5868',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-pixel), monospace' }}>
                    {birthdayWish.dateLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      color: '#E74C6F',
                      fontSize: '1.05rem',
                    }}
                  >
                    {birthdayWish.signature}
                  </span>
                </div>

                {/* Navigation Button: "Let's have a date then" */}
                <Link
                  href="/2026/date/"
                  className="nintendo-btn nintendo-btn-yes"
                  style={{
                    padding: '16px 36px',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    textDecoration: 'none',
                    borderRadius: '16px',
                    gap: '10px',
                  }}
                >
                  <span>Let's have a date then</span>
                  <span style={{ fontFamily: 'var(--font-pixel), monospace' }}>→</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
