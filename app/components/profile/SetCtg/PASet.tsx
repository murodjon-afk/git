"use client";

import React from "react";
import { FiMail, FiKey, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignSet() {
  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de] text-[#24292f]">
        Sign in methods
      </h2>

      <div className="border border-[#d0d7de] rounded-md bg-white divide-y divide-[#d0d7de]">
        {/* Email */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[#57606a] mt-0.5">
              <FiMail className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#24292f]">Email</h3>
              <p className="text-xs text-[#57606a]">1 verified email configured</p>
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Manage
          </button>
        </div>

        {/* Password */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[#57606a] mt-0.5">
              <FiKey className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#24292f]">Password</h3>
              <p className="text-xs text-[#57606a]">Configured</p>
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Change password
          </button>
        </div>

        {/* Passkeys */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[#57606a] mt-0.5">
              <FiUser className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#24292f]">Passkeys</h3>
              <p className="text-xs text-[#57606a]">Passwordless sign-in with biometrics or security keys</p>
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Add passkey
          </button>
        </div>

        {/* Google */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5">
              <FcGoogle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#24292f]">Google</h3>
              <p className="text-xs text-[#57606a]">Sign in with your Google account</p>
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Connect
          </button>
        </div>

        {/* Apple */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[#24292f] mt-0.5">
              <FaApple className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#24292f]">Apple</h3>
              <p className="text-xs text-[#57606a]">Sign in with your Apple account</p>
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}