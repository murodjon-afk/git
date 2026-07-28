"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiUsers, FiLink, FiSmile } from "react-icons/fi";
import ProfileNav from "../components/profile/PreTab";
import OverviewTab from "../components/profile/OverView";
import RepoTab from "../components/profile/RepoTab";
import Stars from "../components/profile/Stars";

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
  twitter_username: string | null;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  visibility: string;
  language: string | null;
  stargazers_count?: number;
  updated_at?: string;
}

export default function Page() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [starredRepos, setStarredRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const username = localStorage.getItem("github_user") || "murodjon-afk";

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        };

        const [userRes, reposRes, starsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos`, { headers }),
          fetch(`https://api.github.com/users/${username}/starred`, { headers }),
        ]);

        if (!userRes.ok) throw new Error("Ошибка загрузки пользователя");

        const userData: GithubUser = await userRes.json();
        setUser(userData);

        if (reposRes.ok) {
          const reposData: Repository[] = await reposRes.json();
          setRepos(reposData);
        }

        if (starsRes.ok) {
          const starsData: Repository[] = await starsRes.json();
          setStarredRepos(starsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-gray-800 text-xl font-medium">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-gray-800 text-xl font-medium">
        Пользователь не найден
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#24292f] font-sans antialiased selection:bg-[#0969da] selection:text-white">
      <ProfileNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        publicReposCount={user.public_repos} 
      />
      <div className="w-[85%] mx-auto px-6 py-8 flex flex-col md:flex-row gap-10">
        
        {/* Левая колонка: Профиль */}
        <div className="w-full md:w-[296px] flex-shrink-0 flex flex-col py-5">
          <div className="relative -mt-8 mb-4">
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={256}
              height={256}
              className="rounded-full border border-[#d8dee4] bg-white shadow-sm w-[100%] h-auto mx-auto aspect-square object-cover"
              priority
            />
            <button className="absolute bottom-4 right-4 bg-white border border-[#d0d7de] hover:bg-[#f3f4f6] text-[#24292f] p-2 rounded-full shadow-sm flex items-center justify-center transition-colors">
              <FiSmile className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-2xl font-semibold leading-tight text-[#24292f]">
            {user.name ?? user.login}
          </h1>
          <p className="text-xl font-light text-[#57606a] mb-4">
            {user.login}
          </p>

          <button className="w-full py-1.5 px-4 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-sm rounded-md shadow-sm transition-colors mb-4 text-center">
            Edit profile
          </button>

          <div className="flex items-center gap-1.5 text-sm text-[#57606a] mb-4">
            <FiUsers className="w-4 h-4 text-[#57606a]" />
            <div>
              <span className="font-semibold text-[#24292f]">{user.followers}</span> followers
              <span className="mx-1">·</span>
              <span className="font-semibold text-[#24292f]">{user.following}</span> following
            </div>
          </div>

          {user.blog && (
            <div className="flex items-center gap-2 text-sm text-[#24292f] mb-6">
              <FiLink className="w-4 h-4 text-[#57606a]" />
              <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" className="hover:underline truncate">
                {user.blog.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          <div className="border-t border-[#d8dee4] pt-4 mt-2">
            <h2 className="font-semibold text-[#24292f] text-base mb-3">Achievements</h2>
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center shadow-inner p-1">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-[10px] font-bold tracking-tighter text-[#24292f]">
                  <span>YO</span>
                  <span className="text-[8px] text-pink-600">LO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка: Условный рендеринг в зависимости от вкладки */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeTab === "overview" && (
            <OverviewTab repos={repos} publicReposCount={user.public_repos} />
          )}
          {activeTab === "repositories" && (
            <RepoTab repos={repos} />
          )}
          {activeTab === "stars" && (
            <Stars starredRepos={starredRepos} />
          )}
        </div>

      </div>
    </div>
  );
}