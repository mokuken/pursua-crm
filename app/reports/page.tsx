"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface StatCard {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  trend: "up" | "down";
  trendValue: string;
  trendColor: string;
}

interface ClientRevenue {
  name: string;
  revenue: number;
  percentage: number;
  projects: number;
  barColor: string;
}

const totalContractValue = 308700;
const totalRevenueReceived = 189500;
const outstandingBalance = totalContractValue - totalRevenueReceived;
const overdueAmount = 94200;
const averageProjectValue = Math.round(totalContractValue / 5);
const activeProjectsValue = 151200;
const completedProjectsValue = 128500;
const onHoldProjectsValue = 28500;

const statCards: StatCard[] = [
  {
    label: "TOTAL CONTRACT VALUE",
    value: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(totalContractValue),
    icon: "payments",
    iconColor: "text-primary-fixed-dim",
    trend: "up",
    trendValue: "+8.3% vs last quarter",
    trendColor: "text-tertiary-fixed-dim",
  },
  {
    label: "REVENUE RECEIVED",
    value: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(totalRevenueReceived),
    icon: "account_balance_wallet",
    iconColor: "text-secondary-fixed-dim",
    trend: "up",
    trendValue: "61.4% collected",
    trendColor: "text-tertiary-fixed-dim",
  },
  {
    label: "OUTSTANDING BALANCE",
    value: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(outstandingBalance),
    icon: "hourglass_empty",
    iconColor: "text-tertiary-fixed-dim",
    trend: "down",
    trendValue: `${new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(overdueAmount)} overdue`,
    trendColor: "text-error",
  },
  {
    label: "AVERAGE PROJECT VALUE",
    value: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(averageProjectValue),
    icon: "analytics",
    iconColor: "text-primary",
    trend: "up",
    trendValue: "5 active projects",
    trendColor: "text-tertiary-fixed-dim",
  },
];

const revenueByStatus = [
  { name: "Active Projects", value: activeProjectsValue, percentage: Math.round(activeProjectsValue / totalContractValue * 100), barColor: "bg-secondary" },
  { name: "Completed Projects", value: completedProjectsValue, percentage: Math.round(completedProjectsValue / totalContractValue * 100), barColor: "bg-tertiary-fixed" },
  { name: "On Hold Projects", value: onHoldProjectsValue, percentage: Math.round(onHoldProjectsValue / totalContractValue * 100), barColor: "bg-outline" },
];

const clientRevenues: ClientRevenue[] = [
  { name: "Nebula Softworks", revenue: 73500, percentage: 24, projects: 2, barColor: "bg-secondary" },
  { name: "Vertex Media", revenue: 128500, percentage: 42, projects: 1, barColor: "bg-primary" },
  { name: "Optic Prime", revenue: 12000, percentage: 4, projects: 1, barColor: "bg-tertiary-fixed" },
  { name: "Flow Logistics", revenue: 94200, percentage: 30, projects: 1, barColor: "bg-secondary-fixed-dim" },
];

const paymentStatusDistribution = [
  { label: "Paid", count: 2, percentage: 40, barColor: "bg-tertiary-fixed" },
  { label: "Partially Paid", count: 1, percentage: 20, barColor: "bg-secondary-fixed-dim" },
  { label: "Pending", count: 1, percentage: 20, barColor: "bg-amber-500" },
  { label: "Overdue", count: 1, percentage: 20, barColor: "bg-error" },
];

const teamUtilization = [
  { name: "Marcus Aurelius", role: "Lead Architect", tasks: 4, hours: 120 },
  { name: "Jane Doe", role: "Senior Developer", tasks: 3, hours: 96 },
  { name: "Marcus Smith", role: "Project Manager", tasks: 5, hours: 88 },
  { name: "Anya Kostic", role: "Designer", tasks: 2, hours: 64 },
  { name: "John Smith", role: "Developer", tasks: 3, hours: 72 },
  { name: "Sarah Connor", role: "QA Lead", tasks: 2, hours: 56 },
];

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(val);

export default function ReportsPage() {
  const [chartMode, setChartMode] = useState<"MONTHLY" | "QUARTERLY">("MONTHLY");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeam = teamUtilization.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header
          title="Reports"
          searchPlaceholder="Search analytics..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={<></>}
        />

        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto space-y-gutter">

          {/* Quick Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {statCards.map((card) => (
              <div key={card.label} className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{card.label}</span>
                  <span className={`material-symbols-outlined ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary">{card.value}</div>
                  <div className={`flex items-center mt-2 ${card.trendColor}`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{card.trend === "up" ? "trending_up" : "trending_down"}</span>
                    <span className="text-body-sm">{card.trendValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

            {/* Revenue Timeline Chart */}
            <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">Revenue Timeline</h3>
                  <p className="text-body-sm text-on-surface-variant">Monthly revenue trend across all projects</p>
                </div>
                <div className="flex bg-surface-container-highest p-1 rounded-lg">
                  <button onClick={() => setChartMode("MONTHLY")} className={`px-3 py-1 text-label-caps rounded-md transition-all cursor-pointer ${chartMode === "MONTHLY" ? "bg-background text-primary" : "text-on-surface-variant hover:text-primary"}`}>MONTHLY</button>
                  <button onClick={() => setChartMode("QUARTERLY")} className={`px-3 py-1 text-label-caps rounded-md transition-all cursor-pointer ${chartMode === "QUARTERLY" ? "bg-background text-primary" : "text-on-surface-variant hover:text-primary"}`}>QUARTERLY</button>
                </div>
              </div>

              <div className="relative h-64 w-full flex items-end justify-between px-2">
                <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-10">
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                </div>

                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {chartMode === "MONTHLY" ? (
                    <>
                      <path d="M0,80 Q25,40 50,60 T100,20 L100,100 L0,100 Z" fill="url(#areaGradient)" />
                      <path d="M0,80 Q25,40 50,60 T100,20" fill="none" stroke="white" strokeWidth="0.5" />
                    </>
                  ) : (
                    <>
                      <path d="M0,70 Q20,55 40,45 T80,30 T100,15 L100,100 L0,100 Z" fill="url(#areaGradient)" />
                      <path d="M0,70 Q20,55 40,45 T80,30 T100,15" fill="none" stroke="white" strokeWidth="0.5" />
                    </>
                  )}
                </svg>

                <div className="relative w-full flex justify-between pt-4">
                  {chartMode === "MONTHLY" ? (
                    ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"].map((m) => (
                      <span key={m} className="text-[10px] text-on-surface-variant font-label-caps">{m}</span>
                    ))
                  ) : (
                    ["Q1", "Q2", "Q3", "Q4"].map((q) => (
                      <span key={q} className="text-[10px] text-on-surface-variant font-label-caps">{q}</span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Revenue by Status Panel */}
            <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Revenue by Status</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Distribution across project statuses</p>

              <div className="space-y-6">
                {revenueByStatus.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-label-caps text-[10px]">
                      <span className="text-on-surface-variant uppercase">{item.name}</span>
                      <span className="text-primary">{formatCurrency(item.value)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full ${item.barColor} rounded-full transition-all duration-700`} style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-outline text-[9px] font-label-caps">{item.percentage}% of total</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
                <span className="text-body-sm text-on-surface-variant font-medium">Total Portfolio Value</span>
                <span className="font-headline-md text-headline-md text-primary">{formatCurrency(totalContractValue)}</span>
              </div>
            </div>
          </div>

          {/* Second Row: Client Performance + Payment Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Client Performance */}
            <div className="lg:col-span-6 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Client Performance</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Revenue per client</p>
              <div className="space-y-5">
                {clientRevenues.map((client) => (
                  <div key={client.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium text-body-sm">{client.name}</span>
                        <span className="text-outline text-[10px] font-label-caps">{client.projects} project{client.projects > 1 ? "s" : ""}</span>
                      </div>
                      <span className="text-primary font-semibold text-body-sm">{formatCurrency(client.revenue)}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full ${client.barColor} rounded-full transition-all duration-700`} style={{ width: `${client.percentage}%` }} />
                    </div>
                    <span className="text-outline text-[9px] font-label-caps">{client.percentage}% of total revenue</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status Distribution */}
            <div className="lg:col-span-3 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Payment Status</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Distribution across projects</p>
              <div className="space-y-5">
                {paymentStatusDistribution.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-label-caps text-[10px]">
                      <span className="text-on-surface-variant uppercase">{item.label}</span>
                      <span className="text-primary">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full ${item.barColor} rounded-full transition-all duration-700`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Total Received</span>
                  <span className="text-tertiary-fixed font-semibold">{formatCurrency(totalRevenueReceived)}</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Outstanding</span>
                  <span className="text-secondary-fixed-dim font-semibold">{formatCurrency(outstandingBalance)}</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Overdue</span>
                  <span className="text-error font-semibold">{formatCurrency(overdueAmount)}</span>
                </div>
              </div>
            </div>

            {/* Team Utilization */}
            <div className="lg:col-span-3 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Team Utilization</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Hours & tasks per member</p>
              <div className="space-y-4">
                {filteredTeam.map((member) => (
                  <div key={member.name} className="flex items-center justify-between border-b border-outline-variant/30 pb-3 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-[9px] font-bold text-primary">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-primary text-body-sm font-medium">{member.name}</p>
                        <p className="text-outline text-[9px] font-label-caps">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary text-body-sm font-semibold">{member.hours}h</p>
                      <p className="text-outline text-[9px] font-label-caps">{member.tasks} tasks</p>
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
              <span className="text-[11px] font-label-caps">LAST UPDATED: 12 OCT 2023, 14:22 GMT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="text-[11px] font-label-caps">LIVE FEED ACTIVE</span>
            </div>
            <div className="flex space-x-6 text-[11px] font-label-caps">
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">HELP CENTER</a>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">API DOCS</a>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">SYSTEM STATUS</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
