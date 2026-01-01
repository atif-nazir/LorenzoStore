'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { adminApi } from '@/lib/api/admin'
import { ShoppingBag, ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    price: '',
    year: '',
    image: '',
    description: '',
    features: '',
    category: 'premium' as 'premium' | 'mid-range' | 'entry',
    stock: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const featuresArray = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0)

      await adminApi.createProduct({
        id: formData.id,
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        year: formData.year,
        image: formData.image,
        description: formData.description,
        features: featuresArray,
        category: formData.category,
        stock: formData.stock ? parseInt(formData.stock) : 0,
      })

      toast.success('Product created successfully!')
      router.push('/admin/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-white/60 hover:text-lorenzo-accent transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
              <h1 className="text-3xl font-black text-white uppercase mb-2 flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-lorenzo-accent" />
                Add New Product
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Product ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="e.g., fox-v3-rs-carbon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-lorenzo-accent focus:outline-none transition-colors"
                  >
                    <option value="premium">Premium</option>
                    <option value="mid-range">Mid-Range</option>
                    <option value="entry">Entry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="Product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="Brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors"
                    placeholder="/images/helmets/helmet.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors resize-none"
                    placeholder="Product description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-white/60 uppercase mb-2">
                    Features (one per line) *
                  </label>
                  <textarea
                    required
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-lorenzo-accent focus:outline-none transition-colors resize-none"
                    placeholder="Carbon fiber shell&#10;MVRS system&#10;Dual-density EPS"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-lorenzo-accent text-black font-black uppercase rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Creating...' : 'Create Product'}
                </button>
                <Link
                  href="/admin/products"
                  className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-medium"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  )
}

