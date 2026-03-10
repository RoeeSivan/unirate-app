import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Runi Course Ratings'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 160,
            height: 160,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 32,
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 120, fontWeight: 800, color: 'white' }}>U</span>
        </div>
        <span style={{ fontSize: 56, fontWeight: 700, color: 'white' }}>
          Runi Course Ratings
        </span>
        <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.8)', marginTop: 16 }}>
          Rate and review courses at Reichman University
        </span>
      </div>
    ),
    { ...size }
  )
}
