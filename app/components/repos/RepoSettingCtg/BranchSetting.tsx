'use client';

import React from 'react';
import { FiGitPullRequest } from 'react-icons/fi';

export default function BranchesSetting() {
  return (
    <div>
      <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de]">
        Branch protection rules
      </h2>

      <div className="mt-6 border border-[#d0d7de] rounded-md p-6 bg-white flex items-start gap-4">
        {/* Синяя иконка слева */}
        <div className="p-2 bg-[#ddf4ff] text-[#0969da] rounded-md shrink-0">
          <FiGitPullRequest className="text-xl" />
        </div>

        {/* Текст и кнопки */}
        <div className="space-y-3">
          <h3 className="font-semibold text-base text-[#24292f]">
            Classic branch protections have not been configured
          </h3>
          <p className="text-xs text-[#57606a] leading-relaxed">
            Define branch rules to disable force pushing, prevent branches from being deleted, or require pull requests before merging. Learn more about{' '}
            <a href="#" className="text-[#0969da] hover:underline">repository rules</a> and{' '}
            <a href="#" className="text-[#0969da] hover:underline">protected branches</a>.
          </p>
          
          <div className="flex items-center gap-3 pt-2">
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer text-[#24292f]">
              Add branch ruleset
            </button>
            <button className="font-medium text-sm text-[#0969da] hover:underline cursor-pointer">
              Add classic branch protection rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}