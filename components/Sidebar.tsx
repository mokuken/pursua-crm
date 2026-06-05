"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/clients", label: "Clients", icon: "group" },
    { href: "/projects", label: "Projects", icon: "work" },
    { href: "/tasks", label: "Tasks", icon: "check_circle" },
    { href: "/reports", label: "Reports", icon: "assessment" },
    { href: "/payments", label: "Payments", icon: "payments" },
    { href: "/team", label: "Team", icon: "badge" },
    { href: "/notes", label: "Notes", icon: "description" },
    { href: "/files", label: "Files", icon: "folder" },
  ];

  return (
    <aside className="fixed h-full w-[240px] left-0 top-0 border-r border-outline-variant bg-background flex flex-col p-6 space-y-2 z-50">
      <div className="mb-10 flex justify-center w-full">
        <Link href="/clients" className="block w-full">
          <span className="font-headline-lg text-4xl font-black tracking-widest text-primary text-center block w-full hover:opacity-80 transition-opacity cursor-pointer">
            PURSUA
          </span>
        </Link>
      </div>
      <nav className="flex-1 flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                isActive
                  ? "bg-surface-container-highest text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              } rounded-lg flex items-center px-4 py-3 mb-1 transition-colors cursor-pointer`}
            >
              <span
                className="material-symbols-outlined mr-3"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-label-caps text-label-caps">{item.label}</span>
            </Link>
          );
        })}
        <div className="flex-1"></div>
        <Link
          href="/settings"
          className={`${
            pathname.startsWith("/settings")
              ? "bg-surface-container-highest text-primary"
              : "text-on-surface-variant hover:bg-surface-container-high"
          } rounded-lg flex items-center px-4 py-3 transition-colors mt-auto cursor-pointer`}
        >
          <span className="material-symbols-outlined mr-3">settings</span>
          <span className="font-label-caps text-label-caps">Settings</span>
        </Link>
      </nav>

      {/* User profile details at the bottom of sidebar */}
      <div className="pt-6 mt-auto border-t border-outline-variant">
        <div className="flex items-center space-x-3 px-2">
          <img
            alt="Marcus Aurelius"
            className="w-8 h-8 rounded-full object-cover border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiqh8aB8UjCnM2dRZQnTzIpVHkSl4hi5lqtK6839E8jcfdji_tYl3FWiJRJiK-YCm85q8CjmzkoANcLZs8UgsKzie9tyHHe3D8sHEZAs3rar0_nU9uIZApimiVFLRvwNMTEC-jU-1hspReK9NQD8ZVVw5b8g6Symlj1kJ2wODj8naivxZDRKXFmazKqSoQBwopIxHgrlu8rGz5sjmh4_4bfdxDLrsD69NkLniSkh9WV1igPRIjGJ9WA_MuxBd5wIBIIApepAQ0_q8"
          />
          <div>
            <p className="font-body-sm text-body-sm font-semibold text-primary">Marcus Aurelius</p>
            <p className="font-label-caps text-label-caps text-outline text-[9px] uppercase tracking-wide">
              Lead Architect
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
