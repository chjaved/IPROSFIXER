import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GreenCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#0B6B52"/>
    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProSignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('iprofixer_popup_seen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('iprofixer_popup_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/signup-pro?email=${encodeURIComponent(email)}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closePopup}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] w-full max-w-[900px] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close popup"
        >
          <X size={18} className="text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Column - Image (45%) */}
          <div className="md:w-[45%] relative bg-gradient-to-br from-[#F0FBF7] to-[#E0F4EE] flex items-end justify-center">
            <img
              src="/maid_popup.png"
              alt="iPROFIXER Professional"
              className="w-full h-full object-cover object-top md:object-contain md:object-bottom"
            />
          </div>

          {/* Right Column - Content (55%) */}
          <div className="md:w-[55%] p-8 md:p-10 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="iPROFIXER"
                className="h-12 object-contain"
              />
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              1st Month Zero Commission!
            </h2>

            {/* Sub-headline */}
            <p className="text-gray-600 text-lg mb-6">
              Join iProfixer and keep 100% of your earnings for your first month.
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Keep 100% of earnings',
                'Trusted platform',
                'More job opportunities',
                'Grow your income',
                'Flexible schedule'
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <GreenCheckIcon />
                  <span className="text-gray-700 text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Signup Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email address"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#F47B20] hover:bg-[#E06A10] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5"
              >
                Start Earning
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
