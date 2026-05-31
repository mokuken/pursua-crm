"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: "Admin" | "Manager" | "Editor";
  status: "Online" | "Away (2h)" | "Idle (15m)" | "Offline";
  statusColor: string;
  avatar: string;
}

const members: TeamMember[] = [
  { id: "m1", name: "James Sterling", role: "Systems Architect", badge: "Admin", status: "Online", statusColor: "bg-tertiary-fixed", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE8u4NcmpjFPfD0G29UQlPsze23OfitSdIgFi9Eh0yjxXi-_MyDo3S6YH2OGpFcxtZ5TwsOVtzVeX1tjVtv-IyDx28uttHubxEZMP8P86xO0qPp5IuvCG9VXWxCW_-VatWEXGMQir6RVLQjwrpfvPS6V64Fr7NEihPbIV-SZdlwdUNRvAX3J5j0mV0oGGs2Z6IsM9jSqX8WsdorlAmb7EGGSPa4Jl17poXTvanPtd2qK6kVmkJpStZAQDm7UiHj711rjniKXZ3Ju8" },
  { id: "m2", name: "Elena Vance", role: "Head of Growth", badge: "Manager", status: "Away (2h)", statusColor: "bg-outline", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-bYp6LBOx9Vr82WaTlXOlAe_9mirjGE0N2JSClJxr258VjbdScJ-k3b5YbSmPQVZ7U7EgY1hpiwczc3GXRMcwNqO3V-s69OkSHyMI8K0cvq5NzQo1X3sldJDa5ueVjWM_HkAcn-vmbk5xUwAEJqZYytfKW5UclOoCw6dmallxAwST9edmxduBsmUdFDKNgiZl6NpFgE4P5qq07WpmNdaVpoKkv_yVJPglYbSWf8ZMX-WVukBgB1NEkyRM5HEFd1vAIqV2h5NOA8M" },
  { id: "m3", name: "Marcus Thorne", role: "Content Strategist", badge: "Editor", status: "Online", statusColor: "bg-tertiary-fixed", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBatnH7EQJQhoEXyf5MM8qfrG__VVcXNZeDCt8xyszBowK2LQYoAL2XgdKwVQeC-izZZdUzSKtMnut-GH-DED9YHOgbyqO8hi6foT-1_kp9IX2V8Vxy1waTc2JYUh6VRujRBegbaERlDk06gDXOTdwzEJqGbpt7ZF-asunEaAjuG7ajFPy35aGKFQ5N2Lg5Q4PZFZhTJ-CRSnRWgVJ-56-nnxA4r4q2XhdTbQPoh4vegNLfeJJHWSfR7A4xMety8s5ke4gusDN04M0" },
  { id: "m4", name: "Sarah Jenkins", role: "Operations Director", badge: "Manager", status: "Offline", statusColor: "bg-error", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0XLjzysBUtZUANYwZRpc8p071ZmdVPPU0FTmunLSm7GB8j3pc_-GR-uXL9nvFVjJg0E5IekG05y1hFdIpSBPrVwTvn09YnfHriEByepuX6WH-2jrWfqfC2imDVHx637uM1p9wJqPTM3FD2K63C5Y0OfamJsvt0KvegYDwRM5L_rVZrpy8auZMYH9lUVXe2toPBxYTjkQCvklWIGnacCE9yoWYSpg-WB5kplNrS2acnzZ8baoOaLP-QXfmV1_ILv8qMkcLo8Z_NCA" },
  { id: "m5", name: "Victor Hugo", role: "Security Lead", badge: "Admin", status: "Online", statusColor: "bg-tertiary-fixed", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGtEtQdpVN2tBReM5Qell_thZ0DNe4vRd-JlMPH_pPG2gmZjh0SLn3HifqJhIjx3GFJnmZvKq9FeM76kf792TN-LHjcOrjY6iug9DFpd2BxsBJQt6wWYR8-L_UYKbU8Hz65_Mh7IdnwH5mMd3QDzTgCpiZSkqrFL56kucK6ATykc6ie0BCQDdeELf_OfixFlaqMuqGsdIhi98z46B-ADc3DkDglL_keM19vueFQiu8E3PLfgXMN4xm3X4BYtz3N3DVhnr-Q5X85Uc" },
  { id: "m6", name: "Maya Sterling", role: "UI/UX Researcher", badge: "Editor", status: "Online", statusColor: "bg-tertiary-fixed", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdQg7kO2AlQqg3U1UFNp9DXTe8-MdVBUa4Xk1HJyQtB2_cMPEDngDzG1WiC1m-2UkSWew-g00yw0kuB43m9FS5B5n5k7KRKb2E3KrNtStrKgmHqhpsN9v7NivSSU1jv6B7oleXo5LdR-2eBz5LI7IiOQE81ZFgVnwstv6-A1DsmVX7332cLjgi-5YIu9bbQNCpg-JyAlroG8x3Y2xDPHYzmqbFgm5QYoxHvY9HC672N-mfaEOHUwb8SvBTzgz2Rs93lazT5k7MQe0" },
  { id: "m7", name: "Leo Thorne", role: "Backend Dev", badge: "Editor", status: "Idle (15m)", statusColor: "bg-outline", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc4bpBaBzlcktil5Uy6RAsMB-b2JQMFGbConqeFR6YVQn-OpElrN0vcrHKyv4b2Zx7FpKSZeZMKwobf-5mT0YOzu18kSiZ2oMsx45akg2vzRupjzP7YkKlo0nHkM0W-PZ0BStCsyE8gz5nX7YQ1WZQ-S51fXquZ9ko2p4JukXfD3JmMEK1mP1tll1RoDxwd53iFXkeUfLfuss0EPe-lvzQrbuPnMMDPL9sx2KhOwoebLx6KAmD09xRsK5q07xFc49uNu-sUfjYlek" },
];

const pulseAvatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDVrsu-XvLWDzOPiiy1_4xeQ6CLHed_eMzPOQ7zuPkHo5e0K2cDguionFVsxCTszh_G9KeI4ifk-0o-guVREbWMnLXLn7p4UkHYKRNbtd-NGg_TBFeemURDKR5GNdKf2UNgdLcZoGFxxW3XoAVHCMPJM_jGAsHgmzQP903HbBY8BR8HOFZyABF7XFG8NkeOnH0EVS5YknWPwCbh7Uty1hUgtSddiPIaKx4Aq-Z1pIAwIEv66ON9-n8T5h-WDCr_9MhNesdT26bMwNs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoSWjyqmr4OWEjLhZMrUilxBpuq45PXyII8peGg3nRk22FsLQt8yi0ycLjiyte0VbuLMNFo6o7hH5-ztSZFLvoaDvt8xvQOXm1r5MfuqFzMr5oVhORStt6TTcJHcjaoYvcKDQsCDp4d4ZYbi5eVjNkF0ZYMnU5I0rYM0VYW-p8Yd7kk_kzOMyEAW8o051M1m2g48oms3UG1bIhvQxMlWZYBsrMcxQeyTSF-ZPgU0ZlZKVFN98gmTyuzHM0MbpyETM4J8x9GxvvTUI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRp7JrTMzC6dLMXX0wk34H0DapMlCKDSGkSdC6kaX74q1n_Kw00Fhna2UVrN4XLbja_Tz7c7yEiFREgJqTIoDwQl_2tkzpazF825SJzlpn7jtpm2etC2QVaQ2XPuXY8sSQJq4zAzbv_f3j0SHEnd8xQMtXVsWVLftof5Jz02tl5O2jPJYYTGvG2uPqLPMOja9aUEafGD2Ft6c4HaTatKNhrV8P0-clwUD54c5nf5YZxDuw8V6yy0xWY76RCvht6v7Kr7UKJJexPAI",
];

const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "Admin": return "bg-on-primary-fixed-variant text-primary";
    case "Manager": return "bg-secondary-container text-on-secondary-container";
    case "Editor": return "bg-surface-container-highest text-on-surface-variant";
    default: return "bg-outline/10 text-outline";
  }
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = members.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.badge.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* Main */}
      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header
          title="Team Management"
          searchPlaceholder="Search members..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md">
              <span className="material-symbols-outlined mr-1.5 text-[18px]">add</span>
              Add New
            </button>
          }
        />

        {/* Content */}
        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto">
          {/* Stats Banner */}
          <div className="grid grid-cols-12 gap-gutter mb-8">
            <div className="col-span-8 bg-surface-container-low border border-outline-variant/30 p-6 rounded-xl flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-1">Collaborative Pulse</h2>
                <p className="text-on-surface-variant font-body-sm text-body-sm">You have 12 active members contributing across 4 departments today.</p>
              </div>
              <div className="flex -space-x-2">
                {pulseAvatars.map((url, i) => (
                  <img key={i} alt="avatar" className="w-10 h-10 rounded-full border-2 border-background object-cover" src={url} />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center text-label-caps font-bold">+9</div>
              </div>
            </div>
            <div className="col-span-4 bg-surface-container-low border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-center text-center">
              <span className="text-on-surface-variant font-label-caps text-label-caps mb-2">NETWORK HEALTH</span>
              <span className="text-headline-lg font-black text-primary">98.4%</span>
              <span className="text-tertiary-fixed text-[12px] flex items-center justify-center mt-1">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> Optimal Efficiency
              </span>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filtered.map((m) => (
              <div key={m.id} className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-5 hover:bg-surface-container hover:border-outline-variant transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <img className="w-14 h-14 rounded-full border border-outline-variant object-cover" src={m.avatar} alt={m.name} />
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${m.statusColor} border-2 border-background rounded-full`}></span>
                  </div>
                  <span className={`px-2 py-1 rounded font-label-caps text-label-caps ${getBadgeStyle(m.badge)}`}>{m.badge}</span>
                </div>
                <div className="mb-6">
                  <h3 className="font-headline-md text-headline-md text-primary truncate">{m.name}</h3>
                  <p className="text-on-surface-variant text-body-sm font-body-sm">{m.role}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                  <span className="text-[11px] font-label-caps text-on-surface-variant uppercase">{m.status}</span>
                  <button className="text-primary font-label-caps text-label-caps hover:underline flex items-center cursor-pointer">
                    Manage <span className="material-symbols-outlined text-[16px] ml-1">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Empty state if search yields nothing */}
            {filtered.length === 0 && (
              <div className="col-span-full border border-dashed border-outline-variant/30 rounded-xl py-12 flex flex-col items-center justify-center text-outline/50 font-label-caps text-[10px]">
                No members match your search
              </div>
            )}

            {/* Invite Card */}
            {filtered.length > 0 && (
              <div className="border border-dashed border-outline-variant/30 bg-transparent rounded-xl p-5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-low transition-all">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-surface-variant">person_add</span>
                </div>
                <h3 className="font-label-caps text-label-caps text-primary">Expand Team</h3>
                <p className="text-on-surface-variant text-[12px] mt-1 px-4">Invite a new member to join the PURSUA ecosystem.</p>
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="mt-12 flex items-center justify-between border-t border-outline-variant pt-6 pb-8">
            <p className="text-on-surface-variant text-body-sm font-body-sm">Showing 1-{filtered.length} of 12 team members</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-outline-variant/30 rounded bg-surface-container text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps cursor-pointer">Previous</button>
              <button className="px-3 py-1.5 border border-outline-variant/30 rounded bg-surface-container text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps cursor-pointer">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
