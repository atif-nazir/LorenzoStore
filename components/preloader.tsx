"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = "unset"
      }, 800)
    }, 3500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#ccff00] text-black transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <div className="relative flex items-baseline text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter animate-fade-in">
          <span className="font-brier ml-1">LORENZO</span>
          <span className="absolute -top-4 md:-top-8 left-1/2 font-brier text-2xl md:text-4xl animate-pop-in">n</span>
        </div>
      </div>

      <div className="absolute bottom-12 font-oswald text-sm md:text-base font-bold tracking-widest uppercase animate-fade-in-delayed">
        HELMET STORE
      </div>
    </div>
  )
}
