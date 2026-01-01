'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminAuth } from '@/lib/contexts/AdminAuthContext'
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Mail,
  Handshake,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Contacts', href: '/admin/contacts', icon: Mail },
  { name: 'Business Enquiries', href: '/admin/business-enquiries', icon: Handshake },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAdminAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-black/70"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-sm border-r border-white/10 z-40 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-xl font-black text-white uppercase">Lorenzo Store</h1>
            <p className="text-white/60 text-xs mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-lorenzo-accent/20 text-lorenzo-accent border border-lorenzo-accent/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-white/10 space-y-4">
            {user && (
              <div className="px-4 py-2 bg-white/5 rounded-lg">
                <p className="text-white/60 text-xs uppercase">Logged in as</p>
                <p className="text-white font-medium text-sm mt-1">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

