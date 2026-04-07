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
  const [user, setUser] = useState(null)
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
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-cyan-400"></div>
      </div>
    )
  }

  const statsData: StatCard[] = [
    {
      icon: '👥',
      title: 'Total Contacts',
      value: 2659,
      change: '+15%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📅',
      title: 'New Appointments',
      value: 291,
      change: '+20%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💰',
      title: 'Total Revenue',
      value: '$45,890',
      change: '+8%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⭐',
      title: 'Client Satisfaction',
      value: '98%',
      change: '+2%',
      color: 'from-orange-500 to-amber-500'
    },
  ]

  const recentActivities = [
    { name: 'John Anderson', action: 'Created new contact', time: '2 hours ago', avatar: '👨' },
    { name: 'Sarah Mitchell', action: 'Scheduled appointment', time: '4 hours ago', avatar: '👩' },
    { name: 'Mike Johnson', action: 'Updated contact info', time: '1 day ago', avatar: '👨' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">NexusCRM</h1>
              <p className="text-slate-400 text-xs">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm hidden sm:inline">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back! 👋</h2>
          <p className="text-slate-400">Here's your CRM performance overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-slate-600/80 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-3xl`}>{stat.icon}</div>
                  <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                </div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-xl`}></div>
            </div>
          ))}
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6 hover:border-slate-600/80 transition-all duration-300">
            <h3 className="text-white font-bold text-lg mb-4">📈 Activity Overview</h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {[65, 45, 75, 55, 85, 60, 70].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-cyan-400 rounded-t-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                    style={{ height: `${height * 2}px` }}
                  ></div>
                  <span className="text-slate-400 text-xs mt-2">D{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6 hover:border-slate-600/80 transition-all duration-300">
            <h3 className="text-white font-bold text-lg mb-4">🎯 Quick Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Conversion', value: '12.5%', icon: '📊' },
                { label: 'Engagement', value: '87%', icon: '💬' },
                { label: 'Growth', value: '23%', icon: '📈' },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="text-slate-300 text-sm">{stat.label}</span>
                  </div>
                  <span className="text-white font-bold text-sm">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6 hover:border-slate-600/80 transition-all duration-300">
          <h3 className="text-white font-bold text-lg mb-4">👥 Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{activity.avatar}</div>
                  <div>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{activity.name}</p>
                    <p className="text-slate-400 text-sm">{activity.action}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
