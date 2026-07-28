'use client';

import React from 'react';
import { 
  FiSettings, 
  FiGitBranch, 
  FiPlay, 
  FiKey, 
  FiGlobe 
} from 'react-icons/fi';

interface SeetingTabProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export default function SeetingTab({ currentTab, onSelectTab }: SeetingTabProps) {
  const menuItems = [
    { id: 'general', label: 'General', icon: <FiSettings className="text-base" /> },
    { id: 'branches', label: 'Branches', icon: <FiGitBranch /> },
    { id: 'actions', label: 'Actions', icon: <FiPlay /> },
    { id: 'secrets', label: 'Secrets and variables', icon: <FiKey /> },
    { id: 'pages', label: 'Pages', icon: <FiGlobe /> },
  ];

  return (
    <aside className="w-64 shrink-0 space-y-1">
      {menuItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors text-left cursor-pointer ${
              isActive 
                ? 'bg-[#eaeef2] font-semibold text-[#24292f]' 
                : 'text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f]'
            }`}
          >
            <span className={isActive ? 'text-[#24292f]' : 'text-[#57606a]'}>
              {item.icon}
            </span>
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}