"use client";

import React, { useState, useEffect } from "react";
import { FiGlobe, FiPlus, FiBook } from "react-icons/fi";

interface DomainEntry {
  domain: string;
  repoName: string;
}

export default function PagesSet() {
  const [username, setUsername] = useState("murodjon-afk");
  const [verifiedDomains, setVerifiedDomains] = useState<DomainEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user") || "murodjon-afk";
    setUsername(storedUser);

    async function fetchPagesAndDomains() {
      try {
        setLoading(true);
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch user repos to check their GitHub Pages settings
        const reposRes = await fetch(`https://api.github.com/users/${storedUser}/repos?per_page=100`, {
          headers,
        });

        if (!reposRes.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const repos = await reposRes.json();
        const foundDomains: DomainEntry[] = [];

        // Check each repository for custom pages domain (e.g. .uz)
        for (const repo of repos) {
          try {
            const pagesRes = await fetch(`https://api.github.com/repos/${storedUser}/${repo.name}/pages`, {
              headers,
            });
            if (pagesRes.ok) {
              const pagesData = await pagesRes.json();
              if (pagesData.cname) {
                // Filter or check if it matches custom requirements like .uz or any custom domain
                foundDomains.push({
                  domain: pagesData.cname,
                  repoName: `${storedUser}/${repo.name}`,
                });
              }
            }
          } catch (e) {
            // Ignore individual repo page fetch failures
          }
        }

        setVerifiedDomains(foundDomains);
      } catch (err: any) {
        setError(err.message || "Error loading verified domains");
      } finally {
        setLoading(false);
      }
    }

    fetchPagesAndDomains();
  }, []);

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    
    // Optimistically add to list (mock custom domain addition)
    setVerifiedDomains([...verifiedDomains, { domain: newDomain.trim(), repoName: `${username}/portfolio` }]);
    setNewDomain("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#d0d7de]">
        <h2 className="text-2xl font-normal text-[#24292f]">Pages</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#24292f]">Verified domains</h3>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FiPlus className="w-3.5 h-3.5" />
            Add a domain
          </button>
        </div>

        {/* Modal / Add form toggle */}
        {isModalOpen && (
          <form onSubmit={handleAddDomain} className="p-4 bg-[#f6f8fa] border border-[#d0d7de] rounded-md space-y-3">
            <h4 className="text-sm font-semibold text-[#24292f]">Add a custom domain (e.g. example.uz)</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="domain.uz"
                className="flex-1 px-3 py-1.5 text-sm bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#2da44e] text-white text-sm font-medium rounded-md hover:bg-[#2c974b] cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] text-[#24292f] text-sm font-medium rounded-md hover:bg-[#f3f4f6] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Content Box */}
        <div className="border border-[#d0d7de] rounded-md bg-white">
          {loading ? (
            <div className="p-8 text-center text-sm text-[#57606a]">Scanning repositories for custom domains...</div>
          ) : error ? (
            <div className="p-8 text-center text-sm text-[#cf222e]">{error}</div>
          ) : verifiedDomains.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <h4 className="text-base font-semibold text-[#24292f]">There are no verified domains.</h4>
              <p className="text-sm text-[#57606a]">Verify domains to restrict who can publish GitHub Pages on them.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#d0d7de]">
              {verifiedDomains.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between gap-4 hover:bg-[#f9fafb]">
                  <div className="flex items-center gap-3">
                    <FiGlobe className="w-5 h-5 text-[#0969da]" />
                    <div>
                      <div className="text-sm font-semibold text-[#24292f]">{item.domain}</div>
                      <div className="flex items-center gap-1.5 text-xs text-[#57606a] mt-0.5">
                        <FiBook className="w-3.5 h-3.5" />
                        <span>Repository: <strong className="text-[#24292f]">{item.repoName}</strong></span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#dafbe1] text-[#1a7f37] border border-[#1a7f3766] rounded-full">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}