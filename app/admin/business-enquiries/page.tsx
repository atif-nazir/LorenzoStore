'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Pagination from '@/components/admin/Pagination'
import { adminApi } from '@/lib/api/admin'
import { Handshake } from 'lucide-react'
import { toast } from 'sonner'

interface BusinessEnquiry {
  _id: string
  enquiryType: 'wholesale' | 'sponsorship' | 'distribution' | 'partnership'
  companyName: string
  contactName: string
  email: string
  phone: string
  country: string
  message: string
  status: 'pending' | 'reviewing' | 'contacted' | 'rejected' | 'approved'
  createdAt: string
}

export default function AdminBusinessEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<BusinessEnquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      const data = await adminApi.getAllBusinessEnquiries()
      setEnquiries(data)
    } catch (error) {
      toast.error('Failed to fetch business enquiries')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateBusinessEnquiryStatus(id, status)
      toast.success('Status updated successfully')
      fetchEnquiries()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'reviewing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'contacted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                <Handshake className="w-8 h-8 text-lorenzo-accent" />
                Business Enquiries
              </h1>
              <p className="text-white/60">Manage business partnership enquiries</p>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : enquiries.length === 0 ? (
              <div className="text-white/60 text-center py-12">No business enquiries found</div>
            ) : (
              <>
                <div className="space-y-4">
                  {enquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((enquiry) => (
                  <div
                    key={enquiry._id}
                    className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                          <h3 className="text-xl font-bold text-white">{enquiry.companyName}</h3>
                          <span className="px-3 py-1 bg-lorenzo-accent/20 text-lorenzo-accent border border-lorenzo-accent/30 rounded-lg text-xs font-bold uppercase">
                            {getTypeLabel(enquiry.enquiryType)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getStatusColor(
                              enquiry.status
                            )}`}
                          >
                            {enquiry.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-white/60 mb-1">Contact Name</p>
                            <p className="text-white">{enquiry.contactName}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Email</p>
                            <p className="text-white">{enquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Phone</p>
                            <p className="text-white">{enquiry.phone}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Country</p>
                            <p className="text-white">{enquiry.country}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Date</p>
                            <p className="text-white">
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-white/60 mb-1">Message</p>
                          <p className="text-white whitespace-pre-wrap">{enquiry.message}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <select
                          value={enquiry.status}
                          onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                          className="px-4 py-2 bg-black/50 border border-white/20 text-white rounded-lg focus:border-lorenzo-accent focus:outline-none text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>

                {Math.ceil(enquiries.length / itemsPerPage) > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(enquiries.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={enquiries.length}
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

