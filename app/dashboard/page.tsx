'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  FolderKanban,
  HelpCircle,
  Inbox,
  LayoutGrid,
  LineChart,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react';

const navMain = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Tasks', icon: FolderKanban, active: true },
  { label: 'Backlog', icon: CircleDot, count: 24 },
  { label: 'In Progress', icon: CircleDot, count: 4 },
  { label: 'Validation', icon: CircleDot, count: 7 },
  { label: 'Done', icon: CheckCircle2, count: 13 },
];

const navTools = [
  { label: 'Notification', icon: Bell, count: 7 },
  { label: 'Inbox', icon: Inbox },
  { label: 'Integration', icon: Sparkles },
  { label: 'Reporting', icon: LineChart },
];

const navMetrics = [
  { label: 'Active', icon: CircleDot },
  { label: 'Past', icon: WalletCards },
];

const summaryStats = [
  { label: 'Backlog', value: '24' },
  { label: 'In progress', value: '4' },
  { label: 'Validation', value: '7' },
];

const columns = [
  {
    title: 'Backlog',
    count: 24,
    tone: 'indigo',
    cards: [
      {
        code: 'MDS-32',
        priority: 'Urgent',
        title: 'New microdose website',
        subtitle: 'User Homepage',
        due: 'Jul 29, 2024',
        comments: 2,
        files: 230,
      },
      {
        code: 'MDS-56',
        priority: 'Normal',
        title: 'Input Styleguide',
        subtitle: 'Contract',
        due: 'Jun 2, 2024',
        comments: 1,
        files: 221,
      },
    ],
  },
  {
    title: 'In progress',
    count: 4,
    tone: 'violet',
    cards: [
      {
        code: 'MDS-9',
        priority: 'Low',
        title: 'Sales deck',
        subtitle: 'Marketing',
        due: 'Sep 19, 2024',
        comments: 1,
        files: 301,
      },
      {
        code: 'MDS-3',
        priority: 'Low',
        title: 'Brand assets sync',
        subtitle: 'Creative Ops',
        due: 'Jun 3, 2024',
        comments: 2,
        files: 203,
      },
    ],
  },
  {
    title: 'Validation',
    count: 7,
    tone: 'rose',
    cards: [
      {
        code: 'MDS-7',
        priority: 'Urgent',
        title: 'Case studies',
        subtitle: 'Fintech mark',
        due: 'Sep 21, 2024',
        comments: 3,
        files: 210,
      },
      {
        code: 'MDS-12',
        priority: 'Normal',
        title: 'Demo reel',
        subtitle: 'Animation 2nd',
        due: 'Aug 24, 2024',
        comments: 3,
        files: 260,
      },
    ],
  },
  {
    title: 'Done',
    count: 13,
    tone: 'emerald',
    cards: [
      {
        code: 'MDS-18',
        priority: 'Low',
        title: 'Spline animated logo',
        subtitle: 'Logo',
        due: 'Jul 13, 2024',
        comments: 6,
        files: 321,
      },
      {
        code: 'MDS-20',
        priority: 'Low',
        title: 'Launch checklist',
        subtitle: 'Final QA',
        due: 'Jul 30, 2024',
        comments: 6,
        files: 203,
      },
    ],
  },
];

const toneMap: Record<string, string> = {
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  rose: 'bg-rose-500',
  emerald: 'bg-emerald-500',
};

const badgeMap: Record<string, string> = {
  Urgent: 'bg-rose-50 text-rose-500 border-rose-100',
  Low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Normal: 'bg-amber-50 text-amber-600 border-amber-100',
};

function SidebarSection({
  title,
  items,
}: {
  title?: string;
  items: { label: string; icon: any; active?: boolean; count?: number }[];
}) {
  return (
    <div className="space-y-2">
      {title ? (
        <div className="flex items-center justify-between px-3 text-xs font-medium text-slate-400">
          <span>{title}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      ) : null}
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                item.active
                  ? 'bg-violet-50 text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${item.active ? 'text-violet-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.label}</span>
              </span>
              {item.count ? <span className="text-xs text-slate-400">{item.count}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <div className="rounded-lg border border-slate-200 p-2 text-slate-500">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-medium">Task status</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        {summaryStats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[40px] font-semibold leading-none tracking-tight text-slate-900">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mb-4 grid h-14 grid-cols-8 gap-1 overflow-hidden rounded-2xl bg-slate-50 p-1">
        {['bg-indigo-500', 'bg-violet-400', 'bg-violet-300', 'bg-violet-200', 'bg-purple-200', 'bg-fuchsia-200', 'bg-violet-200', 'bg-purple-100'].map((c, i) => (
          <div key={i} className={`${c} rounded-xl opacity-${i === 0 ? '90' : '80'}`} />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>8:23</span>
        <span>9:23</span>
      </div>
    </div>
  );
}

function CommentsCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800">
              <div className="rounded-lg border border-slate-200 p-2 text-slate-500">
                <Inbox className="h-4 w-4" />
              </div>
              <span className="text-[15px] font-medium">Comments</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-[42px] font-semibold leading-none text-slate-900">109</div>
          <div className="mt-2 text-sm font-medium text-rose-500">+10.2% <span className="font-normal text-slate-400">(29)</span></div>
          <div className="mt-4 h-20 rounded-2xl bg-[radial-gradient(circle_at_20%_70%,rgba(99,102,241,.25)_2px,transparent_3px),radial-gradient(circle_at_35%_50%,rgba(59,130,246,.4)_2px,transparent_3px),radial-gradient(circle_at_50%_60%,rgba(99,102,241,.45)_2px,transparent_3px),radial-gradient(circle_at_65%_35%,rgba(251,146,60,.35)_2px,transparent_3px),linear-gradient(135deg,rgba(255,255,255,0),rgba(99,102,241,.18))]" />
        </div>
        <div className="border-t border-slate-100 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[15px] font-medium text-slate-800">Commits</span>
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-[34px] font-semibold leading-none text-slate-900">27</div>
          <div className="mt-2 text-sm font-medium text-emerald-600">+2.9% <span className="font-normal text-slate-400">(29)</span></div>
          <div className="mt-4 flex h-16 items-end gap-2 rounded-2xl bg-slate-50 px-3 py-3">
            {[8, 12, 10, 18, 28, 40, 24, 14].map((h, i) => (
              <div
                key={i}
                className={`w-3 rounded-full ${i === 5 ? 'bg-amber-400' : i === 4 ? 'bg-orange-300' : 'bg-slate-200'}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BurndownCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-medium text-slate-900">Burndown chart <span className="font-normal text-slate-400">(estimate points)</span></div>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-400" />
      </div>
      <div className="relative h-[204px] overflow-hidden rounded-2xl border border-slate-100 bg-[linear-gradient(to_bottom,transparent_24%,rgba(148,163,184,.15)_25%,transparent_26%,transparent_49%,rgba(148,163,184,.15)_50%,transparent_51%,transparent_74%,rgba(148,163,184,.15)_75%,transparent_76%)]">
        <svg viewBox="0 0 420 210" className="h-full w-full">
          <path d="M20 36 H90 V52 H150 V70 H205 V84 H245 V118 H295 V140 H350 V146 H388 V186 H406" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 30 H140 V48 H176 V62 H215 V110 H250 V122 H280 V160 H332 V168 H398" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function TaskCard({
  card,
}: {
  card: {
    code: string;
    priority: keyof typeof badgeMap;
    title: string;
    subtitle: string;
    due: string;
    comments: number;
    files: number;
  };
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span>{card.code}</span>
          <span className={`rounded-full border px-2 py-0.5 font-medium ${badgeMap[card.priority]}`}>{card.priority}</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-300" />
      </div>
      <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">{card.title}</h3>
      <p className="mt-1 text-sm text-slate-400">{card.subtitle}</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        <CalendarDays className="h-4 w-4" />
        <span>Due to</span>
        <span className="font-medium text-slate-700">{card.due}</span>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 text-[10px] font-semibold text-slate-700"
            >
              {['RK', 'AJ', 'MS'][i]}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Inbox className="h-3.5 w-3.5" /> {card.comments}
          </span>
          <span>{card.files}</span>
        </div>
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  count,
  tone,
  cards,
}: {
  title: string;
  count: number;
  tone: string;
  cards: any[];
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-[#fcfcfe] p-3 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
      <div className="mb-3 flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${toneMap[tone]}`} />
          <h4 className="text-[15px] font-semibold text-slate-800">{title}</h4>
          <span className="text-sm text-slate-400">{count}</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-300" />
      </div>
      <div className="space-y-3">
        {cards.map((card) => (
          <TaskCard key={card.code} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f1f8] p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] overflow-hidden rounded-[32px] border border-white/60 bg-[#f8f7fb] shadow-[0_30px_80px_rgba(148,163,184,0.16)]">
        <aside className="hidden w-[280px] shrink-0 border-r border-slate-200/80 bg-[#fbfbfe] px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-200 via-violet-200 to-indigo-200 shadow-inner">
                <div className="h-5 w-5 rounded-full bg-white/90" />
              </div>
              <div>
                <div className="text-base font-semibold text-slate-900">NexusCRM</div>
                <div className="text-sm text-slate-400">nexuscrm.com</div>
              </div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-slate-300" />
          </div>

          <div className="space-y-6">
            <SidebarSection items={navMain} />
            <SidebarSection title="Tools" items={navTools} />
            <SidebarSection title="Metrics" items={navMetrics} />
          </div>

          <div className="mt-auto space-y-2 pt-8">
            {[
              { label: 'Help Center', icon: HelpCircle },
              { label: 'Settings', icon: Settings },
              { label: 'Invite team', icon: Plus },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="mt-4 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 via-amber-100 to-violet-100 font-semibold text-slate-700">
                  RC
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">rohanchauhan223</div>
                  <div className="truncate text-xs text-slate-400">rohan@nexuscrm.com</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200/70 bg-[#f8f7fb]/90 px-5 py-4 backdrop-blur-xl md:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span>Tasks</span>
                <span>›</span>
                <span className="font-medium text-slate-700">Tasks report</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-12 min-w-[280px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="Search"
                  />
                  <ChevronDown className="h-4 w-4 text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                    Manage
                  </button>
                  <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                    <span className="inline-flex items-center gap-2"><Share2 className="h-4 w-4" /> Share</span>
                  </button>
                  <button className="rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_26px_rgba(139,92,246,0.28)] transition hover:bg-violet-600">
                    Create task
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-[42px] font-semibold tracking-[-0.03em] text-slate-900">Tasks report</h1>
                <p className="mt-3 max-w-2xl text-[17px] leading-8 text-slate-500">
                  Stay on top of your tasks, monitor progress, and track status. Streamline your workflow and transform how you deliver results.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 text-[10px] font-semibold text-slate-700"
                  >
                    {['RK', 'AJ', 'MS', 'NK'][i]}
                  </div>
                ))}
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr_1.6fr]">
              <StatCard />
              <CommentsCard />
              <BurndownCard />
            </div>

            <div className="mt-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="inline-flex w-fit items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                {['Spreadsheet', 'Board', 'Calendar', 'Timeline'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      i === 0 ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button className="px-3 text-slate-400">•••</button>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  Widgets
                </button>
                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  Filter
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 2xl:grid-cols-4 xl:grid-cols-2">
              {columns.map((column) => (
                <TaskColumn key={column.title} {...column} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
