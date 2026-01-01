'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Pagination from '@/components/admin/Pagination'
import { adminApi } from '@/lib/api/admin'
import { MessageSquare, Check, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  message?: string
  productId?: {
    name: string
    brand: string
  }
  status: 'pending' | 'contacted' | 'resolved'
  createdAt: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const data = await adminApi.getAllInquiries()
      setInquiries(data)
    } catch (error) {
      toast.error('Failed to fetch inquiries')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateInquiryStatus(id, status)
      toast.success('Status updated successfully')
      fetchInquiries()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = inquiries.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(inquiries.length / itemsPerPage)

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-lorenzo-accent" />
                Inquiries
              </h1>
              <p className="text-white/60">Manage product purchase inquiries</p>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-white/60 text-center py-12">No inquiries found</div>
            ) : (
              <>
                <div className="space-y-4">
                  {currentItems.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-xl font-bold text-white">{inquiry.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getStatusColor(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/60 mb-1">Email</p>
                            <p className="text-white">{inquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Phone</p>
                            <p className="text-white">{inquiry.phone}</p>
                          </div>
                          {inquiry.productId && (
                            <div className="md:col-span-2">
                              <p className="text-white/60 mb-1">Product</p>
                              <p className="text-white">
                                {inquiry.productId.brand} - {inquiry.productId.name}
                              </p>
                            </div>
                          )}
                          {inquiry.message && (
                            <div className="md:col-span-2">
                              <p className="text-white/60 mb-1">Message</p>
                              <p className="text-white">{inquiry.message}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-white/60 mb-1">Date</p>
                            <p className="text-white">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {inquiry.status !== 'pending' && (
                          <button
                            onClick={() => updateStatus(inquiry._id, 'pending')}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            Mark Pending
                          </button>
                        )}
                        {inquiry.status !== 'contacted' && (
                          <button
                            onClick={() => updateStatus(inquiry._id, 'contacted')}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Mark Contacted
                          </button>
                        )}
                        {inquiry.status !== 'resolved' && (
                          <button
                            onClick={() => updateStatus(inquiry._id, 'resolved')}
                            className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={inquiries.length}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  )
}

