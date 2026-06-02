import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import About from './pages/About.jsx'
import ForProfessionals from './pages/ForProfessionals.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProSignup from './pages/ProSignup.jsx'
import ConsumerDashboard from './pages/ConsumerDashboard.jsx'
import ProfessionalDashboard from './pages/ProfessionalDashboard.jsx'

// Consumer Dashboard Pages
import ConsumerDashboardOverview from './pages/dashboard/consumer/DashboardOverview.jsx'
import ConsumerProfile from './pages/dashboard/consumer/Profile.jsx'
import ConsumerBookings from './pages/dashboard/consumer/Bookings.jsx'
import ConsumerRefunds from './pages/dashboard/consumer/Refunds.jsx'
import ConsumerServices from './pages/dashboard/consumer/Services.jsx'
import ConsumerAppointments from './pages/dashboard/consumer/Appointments.jsx'

// Professional Dashboard Pages
import ProDashboardOverview from './pages/dashboard/professional/DashboardOverview.jsx'
import ProProfile from './pages/dashboard/professional/Profile.jsx'
import ProJobs from './pages/dashboard/professional/Jobs.jsx'
import ProEarnings from './pages/dashboard/professional/Earnings.jsx'
import ProSchedule from './pages/dashboard/professional/Schedule.jsx'
import ProReviews from './pages/dashboard/professional/Reviews.jsx'
import AdminPayments from './pages/admin/AdminPayments.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Main website routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="for-professionals" element={<ForProfessionals />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
        </Route>

        {/* Auth routes - no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pro-signup" element={<ProSignup />} />

        {/* Admin routes - password protected */}
        <Route path="/admin/payments" element={<AdminPayments />} />

        {/* Protected Consumer Dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedTypes={['consumer', 'customer']}>
              <ConsumerDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<ConsumerDashboardOverview />} />
          <Route path="profile" element={<ConsumerProfile />} />
          <Route path="bookings" element={<ConsumerBookings />} />
          <Route path="refunds" element={<ConsumerRefunds />} />
          <Route path="services" element={<ConsumerServices />} />
          <Route path="appointments" element={<ConsumerAppointments />} />
        </Route>

        {/* Protected Professional Dashboard routes */}
        <Route 
          path="/pro-dashboard" 
          element={
            <ProtectedRoute allowedTypes={['professional']}>
              <ProfessionalDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<ProDashboardOverview />} />
          <Route path="profile" element={<ProProfile />} />
          <Route path="jobs" element={<ProJobs />} />
          <Route path="earnings" element={<ProEarnings />} />
          <Route path="schedule" element={<ProSchedule />} />
          <Route path="reviews" element={<ProReviews />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
