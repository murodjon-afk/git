"use client";

import React, { useState, useEffect } from "react";
import { FiHelpCircle, FiUser } from "react-icons/fi";
import { SiPatreon } from "react-icons/si";

export default function AccSet() {
  const [username, setUsername] = useState("murodjon-afk");
  const [successorSearch, setSuccessorSearch] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user") || "murodjon-afk";
    setUsername(storedUser);
  }, []);

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-2xl font-normal pb-4 mb-6 border-b border-[#d0d7de] text-[#24292f]">
        Account settings
      </h2>

      {/* Change username */}
      <div className="pb-8 border-b border-[#d0d7de] space-y-3">
        <h3 className="text-base font-semibold text-[#24292f]">Change username</h3>
        <p className="text-sm text-[#57606a]">
          Changing your username can have{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            unintended side effects
          </a>
          .
        </p>
        <div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Change username
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#57606a] pt-1">
          <FiHelpCircle className="w-4 h-4 shrink-0" />
          <span>
            Looking to manage account security settings? You can find them in the{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              Password and authentication
            </a>{" "}
            page.
          </span>
        </div>
      </div>

      {/* Link Patreon account */}
      <div className="pb-8 border-b border-[#d0d7de] space-y-3">
        <h3 className="text-base font-semibold text-[#24292f]">Link Patreon account</h3>
        <p className="text-sm text-[#57606a] max-w-2xl">
          Connect a Patreon account for <span className="font-semibold text-[#24292f]">@{username}</span> to sponsor maintainers with. Get recognition on GitHub for sponsorships made on Patreon when the sponsored person has linked Patreon and GitHub, too, and has a public GitHub Sponsors profile.
        </p>
        <div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <SiPatreon className="w-3.5 h-3.5 text-[#ff424d]" />
            Connect with Patreon
          </button>
        </div>
      </div>

      {/* Export account data */}
      <div className="pb-8 border-b border-[#d0d7de] space-y-3">
        <h3 className="text-base font-semibold text-[#24292f]">Export account data</h3>
        <p className="text-sm text-[#57606a]">
          Export all repositories and profile metadata for <span className="font-semibold text-[#24292f]">@{username}</span>. Exports will be available for 7 days.
        </p>
        <div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Start export
          </button>
        </div>
      </div>

      {/* Successor settings */}
      <div className="pb-8 border-b border-[#d0d7de] space-y-4">
        <h3 className="text-base font-semibold text-[#24292f]">Successor settings</h3>
        <p className="text-xs text-[#57606a] leading-relaxed max-w-3xl">
          By clicking "Add Successor" below, I acknowledge that I am the owner of the <span className="font-semibold text-[#24292f]">@{username}</span> account, and am authorizing GitHub to transfer content within that account to my GitHub Successor, designated below, in the event of my death. I understand that this appointment of a successor does not override legally binding next-of-kin rules or estate laws of any relevant jurisdiction, and does not create a binding will.{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            Learn more about account successors
          </a>
          .
        </p>
        <div>
          <label className="block text-sm font-semibold text-[#24292f] mb-1.5">
            Search by username, full name, or email address
          </label>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57606a]">
                <FiUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={successorSearch}
                onChange={(e) => setSuccessorSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
              />
            </div>
            <button
              type="button"
              disabled={!successorSearch.trim()}
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] disabled:opacity-50 disabled:hover:bg-[#f6f8fa] border border-[#d0d7de] text-[#24292f] font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Add Successor
            </button>
          </div>
        </div>
        <div className="border border-[#d0d7de] rounded-md p-6 text-center text-sm text-[#57606a] bg-white">
          You have not designated a successor.
        </div>
      </div>

      {/* Delete account */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-[#cf222e]">Delete account</h3>
        <p className="text-sm text-[#57606a]">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#ffebe9] border border-[#ff818266] text-[#cf222e] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Delete your account
          </button>
        </div>
      </div>
    </div>
  );
}