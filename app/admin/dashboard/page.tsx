'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { apiClient } from '@/lib/api/client'
import { salesApi } from '@/lib/api/sales'
import { LayoutDashboard, MessageSquare, Mail, Handshake, ShoppingBag, DollarSign } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardStats {
  products: number
  inquiries: number
  contacts: number
  businessEnquiries: number
  pendingInquiries: number
  pendingContacts: number
  pendingBusinessEnquiries: number
  totalSales: number
  monthlySales: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    inquiries: 0,
    contacts: 0,
    businessEnquiries: 0,
    pendingInquiries: 0,
    pendingContacts: 0,
    pendingBusinessEnquiries: 0,
    totalSales: 0,
    monthlySales: 0,
  })
  const [loading, setLoading] = useState(true)
  const [salesData, setSalesData] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, inquiriesRes, contactsRes, businessEnquiriesRes] = await Promise.all([
        apiClient.get('/products'),
        apiClient.get('/inquiries'),
        apiClient.get('/contacts'),
        apiClient.get('/business-enquiries'),
      ])

      const inquiries = (inquiriesRes as any).data || []
      const contacts = (contactsRes as any).data || []
      const businessEnquiries = (businessEnquiriesRes as any).data || []

      // Try to fetch sales stats, but don't fail if route doesn't exist yet
      let salesStats = { totalSales: 0, monthlySales: [], dailySales: [] }
      try {
        const salesStatsRes = await salesApi.getStats()
        salesStats = (salesStatsRes as any)?.data || salesStatsRes || salesStats
      } catch (salesError) {
        console.warn('Sales API not available yet:', salesError)
        // Continue with zero sales if route doesn't exist
      }

      // Get total sales from stats
      const totalSales = salesStats.totalSales || 0
      
      // Calculate monthly sales (current month)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const currentMonthSales = salesStats.monthlySales?.find(
        (m: any) => m._id.year === currentYear && m._id.month === currentMonth + 1
      )?.total || 0

      setStats({
        products: (productsRes as any).count || 0,
        inquiries: inquiries.length,
        contacts: contacts.length,
        businessEnquiries: businessEnquiries.length,
        pendingInquiries: inquiries.filter((i: any) => i.status === 'pending').length,
        pendingContacts: contacts.filter((c: any) => c.status === 'pending').length,
        pendingBusinessEnquiries: businessEnquiries.filter((be: any) => be.status === 'pending').length,
        totalSales,
        monthlySales: currentMonthSales,
      })

      // Format daily sales data for chart
      const dailySales = salesStats.dailySales || []
      const today = new Date()
      const last7DaysData: any[] = []
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dayData = dailySales.find(
          (d: any) =>
            d._id.year === date.getFullYear() &&
            d._id.month === date.getMonth() + 1 &&
            d._id.day === date.getDate()
        )
        
        last7DaysData.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          sales: dayData?.total || 0,
          inquiries: dayData?.count || 0,
        })
      }
      setSalesData(last7DaysData)

      // Format monthly sales data for chart
      const monthlySalesData = salesStats.monthlySales || []
      const formattedMonthlyData = monthlySalesData.map((m: any) => {
        const date = new Date(m._id.year, m._id.month - 1)
        return {
          name: date.toLocaleDateString('en-US', { month: 'short' }),
          sales: m.total || 0,
        }
      })
      setMonthlyData(formattedMonthlyData)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: ShoppingBag,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Monthly Sales',
      value: `$${stats.monthlySales.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      pending: stats.pendingInquiries,
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      title: 'Contacts',
      value: stats.contacts,
      pending: stats.pendingContacts,
      icon: Mail,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
    },
    {
      title: 'Business Enquiries',
      value: stats.businessEnquiries,
      pending: stats.pendingBusinessEnquiries,
      icon: Handshake,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
  ]

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-lorenzo-accent" />
                Dashboard
              </h1>
              <p className="text-white/60">Overview of your store and inquiries</p>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {statCards.map((card) => {
                    const Icon = card.icon
                    return (
                      <div
                        key={card.title}
                        className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${card.bgColor}`}>
                            <Icon className={`w-6 h-6 ${card.color}`} />
                          </div>
                        </div>
                        <h3 className="text-white/60 text-sm uppercase font-bold mb-1">{card.title}</h3>
                        <p className="text-3xl font-black text-white mb-1">{card.value}</p>
                        {card.pending !== undefined && card.pending > 0 && (
                          <p className="text-sm text-yellow-400 font-medium">
                            {card.pending} pending
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sales Chart - Last 7 Days */}
                  <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Sales - Last 7 Days</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#00ff88"
                          strokeWidth={2}
                          name="Sales ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Monthly Sales Chart */}
                  <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Monthly Sales - Last 6 Months</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="sales" fill="#00ff88" name="Sales ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Sales vs Inquiries */}
                  <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6">Sales & Inquiries - Last 7 Days</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis yAxisId="left" stroke="#ffffff60" />
                        <YAxis yAxisId="right" orientation="right" stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="sales"
                          stroke="#00ff88"
                          strokeWidth={2}
                          name="Sales ($)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="inquiries"
                          stroke="#a855f7"
                          strokeWidth={2}
                          name="Inquiries"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  )
}
