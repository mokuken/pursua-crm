"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function FilesPage() {
  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      {/* Main */}
      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header title="Files" />

        {/* Content */}
        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">folder</span>
            <h3 className="text-2xl font-semibold text-primary mb-2">Files are coming soon</h3>
            <p className="text-on-surface-variant max-w-md">
              A centralized repository for all your project documents and assets is under development.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
