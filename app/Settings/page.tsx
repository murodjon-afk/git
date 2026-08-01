'use client';

import React, { useState } from 'react';
import AccountSettingTab from '../components/profile/PreSetting'; 
import AS from "../components/profile/SetCtg/AccSet";
import PS from "../components/profile/SetCtg/PubSettins";
import ES from "../components/profile/SetCtg/ESet";
import PA from "../components/profile/SetCtg/PASet";
import SHH from "../components/profile/SetCtg/SSHSet";
import RS from "../components/profile/SetCtg/RepoSet";
import PagesSet from "../components/profile/SetCtg/PagesSet";
import Null from "../components/profile/SetCtg/Null";
import { FiMenu, FiX } from 'react-icons/fi';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-[#57606a]">
        Loading settings...
      </div>
    );
  }

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Закрываем меню на мобилках при выборе вкладки
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#24292f] font-sans flex justify-center p-3 sm:p-6">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-6 lg:gap-8 pr-0 lg:pr-10">
        
        {/* Мобильная кнопка переключения меню настроек */}
        <div className="lg:hidden flex items-center justify-between bg-white border border-[#d0d7de] p-3 rounded-md shadow-sm">
          <span className="font-semibold text-sm capitalize">
            Settings: <span className="text-[#0969da]">{activeTab}</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#57606a] hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle settings menu"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Сайдбар (скрывается на мобилках, если не открыт, и показывается в виде модалки/аккордеона) */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
          <div className="bg-white lg:bg-transparent border lg:border-none border-[#d0d7de] rounded-md lg:rounded-none p-3 lg:p-0 shadow-sm lg:shadow-none">
            <AccountSettingTab currentTab={activeTab} onSelectTab={handleSelectTab} />
          </div>
        </div>

        {/* Основной контент */}
        <main className="flex-1 bg-white min-w-0">
          {activeTab === 'profile' && <PS />}
          {activeTab === 'account' && <AS />}
          {activeTab === 'emails' && <ES />}
          {activeTab === 'password' && <PA />}
          {activeTab === 'ssh' && <SHH />}
          {activeTab === 'repositories' && <RS />}
          {activeTab === 'developer' && <Null />}
          {activeTab === 'pages' && <PagesSet />}
        </main>

      </div>
    </div>
  );
}