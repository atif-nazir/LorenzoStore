"use client"

import { useEffect, useRef } from "react"

interface Line {
  startX: number
  startY: number
  controlX1: number
  controlY1: number
  controlX2: number
  controlY2: number
  endX: number
  endY: number
  progress: number
  speed: number
  opacity: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const linesRef = useRef<Line[]>([])
  const scrollRef = useRef(0)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    const createLines = () => {
      const lines: Line[] = []
      const numLines = 6

      for (let i = 0; i < numLines; i++) {
        const startY = (canvas.height / numLines) * i + Math.random() * 200
        lines.push({
          startX: -100,
          startY: startY,
          controlX1: canvas.width * 0.25 + Math.random() * 200 - 100,
          controlY1: startY + Math.random() * 300 - 150,
          controlX2: canvas.width * 0.75 + Math.random() * 200 - 100,
          controlY2: startY + Math.random() * 300 - 150,
          endX: canvas.width + 100,
          endY: startY + Math.random() * 200 - 100,
          progress: 0,
          speed: 0.001 + Math.random() * 0.001,
          opacity: 0.08 + Math.random() * 0.08,
        })
      }
      linesRef.current = lines
    }

    const drawLine = (line: Line, scrollOffset: number) => {
      if (!ctx) return

      const offsetY = scrollOffset * 0.1

      ctx.beginPath()
      ctx.moveTo(line.startX, line.startY + offsetY)
      ctx.bezierCurveTo(
        line.controlX1,
        line.controlY1 + offsetY * 0.5,
        line.controlX2,
        line.controlY2 + offsetY * 0.8,
        line.endX,
        line.endY + offsetY,
      )

      ctx.strokeStyle = `rgba(180, 200, 120, ${line.opacity})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      linesRef.current.forEach((line) => {
        drawLine(line, scrollRef.current)
        line.progress += line.speed
        if (line.progress > 1) line.progress = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    const handleResize = () => {
      resizeCanvas()
      createLines()
    }

    resizeCanvas()
    createLines()
    animate()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />
}
