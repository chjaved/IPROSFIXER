import { useState } from 'react'
import { Briefcase, Search, Filter, Star, ChevronRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  'All', 'Cleaning', 'AC & Electrical', 'Caregiving', 'Beauty', 'Appliances'
]

const SERVICES = [
  { id: 1, name: 'Deep Cleaning', category: 'Cleaning', price: 'From RM 150', rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', popular: true },
  { id: 2, name: 'Regular Maid', category: 'Cleaning', price: 'From RM 80', rating: 4.6, reviews: 189, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', popular: true },
  { id: 3, name: 'AC Service', category: 'AC & Electrical', price: 'From RM 120', rating: 4.7, reviews: 312, image: 'https://images.unsplash.com/photo-1631545308772-81a0e0a3a6ed?w=400', popular: true },
  { id: 4, name: 'Laundry & Ironing', category: 'Cleaning', price: 'From RM 50', rating: 4.5, reviews: 156, image: 'https://images.unsplash.com/photo-1517677208171-0bc1725a542c?w=400', popular: false },
  { id: 5, name: 'Post-Reno Clean', category: 'Cleaning', price: 'From RM 300', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400', popular: true },
  { id: 6, name: 'Sofa Cleaning', category: 'Cleaning', price: 'From RM 180', rating: 4.6, reviews: 127, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', popular: false },
  { id: 7, name: 'Caregiver', category: 'Caregiving', price: 'From RM 200', rating: 4.8, reviews: 78, image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400', popular: false },
  { id: 8, name: 'Bridal Make-Up', category: 'Beauty', price: 'From RM 350', rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400', popular: false },
]

export default function ConsumerServices() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = category === 'All' || service.category === category
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Services</h1>
      <p className="text-gray-500 mb-6">Book professional home services</p>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat
                ? 'bg-teal text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Popular Services */}
      {category === 'All' && !search && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.popular).slice(0, 4).map(service => (
              <Link
                key={service.id}
                to="/services"
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-32 bg-gray-200 relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(service.id) }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white"
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-teal font-medium">{service.price}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{service.rating}</span>
                    <span className="text-sm text-gray-400">({service.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Services */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {category === 'All' ? 'All Services' : `${category} Services`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map(service => (
          <Link
            key={service.id}
            to="/services"
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="h-40 bg-gray-200 relative">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(service.id) }}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white"
              >
                <Heart
                  size={18}
                  className={favorites.includes(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
              {service.popular && (
                <span className="absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{service.name}</h3>
                <span className="text-xs text-gray-400">{service.category}</span>
              </div>
              <p className="text-sm text-teal font-medium mt-1">{service.price}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600">{service.rating}</span>
                  <span className="text-sm text-gray-400">({service.reviews})</span>
                </div>
                <span className="flex items-center gap-1 text-sm text-teal group-hover:underline">
                  Book <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No services found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
