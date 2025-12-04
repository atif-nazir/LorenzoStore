"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { helmets } from "@/lib/helmets"

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

const years = [...new Set(helmets.map((h) => h.year))].sort((a, b) => Number(b) - Number(a))
const brands = [...new Set(helmets.map((h) => h.brand))]

export default function ShopPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const filteredHelmets = helmets.filter((h) => {
    if (selectedYear && h.year !== selectedYear) return false
    if (selectedBrand && h.brand !== selectedBrand) return false
    return true
  })

  return (
    <main className="relative min-h-screen bg-lorenzo-dark">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-lorenzo-accent transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">Back to Home</span>
          </Link>

          {/* Page title */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white">
              SHOP
              <span className="text-lorenzo-accent font-brier block">HELMETS</span>
            </h1>
            <p className="text-lg text-white/60 mt-6 max-w-2xl">
              Browse our complete collection of premium motocross helmets. For purchasing, select a helmet and fill out
              our inquiry form.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-12">
            {/* Year filter */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase mb-3">Filter by Year</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear(null)}
                  className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
                    selectedYear === null ? "bg-lorenzo-accent text-black" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  All
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
                      selectedYear === year
                        ? "bg-lorenzo-accent text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand filter */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase mb-3">Filter by Brand</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
                    selectedBrand === null ? "bg-lorenzo-accent text-black" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  All
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
                      selectedBrand === brand
                        ? "bg-lorenzo-accent text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-white/40 text-sm mb-6">{filteredHelmets.length} helmets found</p>

          {/* Helmet grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHelmets.map((helmet, index) => (
              <Link href={`/product/${helmet.id}`} key={helmet.id}>
                <div
                  className="group relative bg-black/50 rounded-2xl overflow-hidden border-2 border-white/10 hover:border-lorenzo-accent hover:scale-[1.02] transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-square relative p-8">
                    <Image
                      src={helmet.image || "/placeholder.svg"}
                      alt={helmet.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <span className="text-xs font-bold text-white/50 uppercase">{helmet.brand}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{helmet.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-2xl font-black text-lorenzo-accent">${helmet.price}</p>
                      <span className="text-xs text-white/40">{helmet.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
