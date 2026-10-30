'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingPetals from '@/app/components/FloatingPetals'
import BackgroundTexture from '@/app/components/BackgroundTexture'
import { DATE_PLAN_2026 } from '@/app/data/2026/datePlan'
import AlbumModal from './AlbumModal'

export default function DateAnnouncement() {
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false)
  const { restaurant, albumQuest } = DATE_PLAN_2026

  return (
    <div
      className="sakura-pixel-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '80px 20px 80px',
        overflowX: 'hidden',
        fontFamily: 'var(--font-inter), sans-serif',
      }}
    >
      <BackgroundTexture sparkleCount={8} />
      <FloatingPetals count={6} />

      {/* Top Header Navigation HUD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '960px',
          margin: '0 auto 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Back Navigation Button */}
        <Link
          href="/"
          className="nintendo-btn nintendo-btn-no"
          style={{
            padding: '8px 18px',
            fontSize: '0.85rem',
            textDecoration: 'none',
            borderRadius: '999px',
            gap: '8px',
          }}
        >
          <span>[B] Quay lại</span>
        </Link>

        {/* Quest Status Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: '#FFF8FA',
            border: '2px solid var(--retro-dark)',
            boxShadow: '2px 2px 0px var(--retro-dark)',
            borderRadius: '999px',
            fontFamily: 'var(--font-pixel), monospace',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#E74C6F',
          }}
        >
          <span>STAGE 2: THE BIRTHDAY DATE</span>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ========================================================
            CARD 1: Restaurant Announcement & Google Maps
            ======================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="nintendo-dialog-box"
          style={{
            padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 28px)',
            background: '#FFFFFF',
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '18px',
              borderBottom: '2px dashed rgba(62, 32, 46, 0.2)',
              marginBottom: '24px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#E74C6F',
                  letterSpacing: '0.06em',
                }}
              >
                {restaurant.statusBadge}
              </div>
              <h1
                style={{
                  margin: '4px 0 0',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#2C1820',
                  lineHeight: 1.25,
                }}
              >
                {restaurant.name}
              </h1>
            </div>

            <div
              style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #FFE066 0%, #FFCC00 100%)',
                border: '2px solid var(--retro-dark)',
                boxShadow: '2px 2px 0px var(--retro-dark)',
                borderRadius: '8px',
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--retro-dark)',
              }}
            >
              DINNER INVITATION
            </div>
          </div>

          {/* Details Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {/* Time & Date */}
            <div
              style={{
                background: '#FFF5F8',
                border: '2px solid rgba(231, 111, 142, 0.3)',
                borderRadius: '12px',
                padding: '16px 18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '0.75rem',
                  color: '#E74C6F',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                THỜI GIAN
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C1820',
                }}
              >
                {restaurant.dateTime}
              </div>
            </div>

            {/* Address */}
            <div
              style={{
                background: '#FFF5F8',
                border: '2px solid rgba(231, 111, 142, 0.3)',
                borderRadius: '12px',
                padding: '16px 18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '0.75rem',
                  color: '#E74C6F',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                ĐỊA ĐIỂM
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C1820',
                  lineHeight: '1.4',
                }}
              >
                {restaurant.address}
              </div>
            </div>
          </div>

          {/* Note for Her */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF9FA 0%, #FFF0F5 100%)',
              border: '2px dashed #E76F8E',
              borderRadius: '16px',
              padding: '20px 22px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: '#C24D6F',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              Lời nhắn gửi cho buổi tối hôm ấy
            </div>
            <p
              style={{
                margin: '0 0 10px',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#4A2838',
              }}
            >
              {restaurant.noteForHer}
            </p>
            <div
              style={{
                fontSize: '0.9rem',
                color: '#8A5868',
                fontStyle: 'italic',
              }}
            >
              {restaurant.dressCode}
            </div>
          </div>

          {/* Google Maps Embed & External Link */}
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#3E202E',
                }}
              >
                {restaurant.address.toLowerCase().includes('determined')
                  ? 'BẢN ĐỒ ĐỊA CHỈ'
                  : 'BẢN ĐỒ ĐỊA CHỈ'}
              </span>

              {/* Action Button: Open in Google Maps */}
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nintendo-btn nintendo-btn-gold"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  borderRadius: '10px',
                }}
              >
                {restaurant.address.toLowerCase().includes('determined')
                  ? 'Mở trong Google Maps'
                  : 'Mở trong Google Maps'}
              </a>
            </div>

            {/* Mystery Box notice if location is To Be Determined */}
            {restaurant.address.toLowerCase().includes('determined') && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  marginBottom: '16px',
                  background: '#FFF9EB',
                  border: '2px dashed #E2A03F',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: '#8A5800',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-pixel), monospace',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#D97706',
                    flexShrink: 0,
                  }}
                >
                  [ ? ]
                </span>
                <span>
                  To Be Determined. Địa chỉ chính xác sẽ được tiết lộ riêng cho cậu trước buổi hẹn!
                </span>
              </div>
            )}

            {/* Embedded Google Maps View */}
            <div
              style={{
                width: '100%',
                height: 'clamp(230px, 36vh, 340px)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '3px solid var(--retro-dark)',
                boxShadow: '3px 3px 0px var(--retro-dark)',
              }}
            >
              <iframe
                title="Bản đồ vị trí nhà hàng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={restaurant.googleMapsEmbedUrl}
              />
            </div>
          </div>
        </motion.section>

        {/* ========================================================
            CARD 2: Nintendo 2D Game Album Inventory Item
            ======================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="nintendo-dialog-box"
          style={{
            padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3.5vw, 28px)',
            background: 'linear-gradient(135deg, #FFF8FA 0%, #FFEBF0 100%)',
            border: '4px solid var(--retro-dark)',
            boxShadow: '6px 6px 0px var(--retro-dark)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {/* Retro Item Icon Box */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FFE066 0%, #FFCC00 100%)',
                border: '3px solid var(--retro-dark)',
                boxShadow: '3px 3px 0px var(--retro-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontFamily: 'var(--font-pixel), monospace',
                fontWeight: 700,
                color: 'var(--retro-dark)',
                flexShrink: 0,
              }}
            >
              ALBUM
            </div>

            {/* Item Title & Subheader Text */}
            <div
              style={{
                flex: 1,
                minWidth: '240px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#E74C6F',
                  letterSpacing: '0.05em',
                  marginBottom: '4px',
                }}
              >
                {albumQuest.badge}
              </div>
              <h2
                style={{
                  margin: '0 0 6px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                  fontWeight: 700,
                  color: '#2C1820',
                  lineHeight: 1.3,
                }}
              >
                {albumQuest.itemName}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  color: '#6E4555',
                  lineHeight: 1.5,
                }}
              >
                {albumQuest.description}
              </p>
            </div>

            {/* Inspect / Open Album Button */}
            <button
              onClick={() => setIsAlbumOpen(true)}
              className="nintendo-btn nintendo-btn-yes"
              style={{
                padding: '14px 28px',
                fontSize: '0.95rem',
                borderRadius: '12px',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <span>{albumQuest.inspectButtonLabel}</span>
            </button>
          </div>
        </motion.section>
      </div>

      {/* Darkened Background Album Overlay Modal with Bento Grid */}
      <AlbumModal isOpen={isAlbumOpen} onClose={() => setIsAlbumOpen(false)} />
    </div>
  )
}
