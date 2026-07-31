"use client";

import React, { useState } from "react";
import { FiBook, FiLock, FiGlobe, FiChevronDown } from "react-icons/fi";

export default function CreateRepository() {
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [isVisDropdownOpen, setIsVisDropdownOpen] = useState(false);
  const [addReadme, setAddReadme] = useState(false);
  const [gitIgnore, setGitIgnore] = useState("No .gitignore");
  const [license, setLicense] = useState("No license");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="border-b border-[#d0d7de] pb-4">
        <h1 className="text-2xl font-normal text-[#24292f]">Create a new repository</h1>
        <p className="text-sm text-[#57606a] mt-1">
          Repositories contain a project&apos;s files and version history. Have a project elsewhere?{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            Import a repository
          </a>
          .
        </p>
        <p className="text-xs text-[#57606a] mt-1 italic">
          Required fields are marked with an asterisk (*).
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* General Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#afb8c1]/20 text-[#24292f] text-xs font-semibold">
              1
            </span>
            <h2 className="text-base font-semibold text-[#24292f]">General</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#24292f] mb-1">
                Owner *
              </label>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#24292f] shadow-sm">
                <img
                  src="https://github.com/murodjon-afk.png"
                  alt="murodjon-afk"
                  className="w-5 h-5 rounded-full"
                />
                <span className="font-semibold">murodjon-afk</span>
                <FiChevronDown className="w-4 h-4 text-[#57606a]" />
              </div>
            </div>

            <span className="hidden md:inline text-xl text-[#57606a] mt-6">/</span>

            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-[#24292f] mb-1">
                Repository name *
              </label>
              <input
                type="text"
                required
                placeholder=""
                className="w-full px-3 py-1.5 text-sm bg-white border border-[#d0d7de] rounded-md shadow-sm focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          <p className="text-xs text-[#57606a]">
            Great repository names are short and memorable. How about{" "}
            <span className="text-[#2da44e] font-medium cursor-pointer hover:underline">
              animated-octo-broccoli
            </span>
            ?
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#24292f] mb-1">
              Description <span className="font-normal text-[#57606a]">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-1.5 text-sm bg-white border border-[#d0d7de] rounded-md shadow-sm focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
            <span className="block text-[11px] text-[#57606a] mt-1">0 / 350 characters</span>
          </div>
        </div>

        <hr className="border-[#d0d7de]" />

        {/* Configuration Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#afb8c1]/20 text-[#24292f] text-xs font-semibold">
              2
            </span>
            <h2 className="text-base font-semibold text-[#24292f]">Configuration</h2>
          </div>

          {/* Visibility Dropdown */}
          <div className="relative max-w-sm">
            <label className="block text-xs font-semibold text-[#24292f] mb-1">
              Choose visibility *
            </label>
            <button
              type="button"
              onClick={() => setIsVisDropdownOpen(!isVisDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-md text-sm text-[#24292f] shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {visibility === "public" ? <FiGlobe className="w-4 h-4 text-[#57606a]" /> : <FiLock className="w-4 h-4 text-[#57606a]" />}
                <span className="capitalize font-medium">{visibility}</span>
              </div>
              <FiChevronDown className="w-4 h-4 text-[#57606a]" />
            </button>

            {isVisDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-[#d0d7de] rounded-md shadow-lg z-10 text-sm">
                <div
                  onClick={() => { setVisibility("public"); setIsVisDropdownOpen(false); }}
                  className="p-3 hover:bg-[#f6f8fa] cursor-pointer flex items-start gap-2 border-b border-[#d0d7de]"
                >
                  <FiGlobe className="w-4 h-4 mt-0.5 text-[#57606a]" />
                  <div>
                    <div className="font-semibold text-[#24292f]">Public</div>
                    <div className="text-xs text-[#57606a]">Anyone on the internet can see this repository. You choose who can commit.</div>
                  </div>
                </div>
                <div
                  onClick={() => { setVisibility("private"); setIsVisDropdownOpen(false); }}
                  className="p-3 hover:bg-[#f6f8fa] cursor-pointer flex items-start gap-2"
                >
                  <FiLock className="w-4 h-4 mt-0.5 text-[#57606a]" />
                  <div>
                    <div className="font-semibold text-[#24292f]">Private</div>
                    <div className="text-xs text-[#57606a]">You choose who can see and commit to this repository.</div>
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-[#57606a] mt-1">Choose who can see and commit to this repository</p>
          </div>

          {/* Addables Group Box */}
          <div className="border border-[#d0d7de] rounded-md bg-white divide-y divide-[#d0d7de]">
            {/* README */}
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#24292f]">Add README</h4>
                <p className="text-xs text-[#57606a]">
                  READMEs can be used as longer descriptions.{" "}
                  <a href="#" className="text-[#0969da] hover:underline">
                    About READMEs
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddReadme(!addReadme)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  addReadme ? "bg-[#2da44e]" : "bg-[#afb8c1]"
                }`}
              >
                <span className="absolute left-1 text-[10px] font-bold text-white uppercase">{addReadme ? "" : ""}</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    addReadme ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* .gitignore */}
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#24292f]">Add .gitignore</h4>
                <p className="text-xs text-[#57606a]">
                  .gitignore tells git which files not to track.{" "}
                  <a href="#" className="text-[#0969da] hover:underline">
                    About ignoring files
                  </a>
                </p>
              </div>
              <select
                value={gitIgnore}
                onChange={(e) => setGitIgnore(e.target.value)}
                className="px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-sm focus:outline-none focus:border-[#0969da] text-[#24292f]"
              >
                <option>No .gitignore</option>
                <option>Node</option>
                <option>Python</option>
                <option>React</option>
              </select>
            </div>

            {/* License */}
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#24292f]">Add license</h4>
                <p className="text-xs text-[#57606a]">
                  Licenses explain how others can use your code.{" "}
                  <a href="#" className="text-[#0969da] hover:underline">
                    About licenses
                  </a>
                </p>
              </div>
              <select
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-sm focus:outline-none focus:border-[#0969da] text-[#24292f]"
              >
                <option>No license</option>
                <option>MIT License</option>
                <option>Apache License 2.0</option>
                <option>GNU General Public v3.0</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-[#d0d7de]" />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Create repository
          </button>
        </div>
      </form>
    </div>
  );
}