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

        {/* Protected Dashboard routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute allowedTypes={['consumer']}>
              <ConsumerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pro-dashboard/*" 
          element={
            <ProtectedRoute allowedTypes={['professional']}>
              <ProfessionalDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  )
}
