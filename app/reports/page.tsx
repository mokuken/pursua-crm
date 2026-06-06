"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const clients = [
  { name: "Nebula Softworks", status: "Active", value: 45000, industry: "Technology", health: 98.4 },
  { name: "Vertex Media", status: "Negotiation", value: 128500, industry: "Media & Entertainment", health: 87.5 },
  { name: "Optic Prime", status: "Active", value: 12000, industry: "Healthcare", health: 94.0 },
  { name: "Flow Logistics", status: "Dormant", value: 94200, industry: "Logistics", health: 62.1 },
];

const projects = [
  { name: "Quantum Infrastructure", client: "Nebula Softworks", status: "In Progress", value: 45000, budget: 50000, spent: 32000 },
  { name: "Helius Branding", client: "Nebula Softworks", status: "On Hold", value: 28500, budget: 30000, spent: 15000 },
  { name: "Atlas API v2", client: "Vertex Media", status: "Completed", value: 128500, budget: 150000, spent: 128000 },
  { name: "Apex Dashboard", client: "Optic Prime", status: "In Progress", value: 12000, budget: 15000, spent: 4000 },
  { name: "Project Phoenix", client: "Flow Logistics", status: "In Progress", value: 94200, budget: 100000, spent: 88000 },
];

const tasks = [
  { title: "Update Client Portal UI", project: "Quantum Infrastructure", priority: "MEDIUM", status: "TO DO" },
  { title: "Critical Security Patch", project: "Atlas API v2", priority: "HIGH", status: "TO DO" },
  { title: "API Documentation Refactor", project: "Quantum Infrastructure", priority: "LOW", status: "IN PROGRESS" },
  { title: "Financial Module Audit", project: "Project Phoenix", priority: "MEDIUM", status: "IN REVIEW" },
  { title: "Database Migration", project: "Apex Dashboard", priority: "LOW", status: "DONE" },
];

const payments = [
  { client: "Nebula Softworks", project: "Quantum Infrastructure", total: 45000, paid: 45000, outstanding: 0, status: "Paid" },
  { client: "Nebula Softworks", project: "Helius Branding", total: 28500, paid: 15000, outstanding: 13500, status: "Partially Paid" },
  { client: "Vertex Media", project: "Atlas API v2", total: 128500, paid: 128500, outstanding: 0, status: "Paid" },
  { client: "Optic Prime", project: "Apex Dashboard", total: 12000, paid: 6000, outstanding: 6000, status: "Pending" },
  { client: "Flow Logistics", project: "Project Phoenix", total: 94200, paid: 0, outstanding: 94200, status: "Overdue" },
];

const teamMembers = [
  { name: "Marcus Aurelius", role: "Lead Architect" },
  { name: "Jane Doe", role: "Senior Developer" },
  { name: "Marcus Smith", role: "Project Manager" },
  { name: "Anya Kostic", role: "Designer" },
  { name: "John Smith", role: "Developer" },
  { name: "Sarah Connor", role: "QA Lead" },
];

const monthlyData = [
  { month: "JAN", revenue: 45000, expenses: 28000, tasks: 1 },
  { month: "FEB", revenue: 32000, expenses: 22000, tasks: 0 },
  { month: "MAR", revenue: 15000, expenses: 18000, tasks: 0 },
  { month: "APR", revenue: 28500, expenses: 15000, tasks: 1 },
  { month: "MAY", revenue: 94000, expenses: 35000, tasks: 0 },
  { month: "JUN", revenue: 6000, expenses: 12000, tasks: 1 },
  { month: "JUL", revenue: 105000, expenses: 45000, tasks: 2 },
  { month: "AUG", revenue: 72000, expenses: 32000, tasks: 1 },
  { month: "SEP", revenue: 88000, expenses: 38000, tasks: 0 },
  { month: "OCT", revenue: 54000, expenses: 26000, tasks: 2 },
  { month: "NOV", revenue: 96000, expenses: 42000, tasks: 0 },
  { month: "DEC", revenue: 120000, expenses: 52000, tasks: 1 },
];

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(val);

const totalClients = clients.length;
const activeClients = clients.filter((c) => c.status === "Active").length;
const totalProjects = projects.length;
const activeProjects = projects.filter((p) => p.status === "In Progress").length;
const totalProjectValue = projects.reduce((s, p) => s + p.value, 0);
const totalPaid = payments.reduce((s, p) => s + p.paid, 0);
const totalOutstanding = totalProjectValue - totalPaid;
const overdueAmount = payments.filter((p) => p.status === "Overdue").reduce((s, p) => s + p.outstanding, 0);
const totalNotes = 9;

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    "Active": "bg-green-500/10 text-green-400 border-green-500/20",
    "Negotiation": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Dormant": "bg-surface-container-highest text-on-surface-variant border-outline-variant",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "On Hold": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Completed": "bg-tertiary-fixed/10 text-tertiary-fixed border-tertiary-fixed/20",
    "Paid": "bg-tertiary-fixed/10 text-tertiary-fixed border-tertiary-fixed/20",
    "Partially Paid": "bg-secondary-fixed-dim/10 text-secondary-fixed-dim border-secondary-fixed-dim/20",
    "Pending": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Overdue": "bg-error/10 text-error border-error/20",
    "TO DO": "bg-outline/10 text-outline border-outline/20",
    "IN PROGRESS": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "IN REVIEW": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "DONE": "bg-tertiary-fixed/10 text-tertiary-fixed border-tertiary-fixed/20",
  };
  return map[status] || "bg-surface-container-highest text-on-surface-variant border-outline-variant";
};

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

function PieChart({ slices, size = 140 }: { slices: PieSlice[]; size?: number }) {
  const total = slices.reduce((s, s2) => s + s2.value, 0);
  if (total === 0) return null;
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;
  const paths = slices.map((slice) => {
    const pct = slice.value / total;
    const angle = pct * 360;
    const startRad = ((cumulative - 90) * Math.PI) / 180;
    const endRad = ((cumulative + angle - 90) * Math.PI) / 180;
    cumulative += angle;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;
    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: slice.color,
      pct: Math.round(pct * 100),
      label: slice.label,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map((p, i) => (
          <path key={i} d={p.path} fill={p.color} stroke="var(--color-background)" strokeWidth="1.5" className="transition-all duration-500 hover:opacity-80" />
        ))}
        {total === 0 && <circle cx={cx} cy={cy} r={r} fill="var(--color-surface-container-highest)" />}
      </svg>
    </div>
  );
}

function PieChartLegend({ slices }: { slices: PieSlice[] }) {
  const total = slices.reduce((s, s2) => s + s2.value, 0);
  return (
    <div className="space-y-2">
      {slices.map((s) => (
        <div key={s.label} className="flex items-center justify-between text-[10px] font-label-caps">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-on-surface-variant uppercase">{s.label}</span>
          </div>
          <span className="text-primary">{total > 0 ? Math.round(s.value / total * 100) : 0}%</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, height = 160 }: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const vbW = 100;
  const vbH = 30;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15 || 1;
  const w = data.length;
  const pts = data.map((d, i) => ({
    x: (i / (w - 1)) * vbW,
    y: vbH - (d.value / maxVal) * (vbH - 8) - 4,
    value: d.value,
    label: d.label,
  }));
  const smoothD = pts.length > 1
    ? pts.reduce((acc, p, i, arr) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = arr[i - 1];
        const next = arr[i + 1] || arr[i];
        const pprev = arr[i - 2] || prev;
        const tension = 0.2;
        const cp1x = prev.x + (p.x - pprev.x) * tension;
        const cp1y = prev.y + (p.y - pprev.y) * tension;
        const cp2x = p.x - (next.x - prev.x) * tension;
        const cp2y = p.y - (next.y - prev.y) * tension;
        return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
      }, "")
    : `M ${pts[0]?.x ?? 0} ${pts[0]?.y ?? 0}`;
  const areaD = `${smoothD} L ${vbW} ${vbH} L 0 ${vbH} Z`;

  return (
    <div className="relative" style={{ height }}>
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${vbW} ${vbH}`}>
        <defs>
          <linearGradient id="lineArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((pct) => (
          <line key={pct} x1="0" y1={(vbH - 4) * (1 - pct) + 2} x2={vbW} y2={(vbH - 4) * (1 - pct) + 2} stroke="var(--color-outline-variant)" strokeOpacity="0.15" strokeWidth="1" />
        ))}
        <path d={areaD} fill="url(#lineArea)" />
        <path d={smoothD} fill="none" stroke="var(--color-primary)" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d) => (
          <span key={d.label} className="text-[8px] text-outline font-label-caps">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeam = teamMembers.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q);
  });

  const clientStatusSlices: PieSlice[] = [
    { label: "Active", value: clients.filter((c) => c.status === "Active").length, color: "#22c55e" },
    { label: "Negotiation", value: clients.filter((c) => c.status === "Negotiation").length, color: "#f59e0b" },
    { label: "Dormant", value: clients.filter((c) => c.status === "Dormant").length, color: "#64748b" },
  ];

  const projectStatusSlices: PieSlice[] = [
    { label: "In Progress", value: projects.filter((p) => p.status === "In Progress").length, color: "#3b82f6" },
    { label: "On Hold", value: projects.filter((p) => p.status === "On Hold").length, color: "#f59e0b" },
    { label: "Completed", value: projects.filter((p) => p.status === "Completed").length, color: "#2dd4bf" },
  ];

  const taskStatusSlices: PieSlice[] = [
    { label: "TO DO", value: tasks.filter((t) => t.status === "TO DO").length, color: "#64748b" },
    { label: "IN PROGRESS", value: tasks.filter((t) => t.status === "IN PROGRESS").length, color: "#3b82f6" },
    { label: "IN REVIEW", value: tasks.filter((t) => t.status === "IN REVIEW").length, color: "#8b5cf6" },
    { label: "DONE", value: tasks.filter((t) => t.status === "DONE").length, color: "#2dd4bf" },
  ];

  const paymentSlices: PieSlice[] = [
    { label: "Paid", value: payments.filter((p) => p.status === "Paid").reduce((s, p2) => s + p2.total, 0), color: "#2dd4bf" },
    { label: "Partially Paid", value: payments.filter((p) => p.status === "Partially Paid").reduce((s, p2) => s + p2.total, 0), color: "#64748b" },
    { label: "Pending", value: payments.filter((p) => p.status === "Pending").reduce((s, p2) => s + p2.total, 0), color: "#f59e0b" },
    { label: "Overdue", value: payments.filter((p) => p.status === "Overdue").reduce((s, p2) => s + p2.total, 0), color: "#ef4444" },
  ];

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header
          title="Reports"
          searchPlaceholder="Search team members..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={<></>}
        />

        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto space-y-gutter">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">TOTAL CLIENTS</span>
                <span className="material-symbols-outlined text-primary-fixed-dim">groups</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-primary">{totalClients}</div>
                <div className="flex items-center mt-2 text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                  <span className="text-body-sm">{activeClients} active</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE PROJECTS</span>
                <span className="material-symbols-outlined text-secondary-fixed-dim">rocket_launch</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-primary">{activeProjects} / {totalProjects}</div>
                <div className="flex items-center mt-2 text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined text-[16px] mr-1">pending</span>
                  <span className="text-body-sm">{projects.filter((p) => p.status === "On Hold").length} on hold</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">REVENUE RECEIVED</span>
                <span className="material-symbols-outlined text-tertiary-fixed-dim">account_balance_wallet</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-primary">{formatCurrency(totalPaid)}</div>
                <div className="flex items-center mt-2 text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                  <span className="text-body-sm">{Math.round(totalPaid / totalProjectValue * 100)}% collected</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">OUTSTANDING</span>
                <span className="material-symbols-outlined text-error">hourglass_empty</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-primary">{formatCurrency(totalOutstanding)}</div>
                <div className="flex items-center mt-2 text-error">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_down</span>
                  <span className="text-body-sm">{formatCurrency(overdueAmount)} overdue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 1: Revenue Trend + Task Priority */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-headline-md text-headline-md text-primary">Revenue Trend</h3>
                <span className="font-headline-md text-[16px] text-primary font-bold">{formatCurrency(monthlyData.reduce((s, m) => s + m.revenue, 0))}</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-4">Monthly revenue progression — FY 2024</p>
              <LineChart
                data={monthlyData.map((m) => ({ label: m.month, value: m.revenue }))}
                height={220}
              />
              <div className="mt-4 pt-4 border-t border-outline-variant grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[9px] font-label-caps text-outline uppercase">Highest Month</div>
                  <div className="text-body-sm text-primary font-semibold">{formatCurrency(Math.max(...monthlyData.map((m) => m.revenue)))}</div>
                </div>
                <div>
                  <div className="text-[9px] font-label-caps text-outline uppercase">Lowest Month</div>
                  <div className="text-body-sm text-primary font-semibold">{formatCurrency(Math.min(...monthlyData.map((m) => m.revenue)))}</div>
                </div>
                <div>
                  <div className="text-[9px] font-label-caps text-outline uppercase">Monthly Average</div>
                  <div className="text-body-sm text-primary font-semibold">{formatCurrency(Math.round(monthlyData.reduce((s, m) => s + m.revenue, 0) / monthlyData.length))}</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Payment Distribution</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">By total value per status</p>
              <div className="flex items-center gap-6">
                <PieChart slices={paymentSlices} size={130} />
                <div className="flex-1">
                  <PieChartLegend slices={paymentSlices} />
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-outline-variant space-y-2.5">
                <h4 className="font-label-caps text-label-caps text-outline uppercase mb-2">Per Project</h4>
                {payments.map((p) => (
                  <div key={p.project} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        p.status === "Paid" ? "bg-tertiary-fixed" : p.status === "Partially Paid" ? "bg-secondary-fixed-dim" : p.status === "Overdue" ? "bg-error" : "bg-amber-500"
                      }`} />
                      <span className="text-[10px] text-on-surface-variant truncate max-w-[100px] font-label-caps">{p.project}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-label-caps">
                      <span className={p.outstanding === 0 ? "text-error" : "text-tertiary-fixed"}>{formatCurrency(p.outstanding)}</span>
                      <span className="text-outline">/</span>
                      <span className="text-primary">{formatCurrency(p.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Client Status</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Distribution by status</p>
              <div className="flex items-center gap-6">
                <PieChart slices={clientStatusSlices} size={130} />
                <div className="flex-1">
                  <PieChartLegend slices={clientStatusSlices} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Project Status</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Distribution across phases</p>
              <div className="flex items-center gap-6">
                <PieChart slices={projectStatusSlices} size={130} />
                <div className="flex-1">
                  <PieChartLegend slices={projectStatusSlices} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Task Status</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Distribution by progress</p>
              <div className="flex items-center gap-6">
                <PieChart slices={taskStatusSlices} size={130} />
                <div className="flex-1">
                  <PieChartLegend slices={taskStatusSlices} />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Project Pipeline + Team */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

            {/* Project Pipeline Table */}
            <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-headline-md text-headline-md text-primary">Project Pipeline</h3>
                <span className="text-body-sm text-on-surface-variant">{formatCurrency(totalProjectValue)} total</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-6">All projects with budget tracking</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="pb-3 font-label-caps text-label-caps text-outline text-[10px] uppercase">Project</th>
                      <th className="pb-3 font-label-caps text-label-caps text-outline text-[10px] uppercase">Client</th>
                      <th className="pb-3 font-label-caps text-label-caps text-outline text-[10px] uppercase">Status</th>
                      <th className="pb-3 font-label-caps text-label-caps text-outline text-[10px] uppercase text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {projects.map((p) => (
                      <tr key={p.name} className="hover:bg-surface-container-high/30 transition-colors">
                        <td className="py-3 pr-4">
                          <span className="text-primary text-body-sm font-medium">{p.name}</span>
                        </td>
                        <td className="py-3 pr-4 text-on-surface-variant text-body-sm">{p.client}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-label-caps ${statusBadge(p.status)}`}>{p.status}</span>
                        </td>
                        <td className="py-3 text-right text-primary font-semibold text-body-sm">{formatCurrency(p.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team & Activity */}
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Team & Activity</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Members & notes overview</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-highest/30 rounded-lg p-4">
                  <span className="material-symbols-outlined text-primary text-[20px] mb-2">group</span>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold">{teamMembers.length}</div>
                  <div className="text-[9px] font-label-caps text-outline uppercase mt-1">Team Members</div>
                </div>
                <div className="bg-surface-container-highest/30 rounded-lg p-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px] mb-2">note_stack</span>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold">{totalNotes}</div>
                  <div className="text-[9px] font-label-caps text-outline uppercase mt-1">Total Notes</div>
                </div>
              </div>

              <h4 className="font-label-caps text-label-caps text-outline uppercase mb-3">Team Roster</h4>
              <div className="space-y-3">
                {filteredTeam.slice(0, 2).map((member) => (
                  <div key={member.name} className="flex items-center justify-between border-b border-outline-variant/30 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-[9px] font-bold text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-primary text-body-sm font-medium">{member.name}</p>
                        <p className="text-outline text-[9px] font-label-caps">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTeam.length === 0 && (
                  <div className="text-center text-outline/50 font-label-caps text-label-caps py-4">No members match your query</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-auto px-margin-desktop py-4 border-t border-outline-variant bg-surface-container-low/50">
          <div className="flex justify-between items-center text-on-surface-variant max-w-container-max mx-auto">
            <div className="flex items-center space-x-4">
              <span className="text-[11px] font-label-caps">LIVE DASHBOARD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="text-[11px] font-label-caps">ALL DATA FROM CURRENT WORKSPACE</span>
            </div>
            <div className="flex space-x-6 text-[11px] font-label-caps">
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">EXPORT PDF</a>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">EXPORT CSV</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
