"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// ----------------------------------------------------
// TypeScript Interfaces
// ----------------------------------------------------
interface StatCard {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  trend: "up" | "down";
  trendValue: string;
  trendColor: string;
}

interface DealStage {
  name: string;
  count: number;
  percentage: number;
  barColor: string;
}

interface AccountManager {
  id: string;
  initials: string;
  name: string;
  totalManaged: string;
  conversion: string;
  status: "Top Tier" | "Steady" | "At Risk";
  revenue: string;
}

// ----------------------------------------------------
// Static Data
// ----------------------------------------------------
const statCards: StatCard[] = [
  {
    label: "TOTAL REVENUE",
    value: "$1,284,500",
    icon: "payments",
    iconColor: "text-primary-fixed-dim",
    trend: "up",
    trendValue: "+12.4% vs last month",
    trendColor: "text-tertiary-fixed-dim",
  },
  {
    label: "CONVERSION RATE",
    value: "24.8%",
    icon: "target",
    iconColor: "text-secondary-fixed-dim",
    trend: "down",
    trendValue: "-1.2% vs last month",
    trendColor: "text-error",
  },
  {
    label: "ACTIVE CLIENTS",
    value: "1,402",
    icon: "person_celebrate",
    iconColor: "text-tertiary-fixed-dim",
    trend: "up",
    trendValue: "+42 new this week",
    trendColor: "text-tertiary-fixed-dim",
  },
];

const dealStages: DealStage[] = [
  { name: "Prospecting", count: 42, percentage: 28, barColor: "bg-outline" },
  { name: "Qualification", count: 31, percentage: 21, barColor: "bg-secondary-fixed-dim" },
  { name: "Proposal Sent", count: 54, percentage: 36, barColor: "bg-tertiary-fixed-dim" },
  { name: "Negotiation", count: 22, percentage: 15, barColor: "bg-primary" },
];

const accountManagers: AccountManager[] = [
  { id: "am-1", initials: "JD", name: "Jane Doe", totalManaged: "142 Deals", conversion: "32.4%", status: "Top Tier", revenue: "$420,000" },
  { id: "am-2", initials: "MS", name: "Marcus Smith", totalManaged: "98 Deals", conversion: "28.1%", status: "Steady", revenue: "$315,500" },
  { id: "am-3", initials: "AK", name: "Anya Kostic", totalManaged: "114 Deals", conversion: "24.5%", status: "At Risk", revenue: "$290,000" },
];

// ----------------------------------------------------
// Helper Functions
// ----------------------------------------------------
const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Top Tier":
      return "bg-tertiary-fixed/10 text-tertiary-fixed-dim";
    case "Steady":
      return "bg-secondary-fixed-dim/10 text-secondary-fixed-dim";
    case "At Risk":
      return "bg-error/10 text-error";
    default:
      return "bg-outline/10 text-outline";
  }
};

// ----------------------------------------------------
// Main React Component
// ----------------------------------------------------
export default function ReportsPage() {
  const [chartMode, setChartMode] = useState<"MONTHLY" | "QUARTERLY">("MONTHLY");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter managers by search
  const filteredManagers = accountManagers.filter((am) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      am.name.toLowerCase().includes(q) ||
      am.status.toLowerCase().includes(q) ||
      am.revenue.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">

        <Header
          title="Reports"
          searchPlaceholder="Search analytics..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md">
              <span className="material-symbols-outlined mr-1.5 text-[18px]">download</span>
              Export
            </button>
          }
        />

        {/* 3. Content Canvas */}
        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto space-y-gutter">

          {/* Quick Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{card.label}</span>
                  <span className={`material-symbols-outlined ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary">{card.value}</div>
                  <div className={`flex items-center mt-2 ${card.trendColor}`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">
                      {card.trend === "up" ? "trending_up" : "trending_down"}
                    </span>
                    <span className="text-body-sm">{card.trendValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

            {/* Revenue Velocity Chart */}
            <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">Revenue Velocity</h3>
                  <p className="text-body-sm text-on-surface-variant">Tracking monthly performance across all sectors</p>
                </div>
                <div className="flex bg-surface-container-highest p-1 rounded-lg">
                  <button
                    onClick={() => setChartMode("MONTHLY")}
                    className={`px-3 py-1 text-label-caps rounded-md transition-all cursor-pointer ${
                      chartMode === "MONTHLY"
                        ? "bg-background text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    MONTHLY
                  </button>
                  <button
                    onClick={() => setChartMode("QUARTERLY")}
                    className={`px-3 py-1 text-label-caps rounded-md transition-all cursor-pointer ${
                      chartMode === "QUARTERLY"
                        ? "bg-background text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    QUARTERLY
                  </button>
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="relative h-64 w-full flex items-end justify-between px-2">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-10">
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                  <div className="w-full h-[1px] bg-outline"></div>
                </div>

                {/* Chart SVG */}
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

                {/* X-axis labels */}
                <div className="relative w-full flex justify-between pt-4">
                  {chartMode === "MONTHLY" ? (
                    <>
                      {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"].map((m) => (
                        <span key={m} className="text-[10px] text-on-surface-variant font-label-caps">{m}</span>
                      ))}
                    </>
                  ) : (
                    <>
                      {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                        <span key={q} className="text-[10px] text-on-surface-variant font-label-caps">{q}</span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Deal Stages Panel */}
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Deal Stages</h3>
              <p className="text-body-sm text-on-surface-variant mb-6">Distribution of open opportunities</p>

              <div className="space-y-6">
                {dealStages.map((stage) => (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex justify-between text-label-caps text-[10px]">
                      <span className="text-on-surface-variant uppercase">{stage.name}</span>
                      <span className="text-primary">{stage.count} ({stage.percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stage.barColor} rounded-full transition-all duration-700`}
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
                <span className="text-body-sm text-on-surface-variant font-medium">Total Pipeline Value</span>
                <span className="font-headline-md text-headline-md text-primary">$4.2M</span>
              </div>
            </div>
          </div>

          {/* Performance Breakdown Table */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md text-headline-md text-primary">Performance Breakdown</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
                </button>
                <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-highest/30">
                    <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">Account Manager</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">Total Managed</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">Conversion</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant text-right">Revenue Generated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredManagers.map((am) => (
                    <tr key={am.id} className="hover:bg-surface-container transition-colors group cursor-pointer">
                      <td className="px-6 py-4 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                          {am.initials}
                        </div>
                        <span className="text-body-md font-medium">{am.name}</span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{am.totalManaged}</td>
                      <td className="px-6 py-4">{am.conversion}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyle(am.status)}`}>
                          {am.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-primary">{am.revenue}</td>
                    </tr>
                  ))}
                  {filteredManagers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-outline/50 font-label-caps text-label-caps">
                        No managers match your query
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
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
