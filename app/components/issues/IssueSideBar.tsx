"use client";

import {
  CircleDot,
  UserRoundCheck,
  Smile,
  AtSign,
  Clock3,

} from "lucide-react";

// Описываем типы для пропсов
interface IssueSideBarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const IssueSideBar = ({ activeTab, setActiveTab }: IssueSideBarProps) => {
  const topItems = [
    { name: "Issues", icon: CircleDot },
    { name: "Assigned to me", icon: UserRoundCheck },
    { name: "Created by me", icon: Smile },
    { name: "Mentioned", icon: AtSign },
    { name: "Recent activity", icon: Clock3 },
  ];



  return (
    <>
      <aside className="w-[296px] h-screen bg-white border-r border-[#d0d7de] flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="px-3 py-4">
            {topItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)} // Меняем стейт в родителе
                  className={`relative w-full h-9 flex items-center gap-3 rounded-md px-3 text-sm transition-colors
                    ${
                      isActive
                        ? "bg-[#eaeef2] text-[#24292f] font-semibold"
                        : "text-[#24292f] hover:bg-[#f6f8fa]"
                    }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-[#0969da]" />
                  )}

                  <Icon size={17} strokeWidth={1.8} />
                  {item.name}
                </button>
              );
            })}
          </div>


         
        </div>

        
      </aside>
    </>
  );
};

export default IssueSideBar;