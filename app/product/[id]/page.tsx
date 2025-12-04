"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { getHelmetById, helmets } from "@/lib/helmets"

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  )
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const helmet = getHelmetById(id)

  if (!helmet) {
    return (
      <main className="relative min-h-screen bg-lorenzo-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-lorenzo-accent hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-lorenzo-dark">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-white/60 hover:text-lorenzo-accent transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">Back to Shop</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square bg-black/30 rounded-3xl overflow-hidden border-2 border-white/10 animate-fade-in">
              <Image
                src={helmet.image || "/placeholder.svg"}
                alt={helmet.name}
                fill
                className="object-contain p-12"
                priority
              />
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 bg-lorenzo-accent text-black text-xs font-black uppercase rounded-full">
                  {helmet.category}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col animate-fade-in" style={{ animationDelay: "200ms" }}>
              <span className="text-lorenzo-accent text-sm font-bold uppercase tracking-wider">{helmet.brand}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase mt-2">{helmet.name}</h1>
              <p className="text-5xl font-black text-lorenzo-accent mt-6">${helmet.price}</p>
              <p className="text-white/40 text-sm mt-1">{helmet.year} Collection</p>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="text-lg font-bold text-white uppercase mb-4">Description</h3>
                <p className="text-white/70 leading-relaxed">{helmet.description}</p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="text-lg font-bold text-white uppercase mb-4">Features</h3>
                <ul className="space-y-3">
                  {helmet.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70">
                      <CheckIcon className="w-5 h-5 text-lorenzo-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA - Contact to purchase */}
              <div className="mt-10 p-6 bg-black/30 rounded-2xl border border-white/10">
                <p className="text-white/60 text-sm mb-4">
                  Interested in this helmet? Fill out our inquiry form and we will contact you with pricing and
                  availability.
                </p>
                <Link href={`/inquiry?product=${helmet.id}`}>
                  <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <ShoppingBagIcon className="w-5 h-5" />
                    Inquire to Purchase
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-24">
            <h2 className="text-3xl font-black text-white uppercase mb-8">More Helmets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {helmets
                .filter((h) => h.id !== helmet.id)
                .slice(0, 4)
                .map((h) => (
                  <Link href={`/product/${h.id}`} key={h.id}>
                    <div className="bg-black/30 rounded-xl overflow-hidden border border-white/10 hover:border-lorenzo-accent hover:scale-[1.03] transition-all">
                      <div className="aspect-square relative p-4">
                        <Image src={h.image || "/placeholder.svg"} alt={h.name} fill className="object-contain" />
                      </div>
                      <div className="p-3 border-t border-white/10">
                        <p className="text-sm font-bold text-white truncate">{h.name}</p>
                        <p className="text-lg font-black text-lorenzo-accent">${h.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
