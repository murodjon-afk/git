"use client";

import React, { useState } from "react";
import { FiX, FiCopy, FiBook, FiChevronDown, FiArrowRight } from "react-icons/fi";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateIssueModal({ isOpen, onClose }: CreateIssueModalProps) {
  const [selectedRepo, setSelectedRepo] = useState("Diyor-Khasanov/team-work");
  const [isRepoDropdownOpen, setIsRepoDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-[#d0d7de] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
          <h3 className="text-sm font-semibold text-[#24292f]">Create new issue</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
              title="Copy link"
            >
              <FiCopy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
              title="Close"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Repository Selector */}
          <div className="space-y-1.5 relative">
            <label className="block text-xs font-semibold text-[#24292f]">
              Repository <span className="text-[#cf222e]">*</span>
            </label>
            <button
              type="button"
              onClick={() => setIsRepoDropdownOpen(!isRepoDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-md text-sm text-[#24292f] shadow-sm cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <FiBook className="w-4 h-4 text-[#57606a] shrink-0" />
                <span className="font-semibold truncate">{selectedRepo}</span>
              </div>
              <FiChevronDown className="w-4 h-4 text-[#57606a] shrink-0" />
            </button>

            {isRepoDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-[#d0d7de] rounded-md shadow-lg z-20 text-sm py-1">
                <div
                  onClick={() => {
                    setSelectedRepo("Diyor-Khasanov/team-work");
                    setIsRepoDropdownOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-[#f6f8fa] cursor-pointer flex items-center gap-2 font-semibold text-[#24292f]"
                >
                  <FiBook className="w-4 h-4 text-[#57606a]" />
                  <span>Diyor-Khasanov/team-work</span>
                </div>
                <div
                  onClick={() => {
                    setSelectedRepo("murodjon-afk/--007");
                    setIsRepoDropdownOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-[#f6f8fa] cursor-pointer flex items-center gap-2 font-semibold text-[#24292f]"
                >
                  <FiBook className="w-4 h-4 text-[#57606a]" />
                  <span>murodjon-afk/--007</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#57606a] uppercase tracking-wider">
              Templates and forms
            </div>

            {/* Blank Issue Option */}
            <div
              onClick={() => {
                alert(`Creating issue for ${selectedRepo}`);
                onClose();
              }}
              className="group border border-[#d0d7de] rounded-md p-4 hover:border-[#0969da] hover:bg-[#f6f8fa]/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0969da] group-hover:underline">
                  Blank issue
                </h4>
                <p className="text-xs text-[#57606a]">
                  Create a new issue from scratch
                </p>
              </div>
              <FiArrowRight className="w-4 h-4 text-[#57606a] group-hover:text-[#0969da] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}