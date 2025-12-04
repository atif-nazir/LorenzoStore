"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Send, Check } from "lucide-react"
import Header from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="relative min-h-screen bg-lorenzo-dark">
        <AnimatedBackground />
        <Header />
        <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-24 h-24 bg-lorenzo-accent rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-black" />
              </div>
              <h2 className="text-4xl font-black text-white uppercase mb-6">Message Sent</h2>
              <p className="text-white/60 text-lg mb-8">
                Thank you for reaching out. We will get back to you as soon as possible.
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-lorenzo-accent text-black font-bold uppercase rounded-lg"
                >
                  Return Home
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-lorenzo-dark">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-lorenzo-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
              GET IN
              <span className="text-lorenzo-accent font-brier block">TOUCH</span>
            </h1>
            <p className="text-lg text-white/60 mt-6 max-w-xl">
              Have questions about our helmets or need assistance? We are here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lorenzo-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-lorenzo-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase">Email</h3>
                  <p className="text-white/60 mt-1">info@lorenzohelmets.com</p>
                  <p className="text-white/60">support@lorenzohelmets.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lorenzo-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-lorenzo-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase">Phone</h3>
                  <p className="text-white/60 mt-1">+1 (555) 123-4567</p>
                  <p className="text-white/40 text-sm">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lorenzo-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-lorenzo-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase">Location</h3>
                  <p className="text-white/60 mt-1">123 Helmet Street</p>
                  <p className="text-white/60">Miami, FL 33101</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  For business inquiries and partnerships, please visit our{" "}
                  <Link href="/enquiries" className="text-lorenzo-accent hover:underline">
                    Business Enquiries
                  </Link>{" "}
                  page.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-black/30 rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-white/60 uppercase mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
