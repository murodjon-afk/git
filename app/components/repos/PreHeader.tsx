"use client";
import { useEffect, useState } from "react";
import { 
  Code2, 
  CircleDot, 
  GitPullRequest, 
  LayoutGrid, 
  ShieldAlert, 
  Settings 
} from "lucide-react";
const PreHeader = () => {
      const [activeTab, setActiveTab] = useState('Code');
    useEffect(() => {
  const tab = localStorage.getItem("activeTab");

  if (tab) {
    setActiveTab(tab);
  }
}, []);
      const tabs = [
        { name: 'Code', icon: Code2 },
        { name: 'Issues', icon: CircleDot },
        { name: 'Pull requests', icon: GitPullRequest },
        { name: 'Security and quality', icon: ShieldAlert },
        { name: 'Settings', icon: Settings },
      ];
  return (
<>
 <div className="w-full h-12 bg-[#f6f8fa] border-b border-[#d8dee4] flex items-end px-4 overflow-x-auto scrollbar-none">
        <nav className="flex gap-1 h-9 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
onClick={() => {
  setActiveTab(tab.name);
  localStorage.setItem('activeTab', tab.name);
  window.dispatchEvent(new Event("activeTabChanged"));
}}                className={`relative flex items-center gap-2 px-3 h-full text-[13px] font-sans transition-colors cursor-pointer rounded-md hover:bg-[#aeb7c0]/15 ${
                  isActive 
                    ? 'text-[#24292f] font-semibold' 
                    : 'text-[#57606a] hover:text-[#24292f]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#24292f]' : 'text-[#57606a]'} />
                <span className="whitespace-nowrap">{tab.name}</span>

                {/* Оранжевая линия под активной вкладкой */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fd8c73]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
</>
  )
}

export default PreHeader
