"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
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

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

function InquiryForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const selectedHelmet = productId ? getHelmetById(productId) : null

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-lorenzo-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-black text-white uppercase mb-4">Thank You!</h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">
          We have received your inquiry. Our team will contact you within 24-48 hours with pricing and availability.
        </p>
        <Link href="/shop">
          <button className="px-8 py-4 bg-lorenzo-accent text-black font-bold uppercase rounded-lg hover:scale-105 transition-transform">
            Continue Shopping
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Selected Product */}
      <div className="animate-fade-in">
        <h2 className="text-2xl font-black text-white uppercase mb-6">Selected Product</h2>

        {selectedHelmet ? (
          <div className="bg-black/30 rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-video relative p-8">
              <Image
                src={selectedHelmet.image || "/placeholder.svg"}
                alt={selectedHelmet.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 border-t border-white/10">
              <span className="text-xs font-bold text-white/50 uppercase">{selectedHelmet.brand}</span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedHelmet.name}</h3>
              <p className="text-2xl font-black text-lorenzo-accent mt-2">${selectedHelmet.price}</p>
            </div>
          </div>
        ) : (
          <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
            <p className="text-white/60 mb-4">No product selected. Choose from our collection:</p>
            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {helmets.map((h) => (
                <Link href={`/inquiry?product=${h.id}`} key={h.id}>
                  <div className="bg-black/50 rounded-lg p-3 border border-white/10 hover:border-lorenzo-accent transition-all cursor-pointer">
                    <div className="aspect-square relative mb-2">
                      <Image src={h.image || "/placeholder.svg"} alt={h.name} fill className="object-contain" />
                    </div>
                    <p className="text-xs font-bold text-white truncate">{h.name}</p>
                    <p className="text-sm font-black text-lorenzo-accent">${h.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Form */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-2xl font-black text-white uppercase mb-6">Your Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white/60 uppercase mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/60 uppercase mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/60 uppercase mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/60 uppercase mb-2">Message (Optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors resize-none"
              placeholder="Any questions or specific requirements..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <SendIcon className="w-5 h-5" />
            Submit Inquiry
          </button>
        </form>

        <p className="text-white/40 text-sm mt-6">
          * We will contact you within 24-48 hours to discuss pricing, availability, and shipping options.
        </p>
      </div>
    </div>
  )
}

export default function InquiryPage() {
  return (
    <main className="relative min-h-screen bg-lorenzo-dark">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-white/60 hover:text-lorenzo-accent transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">Back to Shop</span>
          </Link>

          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
              PURCHASE
              <span className="text-lorenzo-accent font-brier block">INQUIRY</span>
            </h1>
            <p className="text-lg text-white/60 mt-4 max-w-xl">
              Fill out your details and we will contact you to complete your purchase.
            </p>
          </div>

          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <InquiryForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
