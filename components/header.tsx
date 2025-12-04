"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoColor, setLogoColor] = useState<"white" | "dark">("dark")

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll >= 300)

      let newColor: "white" | "dark" = "dark"

      if (currentScroll > 2) {
        newColor = "white"
      }

      const headerOffset = 100

      const masonry = document.getElementById("masonry-gallery")
      if (masonry) {
        const rect = masonry.getBoundingClientRect()
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          const progress = (headerOffset - rect.top) / rect.height
          if (progress > 0.65) {
            newColor = "dark"
          }
        }
      }

      const helmets = document.getElementById("helmets")
      if (helmets) {
        const rect = helmets.getBoundingClientRect()
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          newColor = "white"
        }
      }

      const social = document.getElementById("social-section")
      if (social) {
        const rect = social.getBoundingClientRect()
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          newColor = "dark"
        }
      }

      setLogoColor(newColor)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "GALLERY", href: "/#masonry-gallery", isAnchor: true },
    { name: "CONTACT", href: "/contact" },
    { name: "BUSINESS ENQUIRIES", href: "/enquiries" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && href.startsWith("/#")) {
      e.preventDefault()
      setMenuOpen(false)
      const targetId = href.replace("/#", "")

      // If we're not on the home page, navigate first
      if (window.location.pathname !== "/") {
        window.location.href = href
        return
      }

      // Smooth scroll to the section
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <div className="flex flex-col justify-center items-start mix-blend-difference">
            <Link href="/">
              <h1
                className={`font-brier text-4xl leading-none mt-1 tracking-tight font-bold transition-colors duration-300 ${
                  logoColor === "white" ? "text-white" : "text-lorenzo-dark"
                }`}
              >
                LORENZO
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3 mix-blend-difference">
            <Link href="/shop">
              <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-lorenzo-accent text-black font-bold text-sm rounded-lg hover:bg-lorenzo-accent/90 hover:scale-105 transition-all">
                <ShoppingBagIcon className="w-4 h-4" />
                STORE
              </div>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-lorenzo-dark/80 border border-white/30 hover:bg-lorenzo-dark hover:scale-110 rounded-lg transition-all text-white px-3 py-2.5"
              aria-label="Menu"
            >
              {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-lorenzo-dark/95 backdrop-blur-xl z-40 flex items-center justify-center transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <nav className="text-center">
          <ul className="space-y-6 text-4xl md:text-6xl font-black uppercase text-white">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                className={`transition-all duration-300 ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: menuOpen ? `${index * 100}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className="inline-block hover:text-lorenzo-accent transition-colors duration-300 hover:scale-110 transform"
                  onClick={(e) => handleNavClick(e, item.href, (item as any).isAnchor)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-12 flex justify-center gap-6 transition-all duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            {["INSTAGRAM", "TIKTOK", "YOUTUBE"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm font-bold text-white/60 hover:text-lorenzo-accent hover:scale-110 transition-all"
              >
                {social}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
