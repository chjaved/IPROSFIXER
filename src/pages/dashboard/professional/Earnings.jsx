import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, Download, ArrowUpRight, Banknote } from 'lucide-react'

const MONTHLY_DATA = [
  { month: 'Aug', earnings: 4200, jobs: 18 },
  { month: 'Sep', earnings: 3800, jobs: 16 },
  { month: 'Oct', earnings: 5100, jobs: 21 },
  { month: 'Nov', earnings: 4600, jobs: 19 },
  { month: 'Dec', earnings: 5240, jobs: 23 },
  { month: 'Jan', earnings: 1790, jobs: 8 },
]

const TRANSACTIONS = [
  { id: 'TXN-001', date: '2024-01-20', type: 'job', description: 'Deep Cleaning - Ahmad Hafizi', amount: 180, status: 'completed' },
  { id: 'TXN-002', date: '2024-01-18', type: 'job', description: 'Sofa Cleaning - Raj Kumar', amount: 150, status: 'completed' },
  { id: 'TXN-003', date: '2024-01-15', type: 'withdrawal', description: 'Withdrawal to Bank Account', amount: -1000, status: 'completed' },
  { id: 'TXN-004', date: '2024-01-12', type: 'job', description: 'AC Service - Sarah Lim', amount: 120, status: 'completed' },
  { id: 'TXN-005', date: '2024-01-10', type: 'bonus', description: 'New Year Bonus', amount: 200, status: 'completed' },
]

export default function Earnings() {
  const [period, setPeriod] = useState('this-month')
  
  const totalEarnings = MONTHLY_DATA.reduce((sum, m) => sum + m.earnings, 0)
  const thisMonth = MONTHLY_DATA[MONTHLY_DATA.length - 1].earnings
  const lastMonth = MONTHLY_DATA[MONTHLY_DATA.length - 2].earnings
  const growth = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)
  const availableBalance = 1790

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">RM {availableBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Wallet size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">RM {thisMonth.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {growth >= 0 ? (
              <>
                <TrendingUp size={14} className="text-green-600" />
                <span className="text-sm text-green-600">+{growth}% from last month</span>
              </>
            ) : (
              <>
                <TrendingDown size={14} className="text-red-600" />
                <span className="text-sm text-red-600">{growth}% from last month</span>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">RM {totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jobs Completed</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Earnings Overview</h3>
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1"
            >
              <option value="this-month">This Month</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
          
          <div className="flex items-end gap-2 h-48">
            {MONTHLY_DATA.map((data) => {
              const maxEarning = Math.max(...MONTHLY_DATA.map(d => d.earnings))
              const height = (data.earnings / maxEarning) * 100
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative">
                    <div 
                      className="bg-orange rounded-t-lg transition-all duration-300 hover:bg-orange-dark"
                      style={{ height: `${height}%`, minHeight: '20px' }}
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 opacity-0 hover:opacity-100">
                      RM {data.earnings}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              )
            })}
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Average per job</p>
              <p className="text-lg font-semibold text-gray-900">RM 142</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Best month</p>
              <p className="text-lg font-semibold text-gray-900">December (RM 5,240)</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-lg font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <button className="flex items-center gap-1 text-sm text-orange hover:underline">
              <Download size={16} />
              Export
            </button>
          </div>
          
          <div className="space-y-3">
            {TRANSACTIONS.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    txn.type === 'withdrawal' ? 'bg-red-100 text-red-600' : 
                    txn.type === 'bonus' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {txn.type === 'withdrawal' ? <TrendingDown size={18} /> : 
                     txn.type === 'bonus' ? <Wallet size={18} /> : <DollarSign size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{txn.description}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {txn.amount > 0 ? '+' : ''}RM {Math.abs(txn.amount)}
                  </p>
                  <span className="text-xs text-gray-400">{txn.id}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-sm text-orange hover:underline">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Withdrawal History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Reference</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Method</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 text-sm">2024-01-15</td>
                <td className="py-3 px-4 text-sm font-mono">WD-20240115-001</td>
                <td className="py-3 px-4 text-sm">Bank Transfer</td>
                <td className="py-3 px-4 text-sm text-right font-semibold">RM 1,000.00</td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm">2024-01-01</td>
                <td className="py-3 px-4 text-sm font-mono">WD-20240101-002</td>
                <td className="py-3 px-4 text-sm">Bank Transfer</td>
                <td className="py-3 px-4 text-sm text-right font-semibold">RM 2,500.00</td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
