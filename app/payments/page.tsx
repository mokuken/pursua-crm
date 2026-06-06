"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Payment {
  id: string;
  projectName: string;
  clientName: string;
  totalValue: number;
  amountPaid: number;
  outstanding: number;
  paymentDate: string;
  paymentMethod: string;
  status: "Paid" | "Partially Paid" | "Pending" | "Overdue";
}

const initialPayments: Payment[] = [
  {
    id: "pay-1",
    projectName: "Quantum Infrastructure",
    clientName: "Nebula Softworks",
    totalValue: 45000,
    amountPaid: 45000,
    outstanding: 0,
    paymentDate: "Oct 15, 2023",
    paymentMethod: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "pay-2",
    projectName: "Helius Branding",
    clientName: "Nebula Softworks",
    totalValue: 28500,
    amountPaid: 15000,
    outstanding: 13500,
    paymentDate: "Oct 10, 2023",
    paymentMethod: "Credit Card",
    status: "Partially Paid",
  },
  {
    id: "pay-3",
    projectName: "Atlas API v2",
    clientName: "Vertex Media",
    totalValue: 128500,
    amountPaid: 128500,
    outstanding: 0,
    paymentDate: "Sep 28, 2023",
    paymentMethod: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "pay-4",
    projectName: "Apex Dashboard",
    clientName: "Optic Prime",
    totalValue: 12000,
    amountPaid: 6000,
    outstanding: 6000,
    paymentDate: "Oct 05, 2023",
    paymentMethod: "Check",
    status: "Pending",
  },
  {
    id: "pay-5",
    projectName: "Project Phoenix",
    clientName: "Flow Logistics",
    totalValue: 94200,
    amountPaid: 0,
    outstanding: 94200,
    paymentDate: "—",
    paymentMethod: "—",
    status: "Overdue",
  },
];

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClientFilter, setSelectedClientFilter] = useState("");
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("");
  const [selectedMethodFilter, setSelectedMethodFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProjectName, setNewProjectName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newPaymentDate, setNewPaymentDate] = useState("");
  const [newPaymentMethod, setNewPaymentMethod] = useState("Bank Transfer");
  const [newNotes, setNewNotes] = useState("");

  const filteredPayments = payments.filter((p) => {
    if (selectedClientFilter && p.clientName !== selectedClientFilter) return false;
    if (selectedProjectFilter && p.projectName !== selectedProjectFilter) return false;
    if (selectedMethodFilter && p.paymentMethod !== selectedMethodFilter) return false;
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const allTotalProjectValue = payments.reduce((sum, p) => sum + p.totalValue, 0);
  const allTotalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
  const allTotalOutstanding = payments.reduce((sum, p) => sum + p.outstanding, 0);
  const overdueAmount = payments.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.outstanding, 0);

  const totalProjectValue = filteredPayments.reduce((sum, p) => sum + p.totalValue, 0);
  const totalPaid = filteredPayments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalOutstanding = filteredPayments.reduce((sum, p) => sum + p.outstanding, 0);

  const uniqueClients = [...new Set(payments.map((p) => p.clientName))];
  const clientFilteredPayments = selectedClientFilter
    ? payments.filter((p) => p.clientName === selectedClientFilter)
    : payments;
  const uniqueProjects = [...new Set(clientFilteredPayments.map((p) => p.projectName))];
  const uniqueMethods = [...new Set(payments.map((p) => p.paymentMethod))];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-tertiary-fixed/10 text-tertiary-fixed border-tertiary-fixed/20";
      case "Partially Paid":
        return "bg-secondary-fixed-dim/10 text-secondary-fixed-dim border-secondary-fixed-dim/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Overdue":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-surface-container-highest text-on-surface-variant border-outline-variant";
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background select-none font-body-md relative">
      <Sidebar />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <Header title="Payments" />

        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Project Value</span>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-primary">{formatCurrency(allTotalProjectValue)}</span>
                <span className="material-symbols-outlined text-primary-fixed-dim">account_balance</span>
              </div>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Paid</span>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-tertiary-fixed">{formatCurrency(allTotalPaid)}</span>
                <span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
              </div>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Outstanding</span>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-secondary-fixed-dim">{formatCurrency(allTotalOutstanding)}</span>
                <span className="material-symbols-outlined text-secondary-fixed-dim">hourglass_bottom</span>
              </div>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Overdue Amounts</span>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-headline-lg text-headline-lg text-error">{formatCurrency(overdueAmount)}</span>
                <span className="material-symbols-outlined text-error">warning</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <select
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 text-body-sm text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer min-w-[180px] h-[36px]"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
            >
              <option value="">All Clients</option>
              {uniqueClients.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 text-body-sm text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer min-w-[180px] h-[36px]"
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
            >
              <option value="">All Projects</option>
              {uniqueProjects.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 text-body-sm text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer min-w-[180px] h-[36px]"
              value={selectedMethodFilter}
              onChange={(e) => setSelectedMethodFilter(e.target.value)}
            >
              <option value="">All Methods</option>
              {uniqueMethods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-auto bg-primary text-on-primary rounded-lg flex items-center justify-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md w-[36px] h-[36px]"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
            <div className="bg-surface-container border border-outline-variant/30 px-3 rounded-lg flex items-center w-64 h-[36px] group focus-within:border-primary/50 transition-all">
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

          {/* Payment Table */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Client</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Project</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Total Value</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Amount Paid</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Outstanding</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Payment Date</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Method</th>
                    <th className="px-5 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                        <td className="px-5 py-4 text-on-surface-variant">{payment.clientName}</td>
                        <td className="px-5 py-4">
                          <span className="text-primary font-medium">{payment.projectName}</span>
                        </td>
                        <td className="px-5 py-4 text-right text-primary font-semibold">{formatCurrency(payment.totalValue)}</td>
                        <td className="px-5 py-4 text-right text-tertiary-fixed font-semibold">{formatCurrency(payment.amountPaid)}</td>
                        <td className="px-5 py-4 text-right text-error font-semibold">{formatCurrency(payment.outstanding)}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{payment.paymentDate}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{payment.paymentMethod}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[11px] px-2 py-0.5 rounded border font-label-caps ${getStatusStyle(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-on-surface-variant">
                        No payments match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-container border-t-2 border-outline-variant font-semibold">
                    <td className="px-5 py-4 text-on-surface-variant" colSpan={2}>Totals</td>
                    <td className="px-5 py-4 text-right text-primary">{formatCurrency(totalProjectValue)}</td>
                    <td className="px-5 py-4 text-right text-tertiary-fixed">{formatCurrency(totalPaid)}</td>
                    <td className="px-5 py-4 text-right text-error">{formatCurrency(totalOutstanding)}</td>
                    <td className="px-5 py-4" colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
          <div className="bg-surface-container-high border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl animate-scaleUp">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest/20">
              <h3 className="text-headline-md font-headline-md text-primary font-semibold">Record Payment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-outline hover:text-primary transition-colors flex items-center cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="p-6 space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Project</label>
                <select
                  required
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                >
                  <option value="">Select project...</option>
                  {initialPayments.map((p) => (
                    <option key={p.id} value={p.projectName}>{p.projectName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Amount Paid</label>
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Payment Date</label>
                <input
                  required
                  type="date"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors"
                  value={newPaymentDate}
                  onChange={(e) => setNewPaymentDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Payment Method</label>
                <select
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                  value={newPaymentMethod}
                  onChange={(e) => setNewPaymentMethod(e.target.value)}
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Notes / Reference</label>
                <textarea
                  rows={2}
                  placeholder="Optional reference or notes..."
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-body-sm text-outline hover:text-primary transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="bg-primary text-on-primary px-5 py-2 rounded-lg font-body-sm font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer active:scale-95">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
