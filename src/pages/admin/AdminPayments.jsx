import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, DollarSign, AlertCircle, Eye, Download } from 'lucide-react';
import api from '../../lib/api.js';

const ADMIN_PASSWORD = 'iprofixer-admin-2026';
const COMMISSION_RATE = 0.15;

export default function AdminPayments() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    totalCommission: 0
  });

  useEffect(() => {
    // Check if already authenticated
    const savedKey = localStorage.getItem('admin_key');
    if (savedKey === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadPayments();
    }
  }, [isAuthenticated]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/payments/admin');
      const data = res.payments || [];
      setPayments(data);
      
      // Calculate stats
      const total = data.length;
      const pending = data.filter(p => p.status === 'pending_verification').length;
      const verified = data.filter(p => p.status === 'verified').length;
      const rejected = data.filter(p => p.status === 'rejected').length;
      const totalCommission = data
        .filter(p => p.status === 'verified')
        .reduce((sum, p) => sum + (parseFloat(p.commission_amount) || 0), 0);
      
      setStats({ total, pending, verified, rejected, totalCommission });
    } catch (e) {
      console.error('Failed to load payments:', e);
      alert('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_key', ADMIN_PASSWORD);
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleApprove = async (paymentId) => {
    if (!window.confirm('Approve this payment? This will calculate commission and create payout records.')) {
      return;
    }
    
    setActionLoading(paymentId);
    try {
      const res = await api.put('/payments/approve', {
        payment_id: paymentId,
        action: 'approve'
      });
      
      if (res.success) {
        alert(`Payment approved!\nCommission: ${res.commission}\nPro Payout: ${res.pro_payout}`);
        loadPayments();
      }
    } catch (e) {
      alert(e.message || 'Failed to approve payment');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (paymentId) => {
    setActionLoading(paymentId);
    try {
      const res = await api.put('/payments/approve', {
        payment_id: paymentId,
        action: 'reject',
        admin_note: rejectNote || 'Receipt does not match'
      });
      
      if (res.success) {
        setRejectModal(null);
        setRejectNote('');
        loadPayments();
      }
    } catch (e) {
      alert(e.message || 'Failed to reject payment');
    } finally {
      setActionLoading(null);
    }
  };

  const formatAmount = (amount) => {
    return `RM ${parseFloat(amount || 0).toFixed(2)}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Payments</h1>
            <p className="text-gray-500">Enter admin password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal text-white py-2 rounded-lg hover:bg-teal-dark transition-colors font-medium"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Verification Panel</h1>
            <p className="text-gray-500">Review and approve customer payment receipts</p>
          </div>
          <button
            onClick={loadPayments}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Verified</p>
            <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Total Commission</p>
            <p className="text-2xl font-bold text-teal">{formatAmount(stats.totalCommission)}</p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin text-teal" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amounts</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map(p => {
                    const commission = parseFloat((p.amount * COMMISSION_RATE).toFixed(2));
                    const proPayout = parseFloat((p.amount - commission).toFixed(2));
                    
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-mono text-sm font-medium text-gray-900">{p.reference_code}</p>
                          <p className="text-xs text-gray-500">{formatDate(p.created_at)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{p.customer_name}</p>
                          <p className="text-xs text-gray-500">{p.customer_email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">{p.service_name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{p.booking_number}</p>
                          <p className="text-xs text-gray-400">{p.address}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <p className="text-gray-900">Claimed: <strong>{formatAmount(p.amount)}</strong></p>
                            <p className="text-gray-500">Booking: {formatAmount(p.booking_amount)}</p>
                            {p.status === 'verified' && (
                              <>
                                <p className="text-teal text-xs mt-1">Commission (15%): {formatAmount(p.commission_amount)}</p>
                                <p className="text-green-600 text-xs">Pro Payout (85%): {formatAmount(p.pro_payout_amount)}</p>
                              </>
                            )}
                            {p.status === 'pending_verification' && (
                              <>
                                <p className="text-gray-400 text-xs mt-1">Est. Commission: {formatAmount(commission)}</p>
                                <p className="text-gray-400 text-xs">Est. Pro Payout: {formatAmount(proPayout)}</p>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {p.receipt_url && (
                            <div className="flex items-center gap-2">
                              <a 
                                href={p.receipt_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-teal hover:text-teal-dark text-sm flex items-center gap-1"
                              >
                                <Eye size={14} /> View
                              </a>
                              <a 
                                href={p.receipt_url} 
                                download
                                className="text-gray-500 hover:text-gray-700 text-sm"
                              >
                                <Download size={14} />
                              </a>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{p.payment_method}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.status === 'verified' ? 'bg-green-100 text-green-700' :
                            p.status === 'pending_verification' ? 'bg-amber-100 text-amber-700' :
                            p.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {p.status === 'pending_verification' ? 'Pending' : p.status}
                          </span>
                          {p.admin_note && (
                            <p className="text-xs text-gray-500 mt-1">{p.admin_note}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {p.status === 'pending_verification' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApprove(p.id)}
                                disabled={actionLoading === p.id}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                              >
                                {actionLoading === p.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectModal(p)}
                                disabled={actionLoading === p.id}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
                              >
                                <XCircle size={14} />
                                Reject
                              </button>
                            </div>
                          )}
                          {p.status === 'verified' && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle size={12} /> Approved
                              {p.verified_at && (
                                <span className="text-gray-400">{formatDate(p.verified_at)}</span>
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-10 text-center text-gray-400">
                        <AlertCircle size={36} className="mx-auto mb-3 opacity-30" />
                        <p>No payments found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Reject Payment</h3>
              <p className="text-sm text-gray-500">Reference: {rejectModal.reference_code}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason (optional)</label>
                <textarea
                  value={rejectNote}
                  onChange={e => setRejectNote(e.target.value)}
                  placeholder="e.g. Receipt amount does not match booking amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setRejectModal(null);
                    setRejectNote('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(rejectModal.id)}
                  disabled={actionLoading === rejectModal.id}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading === rejectModal.id && <Loader2 size={16} className="animate-spin" />}
                  Reject Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
