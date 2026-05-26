import { useState } from 'react'
import { User, Mail, Phone, MapPin, Camera, Save, Briefcase, Star, Award, FileText } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext.jsx'

export default function ProProfile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || 'Ahmad Hafizi',
    email: user?.email || 'ahmad@example.com',
    phone: user?.phone || '+60 12-345-6789',
    serviceCategory: user?.serviceCategory || 'Deep Cleaning',
    experience: user?.experience || '3-5',
    bio: 'Professional cleaner with 5+ years experience. Specializing in post-renovation and deep cleaning services.',
    location: 'Petaling Jaya',
    hasTransport: true,
    idNumber: '890512-14-5678',
    bankAccount: '**** 4567',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
    }, 1000)
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
      <p className="text-gray-500 mb-6">Manage your professional information</p>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-orange to-orange-dark h-32"></div>
        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-4">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <User size={40} className="text-gray-400" />
              </div>
            </div>
            <button className="absolute bottom-0 left-16 bg-orange text-white p-2 rounded-full shadow-md hover:bg-orange-dark">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
              <p className="text-gray-500">{formData.serviceCategory} Specialist</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <Award size={14} />
                Verified Pro
              </span>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <Star size={14} className="fill-yellow-600" />
                4.8 Rating
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-500">Jobs Completed</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-gray-900">128</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">Years Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Professional Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
                >
                  <option>Deep Cleaning</option>
                  <option>Regular Maid</option>
                  <option>AC Repair</option>
                  <option>Electrical</option>
                  <option>Caregiver</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              >
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && (
              <span className="text-green-600 text-sm">Profile updated successfully!</span>
            )}
          </div>
        </form>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Documents</h3>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Verified</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">IC/Passport</p>
                <p className="text-sm text-gray-500">{formData.idNumber}</p>
              </div>
            </div>
            <button className="text-orange hover:underline text-sm">Update</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Bank Account</p>
                <p className="text-sm text-gray-500">{formData.bankAccount}</p>
              </div>
            </div>
            <button className="text-orange hover:underline text-sm">Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}
