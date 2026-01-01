"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { ArrowLeft, Building2, Users, Truck, Handshake, Check, Send } from "lucide-react"
import Header from "@/components/header"
import { AnimatedBackground } from "@/components/background"
import { businessEnquiryApi } from "@/lib/api/businessEnquiries"

const enquiryTypes = [
  {
    id: "wholesale",
    icon: Building2,
    title: "Wholesale",
    description: "Bulk orders for retailers and distributors",
  },
  {
    id: "sponsorship",
    icon: Users,
    title: "Sponsorship",
    description: "Partnership opportunities for teams and riders",
  },
  {
    id: "distribution",
    icon: Truck,
    title: "Distribution",
    description: "Become an authorized distributor in your region",
  },
  {
    id: "partnership",
    icon: Handshake,
    title: "Partnership",
    description: "Collaborate with Lorenzo Helmets on projects",
  },
]

export default function EnquiriesPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedType) {
      toast.error("Please select an enquiry type")
      return
    }

    setIsSubmitting(true)

    try {
      await businessEnquiryApi.create({
        enquiryType: selectedType as 'wholesale' | 'sponsorship' | 'distribution' | 'partnership',
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        message: formData.message,
      })
      
      setSubmitted(true)
      toast.success("Business enquiry submitted successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6">Enquiry Received</h2>
              <p className="text-white/60 text-lg mb-8">
                Thank you for your interest in partnering with Lorenzo Helmets. Our business development team will
                review your enquiry and get back to you within 2-3 business days.
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
        <div className="max-w-5xl mx-auto">
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
              BUSINESS
              <span className="text-lorenzo-accent font-brier block">ENQUIRIES</span>
            </h1>
            <p className="text-lg text-white/60 mt-6 max-w-2xl">
              Interested in partnering with Lorenzo Helmets? Whether you're a retailer, distributor, racing team, or
              looking for sponsorship opportunities, we'd love to hear from you.
            </p>
          </motion.div>

          {/* Enquiry Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white uppercase mb-6">Select Enquiry Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {enquiryTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    selectedType === type.id
                      ? "bg-lorenzo-accent/10 border-lorenzo-accent"
                      : "bg-black/30 border-white/10 hover:border-white/30"
                  }`}
                >
                  <type.icon
                    className={`w-8 h-8 mb-4 ${selectedType === type.id ? "text-lorenzo-accent" : "text-white/60"}`}
                  />
                  <h3
                    className={`font-bold text-lg uppercase ${selectedType === type.id ? "text-lorenzo-accent" : "text-white"}`}
                  >
                    {type.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-2">{type.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/30 rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white uppercase mb-8">Contact Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="business@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white/60 uppercase mb-2">Country / Region *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                  placeholder="Where are you based?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                  Tell Us About Your Business *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors resize-none"
                  placeholder="Please describe your business, your interest in Lorenzo Helmets, and any specific requirements or questions you may have..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting || !selectedType ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || !selectedType ? 1 : 0.98 }}
                disabled={!selectedType || isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </motion.button>
            </form>

            <p className="text-white/40 text-sm mt-6 text-center">
              Our team typically responds within 2-3 business days.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
