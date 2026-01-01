'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { adminApi } from '@/lib/api/admin'
import { ShoppingBag, Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  _id: string
  id: string
  name: string
  brand: string
  price: number
  year: string
  image: string
  description: string
  features: string[]
  category: 'premium' | 'mid-range' | 'entry'
  stock?: number
  isActive: boolean
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await adminApi.getAllProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await adminApi.deleteProduct(id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'mid-range':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'entry':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-lorenzo-accent" />
                  Products
                </h1>
                <p className="text-white/60">Manage your product catalog</p>
              </div>
              <Link
                href="/admin/products/new"
                className="px-6 py-3 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </Link>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-white/60 text-center py-12">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                  >
                    <div className="aspect-video relative bg-gray-800">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white/50 uppercase">
                          {product.brand}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getCategoryColor(
                            product.category
                          )}`}
                        >
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-2xl font-black text-lorenzo-accent mb-4">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  )
}

