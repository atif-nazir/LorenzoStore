'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Pagination from '@/components/admin/Pagination'
import { adminApi } from '@/lib/api/admin'
import { Mail, Check, Clock, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'pending' | 'replied' | 'resolved'
  createdAt: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const data = await adminApi.getAllContacts()
      setContacts(data)
    } catch (error) {
      toast.error('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateContactStatus(id, status)
      toast.success('Status updated successfully')
      fetchContacts()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'replied':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                <Mail className="w-8 h-8 text-lorenzo-accent" />
                Contact Messages
              </h1>
              <p className="text-white/60">Manage customer contact messages</p>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : contacts.length === 0 ? (
              <div className="text-white/60 text-center py-12">No contact messages found</div>
            ) : (
              <>
                <div className="space-y-4">
                  {contacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getStatusColor(
                              contact.status
                            )}`}
                          >
                            {contact.status}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-white/60 mb-1">Email</p>
                              <p className="text-white">{contact.email}</p>
                            </div>
                            <div>
                              <p className="text-white/60 mb-1">Date</p>
                              <p className="text-white">
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-white/60 mb-1">Subject</p>
                            <p className="text-white font-medium">{contact.subject}</p>
                          </div>

                          <div>
                            <p className="text-white/60 mb-1">Message</p>
                            <p className="text-white whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {contact.status !== 'pending' && (
                          <button
                            onClick={() => updateStatus(contact._id, 'pending')}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            Mark Pending
                          </button>
                        )}
                        {contact.status !== 'replied' && (
                          <button
                            onClick={() => updateStatus(contact._id, 'replied')}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Mark Replied
                          </button>
                        )}
                        {contact.status !== 'resolved' && (
                          <button
                            onClick={() => updateStatus(contact._id, 'resolved')}
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

                {Math.ceil(contacts.length / itemsPerPage) > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(contacts.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={contacts.length}
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

