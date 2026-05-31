"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// ----------------------------------------------------
// TypeScript Interfaces
// ----------------------------------------------------
interface Project {
  id: string;
  title: string;
  description: string;
  status: "In Progress" | "On Hold" | "Completed";
  progress: number;
  deadline: string;
  avatars: string[];
  extraAvatarsCount?: number;
  statusIcon?: string;
  statusLabel?: string;
  isCustomStatus?: boolean;
  icon?: string;
}

// ----------------------------------------------------
// Initial Mock Projects Data
// ----------------------------------------------------
const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Quantum Infrastructure",
    description: "Scalable cloud migration for international data protocols across multi-region clusters.",
    status: "In Progress",
    progress: 65,
    deadline: "Oct 24",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LqpCvcpNHnb3-sZFW8OcSAEXPB_3s-_6HOT0PWo-lzemb1diZOazsOJOQasntA1Zqr1cLfh2PfOI2X5H2wPqM99ju8D-IIPnhaXMxD2PP5rl1wG_G-hc5o7KT07Ksk9Ti5IBJ9ZjIBqBU1ZE2P5CQY4AzOjEewsA56Gbdr7RXoumoHDqlZRhK_sTO0bVlroQAD9OTQbXxJcFGSTBNouyS4kOW5Hq6J_rAlD3h3YrKE-z_Z6bYv2vb_2EuCCALQDH9JdgH-wd14k",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN2JgZP5y7tU2P91Lqv_aKPAs_z_6JrL2kzk7VEiP_ZwTnWMbDLRPcFD9EpvC1IctSTPFbx3g6wKJ1oHtALcEsXLxawfipCH5yFC6aocU93hEEpcA2iO3_rMWoaWIdwCREhZWOBb9OylAv-xigwF43Kz1EqobRxBsqbazVq4xBNP34SoUU1NQxusm_AanKt0QzrPGk3OizEp1YTZNEOfOh-clhV5iGo09GdcIqDLICEAqTnf2d9S7SruKBk0uQFrHAJ7mTQDijGAs",
    ],
    extraAvatarsCount: 3,
  },
  {
    id: "proj-2",
    title: "Helius Branding",
    description: "Complete visual identity overhaul for solar energy initiative spanning EMEA markets.",
    status: "On Hold",
    progress: 32,
    deadline: "Delayed",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm5m2m_C4SXMpCPqzWPNZZ7JTRuinUv2w-zRwEbrhaaQpHx0aWkACWRS8MO-P4nG55Lc-qtEhFq5IPFuijIyFO9KD0efSYeBKBAWOqxHM2NJEGfpJYtud8moHxy6lw71cMpbQXpXQsHRY7oQOPbqWx9xgahXXPkOU083w_k0kGsmOyhg12fRzfhDE8DLHTIqP3_LUcT9OS5-7m4K6nsKyGegkpyKzohCy2zAz-GrHB42uIauntjcnAiv0mT7-4r2wCtbD3v1OClk8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtATPwcSGHn2ReGBOc6HiZ_gAeSSP-9IqpjDx1Av1ZSE0nQXpdgFkWwbjGOKrs3Twuj6CZjCSmc5iP8giiRn5EbiOqX94djLIhGKttnvfYbmAOo2l--PzqRFLOq2SF_z0LO1INqvIWIxINHc31VLIQGzN24TSwSGBOhE3iHH9gb2ko8vVpMZ3pAXMp2m2PT9_EGARTa5F5YdK2z4xVmKTp9A1Ij3ZJsKhabo83rzmtmB4e4i9UXY51KQuHbVYRLfzp87WNJmS7xao",
    ],
    statusIcon: "history",
    statusLabel: "Delayed",
    isCustomStatus: true,
  },
  {
    id: "proj-3",
    title: "Atlas API v2",
    description: "Re-architecture of core transactional layers for real-time banking integrations.",
    status: "Completed",
    progress: 100,
    deadline: "Archived",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUlM4M3szej8ijRmL3qZz63pOwWB9pr-tOmx6QE_WwjH936YcOm6e-Tx-RoCgyVEW8GEpfedxYxH_Iipb5sdlRPxINDQkx7aTd9jDL_EpwSs1dvUmfqlAIIv4XBtmh6Ljan5XcRlzfxoWuUP-_KnHMTQsnehVXvtpyZvw0m--Eng1EUrcGZWa-2KQAQGbBWWc0vbsSVTyI3EHEbQVd3qwL0_Hmi4NOd5ptN6ZDJ56uELcdL_Puq-Am5i9Yw8OST6FuevNmrslDUK8",
    ],
    statusIcon: "check_circle",
    statusLabel: "Archived",
    isCustomStatus: true,
  },
  {
    id: "proj-4",
    title: "Apex Dashboard",
    description: "Unified monitoring platform for multi-tenant data visualization and alerting.",
    status: "In Progress",
    progress: 12,
    deadline: "Nov 12",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm3s7VxVk9cRw_7r-vkaQzCXM1Nvfbsqnda8iRXdwel2SYaAvHfxsE86VE2YtrHV-qXC06DJoHoVFm77uwQh6XFPZXGVDXCxxBfxadtifQvV1mqIjNlxMohsP23JqzvOT1OB0bysl714u4RorObCh6owuy_KTt7ntTavFOInY0BqgM8oqASwIiyu3mbmMxw22g7BXiJ4fqBU5cMsAbKHK8_0eaeiLXtTpq-7L8xKB-5pNU4psLSVPZdg9Jj97HnjOOX12qG7f-U5g",
    ],
    extraAvatarsCount: 8,
    icon: "analytics",
  },
  {
    id: "proj-5",
    title: "Project Phoenix",
    description: "Legacy code remediation and modern CI/CD pipeline implementation.",
    status: "In Progress",
    progress: 88,
    deadline: "Near Ready",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZZ70plHQU64xf4iUqzFJKZAmOYZKYCbkC8AofM8yNYADvUnwvZmFOaT-znkQ1FLwZ9MOTwaAjneMtnEhqPtiHk45Mku1RouOPXP0PbjE_u1IuA9EijNXQ8yXoCrw8JIOjikSZ5KbsSP-OFWRtm50jvmcZciVUmAbGH5tz0695UjkqhJOopQqtdHuQ-c1XKBluzcyjb0X9d5CINMmsb8JCEDPoHsDi4m1CjI9Kj-hJq01P0SODWTpdEEMc6LsFm8P3QjvwYV_d6s",
    ],
    statusIcon: "rocket_launch",
    statusLabel: "Near Ready",
    isCustomStatus: true,
  },
];

// ----------------------------------------------------
// React Component
// ----------------------------------------------------
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Dynamic Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState<"In Progress" | "On Hold" | "Completed">("In Progress");
  const [newProgress, setNewProgress] = useState(10);
  const [newDeadline, setNewDeadline] = useState("Dec 12");

  // Glowing Card Mouse Tracker Coordinates
  const [mouseCoords, setMouseCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseCoords((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  // Add New Project Action
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      description: newDescription || "No description provided.",
      status: newStatus,
      progress: Math.min(100, Math.max(0, newProgress)),
      deadline: newDeadline || "Dec 26",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUlM4M3szej8ijRmL3qZz63pOwWB9pr-tOmx6QE_WwjH936YcOm6e-Tx-RoCgyVEW8GEpfedxYxH_Iipb5sdlRPxINDQkx7aTd9jDL_EpwSs1dvUmfqlAIIv4XBtmh6Ljan5XcRlzfxoWuUP-_KnHMTQsnehVXvtpyZvw0m--Eng1EUrcGZWa-2KQAQGbBWWc0vbsSVTyI3EHEbQVd3qwL0_Hmi4NOd5ptN6ZDJ56uELcdL_Puq-Am5i9Yw8OST6FuevNmrslDUK8",
      ],
      extraAvatarsCount: 0,
      ...(newStatus === "Completed"
        ? { statusIcon: "check_circle", statusLabel: "Archived", isCustomStatus: true }
        : {}),
    };

    setProjects((prev) => [...prev, newProj]);
    setIsModalOpen(false);

    // Reset Inputs
    setNewTitle("");
    setNewDescription("");
    setNewStatus("In Progress");
    setNewProgress(10);
    setNewDeadline("Dec 12");
  };

  // Filter projects by search query and active filter tabs
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "All" || proj.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate high level aggregate statistics
  const activeCount = projects.filter((p) => p.status === "In Progress").length;
  const holdCount = projects.filter((p) => p.status === "On Hold").length;
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const averageProgress = projects.length
    ? Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length)
    : 0;

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* 2. Top Header and Main Section Canvas */}

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        
        <Header
          title="Projects"
          searchPlaceholder="Search projects..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined mr-1.5 text-[18px]">add</span>
              New Project
            </button>
          }
        />

        {/* 3. Main Dashboard Scroll Area */}
        <div className="pt-24 px-margin-desktop pb-12 max-w-container-max mx-auto w-full flex-1">
          
          {/* Active Navigation Tabs / Status Filter Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-1">
              {["All", "In Progress", "On Hold", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-body-sm font-semibold rounded-t-lg border-b-2 transition-all cursor-pointer ${
                    statusFilter === tab
                      ? "border-primary text-primary bg-surface-container-highest/20"
                      : "border-transparent text-outline hover:text-on-surface hover:bg-surface-container/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Quick Helper Label */}
            <div className="font-label-caps text-label-caps text-outline">
              Showing {filteredProjects.length} of {projects.length} Projects
            </div>
          </div>

          {/* Bento Stats Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-10">
            {/* Box 1 */}
            <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-32 hover:border-outline-variant/60 transition-colors">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Active Projects</span>
              <div className="flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-primary">{activeCount}</span>
                <span className="text-tertiary-fixed text-body-sm font-medium flex items-center">
                  +12% <span className="material-symbols-outlined text-[16px] ml-0.5">trending_up</span>
                </span>
              </div>
            </div>
            {/* Box 2 */}
            <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-32 hover:border-outline-variant/60 transition-colors">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Workload Avg.</span>
              <div className="flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-primary">{averageProgress}%</span>
                <span className="text-outline text-body-sm font-medium">Optimal</span>
              </div>
            </div>
            {/* Box 3 */}
            <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-32 hover:border-outline-variant/60 transition-colors">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">On Hold List</span>
              <div className="flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-primary">0{holdCount}</span>
                <span className="text-error text-body-sm font-medium flex items-center">
                  -{holdCount} <span className="material-symbols-outlined text-[16px] ml-0.5">priority_high</span>
                </span>
              </div>
            </div>
            {/* Box 4 */}
            <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-32 hover:border-outline-variant/60 transition-colors">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Completed</span>
              <div className="flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-primary">0{completedCount}</span>
                <span className="text-tertiary-fixed text-body-sm font-medium flex items-center">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Main Interactive Projects Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProjects.map((proj) => {
              const coords = mouseCoords[proj.id] || { x: 0, y: 0 };
              
              // Get status indicator dot colors
              const getStatusDotColor = (status: string) => {
                switch (status) {
                  case "In Progress":
                    return "bg-secondary";
                  case "On Hold":
                    return "bg-outline";
                  case "Completed":
                    return "bg-tertiary-fixed";
                  default:
                    return "bg-primary";
                }
              };

              // Progress bar track styling
              const getProgressBarColor = (status: string) => {
                switch (status) {
                  case "In Progress":
                    return "bg-primary";
                  case "On Hold":
                    return "bg-outline";
                  case "Completed":
                    return "bg-tertiary-fixed";
                  default:
                    return "bg-primary";
                }
              };

              return (
                <div
                  key={proj.id}
                  onMouseMove={(e) => handleMouseMove(e, proj.id)}
                  className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl hover:bg-surface-container-high transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between"
                  style={{ minHeight: "240px" }}
                >
                  {/* Subtle Glowing Pointer Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4), transparent)`,
                    }}
                  />

                  {/* Absolute Background Icon (Apex style) */}
                  {proj.icon && (
                    <div className="absolute top-0 right-0 p-2 opacity-10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                      <span className="material-symbols-outlined text-[80px]">{proj.icon}</span>
                    </div>
                  )}

                  {/* Top Card Row */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDotColor(proj.status)}`} />
                        <span className={`font-label-caps text-label-caps ${
                          proj.status === "In Progress"
                            ? "text-secondary"
                            : proj.status === "On Hold"
                            ? "text-outline"
                            : "text-tertiary-fixed"
                        }`}>
                          {proj.status}
                        </span>
                      </div>
                      <button className="text-outline hover:text-primary transition-colors flex items-center">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>

                    <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-primary transition-colors font-semibold group-hover:underline decoration-1 underline-offset-4">
                      {proj.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Bottom Progress Row */}
                  <div className="relative z-10 mt-auto">
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider text-[9px]">Progress</span>
                        <span className="font-label-caps text-label-caps text-primary text-[10px]">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${getProgressBarColor(proj.status)}`}
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Avatars and Date info */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {proj.avatars.map((url, index) => (
                          <img
                            key={index}
                            className="w-7 h-7 rounded-full border-2 border-surface-container object-cover"
                            src={url}
                            alt="Team member"
                          />
                        ))}
                        {proj.extraAvatarsCount ? (
                          <div className="w-7 h-7 rounded-full border-2 border-surface-container bg-surface-container-highest flex items-center justify-center font-label-caps text-[9px] text-on-surface-variant font-semibold">
                            +{proj.extraAvatarsCount}
                          </div>
                        ) : null}
                      </div>

                      {/* Display Status Icon / Date */}
                      <div className={`flex items-center ${
                        proj.isCustomStatus
                          ? proj.statusLabel === "Delayed"
                            ? "text-error"
                            : "text-tertiary-fixed"
                          : "text-outline"
                      }`}>
                        <span className="material-symbols-outlined text-[15px] mr-1">
                          {proj.statusIcon || "calendar_today"}
                        </span>
                        <span className="font-label-caps text-label-caps text-[10px] tracking-wide">
                          {proj.statusLabel || proj.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Project Card 6: Add New Dotted Placeholder */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-outline-variant p-6 rounded-xl flex flex-col items-center justify-center hover:border-primary/50 hover:bg-surface-container-low/20 transition-all group cursor-pointer h-full min-h-[240px]"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 transform group-hover:scale-110">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </div>
              <p className="font-headline-md text-headline-md text-outline group-hover:text-primary transition-colors font-semibold">
                Create New Project
              </p>
              <p className="font-body-sm text-body-sm text-outline/70 mt-1">
                Initialize workspace
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile Context only) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {/* 4. PREMIUM DYNAMIC DIALOG MODAL (Create New Project) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
          <div className="bg-surface-container-high border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest/20">
              <h3 className="text-headline-md font-headline-md text-primary font-semibold">Initialize Project</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-outline hover:text-primary transition-colors flex items-center cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Atlas Core"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe the scope and objective..."
                  rows={3}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 26"
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider">
                    Initial Progress
                  </label>
                  <span className="text-body-sm font-semibold text-primary">{newProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full accent-primary bg-surface-container-highest cursor-pointer"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-body-sm text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-5 py-2 rounded-lg font-body-sm font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer active:scale-95"
                >
                  Initialize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
