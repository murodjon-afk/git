"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoGitPullRequest, GoSearch } from "react-icons/go";

interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  repository_url: string;
  user: {
    login: string;
  };
  draft?: boolean;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const elapsed = now.getTime() - past.getTime();

  if (elapsed < msPerMinute) return "just now";
  if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)}m ago`;
  if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)}h ago`;
  return `${Math.round(elapsed / msPerDay)}d ago`;
}

export default function AllPullRequests() {
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([]);

  useEffect(() => {
    const getPullRequests = async () => {
      const savedUser = localStorage.getItem("github_user");

      if (!savedUser ) return;

      try {
        const res = await fetch(
          `https://api.github.com/search/issues?q=author:${encodeURIComponent(
            savedUser
          )}+is:pr`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch pull requests");

        const data = await res.json();
        setPullRequests(data.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    getPullRequests();
  }, []);

  return (
    <div className="w-[85%] h-[85%] mx-auto p-6 font-sans antialiased text-[#1f2328] flex flex-col justify-start">
      
      {/* Top Header Section */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h1 className="text-3xl font-semibold text-[#1f2328] tracking-tight">All Pull requests</h1>
        <Link 
          href="/" 
          className="bg-[#1a7f37] hover:bg-[#1a7f37]/90 text-white text-[14px] font-semibold px-4 py-2 rounded-md shadow-sm transition-colors"
        >
          New pull request
        </Link>
      </div>

      {/* Styled Mock Search Bar */}
      <div className="flex items-center w-full border border-[#d0d7de] rounded-md bg-white overflow-hidden mb-6 text-[15px] flex-shrink-0">
        <div className="flex-1 px-4 py-2.5 flex flex-wrap gap-2 items-center bg-[#ffffff]">
          <span className="text-[#57606a]">is:<span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium">pr</span></span>
          <span className="text-[#57606a]">state:<span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium">open</span></span>
          <span className="text-[#57606a]">archived:<span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium">false</span></span>
          <span className="text-[#57606a]">author:<span className="text-[#8250df] bg-[#f5e8ff] px-1.5 py-0.5 rounded-sm font-medium">@me</span></span>
          <span className="text-[#57606a]">sort:<span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium">updated-desc</span></span>
        </div>
        <div className="border-l border-[#d0d7de] px-4 py-3 bg-[#f6f8fa] flex items-center justify-center cursor-pointer text-[#57606a] hover:text-[#1f2328] transition-colors">
          <GoSearch size={18} />
        </div>
      </div>

      {/* Pull Requests Table Container */}
      <div className="w-full border border-[#d0d7de] rounded-md bg-white shadow-sm flex flex-col overflow-hidden flex-1">
        {/* Table Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#d8dee4] bg-[#f6f8fa] flex-shrink-0">
          <span className="text-[15px] font-semibold text-[#1f2328]">
            {pullRequests.length} results
          </span>

          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#57606a] hover:text-[#1f2328] transition-colors">
            <svg
              className="w-4 h-4 text-[#57606a]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            Updated
            <svg
              className="w-3.5 h-3.5 ml-0.5 fill-current"
              viewBox="0 0 16 16"
            >
              <path d="M4.427 6.427 8 10l3.573-3.573L13 7.854l-5 5-5-5z" />
            </svg>
          </button>
        </div>

        {/* Pull Requests List with Scroll */}
        <div className="overflow-y-auto flex-1">
          {pullRequests.map((pr) => {
            const repoName = pr.repository_url.split("/repos/")[1] || "";
            
            // Цвет иконки зависит от статуса PR (Open/Merged/Closed/Draft)
            const isMerged = pr.state === "closed" && false; // Полноценный статус мерджа требует отдельного запроса, оставляем базовую логику гитхаба
            const iconColor = pr.state === "open" ? "text-[#1a7f37]" : "text-[#8250df]";

            return (
              <div
                key={pr.id}
                className="flex gap-3.5 px-5 py-[18px] border-b border-[#d8dee4] last:border-b-0 hover:bg-[#f6f8fa] transition-colors"
              >
                {/* Git Pull Request Icon */}
                <div className={`mt-0.5 ${iconColor} flex-shrink-0`}>
                  <GoGitPullRequest size={20} />
                </div>

                <div className="flex-1">
                  {/* PR Title */}
                  <a 
                    href={pr.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[16px] font-semibold text-[#1f2328] hover:text-[#0969da] cursor-pointer block leading-snug"
                  >
                    {pr.title}
                  </a>

                  {/* Subtitle Meta Description */}
                  <div className="text-[13px] text-[#57606a] mt-1.5 font-normal tracking-wide">
                    <span className="hover:text-[#0969da] cursor-pointer font-medium text-[#24292f]">{repoName}#{pr.number}</span>
                    {" • "}
                    <span>{pr.user.login} opened {formatRelativeTime(pr.created_at)}</span>
                    {" • "}
                    <span>Updated {formatRelativeTime(pr.updated_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {pullRequests.length === 0 && (
            <div className="p-12 text-center text-[15px] text-[#57606a]">
              No pull requests found matching the criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}