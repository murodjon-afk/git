"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit2, FiLink, FiCamera } from "react-icons/fi";

export default function PubSettings() {
  const [name, setName] = useState("");
  const [publicEmail, setPublicEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("Don't specify");
  const [url, setUrl] = useState("");
  const [social1, setSocial1] = useState("");
  const [social2, setSocial2] = useState("");
  const [social3, setSocial3] = useState("");
  const [social4, setSocial4] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [displayTime, setDisplayTime] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("github_user") || "murodjon-afk";

    async function fetchUserData() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.name) setName(data.name);
          if (data.bio) setBio(data.bio);
          if (data.company) setCompany(data.company);
          if (data.location) setLocation(data.location);
          if (data.blog) setUrl(data.blog);
          if (data.avatar_url) setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub profile data", error);
      }
    }

    fetchUserData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика сохранения профиля
    console.log({
      name,
      publicEmail,
      bio,
      pronouns,
      url,
      socialAccounts: [social1, social2, social3, social4],
      company,
      location,
      displayTime,
    });
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-normal pb-4 mb-6 border-b border-[#d0d7de] text-[#24292f]">
        Public profile
      </h2>

      <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
        {/* Левая часть: Форма */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
            <p className="text-xs text-[#57606a] mt-1">
              Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Public email
            </label>
            <select
              value={publicEmail}
              onChange={(e) => setPublicEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            >
              <option value="">Select a verified email to display</option>
              <option value="email1@example.com">email1@example.com</option>
            </select>
            <p className="text-xs text-[#57606a] mt-1">
              You can manage verified email addresses in your{" "}
              <a href="#" className="text-[#0969da] hover:underline">
                email settings
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little bit about yourself"
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f] resize-y"
            />
            <p className="text-xs text-[#57606a] mt-1">
              You can @mention other users and organizations to link to them.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Pronouns
            </label>
            <select
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            >
              <option value="Don't specify">Don't specify</option>
              <option value="He/him">He/him</option>
              <option value="She/her">She/her</option>
              <option value="They/them">They/them</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Social accounts
            </label>
            <div className="space-y-2">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#57606a]">
                  <FiLink className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={social1}
                  onChange={(e) => setSocial1(e.target.value)}
                  placeholder="Link to social profile 1"
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#57606a]">
                  <FiLink className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={social2}
                  onChange={(e) => setSocial2(e.target.value)}
                  placeholder="Link to social profile 2"
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#57606a]">
                  <FiLink className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={social3}
                  onChange={(e) => setSocial3(e.target.value)}
                  placeholder="Link to social profile 3"
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#57606a]">
                  <FiLink className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={social4}
                  onChange={(e) => setSocial4(e.target.value)}
                  placeholder="Link to social profile 4"
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
            <p className="text-xs text-[#57606a] mt-1">
              You can @mention your company's GitHub organization to link it.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="displayTime"
              checked={displayTime}
              onChange={(e) => setDisplayTime(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da]"
            />
            <div>
              <label htmlFor="displayTime" className="text-sm font-semibold text-[#24292f] cursor-pointer">
                Display current local time
              </label>
              <p className="text-xs text-[#57606a]">
                Other users will see the time difference from their local time.
              </p>
            </div>
          </div>

          <div className="border-t border-[#d0d7de] pt-4 mt-6">
            <h3 className="text-sm font-semibold text-[#24292f] mb-1">ORCID iD</h3>
            <p className="text-xs text-[#57606a] mb-3">
              ORCID provides a persistent identifier - an ORCID iD - that distinguishes you from other researchers. Learn more at{" "}
              <a href="https://orcid.org" target="_blank" rel="noreferrer" className="text-[#0969da] hover:underline">
                ORCID.org
              </a>
            </p>
            <button
              type="button"
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#a6ce39] font-bold">iD</span> Connect your ORCID iD
            </button>
          </div>

          <p className="text-xs text-[#57606a] border-t border-[#d0d7de] pt-4 mt-6">
            All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              privacy statement
            </a>{" "}
            to learn more about how we use this information.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Update profile
            </button>
          </div>
        </form>

        {/* Правая часть: Аватарка */}
        <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start">
          <label className="block text-sm font-semibold text-[#24292f] mb-2">
            Profile picture
          </label>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border border-[#d0d7de] bg-[#f6f8fa] shadow-sm">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#57606a]">
                <FiCamera className="w-12 h-12" />
              </div>
            )}
          </div>
          <div className="mt-3">
            <label className="cursor-pointer px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors inline-flex items-center gap-1.5">
              <FiEdit2 className="w-3.5 h-3.5" />
              Edit
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}