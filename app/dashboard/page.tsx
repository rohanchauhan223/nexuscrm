'use client'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export const dynamic = 'force-static'

interface StatCard {
  icon: string
  title: string
  value: string | number
  change: string
  color: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Loading...</div>
      </div>
    )
  }

  const statsData: StatCard[] = [
    { icon: '👥', title: 'Total Contacts', value: 2659, change: '+15%', color: 'from-blue-500 to-blue-600' },
    { icon: '📅', title: 'New Appointments', value: 291, change: '+20%', color: 'from-green-500 to-green-600' },
    { icon: '📊', title: 'Total Revenue', value: '$45,890', change: '+8%', color: 'from-purple-500 to-purple-600' },
    { icon: '⭐', title: 'Client Satisfaction', value: '98%', change: '+2%', color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome Back! 👋
            </h1>
            <p className="text-slate-400 text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">{stat.icon}</div>
              <span className="text-sm font-semibold px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">{stat.title}</h3>
            <p className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent">
              {stat.value}
            </p>
            <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full w-${Math.floor(Math.random() * 3) + 6}/10 bg-gradient-to-r ${stat.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="text-2xl">📈</span> Activity Overview
          </h2>
          <div className="h-64 bg-gradient-to-t from-blue-500/10 to-transparent rounded-lg flex items-end justify-between p-4 gap-2">
            {[65, 45, 75, 55, 85, 60, 70].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-slate-500">Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="text-2xl">🎯</span> Quick Stats
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Conversion Rate', value: '12.5%', color: 'bg-blue-500' },
              { label: 'Engagement', value: '87%', color: 'bg-green-500' },
              { label: 'Growth', value: '23%', color: 'bg-purple-500' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                    style={{ width: stat.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="text-2xl">👥</span> Recent Contacts
        </h2>
        <div className="space-y-3">
          {[
            { name: 'John Anderson', email: 'john@example.com', status: 'Active', avatar: '👨' },
            { name: 'Sarah Mitchell', email: 'sarah@example.com', status: 'Pending', avatar: '👩' },
            { name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', avatar: '👨' },
          ].map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600 transition-colors duration-200 border border-slate-600/50"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{contact.avatar}</span>
                <div>
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="text-sm text-slate-400">{contact.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                contact.status === 'Active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {contact.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
