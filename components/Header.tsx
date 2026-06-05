"use client";

import React from "react";

interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actions,
}) => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-16 border-b border-outline-variant bg-background/80 backdrop-blur-md flex items-center justify-between px-margin-desktop z-40">
      <div className="flex items-center gap-6">
        <h2 className="font-headline-md text-headline-md text-primary font-semibold">
          {title}
        </h2>

        {onSearchChange !== undefined && (
          <div className="bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-lg flex items-center w-64 group focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-outline mr-2 text-[18px]">
              search
            </span>
            <input
              className="bg-transparent border-none text-body-sm text-on-surface placeholder:text-outline focus:ring-0 w-full p-0 text-[13px] outline-none"
              placeholder={searchPlaceholder || "Search..."}
              type="text"
              value={searchValue || ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange("")}
                className="text-outline hover:text-primary ml-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center cursor-pointer relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-secondary rounded-full" />
        </button>

        <img
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-outline-variant cursor-pointer hover:opacity-80 transition-opacity"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiqh8aB8UjCnM2dRZQnTzIpVHkSl4hi5lqtK6839E8jcfdji_tYl3FWiJRJiK-YCm85q8CjmzkoANcLZs8UgsKzie9tyHHe3D8sHEZAs3rar0_nU9uIZApimiVFLRvwNMTEC-jU-1hspReK9NQD8ZVVw5b8g6Symlj1kJ2wODj8naivxZDRKXFmazKqSoQBwopIxHgrlu8rGz5sjmh4_4bfdxDLrsD69NkLniSkh9WV1igPRIjGJ9WA_MuxBd5wIBIIApepAQ0_q8"
        />

        {actions}
      </div>
    </header>
  );
};

export default Header;
