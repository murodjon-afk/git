"use client";

import React, { useState } from "react";
import { FiKey, FiShield } from "react-icons/fi";

export default function SSHGPGSet() {
  const [vigilantMode, setVigilantMode] = useState(false);

  return (
    <div className="max-w-4xl space-y-8">
      {/* SSH keys section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#d0d7de]">
          <h2 className="text-2xl font-normal text-[#24292f]">SSH keys</h2>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FiKey className="w-3.5 h-3.5" />
            New SSH key
          </button>
        </div>
        <div className="space-y-2 text-sm text-[#57606a]">
          <p>There are no SSH keys associated with your account.</p>
          <p>
            Check out our guide to{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              connecting to GitHub using SSH keys
            </a>{" "}
            or troubleshoot{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              common SSH problems
            </a>
            .
          </p>
        </div>
      </div>

      {/* GPG keys section */}
      <div className="space-y-4 pt-4 border-t border-[#d0d7de]">
        <div className="flex items-center justify-between pb-4 border-b border-[#d0d7de]">
          <h2 className="text-2xl font-normal text-[#24292f]">GPG keys</h2>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FiShield className="w-3.5 h-3.5" />
            New GPG key
          </button>
        </div>
        <div className="space-y-2 text-sm text-[#57606a]">
          <p>There are no GPG keys associated with your account.</p>
          <p>
            Learn how to{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              generate a GPG key and add it to your account
            </a>
            .
          </p>
        </div>
      </div>

      {/* Vigilant mode section */}
      <div className="space-y-4 pt-4 border-t border-[#d0d7de]">
        <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de] text-[#24292f]">
          Vigilant mode
        </h2>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="vigilantMode"
            checked={vigilantMode}
            onChange={(e) => setVigilantMode(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da] cursor-pointer"
          />
          <div className="space-y-1">
            <label htmlFor="vigilantMode" className="text-sm font-semibold text-[#24292f] cursor-pointer">
              Flag unsigned commits as unverified
            </label>
            <p className="text-xs text-[#57606a]">
              This will include any commit attributed to your account but not signed with your GPG or S/MIME key. Note that this will include your existing unsigned commits.
            </p>
            <p className="text-xs pt-1">
              <a href="#" className="text-[#0969da] hover:underline">
                Learn about vigilant mode
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}