"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { helmets } from "@/lib/helmets"

const years = [...new Set(helmets.map((h) => h.year))].sort((a, b) => Number(b) - Number(a))

export default function HelmetHall() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const filteredHelmets = selectedYear ? helmets.filter((h) => h.year === selectedYear) : helmets

  return (
    <section id="helmets" className="relative min-h-screen text-white py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
            <span className="text-white">BEST SELLING</span>
            <br />
            <span className="text-lorenzo-accent font-brier text-6xl md:text-8xl">HELMETS</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mt-6 max-w-2xl">
            Shop our collection of top-rated motocross helmets from leading brands including Fox Racing, Bell,
            Alpinestars, and more.
          </p>
        </div>

        {/* Year filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-5 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 ${
              selectedYear === null ? "bg-lorenzo-accent text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 ${
                selectedYear === year ? "bg-lorenzo-accent text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Helmet grid - no hover popup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {filteredHelmets.map((helmet, index) => (
            <Link href={`/product/${helmet.id}`} key={helmet.id}>
              <div className="group relative cursor-pointer" style={{ animationDelay: `${index * 30}ms` }}>
                <div
                  className="relative aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] 
                             border-2 border-gray-800 
                             group-hover:border-[#CFFF04] 
                             group-hover:shadow-2xl 
                             group-hover:shadow-[#CFFF04]/20 
                             group-hover:scale-[1.03]
                             transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src={helmet.image || "/placeholder.svg"}
                      alt={helmet.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                    />
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs font-bold text-white/70">
                      {helmet.brand}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm md:text-base font-bold text-white group-hover:text-white transition-colors duration-300 truncate">
                      {helmet.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg md:text-xl font-black text-[#CFFF04]">${helmet.price}</p>
                      <p className="text-xs font-bold text-white/50">{helmet.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link href="/shop">
            <button className="px-8 py-4 bg-lorenzo-accent text-black font-bold uppercase rounded-lg hover:bg-white hover:scale-105 transition-all">
              View All Helmets
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
