"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const members = [
  { id: "m1", name: "James Sterling", role: "Systems Architect", image: "/images/img_01.png" },
  { id: "m2", name: "Elena Vance", role: "Head of Growth", image: "/images/img_02.png" },
];

export default function TeamPage() {
  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header title="Team" actions={<></>} />

        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">The Development Team</h1>
            <p className="text-on-surface-variant text-body-sm font-body-sm mt-1">The team behind Pursua</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {members.map((m, idx) => (
              <div
                key={m.id}
                className="relative rounded-xl overflow-hidden bg-cover bg-center h-[520px] group"
                style={{ backgroundImage: `url(${m.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-headline-md text-headline-md drop-shadow-sm">{m.name}</h3>
                  <p className="text-white/80 text-body-sm font-body-sm drop-shadow-sm">{m.role}</p>
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-outline-variant/40 rounded-xl h-[520px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-low transition-all group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-surface-variant">person_add</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">Add New Member</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
