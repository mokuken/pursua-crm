"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Activity {
  title: string;
  meta: string;
  content: string;
  isSystem?: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  isPrimary: boolean;
}

interface Client {
  id: string;
  code: string;
  name: string;
  status: "Active" | "Negotiation" | "Dormant" | "Pending";
  value: number;
  location: string;
  lastContact: string;
  health: number;
  contacts: Contact[];
  activities: Activity[];
  industry: string;
}

const initialClients: Client[] = [
  {
    id: "nebula-softworks",
    code: "NS",
    name: "Nebula Softworks",
    status: "Active",
    value: 45000,
    lastContact: "2h ago",
    location: "San Francisco, CA",
    health: 98.4,
    industry: "Technology",
    contacts: [
      { id: "c-1", name: "Elena Rodriguez", email: "elena@nebulasoftworks.com", phone: "+1 (415) 555-0101", role: "CEO", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvqX9l5K-KbOx6K-GBZscqNnN9V-YS9PbaRH8Y12djU-puGAkQpED-dIIzAn9h-yiASuyk-XodX13UZjajdR51mIt7fK_2USXJ1vCHU07yVjMFw934hzPe2KLd7ceRbLLAm8TtkDs3j_BFTxrfyhmEgKPy3XUxgkte5xjo1EGgR0QZx7UR_MGRSWxiK1YlZYzjSRfyRI_tCrEJ17XPCNYJV3czweY2oRpvJgLJPcWbd53Kor6RFe4NhMVIBqqg3lzgeMKkRVhNE04", isPrimary: true },
      { id: "c-2", name: "Mark Johnson", email: "mark@nebulasoftworks.com", phone: "+1 (415) 555-0102", role: "CTO", avatar: "", isPrimary: false },
    ],
    activities: [
      { title: "Contract Renewal", meta: "by Elena Rodriguez • 2h ago", content: "Finalized the Q3 enterprise agreement with 15% upsell on cloud seats." },
      { title: "Support Ticket #8292", meta: "by System • Yesterday", content: "Resolved latency issues for APAC data nodes.", isSystem: true },
      { title: "Inbound Call", meta: "3m 42s • Oct 12, 2023", content: "Spoke with Elena regarding billing queries." },
    ],
  },
  {
    id: "vertex-media",
    code: "VM",
    name: "Vertex Media",
    status: "Negotiation",
    value: 128500,
    lastContact: "Yesterday",
    location: "New York, NY",
    health: 87.5,
    industry: "Media & Entertainment",
    contacts: [
      { id: "c-3", name: "Marcus Chen", email: "marcus@vertexmedia.com", phone: "+1 (212) 555-0201", role: "Creative Director", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdRMT_iIUiLSXYs34j7ZeUp95dld_dPi8ktg9u_xNLkAsjBUr46kFLYmKpLyM_qhFnS5CT85tIupIzQPH5gtmWFwI_AlyfOeTCSt2eDDUk_BqzFhi1Lj0sGJkfFqsO8isUU-RqUItQ05BA7cSamqivfpyr-eKrYaTPQ8Qs83MsFzhdA7DJo3jU1jNYk-t66KmrKkK16pFrUizQc--VcgITMLVxBuw8VCpXbMGieYD1qcknNrX86-P46a0TwRdKa6MBPkPUAkeH0g", isPrimary: true },
      { id: "c-4", name: "Lisa Park", email: "lisa@vertexmedia.com", phone: "+1 (212) 555-0202", role: "Account Manager", avatar: "", isPrimary: false },
    ],
    activities: [
      { title: "Creative Sync", meta: "by Marcus Chen • 4h ago", content: "Reviewed high-fidelity layout concepts for winter campaign." },
      { title: "Invoice Paid", meta: "by Accounts Payable • 2d ago", content: "Payment received for invoice #4421." },
    ],
  },
  {
    id: "optic-prime",
    code: "OP",
    name: "Optic Prime",
    status: "Active",
    value: 12000,
    lastContact: "3d ago",
    location: "Chicago, IL",
    health: 94.0,
    industry: "Healthcare",
    contacts: [
      { id: "c-5", name: "Sarah Jenkins", email: "sarah@opticprime.com", phone: "+1 (312) 555-0301", role: "Operations Lead", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfVd1r_nSZ0qEiSRLq_UpPmPnBd__OZKE091u5xQU8andzFgQKCJ13DoR9zsTzNAzdgYqfVp-09r1tVvNiUVVIqoCsRBFPzwT9L44vNCyI43kTiy_1OlQo7Yf9-tdDeqDNnk1VoeBP45KHT6gUydLt9jEyOkdsWn_hXfduiRzmZC70xmlvb6QIedCNSRvDzP-gPj9kP6tu_sfHvY5UfBgsgdhs59ztpFeKmLJX4JpOMHHpM91CjeiuIYbtYB0UjjP9IktRDhA0b9M", isPrimary: true },
    ],
    activities: [
      { title: "Onboarding Kickoff", meta: "by Sarah Jenkins • 3d ago", content: "Introduced delivery teams and established communication channels." },
      { title: "Requirements Gathered", meta: "by System • 5d ago", content: "Initial intake forms completed.", isSystem: true },
    ],
  },
  {
    id: "flow-logistics",
    code: "FL",
    name: "Flow Logistics",
    status: "Dormant",
    value: 94200,
    lastContact: "1w ago",
    location: "Houston, TX",
    health: 62.1,
    industry: "Logistics",
    contacts: [
      { id: "c-6", name: "David Miller", email: "david@flowlogistics.com", phone: "+1 (713) 555-0401", role: "VP Engineering", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDawkph9UsESn_X8WAI43kcBP3JmO01Tf5MQ1SgSFjPwVNpdKDF6muIhuGWw08UNHj8_-K8OsvIXJoxMkqy63gNECgvwqbyGhAa9FZgx8Nv-AtAgNRvVkEhBpn6vkNOXqIwPHBrwrIpSJoknx0cW7hmfCktuXr7SAw3CBGTt7EhSps--Bq54Nngp2kx6cpGiywJY18fY42vwMa3ocHXVbtrcSIEVOD8EuPNGmMHLCfldm6ELGzx9REV7Z1Ij8uAPD4W0QHV-VKeAZ0", isPrimary: true },
      { id: "c-7", name: "Amy Torres", email: "amy@flowlogistics.com", phone: "+1 (713) 555-0402", role: "Finance Manager", avatar: "", isPrimary: false },
    ],
    activities: [
      { title: "Quarterly QBR", meta: "by David Miller • 1w ago", content: "Identified gaps in integration coverage." },
      { title: "Auto-Alert", meta: "by System • 2w ago", content: "System connection idle for 7 consecutive days.", isSystem: true },
    ],
  },
];

export default function ClientsPage() {
  const [clients] = useState<Client[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState<string>("nebula-softworks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStatus, setNewStatus] = useState<"Active" | "Negotiation" | "Dormant" | "Pending">("Active");
  const [newIndustry, setNewIndustry] = useState("");
  const [newValue, setNewValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const filteredClients = clients.filter((client) => {
    const q = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.contacts.some((c) => c.name.toLowerCase().includes(q)) ||
      client.location.toLowerCase().includes(q)
    );
  });

  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, element: HTMLDivElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);
    };
    const cleanupFuncs = glowRefs.current.map((element) => {
      if (!element) return () => {};
      const handler = (e: MouseEvent) => handleMouseMove(e, element);
      element.addEventListener("mousemove", handler);
      return () => element.removeEventListener("mousemove", handler);
    });
    return () => cleanupFuncs.forEach((cleanup) => cleanup());
  }, [clients]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(val);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!newName.trim()) newErrors.name = "Client name is required";
    if (!newEmail.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) newErrors.email = "Invalid email format";
    if (newPhone && !/^[\d\s\-\+\(\)]+$/.test(newPhone)) newErrors.phone = "Invalid phone format";
    if (!newLocation.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsModalOpen(false);
    setNewName(""); setNewEmail(""); setNewPhone(""); setNewContactName("");
    setNewLocation(""); setNewStatus("Active"); setNewIndustry(""); setNewValue("");
    setErrors({});
  };

  return (
    <div className="flex flex-1 min-h-screen bg-background text-on-background">
      <Sidebar />

      <Header
        title="Clients"
        searchPlaceholder="Search clients, industries..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center hover:bg-primary-fixed-dim transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined mr-1.5 text-[18px]">add</span>
            Add New
          </button>
        }
      />

      <main className="ml-[240px] min-h-screen bg-background w-[calc(100%-240px)] flex flex-col relative">
        <div className="pt-24 px-margin-desktop pb-12 w-full flex-1 max-w-container-max mx-auto space-y-6">

          {/* Featured Clients Bento Grid */}
          <section className="grid grid-cols-3 gap-6">
            <div ref={(el) => { glowRefs.current[0] = el; }} className="bg-surface-container-low border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:border-primary transition-all duration-300 group cursor-default">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary">rocket_launch</span>
                  </div>
                  <span className="bg-tertiary-container/10 text-on-tertiary-container px-2 py-0.5 rounded text-[10px] font-label-caps uppercase border border-tertiary-container/20">High Value</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Lumos Grid</h3>
                <p className="text-on-surface-variant text-body-sm mt-1">Renewable Energy</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase font-label-caps">Account Value</p>
                  <p className="text-primary font-semibold">₱840K</p>
                </div>
                <div className="flex -space-x-2">
                  <Image alt="Contact" className="h-6 w-6 rounded-full border border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHw91rVA4tXNeHndD1yUqrfydNgCOEh1ohKb4HlcyT94nZtDdawpEC-FfuS107xMGl39DWW50CNMQv0YmRalvTvWxPsRAwTlh-pcBO5haXaFPVz69KduPLx6XzjRN28FwBvhDqCR7CYWv6lnYybt6lgV5C_zSkSIFLYfaRd1ZtSrYp80kfwKNItIMJBuvZUQl8YCCWWlk_knfJYHGTTlMVmWEAxSuEGeQBU6S8F1EljBYZ1v_RMMWdbHhti_ikZPWCCnaKdyyq_kg" width={24} height={24} unoptimized />
                  <div className="h-6 w-6 rounded-full bg-surface-container-highest border border-background flex items-center justify-center text-[8px] text-primary">+1</div>
                </div>
              </div>
            </div>

            <div ref={(el) => { glowRefs.current[1] = el; }} className="bg-surface-container-low border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:border-primary transition-all duration-300 group cursor-default">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary">electric_bolt</span>
                  </div>
                  <span className="bg-secondary-container/10 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-label-caps uppercase border border-secondary-container/20">Active Now</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Lumos Grid</h3>
                <p className="text-on-surface-variant text-body-sm mt-1">Renewable Energy</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase font-label-caps">Account Value</p>
                  <p className="text-primary font-semibold">₱840K</p>
                </div>
                <div className="flex -space-x-2">
                  <Image alt="Contact" className="h-6 w-6 rounded-full border border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHw91rVA4tXNeHndD1yUqrfydNgCOEh1ohKb4HlcyT94nZtDdawpEC-FfuS107xMGl39DWW50CNMQv0YmRalvTvWxPsRAwTlh-pcBO5haXaFPVz69KduPLx6XzjRN28FwBvhDqCR7CYWv6lnYybt6lgV5C_zSkSIFLYfaRd1ZtSrYp80kfwKNItIMJBuvZUQl8YCCWWlk_knfJYHGTTlMVmWEAxSuEGeQBU6S8F1EljBYZ1v_RMMWdbHhti_ikZPWCCnaKdyyq_kg" width={24} height={24} unoptimized />
                  <div className="h-6 w-6 rounded-full bg-surface-container-highest border border-background flex items-center justify-center text-[8px] text-primary">+1</div>
                </div>
              </div>
            </div>

            <div ref={(el) => { glowRefs.current[2] = el; }} className="bg-surface-container-low border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:border-primary transition-all duration-300 group cursor-default">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary">neurology</span>
                  </div>
                  <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-label-caps uppercase border border-outline-variant">New Client</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Synapse AI</h3>
                <p className="text-on-surface-variant text-body-sm mt-1">Technology</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4">
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase font-label-caps">Account Value</p>
                  <p className="text-primary font-semibold">₱312K</p>
                </div>
                <div className="flex -space-x-2">
                  <Image alt="Contact" className="h-6 w-6 rounded-full border border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfWeNO02udyB8IibqdMeQcVriDh2xboFZoErlFaMI_WGyxUWlHXTiQjyahrK1veJxgSF215ykZd9VQrZc7iYVsuoidy0FVKiV6UHqKVLs92OsA8x8l_RRbATIj6r_2YzGWiXWY9gXI12cRx1Lk2h8EKCXo31nN9pbbdSiLxpew3HurdzKx5WB_tdW2HS3vMHGtkAvx79nLNXEOQtyX3wa1VnOVpUCG8Drc4wXwtT69lDh2ec5lFUnh1q9mQ3FwsNPT1raaDz_yt5I" width={24} height={24} unoptimized />
                  <Image alt="Contact" className="h-6 w-6 rounded-full border border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqIePJMiJf2-hPS_KPL5nNmAuoQLko00BpofojPDtzwBqCSUwKWupje1IpgCV_9Xb6CqEoryO8d5E4P7hVouSbdtVBSCkk8FeEuMlWeKOspGVn3h4M3MIkBCMzQQioGX23CYTvOnDNvCxuSCN4pw_5c5eVUsS3WfCovULwg8V-duncjoNsquXFBTAWCdJWh8rtI_bORQAVvVb0mL-h0KEgCgBYre6E9S7Rw-6gM7P6cbwio5tbeN0t7T7H-Pw06DWoYgWyQ4u3OPQ" width={24} height={24} unoptimized />
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6">
            {/* Client Table (8 Columns) */}
            <div className="col-span-8 bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-outline-variant flex items-center justify-between">
                  <h2 className="font-headline-md text-headline-md text-primary">All Accounts</h2>
                  <div className="flex gap-4">
                    <div className="text-body-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-on-surface-variant">Active</span>
                    </div>
                    <div className="text-body-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span className="text-on-surface-variant">Pending / Negotiation</span>
                    </div>
                  </div>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container text-on-surface-variant">
                    <tr>
                      <th className="px-5 py-3 font-label-caps text-label-caps uppercase">Company</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps uppercase">Contact Person</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps uppercase">Status</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps uppercase text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => {
                        const isSelected = client.id === selectedClientId;
                        const primaryContact = client.contacts.find((c) => c.isPrimary) || client.contacts[0];
                        return (
                          <tr key={client.id} className={`transition-colors cursor-pointer group hover:bg-surface-container-high ${isSelected ? "bg-surface-container-highest" : ""}`} onClick={() => setSelectedClientId(client.id)}>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded bg-surface-container-highest border border-outline-variant flex items-center justify-center text-primary text-[12px] font-bold">{client.code}</div>
                                <div>
                                  <div className="text-primary font-medium">{client.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                                <span className="text-on-surface text-body-sm">{primaryContact?.name || "—"}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-[11px] px-2 py-0.5 rounded border ${
                                client.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : client.status === "Negotiation" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : client.status === "Dormant" ? "bg-surface-container-highest text-on-surface-variant border-outline-variant"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              }`}>{client.status}</span>
                            </td>
                            <td className="px-5 py-4 text-right text-primary font-semibold">{formatCurrency(client.value)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan={4} className="px-5 py-8 text-center text-on-surface-variant">No accounts match your search query.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-surface-container flex items-center justify-between border-t border-outline-variant">
                <span className="text-on-surface-variant text-body-sm">Showing {filteredClients.length} of {clients.length}</span>
                <div className="flex gap-2">
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-high transition-colors cursor-pointer flex items-center"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-high transition-colors cursor-pointer flex items-center"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                </div>
              </div>
            </div>

            {/* Client Insights (4 Columns) */}
            <div className="col-span-4 space-y-6">
              {/* Selected Client Brief */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-5">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant">
                      <span className="material-symbols-outlined text-primary">person</span>
                    </div>
                    <div>
                      <h3 className="text-primary font-bold text-headline-md">{activeClient.name}</h3>
                      <p className="text-on-surface-variant text-body-sm">{activeClient.location}</p>
                      <p className="text-outline text-[10px] font-label-caps uppercase">{activeClient.industry}</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>

                {/* Contacts Section */}
                <div className="mb-6 space-y-3">
                  <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant border-b border-outline-variant pb-2">Contacts ({activeClient.contacts.length})</h4>
                  {activeClient.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 bg-surface-container rounded-lg p-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold ${contact.isPrimary ? "bg-primary text-on-primary" : "bg-surface-container-highest text-primary"}`}>
                        {contact.avatar ? (
                          <Image src={contact.avatar} alt={contact.name} width={32} height={32} className="rounded-full object-cover" unoptimized />
                        ) : (
                          contact.name.split(" ").map((n) => n[0]).join("")
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-primary text-body-sm font-medium truncate">{contact.name}</p>
                          {contact.isPrimary && <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-label-caps uppercase">Primary</span>}
                        </div>
                        <p className="text-outline text-[11px]">{contact.role}</p>
                        <p className="text-on-surface-variant text-[11px] truncate">{contact.email}</p>
                        <p className="text-on-surface-variant text-[11px]">{contact.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="flex items-center justify-center gap-2 py-2 bg-primary text-on-primary rounded text-body-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">mail</span>Email
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 border border-outline-variant text-primary rounded text-body-sm font-semibold hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">call</span>Call
                  </button>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4">
                  <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant border-b border-outline-variant pb-2">Recent Activity</h4>
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-outline-variant"></div>
                    {activeClient.activities.map((act, index) => (
                      <div key={index} className="relative">
                        <div className={`absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-4 border-background ${index === 0 ? "bg-primary" : "bg-outline"}`}></div>
                        <div>
                          <p className="text-primary text-body-sm font-medium">{act.title}</p>
                          <p className="text-on-surface-variant text-[11px] mb-1">{act.meta}</p>
                          <p className={`text-on-surface-variant text-body-sm ${act.isSystem ? "italic" : "bg-surface-container p-2 rounded"}`}>
                            {act.isSystem ? `"${act.content}"` : act.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full text-center text-on-surface-variant text-[11px] hover:text-primary transition-colors py-2 cursor-pointer">View full audit trail</button>
                </div>
              </div>

              {/* Quick Stats Mini-Card */}
              <div className="bg-surface-container-highest/20 border border-outline-variant rounded-xl p-5 relative overflow-hidden group">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Portfolio Health</p>
                    <h3 className="text-primary font-bold text-headline-md mt-1">{activeClient.health}%</h3>
                  </div>
                  <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400">trending_up</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${activeClient.health}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add New Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn p-4">
          <div className="bg-surface-container-high border border-outline-variant rounded-2xl w-full max-w-lg overflow-hidden relative shadow-2xl animate-scaleUp">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest/20">
              <h3 className="text-headline-md font-headline-md text-primary font-semibold">Add New Client</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-outline hover:text-primary transition-colors flex items-center cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Client Name *</label>
                  <input required type="text" placeholder="e.g. Acme Corp" className={`w-full bg-surface-container border ${errors.name ? "border-error" : "border-outline-variant"} rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors`} value={newName} onChange={(e) => setNewName(e.target.value)} />
                  {errors.name && <span className="text-error text-[10px] font-label-caps">{errors.name}</span>}
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Industry</label>
                  <input type="text" placeholder="e.g. Technology" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newIndustry} onChange={(e) => setNewIndustry(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Email Address *</label>
                <input required type="email" placeholder="contact@company.com" className={`w-full bg-surface-container border ${errors.email ? "border-error" : "border-outline-variant"} rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors`} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                {errors.email && <span className="text-error text-[10px] font-label-caps">{errors.email}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Phone Number</label>
                  <input type="text" placeholder="+1 (555) 000-0000" className={`w-full bg-surface-container border ${errors.phone ? "border-error" : "border-outline-variant"} rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors`} value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                  {errors.phone && <span className="text-error text-[10px] font-label-caps">{errors.phone}</span>}
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Contact Person</label>
                  <input type="text" placeholder="Primary contact name" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Location / Address *</label>
                <input required type="text" placeholder="City, State" className={`w-full bg-surface-container border ${errors.location ? "border-error" : "border-outline-variant"} rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors`} value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                {errors.location && <span className="text-error text-[10px] font-label-caps">{errors.location}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Status</label>
                  <select className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors cursor-pointer" value={newStatus} onChange={(e) => setNewStatus(e.target.value as any)}>
                    <option value="Active">Active</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Dormant">Dormant</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Initial Value Estimate</label>
                  <input type="number" placeholder="0" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-body-md text-primary focus:outline-none focus:border-primary/50 transition-colors" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => { setIsModalOpen(false); setErrors({}); }} className="px-4 py-2 rounded-lg font-body-sm text-outline hover:text-primary transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="bg-primary text-on-primary px-5 py-2 rounded-lg font-body-sm font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer active:scale-95">Add Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
