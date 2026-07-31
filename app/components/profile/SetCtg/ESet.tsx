"use client";

import React, { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ESet() {
  const [username, setUsername] = useState("murodjon-afk");
  const [emailInput, setEmailInput] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("murodovmaruf67@gmail.com");
  const [backupEmail, setBackupEmail] = useState("Allow all verified emails");
  const [keepPrivate, setKeepPrivate] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user") || "murodjon-afk";
    setUsername(storedUser);
  }, []);

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-2xl font-normal pb-4 mb-6 border-b border-[#d0d7de] text-[#24292f]">
        Emails
      </h2>

      {/* Description */}
      <p className="text-sm text-[#57606a]">
        Emails you can use to sign in to your account. Verified emails can be used as the author or committer addresses for web-based Git operations, e.g. edits and merges.
      </p>

      {/* Email item list */}
      <div className="border border-[#d0d7de] rounded-md p-4 bg-white space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#24292f]">murodovmaruf67@gmail.com</span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#ddf4ff] text-[#0969da] border border-[#0969da66] rounded-full">
              Primary
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#dafbe1] text-[#1a7f37] border border-[#1a7f3766] rounded-full">
              Verified
            </span>
          </div>
          <button type="button" className="text-[#57606a] hover:text-[#24292f] p-1">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-[#57606a]">
          This email address is the default for GitHub notifications, such as replies to issues, pull requests, and similar activity.
        </p>
      </div>

      {/* Add email address */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[#24292f]">
          Add email address <span className="text-[#cf222e]">*</span>
        </label>
        <div className="flex gap-2 max-w-xl">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
          />
          <button
            type="button"
            disabled={!emailInput.trim()}
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] disabled:opacity-50 disabled:hover:bg-[#f6f8fa] border border-[#d0d7de] text-[#24292f] font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Primary email address selection */}
      <div className="border border-[#d0d7de] rounded-md p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#24292f] mb-1">Primary email address</h3>
          <p className="text-xs text-[#57606a]">
            Select an email to be used for account-related notifications and can be used for password reset.
          </p>
        </div>
        <select
          value={primaryEmail}
          onChange={(e) => setPrimaryEmail(e.target.value)}
          className="px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f] shrink-0 w-full md:w-auto"
        >
          <option value="murodovmaruf67@gmail.com">murodovmaruf67@gmail.com</option>
        </select>
      </div>

      {/* Backup email address */}
      <div className="border border-[#d0d7de] rounded-md p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#24292f] mb-1">Backup email address</h3>
          <p className="text-xs text-[#57606a] max-w-xl">
            Your backup GitHub email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.
          </p>
        </div>
        <select
          value={backupEmail}
          onChange={(e) => setBackupEmail(e.target.value)}
          className="px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f] shrink-0 w-full md:w-auto"
        >
          <option value="Allow all verified emails">Allow all verified emails</option>
          <option value="Don't allow backup emails">Don't allow backup emails</option>
        </select>
      </div>

      {/* Keep my email addresses private */}
      <div className="border border-[#d0d7de] rounded-md p-4 bg-white space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#24292f] mb-1">Keep my email addresses private</h3>
            <p className="text-xs text-[#57606a]">
              We'll remove your public profile email and use <span className="font-semibold text-[#24292f]">17509294+{username}@users.noreply.github.com</span> when performing web-based Git operations (e.g. edits and merges) and sending email on your behalf. If you want command line Git operations to use your private email you must{" "}
              <a href="#" className="text-[#0969da] hover:underline">
                set your email in Git
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => setKeepPrivate(!keepPrivate)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              keepPrivate ? "bg-[#2da44e]" : "bg-[#afb8c1]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                keepPrivate ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-[#57606a] border-t border-[#d8dee4] pt-3">
          Previously authored commits associated with a public email will remain public.
        </p>
      </div>
    </div>
  );
}