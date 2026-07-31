"use client";

import React, { useState } from "react";
import { FiX, FiMapPin, FiClock, FiMail, FiLink, FiInstagram } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialBio?: string;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialName = "",
  initialBio = "",
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [pronouns, setPronouns] = useState("Don't specify");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [displayTime, setDisplayTime] = useState(false);
  const [email, setEmail] = useState("murodovmaruf67@gmail.com");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("https://www.instagram.com/muro__m_m/");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-[#d0d7de] w-full max-w-lg overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
          <h3 className="text-sm font-semibold text-[#24292f]">Edit profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add a bio"
              rows={2}
              className="w-full px-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f] resize-none"
            />
            <p className="text-[11px] text-[#57606a]">
              You can <span className="text-[#0969da]">@mention</span> other users and organizations to link to them.
            </p>
          </div>

          {/* Pronouns */}
          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Pronouns</label>
            <select
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            >
              <option value="Don't specify">Don&apos;t specify</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
            </select>
          </div>

          {/* Company */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-[#57606a]">
              <HiOutlineBuildingOffice2 className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            />
          </div>

          {/* Location */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-[#57606a]">
              <FiMapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            />
          </div>

          {/* Display local time */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[#57606a]">
              <FiClock className="w-4 h-4" />
            </span>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={displayTime}
                onChange={(e) => setDisplayTime(e.target.checked)}
                className="rounded border-[#d0d7de] text-[#0969da] focus:ring-0 cursor-pointer"
              />
              <span className="text-[#24292f]">Display current local time</span>
            </label>
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-[#57606a]">
              <FiMail className="w-4 h-4" />
            </span>
            <select
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-2.5 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            >
              <option value="murodovmaruf67@gmail.com">murodovmaruf67@gmail.com</option>
            </select>
          </div>

          {/* Website */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-[#57606a]">
              <FiLink className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
              className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            />
          </div>

          {/* Social Accounts Group */}
          <div className="space-y-2 pt-1 border-t border-[#d0d7de]">
            <label className="block font-semibold text-[#24292f]">Social accounts</label>
            
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <FiInstagram className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <FiLink className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Link to social profile 2"
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#d0d7de]">
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}