"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// ----------------------------------------------------

// TypeScript Interfaces
// ----------------------------------------------------
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TO DO" | "IN PROGRESS" | "IN REVIEW" | "DONE";
  dueDate: string;
  progress?: number;
  assignees: string[];
  commentsCount?: number;
  attachmentsCount?: number;
}

// ----------------------------------------------------
// Initial Mock Tasks Data
// ----------------------------------------------------
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Update Client Portal UI",
    description: "Revise the main dashboard layouts based on the latest feedback from the executive team.",
    priority: "MEDIUM",
    status: "TO DO",
    dueDate: "OCT 12",
    assignees: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGNSVlZBlbCis2uWl_iwfKXl8oqf3vKhZyFkVdGZb4YXlJL4LGSFwdNHMUHN5NFHWVtWoBPxnC637wb8cD4rLku-hJkJ-VObnKVay72mt45TtEfduHDVgksuVCeCTdGWnfnYpjPaMDeydiPfi6ustDG0E-NFEKq7l5PPW42qcrQ4V6l8LIzBJ9pyWKQRlEGGqdAZ7qW7EhjMukYc4oLL11dSq4LYKSCyO_ZzFV6sprjf92Ah41eZ-IKTKHTouoMFQtlFx5i-41tIc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClLx0gEjlg3UhgenZgQr_jWZMdBqErfdXwql5NjT1doSvfrLMl6dvFMv9bMI9tL36ijlLuvWys1Q9xmLMhnLQ190IhKlZ65QK8jg4kAyOwRmCrn4YGwvcqZpi01EdhLOLwqbxC9HCceEOzm3t3bUU0poPwRM0FNvOfOyvyvtCJypta96BbsgMVVlLsLGVdde3GFh2nkh-ggh_9-AK34wknofdo6H8TGGqX_n3CMFpJ88NofE6pT3lrWBJr7XV0PBVKeX4fzJgsTjs",
    ],
  },
  {
    id: "task-2",
    title: "Critical Security Patch",
    description: "Deploy the hotfix for the authentication service to prevent potential session hijacking.",
    priority: "HIGH",
    status: "TO DO",
    dueDate: "DUE TODAY",
    assignees: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnfijGYHGKmh0EtEvRgAs9r8XPMKwQry_n4AewwGINwcnn-v1rKrxl05NbBxl8n5pjZOMaPe9LyWsN-MsZnQht51kWFmaJdYyiCRWFQSS-gVx8g6jahkq2_SPv-xu4SGJZzsJTb5YxXIgtQ0KKlO38ReCayRKddxoiACmxA8kydW28ajsUIIMlQIfZZM2b3P9H_9mpiuU0y8oNLI0WHJlR6e06MdnRft_VFyixk33AGJggw4cdpWZcLMCBbTs_MNa6Fe4Yd0PsjPY",
    ],
  },
  {
    id: "task-3",
    title: "API Documentation Refactor",
    description: "Ongoing effort to migrate documentation to Swagger/OpenAPI 3.0 standards for easier integration.",
    priority: "LOW",
    status: "IN PROGRESS",
    dueDate: "OCT 20",
    progress: 65,
    assignees: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr9d_-rffj5chr5HdemUfupH8Dm-ErQqMN8uKkx8H0lCbtZOCzPdJKckboXiIufAeLkjllWdOICgG6wHKRw5Fkz9ze7CwSp9zv623QAaNbyR798isPHWMm43PN11WqBinflbKe5LvF-GvWaTmaIbL91kbPnSLgAwpPxNxWZGcy9qf-iLxpqJJpJJOLUBLlPMN-6_HOPHvLPMd-qw-R0Rfus-7swSfakZ2lTxvw-CUSTUdRPItHnxgxKyypQoxI8p7rx0HKhYtrZWc",
    ],
  },
  {
    id: "task-4",
    title: "Financial Module Audit",
    description: "Reviewing the tax calculation logic for multi-currency transactions across European regions.",
    priority: "MEDIUM",
    status: "IN REVIEW",
    dueDate: "OCT 25",
    commentsCount: 4,
    attachmentsCount: 2,
    assignees: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfq5dqjnHV1S81Y3QITyF8GJ4iIgskgIx41M4EDO9xR_pm7b3rHK6qsxPz7fzuZC_gXG2D5gnUbbRAo6rq8QIbAiHp-EDSR8nPYalwS7ltiakNnLJuohAkjMYNsJMmIqP1cshY4CYYzuhApo5pXzmLiVKCsFEYcU5fuMwuC1inCs03RXW2XH79T5_kywQJ1WRJSCjA-WXMSVDvn6ZIzr9LFH5AKJ2cN272AfWOKU0h76fUeBuZlcAviFyzdbrsaQlcL6fyw3ZvDGs",
    ],
  },
  {
    id: "task-5",
    title: "Database Migration",
    description: "Shift production clusters to the new AWS region for better latency performance.",
    priority: "LOW",
    status: "DONE",
    dueDate: "COMPLETED",
    assignees: [],
  },
];

// ----------------------------------------------------
// Main React Component
// ----------------------------------------------------
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeView, setActiveView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");

  // Add Task Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [newStatus, setNewStatus] = useState<"TO DO" | "IN PROGRESS" | "IN REVIEW" | "DONE">("TO DO");
  const [newProgress, setNewProgress] = useState(10);
  const [newDueDate, setNewDueDate] = useState("OCT 30");

  // Drag Interaction Simulation State
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Add New Task Callback
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDescription || "No description provided.",
      priority: newPriority,
      status: newStatus,
      dueDate: newStatus === "DONE" ? "COMPLETED" : newDueDate || "OCT 30",
      ...(newStatus === "IN PROGRESS" ? { progress: Math.min(100, Math.max(0, newProgress)) } : {}),
      assignees: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGNSVlZBlbCis2uWl_iwfKXl8oqf3vKhZyFkVdGZb4YXlJL4LGSFwdNHMUHN5NFHWVtWoBPxnC637wb8cD4rLku-hJkJ-VObnKVay72mt45TtEfduHDVgksuVCeCTdGWnfnYpjPaMDeydiPfi6ustDG0E-NFEKq7l5PPW42qcrQ4V6l8LIzBJ9pyWKQRlEGGqdAZ7qW7EhjMukYc4oLL11dSq4LYKSCyO_ZzFV6sprjf92Ah41eZ-IKTKHTouoMFQtlFx5i-41tIc",
      ],
    };

    setTasks((prev) => [...prev, newTask]);
    setIsModalOpen(false);

    // Reset Inputs
    setNewTitle("");
    setNewDescription("");
    setNewPriority("MEDIUM");
    setNewStatus("TO DO");
    setNewProgress(10);
    setNewDueDate("OCT 30");
  };

  // Search Filter tasks in real-time
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate high-level aggregates
  const getTasksByStatus = (status: "TO DO" | "IN PROGRESS" | "IN REVIEW" | "DONE") => {
    return filteredTasks.filter((t) => t.status === status);
  };

  // Helper styles for priority badge
  const getPriorityBadgeStyle = (priority: "HIGH" | "MEDIUM" | "LOW") => {
    switch (priority) {
      case "HIGH":
        return "bg-error/10 text-error";
      case "MEDIUM":
        return "bg-secondary-container/10 text-secondary";
      case "LOW":
        return "bg-tertiary-fixed-dim/10 text-tertiary-fixed";
      default:
        return "bg-outline/10 text-outline";
    }
  };

  // Helper bullet colors for status headers
  const getStatusBulletColor = (status: string) => {
    switch (status) {
      case "TO DO":
        return "bg-outline";
      case "IN PROGRESS":
        return "bg-secondary";
      case "IN REVIEW":
        return "bg-tertiary-fixed-dim";
      case "DONE":
        return "bg-tertiary-container";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* 2. Top Header and Main Section Canvas */}

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        
        <Header
          title="Tasks"
          searchPlaceholder="Search tasks..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          actions={
            <>
              {/* View Mode Toggle Switch */}
              <div className="flex bg-surface-container border border-outline-variant/30 p-0.5 rounded-lg mr-2">
                <button
                  onClick={() => setActiveView("board")}
                  className={`px-3 py-1.5 rounded-md flex items-center transition-all cursor-pointer ${
                    activeView === "board"
                      ? "bg-surface-container-highest text-primary font-semibold"
                      : "text-outline hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] mr-1">dashboard</span>
                  <span className="font-label-caps text-label-caps text-[9px]">Board</span>
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`px-3 py-1.5 rounded-md flex items-center transition-all cursor-pointer ${
                    activeView === "list"
                      ? "bg-surface-container-highest text-primary font-semibold"
                      : "text-outline hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] mr-1">list</span>
                  <span className="font-label-caps text-label-caps text-[9px]">List</span>
                </button>
              </div>

              {/* Add Task Primary Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined mr-1.5 text-[18px]">add</span>
                Add New
              </button>
            </>
          }
        />

        {/* 3. Main Tasks Dashboard Canvas */}
        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto">
          
          {/* A. BOARD KANBAN LAYOUT CONTAINER */}
          {activeView === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter overflow-x-auto min-w-[1000px]">
              
              {/* Column Status Mapping */}
              {(["TO DO", "IN PROGRESS", "IN REVIEW", "DONE"] as const).map((status) => {
                const columnTasks = getTasksByStatus(status);
                
                return (
                  <div key={status} className="flex flex-col space-y-4 min-h-[calc(100vh-180px)]">
                    
                    {/* Column Header Metadata */}
                    <div className="flex items-center justify-between px-1 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusBulletColor(status)}`} />
                        <span className="font-label-caps text-label-caps text-on-surface-variant">{status}</span>
                        <span className="bg-surface-container-high px-2 py-0.5 rounded text-[10px] text-on-surface-variant font-semibold">
                          {columnTasks.length}
                        </span>
                      </div>
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </button>
                    </div>

                    {/* Task Card Stack */}
                    <div className="space-y-3">
                      {columnTasks.map((task) => {
                        const isDragging = activeCardId === task.id;
                        
                        return (
                          <div
                            key={task.id}
                            onMouseDown={() => setActiveCardId(task.id)}
                            onMouseUp={() => setActiveCardId(null)}
                            className={`group bg-surface-container border p-4 rounded-xl hover:border-outline transition-all cursor-grab active:cursor-grabbing relative ${
                              isDragging ? "scale-[1.02] rotate-1 shadow-2xl z-10 border-primary" : "border-outline-variant/30"
                            } ${task.status === "DONE" ? "opacity-75 grayscale hover:grayscale-0 hover:opacity-100" : ""}`}
                          >
                            {/* Card Priority & Actions Trigger */}
                            <div className="flex justify-between items-start mb-3">
                              <span className={`font-label-caps text-[9px] px-2 py-0.5 rounded-lg flex items-center font-bold ${getPriorityBadgeStyle(task.priority)}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  task.priority === "HIGH"
                                    ? "bg-error"
                                    : task.priority === "MEDIUM"
                                    ? "bg-secondary"
                                    : "bg-tertiary-fixed"
                                }`} />
                                {task.priority}
                              </span>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                                <button className="text-outline hover:text-primary transition-colors p-1">
                                  <span className="material-symbols-outlined text-[15px]">edit</span>
                                </button>
                              </div>
                            </div>

                            {/* Card Title & Description */}
                            <h3 className={`font-headline-md text-[14px] text-primary mb-1 font-semibold ${
                              task.status === "DONE" ? "line-through text-outline" : ""
                            }`}>
                              {task.title}
                            </h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">
                              {task.description}
                            </p>

                            {/* Progress bar for In Progress Tasks */}
                            {task.status === "IN PROGRESS" && task.progress !== undefined && (
                              <div className="mb-4 space-y-1">
                                <div className="flex justify-between items-center text-[9px] font-label-caps">
                                  <span className="text-outline">PROGRESS</span>
                                  <span className="text-primary">{task.progress}%</span>
                                </div>
                                <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                                  <div className="bg-secondary h-full transition-all duration-500" style={{ width: `${task.progress}%` }} />
                                </div>
                              </div>
                            )}

                            {/* Card Bottom Meta Data */}
                            <div className="flex items-center justify-between border-t border-outline-variant/30 pt-3 mt-2">
                              {/* Due Date Indicator */}
                              <div className={`flex items-center ${
                                task.status === "DONE"
                                  ? "text-tertiary-container font-semibold"
                                  : task.dueDate === "DUE TODAY"
                                  ? "text-error font-semibold"
                                  : "text-outline"
                              }`}>
                                <span className="material-symbols-outlined text-[13px] mr-1">
                                  {task.status === "DONE" ? "check_circle" : task.dueDate === "DUE TODAY" ? "priority_high" : "event"}
                                </span>
                                <span className="font-label-caps text-[9px] uppercase tracking-wide">{task.dueDate}</span>
                              </div>

                              {/* Comments & Attachments stats if present */}
                              {(task.commentsCount || task.attachmentsCount) ? (
                                <div className="flex items-center text-outline mr-auto ml-3 gap-3">
                                  {task.commentsCount ? (
                                    <span className="flex items-center text-[9px] font-label-caps">
                                      <span className="material-symbols-outlined text-[13px] mr-0.5">chat_bubble_outline</span>
                                      {task.commentsCount}
                                    </span>
                                  ) : null}
                                  {task.attachmentsCount ? (
                                    <span className="flex items-center text-[9px] font-label-caps">
                                      <span className="material-symbols-outlined text-[13px] mr-0.5">attach_file</span>
                                      {task.attachmentsCount}
                                    </span>
                                  ) : null}
                                </div>
                              ) : null}

                              {/* Assignee Avatar Pile */}
                              <div className="flex -space-x-1">
                                {task.assignees.map((url, idx) => (
                                  <img
                                    key={idx}
                                    className="w-6 h-6 rounded-full border border-surface-container object-cover"
                                    src={url}
                                    alt="Assignee"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty Column Indicator */}
                      {columnTasks.length === 0 && (
                        <div className="border border-dashed border-outline-variant/20 py-8 rounded-xl flex flex-col items-center justify-center text-outline/50 font-label-caps text-[10px]">
                          No Tasks in column
                        </div>
                      )}
                    </div>

                    {/* Dotted Quick Add New Placeholder */}
                    <button
                      onClick={() => {
                        setNewStatus(status);
                        setIsModalOpen(true);
                      }}
                      className="w-full py-3 border border-dashed border-outline-variant hover:border-primary/50 text-on-surface-variant hover:text-primary transition-all rounded-lg flex items-center justify-center font-label-caps text-label-caps text-[10px] bg-transparent cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] mr-1.5">add</span>
                      NEW TASK
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* B. LIST SPREADSHEET TABLE VIEW */}
          {activeView === "list" && (
            <div className="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-lg animate-fadeIn">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 bg-surface-container-high/50">
                    <th className="px-6 py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-[10px]">Task</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-[10px]">Priority</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-[10px]">Assignee</th>
                    <th className="px-6 py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-[10px]">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-surface-container-high/50 transition-colors duration-150 group cursor-pointer"
                    >
                      {/* Title & Description */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`font-body-md text-primary font-semibold group-hover:text-primary transition-colors ${
                            task.status === "DONE" ? "line-through text-outline" : ""
                          }`}>
                            {task.title}
                          </span>
                          <span className="text-outline text-body-sm line-clamp-1 mt-0.5 max-w-lg leading-relaxed">
                            {task.description}
                          </span>
                        </div>
                      </td>
                      
                      {/* Priority Badging */}
                      <td className="px-6 py-4 align-middle">
                        <span className={`font-label-caps text-[9px] px-2 py-0.5 rounded-lg flex items-center font-bold w-fit ${getPriorityBadgeStyle(task.priority)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            task.priority === "HIGH"
                              ? "bg-error"
                              : task.priority === "MEDIUM"
                              ? "bg-secondary"
                              : "bg-tertiary-fixed"
                          }`} />
                          {task.priority}
                        </span>
                      </td>

                      {/* Status Column bullet */}
                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusBulletColor(task.status)}`} />
                          <span className="font-label-caps text-label-caps text-on-surface text-[10px]">{task.status}</span>
                        </div>
                      </td>

                      {/* Assignee Avatar */}
                      <td className="px-6 py-4 align-middle">
                        <div className="flex -space-x-1">
                          {task.assignees.map((url, idx) => (
                            <img
                              key={idx}
                              className="w-6 h-6 rounded-full border border-surface-container object-cover"
                              src={url}
                              alt="Assignee"
                            />
                          ))}
                          {task.assignees.length === 0 && (
                            <span className="text-outline text-body-sm italic">Unassigned</span>
                          )}
                        </div>
                      </td>

                      {/* Due Date Metadata */}
                      <td className="px-6 py-4 align-middle">
                        <span className={`font-label-caps text-[10px] tracking-wide font-bold ${
                          task.status === "DONE"
                            ? "text-tertiary-container"
                            : task.dueDate === "DUE TODAY"
                            ? "text-error"
                            : "text-outline"
                        }`}>
                          {task.dueDate}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Empty Spreadsheet state */}
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-outline/50 font-label-caps text-label-caps">
                        No Tasks match your query
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>

      {/* Floating Action Button (Mobile view trigger) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {/* 4. PREMIUM DYNAMIC DIALOG MODAL (Create New Task) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
          <div className="bg-surface-container-high border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest/20">
              <h3 className="text-headline-md font-headline-md text-primary font-semibold">Initialize Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-outline hover:text-primary transition-colors flex items-center cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                  Task Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Hotfix Login API"
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
                  placeholder="Describe the tasks expectations..."
                  rows={3}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                    Status Column
                  </label>
                  <select
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                  >
                    <option value="TO DO">TO DO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="IN REVIEW">IN REVIEW</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    disabled={newStatus === "DONE"}
                    placeholder="e.g. OCT 30"
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                    value={newStatus === "DONE" ? "COMPLETED" : newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>

                {newStatus === "IN PROGRESS" && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider">
                        Progress Level
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
                )}
              </div>

              {/* Action Trigger Buttons */}
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
