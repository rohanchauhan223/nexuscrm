'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'Spreadsheet' | 'Board' | 'Calendar' | 'Timeline'>('Board');

  const taskStatuses = {
    todo: 24,
    inProgress: 18,
    validation: 9,
    done: 33,
  };

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-slate-400',
      tasks: [
        { id: 1, title: 'Design mobile onboarding', tag: 'Design', color: 'bg-[#635BFF]', assignee: 'AS', priority: 'High' },
        { id: 2, title: 'Update API documentation', tag: 'Docs', color: 'bg-emerald-500', assignee: 'RK', priority: 'Medium' },
        { id: 3, title: 'Fix pagination bug', tag: 'Bug', color: 'bg-rose-500', assignee: 'JD', priority: 'High' },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-[#635BFF]',
      tasks: [
        { id: 4, title: 'Implement auth flow', tag: 'Feature', color: 'bg-[#635BFF]', assignee: 'AS', priority: 'High' },
        { id: 5, title: 'Build kanban board', tag: 'UI', color: 'bg-[#635BFF]', assignee: 'RK', priority: 'Medium' },
        { id: 6, title: 'Connect Supabase', tag: 'Backend', color: 'bg-[#635BFF]', assignee: 'JD', priority: 'High' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-amber-500',
      tasks: [
        { id: 7, title: 'Review PR #42', tag: 'Review', color: 'bg-amber-500', assignee: 'AS', priority: 'Low' },
        { id: 8, title: 'QA testing', tag: 'QA', color: 'bg-amber-500', assignee: 'RK', priority: 'Medium' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-emerald-500',
      tasks: [
        { id: 9, title: 'Setup project', tag: 'Setup', color: 'bg-emerald-500', assignee: 'JD', priority: 'Low' },
        { id: 10, title: 'Initial commit', tag: 'Code', color: 'bg-emerald-500', assignee: 'AS', priority: 'Low' },
        { id: 11, title: 'Deploy v1', tag: 'Deploy', color: 'bg-emerald-500', assignee: 'RK', priority: 'High' },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h1 className="text-sm font-semibold text-slate-900">NexusCRM</h1>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {[
            { name: 'Dashboard', icon: '◉', active: true },
            { name: 'Projects', icon: '▣', active: false },
            { name: 'Tasks', icon: '☐', active: false },
            { name: 'Team', icon: '◎', active: false },
            { name: 'Calendar', icon: '▦', active: false },
            { name: 'Reports', icon: '▤', active: false },
            { name: 'Settings', icon: '⚙', active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-md transition-colors ${
                item.active
                  ? 'bg-[#f0edff] text-[#635BFF]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] opacity-70">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-700">Board</span>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-medium text-slate-900">Sprint 12</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">
              Filters
            </button>
            <button className="px-2.5 py-1 text-xs font-medium text-white bg-[#635BFF] hover:bg-[#5a52e6] rounded-md transition-colors">
              + New Task
            </button>
          </div>
        </header>

        {/* Analytics Cards */}
        <div className="p-4 grid grid-cols-4 gap-3">
          {[
            { label: 'To Do', value: taskStatuses.todo, color: 'bg-slate-400' },
            { label: 'In Progress', value: taskStatuses.inProgress, color: 'bg-[#635BFF]' },
            { label: 'Validation', value: taskStatuses.validation, color: 'bg-amber-500' },
            { label: 'Done', value: taskStatuses.done, color: 'bg-emerald-500' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-500">{stat.label}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${stat.color}`} />
              </div>
              <span className="text-lg font-semibold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="flex-1 px-4 pb-4 overflow-x-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            {/* Tabs + Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
              <div className="flex items-center gap-0.5">
                {['Spreadsheet', 'Board', 'Calendar', 'Timeline'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors ${
                      activeTab === tab
                        ? 'bg-[#f0edff] text-[#635BFF]'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded transition-colors">
                  <span className="text-[10px]">◧</span>
                </button>
                <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded transition-colors">
                  <span className="text-[10px]">⚙</span>
                </button>
                <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded transition-colors">
                  <span className="text-[10px]">⋯</span>
                </button>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium text-slate-500">{columns.length} columns</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] text-slate-500">Ideal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#635BFF]" />
                    <span className="text-[10px] text-slate-500">Actual</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Day 5 of 14</span>
                </div>
              </div>
              <div className="flex gap-2">

                {columns.map((column) => (
                  <div key={column.id} className="w-64 flex-shrink-0">
                    {/* Column Header */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${column.color}`} />
                      <span className="text-[11px] font-medium text-slate-700">{column.title}</span>
                      <span className="text-[10px] text-slate-400">{column.tasks.length}</span>
                    </div>
                    {/* Column Content */}
                    <div className="space-y-1.5">
                      {column.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white rounded-md border border-slate-200 p-2.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className={`text-[9px] font-medium text-white px-1.5 py-0.5 rounded ${task.color}`}>
                              {task.tag}
                            </span>
                            <span className="text-[9px] text-slate-400 ml-auto">#{task.id}</span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-800 mb-2">{task.title}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] text-slate-500">{task.priority}</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-[#f0edff] flex items-center justify-center text-[9px] font-medium text-[#635BFF]">
                              {task.assignee}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-center gap-1">
                        <span>+</span>
                        <span>Add task</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
