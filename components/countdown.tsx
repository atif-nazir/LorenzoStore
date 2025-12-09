"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function RaceDayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to next product launch (simulated - 14 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 14)
    targetDate.setHours(10, 0, 0, 0)

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden relative py-20 md:py-32 bg-lorenzo-dark">
      <div className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
        {/* Countdown Numbers */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-4 relative z-20">
          <TimeUnit value={timeLeft.days} label="D" />
          <TimeUnit value={timeLeft.hours} label="H" />
          <TimeUnit value={timeLeft.minutes} label="M" />
          <TimeUnit value={timeLeft.seconds} label="S" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        >
          <div className="text-center -rotate-6">
            <p
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-lorenzo-accent drop-shadow-2xl"
              style={{ fontFamily: "var(--font-alex-brush), cursive" }}
            >
              New Drop
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-row items-baseline">
      <span className="font-oswald font-bold text-[5rem] md:text-[8rem] lg:text-[12rem] text-[#dde1d2] leading-none tracking-tighter tabular-nums uppercase stretch-125">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="font-oswald font-bold text-[5rem] md:text-[8rem] lg:text-[12rem] text-[#535450] leading-none tracking-tighter uppercase stretch-125 ml-1">
        {label}
      </span>
    </div>
  )
}
