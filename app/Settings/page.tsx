'use client';

import React, { useState, useEffect } from 'react';
import AccountSettingTab from '../components/profile/PreSetting'; // Укажите правильный путь к сайдбару настроек аккаунта
// Импортируйте компоненты для соответствующих разделов аккаунта:
// import PublicProfile from "./AccountSettingCtg/PublicProfile";
// import Emails from "./AccountSettingCtg/Emails";
// import Password from "./AccountSettingCtg/Password";
// import SSHKeys from "./AccountSettingCtg/SSHKeys";
// import Repositories from "./AccountSettingCtg/Repositories";
// import DeveloperSettings from "./AccountSettingCtg/DeveloperSettings";
// import Pages from "./AccountSettingCtg/Pages";
import AS from "../components/profile/SetCtg/AccSet"
import PS from "../components/profile/SetCtg/PubSettins";
import ES from "../components/profile/SetCtg/ESet"
import PA from "../components/profile/SetCtg/PASet";
import SHH from "../components/profile/SetCtg/SSHSet"
import RS from "../components/profile/SetCtg/RepoSet"
import PagesSet from "../components/profile/SetCtg/PagesSet"
import Null from "../components/profile/SetCtg/Null"
export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [loading, setLoading] = useState<boolean>(false);

  // Здесь можно добавить логику загрузки данных пользователя, если требуется

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-[#57606a]">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#24292f] font-sans flex justify-center p-6">
      <div className="w-[100%] flex gap-8 pr-10">
        
        {/* Подключаем сайдбар настроек аккаунта */}
        <AccountSettingTab currentTab={activeTab} onSelectTab={setActiveTab} />

        {/* Основной контент меняется в зависимости от активного таба */}
        <main className="flex-1 bg-white">
          {activeTab === 'profile' && (
           <><PS></PS></>
          )}

          {activeTab === 'account' && (
           <><AS></AS></>
          )}

           {activeTab === 'emails' && (
           <><ES></ES></>
          )}

          {activeTab === 'password' && (
          <><PA></PA></>
          )}

          {activeTab === 'ssh' && (
            <><SHH></SHH></>
          )}

          {activeTab === 'repositories' && (
           <><RS></RS></>
          )}

          {activeTab === 'developer' && (
          <><Null></Null></>
          )}

          {activeTab === 'pages' && (
           <><PagesSet></PagesSet></>
          )}
        </main>

      </div>
    </div>
  );
}