import { useState, useEffect } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, Banknote, Loader2, CheckCircle, Clock } from 'lucide-react'
import api from '../../../lib/api.js'

export default function Earnings() {
  const [transactions, setTransactions] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/transactions'),
      api.get('/payments/admin').catch(() => ({ payments: [] }))
    ]).then(([txnData, payoutData]) => {
      setTransactions(txnData.data?.transactions || txnData.transactions || [])
      setPayouts(payoutData.payments || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const now = new Date()
  const thisMonthTxns = transactions.filter(t => {
    const d = new Date(t.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const lastMonthTxns = transactions.filter(t => {
    const d = new Date(t.created_at)
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
  })

  const totalEarnings  = transactions.reduce((s,t) => s + (parseFloat(t.amount)||0), 0)
  const thisMonth      = thisMonthTxns.reduce((s,t) => s + (parseFloat(t.amount)||0), 0)
  const lastMonthTotal = lastMonthTxns.reduce((s,t) => s + (parseFloat(t.amount)||0), 0)
  const growth = lastMonthTotal > 0 ? ((thisMonth - lastMonthTotal) / lastMonthTotal * 100).toFixed(1) : 0
  const jobsDone = transactions.filter(t => t.type === 'job_payment').length

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Earnings</h1>
          <p className="text-gray-500">Track your income and withdrawals</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Banknote size={18} />
          Withdraw Funds
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-orange" size={32} /></div>
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">This Month</p><p className="text-2xl font-bold text-gray-900">RM {thisMonth.toFixed(0)}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Calendar size={24} className="text-blue-600" /></div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {growth >= 0 ? <><TrendingUp size={14} className="text-green-600" /><span className="text-sm text-green-600">+{growth}% from last month</span></>
                         : <><TrendingDown size={14} className="text-red-600" /><span className="text-sm text-red-600">{growth}% from last month</span></>}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Earnings</p><p className="text-2xl font-bold text-gray-900">RM {totalEarnings.toFixed(0)}</p></div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><DollarSign size={24} className="text-orange-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Jobs Paid</p><p className="text-2xl font-bold text-gray-900">{jobsDone}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Wallet size={24} className="text-purple-600" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Transactions</p><p className="text-2xl font-bold text-gray-900">{transactions.length}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Banknote size={24} className="text-green-600" /></div>
          </div>
        </div>
      </div>

      {/* Payout Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Job Payout Breakdown</h3>
        {payouts.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <Wallet size={36} className="mx-auto mb-3 opacity-30" />
            <p>No completed jobs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payouts.filter(p => p.status === 'verified').slice(0, 10).map(p => {
              const bookingAmount = parseFloat(p.amount || 0);
              const commission = parseFloat(p.commission_amount || (bookingAmount * 0.15));
              const proPayout = parseFloat(p.pro_payout_amount || (bookingAmount - commission));
              
              return (
                <div key={p.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{p.service_name || 'Service'}</span>
                      <span className="text-xs text-gray-500">({p.booking_number})</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      p.status === 'verified' ? 'bg-green-100 text-green-700' : 
                      p.status === 'pending_verification' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'
                    }`}>
                      {p.status === 'verified' ? 'Paid' : p.status === 'pending_verification' ? 'Pending' : p.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Booking Amount</p>
                      <p className="font-medium text-gray-900">RM {bookingAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Platform Fee (15%)</p>
                      <p className="font-medium text-red-600">-RM {commission.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Your Payout (85%)</p>
                      <p className="font-bold text-green-600">RM {proPayout.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Verified: {new Date(p.verified_at).toLocaleDateString('en-MY')}</span>
                    </div>
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle size={12} /> Ready for Payout
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <Wallet size={36} className="mx-auto mb-3 opacity-30" />
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 20).map(txn => (
              <div key={txn.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    txn.type === 'withdrawal' ? 'bg-red-100 text-red-600' : 
                    txn.type === 'payout' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {txn.type === 'withdrawal' ? <TrendingDown size={18} /> : 
                     txn.type === 'payout' ? <DollarSign size={18} /> :
                     <DollarSign size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{txn.description || (txn.type === 'payout' ? 'Job Payout' : txn.type)}</p>
                    <p className="text-xs text-gray-500">
                      {txn.created_at ? new Date(txn.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${parseFloat(txn.amount) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(txn.amount) >= 0 ? '+' : ''}RM {Math.abs(parseFloat(txn.amount||0)).toFixed(2)}
                  </p>
                  {txn.type === 'payout' && (
                    <span className="text-xs text-blue-600">{txn.status === 'completed' ? 'Released' : 'Pending Release'}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Withdrawal Note */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <Banknote className="text-blue-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-blue-900">Withdraw Your Earnings</h3>
            <p className="text-sm text-blue-700 mt-1">
              Withdraw via DuitNow or TnG — contact support at <strong>+03-8080 5249</strong> to process your withdrawal request.
            </p>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  )
}
