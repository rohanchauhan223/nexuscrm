'use client'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export const dynamic = 'force-static'

interface UserState {
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserState | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User', email: user.email || '' })
      }
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Total Revenue', value: '$45,890', change: '+12.5%', trend: 'up', icon: '💰' },
    { label: 'Active Projects', value: '24', change: '+3', trend: 'up', icon: '📁' },
    { label: 'Total Clients', value: '1,284', change: '+8.2%', trend: 'up', icon: '👥' },
    { label: 'Pending Tasks', value: '17', change: '-5', trend: 'down', icon: '✓' },
  ]

  const activities = [
    { user: 'Sarah Mitchell', action: 'Created new project', time: '2 min ago', avatar: 'SM' },
    { user: 'John Anderson', action: 'Completed milestone', time: '1 hour ago', avatar: 'JA' },
    { user: 'Mike Johnson', action: 'Added new client', time: '3 hours ago', avatar: 'MJ' },
    { user: 'Emily Chen', action: 'Updated contract', time: '5 hours ago', avatar: 'EC' },
  ]

  const tasks = [
    { title: 'Review Q2 reports', status: 'pending', due: 'Today' },
    { title: 'Client meeting with Acme', status: 'upcoming', due: 'Tomorrow' },
    { title: 'Update CRM pipeline', status: 'pending', due: 'This week' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-slate-800">NexusCRM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {[
              { name: 'Dashboard', icon: '📊', active: true },
              { name: 'Projects', icon: '📁', active: false },
              { name: 'Team', icon: '👥', active: false },
              { name: 'Clients', icon: '👤', active: false },
              { name: 'Analytics', icon: '📈', active: false },
              { name: 'Settings', icon: '⚙️', active: false },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Left: Title + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-700"
              >
                ☰
              </button>
              <div>
                <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔎</span>
                <input
                  type="text"
                  placeholder="Search projects, clients..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                🔔
              </button>
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name.split(' ')[0]} 👋</h2>
            <p className="text-slate-500 mt-1">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Grid - Section A */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Section B: Chart + Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-800">Revenue Overview</h3>
                  <p className="text-sm text-slate-500">Monthly revenue trend</p>
                </div>
                <select className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="flex items-end gap-3 h-48">
                {[65, 45, 75, 55, 85, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all hover:from-indigo-600 hover:to-indigo-500"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-xs text-slate-500">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Insights Sidebar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Quick Insights</h3>
              <div className="space-y-4">
                {[
                  { label: 'Conversion Rate', value: '12.5%', icon: '📊', color: 'text-blue-600' },
                  { label: 'Avg Deal Size', value: '$3,240', icon: '💵', color: 'text-green-600' },
                  { label: 'Win Rate', value: '68%', icon: '🎯', color: 'text-indigo-600' },
                ].map((insight, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{insight.icon}</span>
                      <span className="text-sm text-slate-600">{insight.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${insight.color}`}>{insight.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section C: Recent Activity + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800">Recent Activity</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
              </div>
              <div className="space-y-4">
                {activities.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium flex-shrink-0">
                      {act.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">
                        <span className="font-medium">{act.user}</span> {act.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800">Upcoming Tasks</h3>
                <button className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-100 transition-colors">
                  +
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${task.status === 'pending' ? 'bg-amber-400' : 'bg-indigo-400'}`}
                      />
                      <span className="text-sm text-slate-700">{task.title}</span>
                    </div>
                    <span className="text-xs text-slate-500">{task.due}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section D: Team + Project Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800">Team Members</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Manage</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Mitchell', role: 'Project Lead', status: 'online', initials: 'SM' },
                  { name: 'John Anderson', role: 'Developer', status: 'online', initials: 'JA' },
                  { name: 'Mike Johnson', role: 'Designer', status: 'away', initials: 'MJ' },
                  { name: 'Emily Chen', role: 'Marketing', status: 'offline', initials: 'EC' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                          {member.initials}
                        </div>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-amber-400' : 'bg-slate-300'}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                      ⋯
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Progress */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800">Project Progress</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Website Redesign', progress: 75, due: 'Due in 5 days' },
                  { name: 'Mobile App v2.0', progress: 45, due: 'Due in 12 days' },
                  { name: 'CRM Integration', progress: 90, due: 'Due tomorrow' },
                  { name: 'Marketing Campaign', progress: 30, due: 'Due in 3 weeks' },
                ].map((project, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{project.name}</span>
                      <span className="text-xs text-slate-500">{project.due}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
