"use client";

import { useEffect, useState } from "react";
import IssueSideBar from "../issues/IssueSideBar";
import Issues from "../issues/issues";
import Asigned from "../issues/Asigned"
import CreatedBy from "../issues/CreatedBy"
import Mentioned from "../issues/Mentioned";
import RecentAct from "../issues/RecentAct";
const Repoissues = () => {
  const [repoTab, setRepoTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("active_repo_tab") || "Issues";
    setRepoTab(savedTab);
  }, []);

  const handleTabChange = (newTab: string) => {
    setRepoTab(newTab);
    localStorage.setItem("active_repo_tab", newTab);
  };

  if (repoTab === null) return null;
   
  return (
    
    <div className="w-full h-screen flex bg-[#ffffff]">
      <IssueSideBar activeTab={repoTab} setActiveTab={handleTabChange} />
      <main className="flex-1 p-6">
        {repoTab === "Issues" && <Issues/>}
        {repoTab === "Assigned to me" &&       <Asigned></Asigned>}
        {repoTab === "Created by me" &&         <CreatedBy></CreatedBy>}
        {repoTab === "Mentioned" &&         <Mentioned></Mentioned>}
        {repoTab === "Recent activity" &&         <RecentAct></RecentAct>}
        
        {/* Дополнительные вкладки из нижнего блока */}
        {repoTab === "Views" && <h1>Views</h1>}
        {repoTab === "Projects" && <h1>Projects</h1>}
        {repoTab === "Milestones" && <h1>Milestones</h1>}
        {repoTab === "Labels" && <h1>Labels</h1>}
      </main>
    </div>
  );
};

export default Repoissues;