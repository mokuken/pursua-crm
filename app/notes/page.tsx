"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const pinnedNotes = [
  {
    id: 1,
    project: "Project Pursua",
    title: "Q4 Strategic Overview",
    content: "The primary goal is to optimize the conversion funnel for the enterprise segment. Need to review the new grid components by Friday.",
    date: "Oct 24, 2023",
    collaborators: ["JD", "AS"],
    color: "secondary",
  },
  {
    id: 2,
    project: "Personal",
    title: "Morning Routine Revision",
    content: "1. Hydrate\n2. Deep work session (2hrs)\n3. Review dashboard metrics.",
    date: "Just now",
    collaborators: [],
    color: "tertiary-fixed",
  },
];

const recentNotes = [
  {
    id: 3,
    title: "Meeting Notes: Client Alpha",
    content: "Discussed the roadmap for 2024. Client requested more transparency in reporting modules and custom export formats.",
    tags: ["CLIENT", "ROADMAP"],
    size: "default",
  },
  {
    id: 4,
    title: "Technical Specs v2",
    content: "Architecture needs to support 50k concurrent users.\n\nKey requirements:\n• WebSocket integration\n• Redis for caching\n• Edge computing for logic\n• AES-256 encryption at rest\n\nTesting scheduled for next Tuesday with the DevOps team.",
    date: "Oct 20, 2023",
    size: "lg",
  },
  {
    id: 5,
    title: "URGENT: Server Maintenance",
    content: "Backup systems failover test failed this morning. Need to investigate the log files immediately.",
    status: "CRITICAL",
    size: "default",
    borderTop: "error/40",
  },
  {
    id: 6,
    title: "Design Feedback",
    content: '"The contrast in the dark mode is excellent, but let\'s look at the spacing in the masonry grid."',
    attachment: "Feedback.pdf",
    size: "default",
  },
  {
    id: 7,
    title: "Lunch Idea",
    content: "Try that new ramen place on 5th Ave.",
    size: "sm",
  },
  {
    id: 8,
    title: "API Documentation",
    content: "GET /api/v1/notes - Returns a list of all notes. Supports pagination and filtering by tag.",
    category: "DEV_DOCS",
    size: "default",
  },
  {
    id: 9,
    title: "Monthly Expenses",
    expenses: [
      { label: "SaaS Subs", amount: "$240.00" },
      { label: "Cloud Storage", amount: "$45.00" },
    ],
    total: "$285.00",
    size: "lg",
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const headerActions = (
    <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center space-x-2 hover:opacity-90 active:scale-95 transition-all">
      <span className="material-symbols-outlined text-[18px]">add</span>
      <span>ADD NEW</span>
    </button>
  );

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* Main */}
      <main className="ml-[240px] w-[calc(100%-240px)] h-screen flex flex-col relative">
        <Header 
          title="Notes" 
          searchPlaceholder="Search notes, tags, or projects..."
          searchValue={search}
          onSearchChange={setSearch}
          actions={headerActions}
        />

        {/* Viewport Scrollable */}
        <div className="mt-16 flex flex-row h-[calc(100vh-64px)] overflow-hidden">
          {/* Category Sidebar (Contextual) */}
          <div className="w-64 border-r border-outline-variant bg-surface-container-lowest p-6 space-y-8 flex-shrink-0 overflow-y-auto">
            <section>
              <h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase tracking-widest">
                Collections
              </h3>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container text-primary font-medium text-body-sm">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-3 text-[18px]">person</span>
                      <span>Personal</span>
                    </div>
                    <span className="text-[10px] bg-surface-container-highest px-1.5 rounded">12</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors text-body-sm">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-3 text-[18px]">share</span>
                      <span>Shared</span>
                    </div>
                    <span className="text-[10px] opacity-50">4</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors text-body-sm">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-3 text-[18px]">archive</span>
                      <span>Archive</span>
                    </div>
                  </button>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase tracking-widest">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {["#PROJECT_X", "#CLIENT_MEETING", "#URGENT", "#INVOICE"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-surface-container border border-outline-variant text-[10px] rounded font-label-caps text-on-surface-variant cursor-pointer hover:border-outline transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto p-margin-desktop bg-background custom-scrollbar relative">
            {/* Pinned Section */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-primary text-[20px]">push_pin</span>
                <h2 className="font-headline-md text-headline-md">Pinned</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`group relative bg-surface-container-high border border-outline-variant p-5 rounded-xl hover:border-primary/30 hover:-translate-y-0.5 transition-all cursor-pointer ${
                      note.color === "tertiary-fixed" ? "border-l-4 border-l-tertiary-fixed" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`text-[10px] font-label-caps uppercase px-2 py-0.5 rounded ${
                          note.color === "secondary"
                            ? "text-secondary bg-secondary-container/20"
                            : "text-tertiary-fixed-dim bg-tertiary-container/10"
                        }`}
                      >
                        {note.project}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                    <h4 className="font-bold text-body-md mb-2">{note.title}</h4>
                    <p className="text-body-sm text-on-surface-variant line-clamp-3 whitespace-pre-line">
                      {note.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-label-caps text-outline">{note.date}</span>
                      {note.collaborators.length > 0 && (
                        <div className="flex -space-x-2">
                          {note.collaborators.map((initials, idx) => (
                            <div
                              key={idx}
                              className={`w-5 h-5 rounded-full border border-background text-[8px] flex items-center justify-center ${
                                idx === 0 ? "bg-slate-500" : "bg-blue-500"
                              }`}
                            >
                              {initials}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Notes Masonry */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-md text-headline-md">Recent Notes</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-surface-container-highest text-primary">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors">
                    <span className="material-symbols-outlined">list</span>
                  </button>
                </div>
              </div>
              
              <div className="masonry-grid">
                {recentNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`masonry-item ${
                      note.size === "lg" ? "masonry-item-lg" : note.size === "sm" ? "masonry-item-sm" : ""
                    } bg-surface-container border border-outline-variant p-5 rounded-xl hover:border-outline hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col group relative overflow-hidden`}
                  >
                    {note.borderTop && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-error/40"></div>
                    )}
                    <h4 className="font-bold text-body-md mb-2">{note.title}</h4>
                    {note.content && (
                      <p className={`text-body-sm text-on-surface-variant whitespace-pre-line ${note.size === "lg" ? "" : "line-clamp-4"}`}>
                        {note.content}
                      </p>
                    )}
                    
                    {note.expenses && (
                      <div className="space-y-1 mt-2">
                        {note.expenses.map((exp, idx) => (
                          <div key={idx} className="flex justify-between text-body-sm">
                            <span className="text-on-surface-variant">{exp.label}</span>
                            <span className="font-label-caps">{exp.amount}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-body-sm border-t border-outline-variant mt-2 pt-1 font-bold">
                          <span>Total</span>
                          <span className="font-label-caps">{note.total}</span>
                        </div>
                      </div>
                    )}

                    {note.tags && (
                      <div className="mt-auto pt-4 flex items-center space-x-2">
                        {note.tags.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-surface-container-high text-[9px] rounded font-label-caps">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {note.attachment && (
                      <div className="mt-auto pt-4 flex items-center text-[10px] font-label-caps text-outline">
                        <span className="material-symbols-outlined text-[14px] mr-1">link</span>
                        Attachment: {note.attachment}
                      </div>
                    )}

                    {note.date && !note.tags && !note.attachment && (
                      <div className="mt-auto pt-4 text-[10px] font-label-caps text-outline">
                        {note.date}
                      </div>
                    )}

                    {note.status && (
                      <div className="mt-auto pt-4">
                        <span className="text-[10px] font-label-caps text-error">{note.status}</span>
                      </div>
                    )}

                    {note.category && (
                      <div className="mt-auto pt-4 font-label-caps text-[10px] text-on-secondary-container">
                        {note.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Create FAB */}
        <button
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl active:scale-95 transition-all hover:rotate-90 group z-50"
          title="Create New Note"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">add</span>
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-surface-container-high border border-outline-variant rounded-lg text-body-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Create New Note
          </span>
        </button>
      </main>
    </div>
  );
}
