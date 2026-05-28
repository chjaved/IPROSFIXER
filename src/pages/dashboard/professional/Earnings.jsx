import { useState, useEffect } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, Banknote, Loader2 } from 'lucide-react'
import api from '../../../lib/api.js'

export default function Earnings() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/transactions').then(data => {
      setTransactions(data.data?.transactions || data.transactions || [])
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
                    txn.type === 'withdrawal' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {txn.type === 'withdrawal' ? <TrendingDown size={18} /> : <DollarSign size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{txn.description || txn.type}</p>
                    <p className="text-xs text-gray-500">{txn.created_at ? new Date(txn.created_at).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
                <p className={`font-semibold ${parseFloat(txn.amount) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(txn.amount) >= 0 ? '+' : ''}RM {Math.abs(parseFloat(txn.amount||0)).toFixed(0)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  )
}
