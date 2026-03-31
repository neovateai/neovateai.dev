'use client'

import { useRef } from 'react'

export default function PronounceNeovate() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return (
    <>
      <button
        style={{
          border: 'none',
          padding: '3px',
          borderRadius: '4px',
          verticalAlign: 'bottom',
          cursor: 'pointer',
          background: 'transparent'
        }}
        aria-label="pronounce"
        onClick={() => audioRef.current?.play()}
      >
        <svg style={{ height: '2em', width: '2em' }}>
          <use href="/voice.svg?no-inline#voice" />
        </svg>
      </button>

      <audio ref={audioRef} src="/neovate.mp3" />
    </>
  )
}
