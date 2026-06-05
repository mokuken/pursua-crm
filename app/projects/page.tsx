"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  value: number;
  budget: number;
  spent: number;
  status: "In Progress" | "On Hold" | "Completed";
  progress: number;
  deadline: string;
  avatars: string[];
  extraAvatarsCount?: number;
  members: TeamMember[];
}

const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Marcus Aurelius", role: "Lead Architect", avatar: "" },
  { id: "tm-2", name: "Jane Doe", role: "Senior Developer", avatar: "" },
  { id: "tm-3", name: "Marcus Smith", role: "Project Manager", avatar: "" },
  { id: "tm-4", name: "Anya Kostic", role: "Designer", avatar: "" },
  { id: "tm-5", name: "John Smith", role: "Developer", avatar: "" },
  { id: "tm-6", name: "Sarah Connor", role: "QA Lead", avatar: "" },
];

const initialProjects: Project[] = [
  {
    id: "proj-1",
    clientId: "nebula-softworks",
    clientName: "Nebula Softworks",
    title: "Quantum Infrastructure",
    description: "Scalable cloud migration for international data protocols across multi-region clusters.",
    value: 45000,
    budget: 50000,
    spent: 32000,
    status: "In Progress",
    progress: 65,
    deadline: "Oct 24",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LqpCvcpNHnb3-sZFW8OcSAEXPB_3s-_6HOT0PWo-lzemb1diZOazsOJOQasntA1Zqr1cLfh2PfOI2X5H2wPqM99ju8D-IIPnhaXMxD2PP5rl1wG_G-hc5o7KT07Ksk9Ti5IBJ9ZjIBqBU1ZE2P5CQY4AzOjEewsA56Gbdr7RXoumoHDqlZRhK_sTO0bVlroQAD9OTQbXxJcFGSTBNouyS4kOW5Hq6J_rAlD3h3YrKE-z_Z6bYv2vb_2EuCCALQDH9JdgH-wd14k",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN2JgZP5y7tU2P91Lqv_aKPAs_z_6JrL2kzk7VEiP_ZwTnWMbDLRPcFD9EpvC1IctSTPFbx3g6wKJ1oHtALcEsXLxawfipCH5yFC6aocU93hEEpcA2iO3_rMWoaWIdwCREhZWOBb9OylAv-xigwF43Kz1EqobRxBsqbazVq4xBNP34SoUU1NQxusm_AanKt0QzrPGk3OizEp1YTZNEOfOh-clhV5iGo09GdcIqDLICEAqTnf2d9S7SruKBk0uQFrHAJ7mTQDijGAs",
    ],
    extraAvatarsCount: 3,
    members: [teamMembers[0], teamMembers[1], teamMembers[2]],
  },
  {
    id: "proj-2",
    clientId: "nebula-softworks",
    clientName: "Nebula Softworks",
    title: "Helius Branding",
    description: "Complete visual identity overhaul for solar energy initiative spanning EMEA markets.",
    value: 28500,
    budget: 30000,
    spent: 15000,
    status: "On Hold",
    progress: 32,
    deadline: "Delayed",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm5m2m_C4SXMpCPqzWPNZZ7JTRuinUv2w-zRwEbrhaaQpHx0aWkACWRS8MO-P4nG55Lc-qtEhFq5IPFuijIyFO9KD0efSYeBKBAWOqxHM2NJEGfpJYtud8moHxy6lw71cMpbQXpXQsHRY7oQOPbqWx9xgahXXPkOU083w_k0kGsmOyhg12fRzfhDE8DLHTIqP3_LUcT9OS5-7m4K6nsKyGegkpyKzohCy2zAz-GrHB42uIauntjcnAiv0mT7-4r2wCtbD3v1OClk8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtATPwcSGHn2ReGBOc6HiZ_gAeSSP-9IqpjDx1Av1ZSE0nQXpdgFkWwbjGOKrs3Twuj6CZjCSmc5iP8giiRn5EbiOqX94djLIhGKttnvfYbmAOo2l--PzqRFLOq2SF_z0LO1INqvIWIxINHc31VLIQGzN24TSwSGBOhE3iHH9gb2ko8vVpMZ3pAXMp2m2PT9_EGARTa5F5YdK2z4xVmKTp9A1Ij3ZJsKhabo83rzmtmB4e4i9UXY51KQuHbVYRLfzp87WNJmS7xao",
    ],
    members: [teamMembers[3], teamMembers[4]],
  },
  {
    id: "proj-3",
    clientId: "vertex-media",
    clientName: "Vertex Media",
    title: "Atlas API v2",
    description: "Re-architecture of core transactional layers for real-time banking integrations.",
    value: 128500,
    budget: 150000,
    spent: 128000,
    status: "Completed",
    progress: 100,
    deadline: "Archived",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUlM4M3szej8ijRmL3qZz63pOwWB9pr-tOmx6QE_WwjH936YcOm6e-Tx-RoCgyVEW8GEpfedxYxH_Iipb5sdlRPxINDQkx7aTd9jDL_EpwSs1dvUmfqlAIIv4XBtmh6Ljan5XcRlzfxoWuUP-_KnHMTQsnehVXvtpyZvw0m--Eng1EUrcGZWa-2KQAQGbBWWc0vbsSVTyI3EHEbQVd3qwL0_Hmi4NOd5ptN6ZDJ56uELcdL_Puq-Am5i9Yw8OST6FuevNmrslDUK8",
    ],
    members: [teamMembers[2], teamMembers[5]],
  },
  {
    id: "proj-4",
    clientId: "optic-prime",
    clientName: "Optic Prime",
    title: "Apex Dashboard",
    description: "Unified monitoring platform for multi-tenant data visualization and alerting.",
    value: 12000,
    budget: 15000,
    spent: 4000,
    status: "In Progress",
    progress: 12,
    deadline: "Nov 12",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm3s7VxVk9cRw_7r-vkaQzCXM1Nvfbsqnda8iRXdwel2SYaAvHfxsE86VE2YtrHV-qXC06DJoHoVFm77uwQh6XFPZXGVDXCxxBfxadtifQvV1mqIjNlxMohsP23JqzvOT1OB0bysl714u4RorObCh6owuy_KTt7ntTavFOInY0BqgM8oqASwIiyu3mbmMxw22g7BXiJ4fqBU5cMsAbKHK8_0eaeiLXtTpq-7L8xKB-5pNU4psLSVPZdg9Jj97HnjOOX12qG7f-U5g",
    ],
    extraAvatarsCount: 8,
    members: [teamMembers[0], teamMembers[4], teamMembers[5]],
  },
  {
    id: "proj-5",
    clientId: "flow-logistics",
    clientName: "Flow Logistics",
    title: "Project Phoenix",
    description: "Legacy code remediation and modern CI/CD pipeline implementation.",
    value: 94200,
    budget: 100000,
    spent: 88000,
    status: "In Progress",
    progress: 88,
    deadline: "Near Ready",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZZ70plHQU64xf4iUqzFJKZAmOYZKYCbkC8AofM8yNYADvUnwvZmFOaT-znkQ1FLwZ9MOTwaAjneMtnEhqPtiHk45Mku1RouOPXP0PbjE_u1IuA9EijNXQ8yXoCrw8JIOjikSZ5KbsSP-OFWRtm50jvmcZciVUmAbGH5tz0695UjkqhJOopQqtdHuQ-c1XKBluzcyjb0X9d5CINMmsb8JCEDPoHsDi4m1CjI9Kj-hJq01P0SODWTpdEEMc6LsFm8P3QjvwYV_d6s",
    ],
    members: [teamMembers[0], teamMembers[2], teamMembers[1]],
  },
];

const clientsLookup = [
  { id: "nebula-softworks", name: "Nebula Softworks" },
  { id: "vertex-media", name: "Vertex Media" },
  { id: "optic-prime", name: "Optic Prime" },
  { id: "flow-logistics", name: "Flow Logistics" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedClientFilter, setSelectedClientFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClientId, setNewClientId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newStatus, setNewStatus] = useState<"In Progress" | "On Hold" | "Completed">("In Progress");
  const [newProgress, setNewProgress] = useState(10);
  const [newDeadline, setNewDeadline] = useState("Dec 12");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [mouseCoords, setMouseCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords((prev) => ({
      ...prev,
      [id]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClientId) return;

    const client = clientsLookup.find((c) => c.id === newClientId);
    const assignedMembers = teamMembers.filter((m) => selectedMembers.includes(m.id));

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      clientId: newClientId,
      clientName: client?.name || "Unknown",
      title: newTitle,
      description: newDescription || "No description provided.",
      value: Number(newValue) || 0,
      budget: Number(newBudget) || 0,
      spent: 0,
      status: newStatus,
      progress: newStatus === "Completed" ? 100 : Math.min(100, Math.max(0, newProgress)),
      deadline: newDeadline || "Dec 26",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUlM4M3szej8ijRmL3qZz63pOwWB9pr-tOmx6QE_WwjH936YcOm6e-Tx-RoCgyVEW8GEpfedxYxH_Iipb5sdlRPxINDQkx7aTd9jDL_EpwSs1dvUmfqlAIIv4XBtmh6Ljan5XcRlzfxoWuUP-_KnHMTQsnehVXvtpyZvw0m--Eng1EUrcGZWa-2KQAQGbBWWc0vbsSVTyI3EHEbQVd3qwL0_Hmi4NOd5ptN6ZDJ56uELcdL_Puq-Am5i9Yw8OST6FuevNmrslDUK8",
      ],
      extraAvatarsCount: Math.max(0, assignedMembers.length - 1),
      members: assignedMembers,
    };

    setProjects((prev) => [...prev, newProj]);
    setIsModalOpen(false);
    setNewTitle(""); setNewClientId(""); setNewDescription(""); setNewValue(""); setNewBudget("");
    setNewStatus("In Progress"); setNewProgress(10); setNewDeadline("Dec 12"); setSelectedMembers([]);
  };

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    const matchesStatus = statusFilter === "All" || proj.status === statusFilter;
    if (!matchesStatus) return false;

    if (selectedClientFilter && proj.clientId !== selectedClientFilter) return false;

    return true;
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(val);

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-secondary";
      case "On Hold": return "bg-outline";
      case "Completed": return "bg-tertiary-fixed";
      default: return "bg-primary";
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-primary";
      case "On Hold": return "bg-outline";
      case "Completed": return "bg-tertiary-fixed";
      default: return "bg-primary";
    }
  };

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header
          title="Projects"
          actions={<></>}
        />

        <div className="pt-24 px-margin-desktop pb-12 max-w-container-max mx-auto w-full flex-1">
          <div className="flex items-center gap-4 mb-6">
            <select
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 text-body-sm text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer min-w-[180px] h-[36px]"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
            >
              <option value="">All Clients</option>
              {clientsLookup.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 text-body-sm text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer min-w-[180px] h-[36px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="ml-auto bg-surface-container border border-outline-variant/30 px-3 rounded-lg flex items-center w-64 h-[36px] group focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-outline mr-2 text-[18px]">search</span>
              <input
                className="bg-transparent border-none text-body-sm text-on-surface placeholder:text-outline focus:ring-0 w-full p-0 text-[13px] outline-none"
                placeholder="Search projects, clients..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-outline hover:text-primary ml-1">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProjects.map((proj) => {
              const coords = mouseCoords[proj.id] || { x: 0, y: 0 };

              return (
                <div key={proj.id} onMouseMove={(e) => handleMouseMove(e, proj.id)}
                  className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl hover:bg-surface-container-high transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between"
                  style={{ minHeight: "280px" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                    style={{ background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4), transparent)` }} />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDotColor(proj.status)}`} />
                        <span className={`font-label-caps text-label-caps ${
                          proj.status === "In Progress" ? "text-secondary" : proj.status === "On Hold" ? "text-outline" : "text-tertiary-fixed"
                        }`}>{proj.status}</span>
                      </div>
                      <button className="text-outline hover:text-primary transition-colors flex items-center">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>

                    <h3 className="font-headline-md text-headline-md text-primary mb-1 group-hover:text-primary transition-colors font-semibold group-hover:underline decoration-1 underline-offset-4">{proj.title}</h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="material-symbols-outlined text-[14px] text-outline">business</span>
                      <span className="text-outline text-[11px] font-label-caps uppercase">{proj.clientName}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">{proj.description}</p>
                    <div className="flex items-center justify-between bg-surface-container-highest/30 rounded-lg px-3 py-2 mb-4">
                      <span className="font-label-caps text-label-caps text-outline text-[9px] uppercase">Contract Value</span>
                      <span className="font-headline-md text-[15px] text-primary font-semibold">{formatCurrency(proj.value)}</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto space-y-3">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider text-[9px]">Progress</span>
                        <span className="font-label-caps text-label-caps text-primary text-[10px]">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${getProgressBarColor(proj.status)}`} style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>

                    {/* Avatars and date */}
                    <div className="flex items-center justify-between pt-1">
                      <div />
                      <div className="flex items-center text-outline">
                        <span className="material-symbols-outlined text-[15px] mr-1">calendar_today</span>
                        <span className="font-label-caps text-label-caps text-[10px] tracking-wide">{proj.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-outline-variant p-6 rounded-xl flex flex-col items-center justify-center hover:border-primary/50 hover:bg-surface-container-low/20 transition-all group cursor-pointer h-full min-h-[280px]">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 transform group-hover:scale-110">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </div>
              <p className="font-headline-md text-headline-md text-outline group-hover:text-primary transition-colors font-semibold">Create New Project</p>
              <p className="font-body-sm text-body-sm text-outline/70 mt-1">Initialize workspace</p>
            </div>
          </div>
        </div>
      </main>

      <button onClick={() => setIsModalOpen(true)} className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform cursor-pointer">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
          <div className="bg-surface-container-high border border-outline-variant rounded-2xl w-full max-w-lg overflow-hidden relative shadow-2xl animate-scaleUp">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest/20">
              <h3 className="text-headline-md font-headline-md text-primary font-semibold">Initialize Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-outline hover:text-primary transition-colors flex items-center cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Project Title *</label>
                <input required type="text" placeholder="e.g. Atlas Core" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Client *</label>
                <select required className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer" value={newClientId} onChange={(e) => setNewClientId(e.target.value)}>
                  <option value="">Select client...</option>
                  {clientsLookup.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Description</label>
                <textarea placeholder="Describe the scope and objective..." rows={3} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors resize-none" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Project Value / Price *</label>
                  <input required type="number" placeholder="0" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Budget</label>
                  <input type="number" placeholder="0" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newBudget} onChange={(e) => setNewBudget(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Status</label>
                  <select className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer" value={newStatus} onChange={(e) => setNewStatus(e.target.value as any)}>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Target Deadline</label>
                  <input type="text" placeholder="e.g. Dec 26" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider">Initial Progress</label>
                  <span className="text-body-sm font-semibold text-primary">{newProgress}%</span>
                </div>
                <input type="range" min="0" max="100" className="w-full accent-primary bg-surface-container-highest cursor-pointer" value={newProgress} onChange={(e) => setNewProgress(Number(e.target.value))} />
              </div>

              {/* Team Member Assignment */}
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Assign Team Members</label>
                <div className="bg-surface-container border border-outline-variant rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                  {teamMembers.map((member) => (
                    <label key={member.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMembers.includes(member.id) ? "bg-surface-container-highest text-primary" : "hover:bg-surface-container-high text-on-surface-variant"
                    }`}>
                      <input type="checkbox" checked={selectedMembers.includes(member.id)} onChange={() => toggleMember(member.id)} className="accent-primary cursor-pointer" />
                      <div className="flex-1">
                        <span className="text-body-sm font-medium">{member.name}</span>
                        <span className="text-outline text-[10px] ml-2 font-label-caps">{member.role}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-body-sm text-outline hover:text-primary transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="bg-primary text-on-primary px-5 py-2 rounded-lg font-body-sm font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer active:scale-95">Initialize</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
