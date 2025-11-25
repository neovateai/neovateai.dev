'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface MousePosition {
  x: number
  y: number
}

interface MouseTrackerContextType {
  mousePosition: MousePosition
}

const MouseTrackerContext = createContext<MouseTrackerContextType>({
  mousePosition: { x: 0, y: 0 },
})

export const useMouseTracker = () => useContext(MouseTrackerContext)

export const MouseTracker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <MouseTrackerContext.Provider value={{ mousePosition }}>
      {children}
    </MouseTrackerContext.Provider>
  )
}

