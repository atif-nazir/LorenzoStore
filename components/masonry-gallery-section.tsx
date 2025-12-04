"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"

const galleryImages = [
  {
    src: "/images/lorenzo-piloto1.png",
    alt: "Lorenzo racing action 1",
    label: "RACE DAY, 2024",
  },
  {
    src: "/images/lorenzo-podio2.png",
    alt: "Lorenzo podium celebration",
    label: "CHAMPIONSHIP, 2024",
  },
  {
    src: "/images/lofan/lofan.jpg",
    alt: "Lorenzo fan moment",
    label: "FAN MEET, 2024",
  },
  {
    src: "/images/lorenzo-podio3.png",
    alt: "Lorenzo victory",
    label: "VICTORY, 2023",
  },
]

export default function MasonryGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate progress (0 to 1) based on how far through the section we've scrolled
      const scrolled = -rect.top
      const totalScrollable = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      setScrollProgress(progress)

      // Update active index based on horizontal progress
      const horizontalProgress = Math.min(progress / 0.5, 1)
      const newActiveIndex = Math.min(Math.floor(horizontalProgress * galleryImages.length), galleryImages.length - 1)
      setActiveIndex(newActiveIndex)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // First 50% of scroll = horizontal movement (0 to -200vw)
  // Last 50% of scroll = vertical movement (0 to -50vh)
  const horizontalProgress = Math.min(scrollProgress / 0.5, 1)
  const verticalProgress = Math.max(0, (scrollProgress - 0.5) / 0.5)

  const xTranslate = horizontalProgress * -200
  const yTranslate = verticalProgress * -50

  // Background color transition
  const getBgColor = () => {
    if (scrollProgress < 0.3) return "#282c20"
    if (scrollProgress < 0.6) return "#999999"
    return "#ffffff"
  }

  return (
    <section ref={sectionRef} id="masonry-gallery" className="relative" style={{ height: "300vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: getBgColor() }}
      >
        <div
          className="absolute top-1/2 left-0 flex items-center gap-8 px-[10vw] py-20 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${xTranslate}vw, calc(-50% + ${yTranslate}vh))`,
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image label */}
              <p
                className={`absolute -top-8 left-0 text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                  scrollProgress > 0.5 ? "text-black/50" : "text-white/50"
                }`}
              >
                {image.label}
              </p>

              <div
                className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 
                  ${index === 0 ? "w-[60vw] h-[70vh]" : index === 1 ? "w-[40vw] h-[50vh]" : index === 2 ? "w-[35vw] h-[60vh]" : "w-[50vw] h-[55vh]"}
                  border-2 border-transparent hover:border-lorenzo-accent/50`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="60vw"
                  quality={95}
                />
              </div>
            </div>
          ))}

          {/* Quote at the end */}
          <div className="flex-shrink-0 w-[50vw] flex flex-col justify-center px-8 animate-fade-in">
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-black/70 italic leading-relaxed max-w-lg"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Since I was 7 years old and had my first experience with motocross, I've worked tirelessly to make that
              dream come true.
            </p>
            <div className="mt-6">
              <p className="text-4xl text-lorenzo-dark" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
                Lorenzo
              </p>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index <= activeIndex
                  ? scrollProgress > 0.5
                    ? "bg-lorenzo-dark"
                    : "bg-white"
                  : scrollProgress > 0.5
                    ? "bg-black/20"
                    : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
