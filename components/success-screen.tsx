"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface SuccessScreenProps {
  title: string
  message: string
  buttonText: string
  buttonHref: string
}

export default function SuccessScreen({ title, message, buttonText, buttonHref }: SuccessScreenProps) {
  return (
    <div className="text-center py-20 animate-fade-in">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="w-24 h-24 bg-lorenzo-accent rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-12 h-12 text-black" />
        </div>
        <h2 className="text-4xl font-black text-white uppercase mb-6">{title}</h2>
        <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">{message}</p>
        <Link href={buttonHref}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-lorenzo-accent text-black font-bold uppercase rounded-lg"
          >
            {buttonText}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

