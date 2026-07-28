"use client";

import { useEffect, useState } from 'react';
import { BookOpen, Pencil, List, Copy } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Folder, FileText, GitBranch, Eye, Pin, Link as LinkIcon, Star, Activity } from 'lucide-react';
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#663399",
  HTML: "#e34c26",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
};
interface GitHubFile {
  name: string;
  path: string;
  type: 'dir' | 'file';
  sha: string;
}

const RepoCode = () => {
    const [contributors, setContributors] = useState<any[]>([]);
const [languages, setLanguages] = useState<Record<string, number>>({});
  const params = useParams();
  const username = (params?.username as string) || 'murodjon-afk';
  const repoName = (params?.reponame as string) || 'team-work';
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/`, {
     headers: {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
}
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const sortedData = res.data.sort((a: GitHubFile, b: GitHubFile) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === 'dir' ? -1 : 1;
        });
        setFiles(sortedData);
      }
      setLoading(false);
    })
    .catch((err) => {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    });
  }, [username, repoName]);
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      };
  console.log(config);
      const [filesRes, contributorsRes, languagesRes] = await Promise.all([
        axios.get(
          `https://api.github.com/repos/${username}/${repoName}/contents/`,
          config
        ),
        axios.get(
          `https://api.github.com/repos/${username}/${repoName}/contributors`,
          config
        ),
        axios.get(
          `https://api.github.com/repos/${username}/${repoName}/languages`,
          config
        ),
      ]);

      if (Array.isArray(filesRes.data)) {
        const sorted = filesRes.data.sort((a: GitHubFile, b: GitHubFile) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === "dir" ? -1 : 1;
        });

        setFiles(sorted);
      }

      setContributors(contributorsRes.data);
      setLanguages(languagesRes.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [username, repoName]);
const handleCopy = () => {
    const codeText = `npm run dev\n# or\nyarn dev\n# or\npnpm dev\n# or\nbun dev`;
    navigator.clipboard.writeText(codeText);
    alert('Скопировано в буфер обмена!');
  };
const total = Object.values(languages).reduce((a, b) => a + b, 0);

const languageList = Object.entries(languages).map(([name, bytes]) => ({
  name,
  percent: ((bytes / total) * 100).toFixed(1),
  color: languageColors[name] || "#999",
}));
  if (loading) return <div className="p-8 w-[100%] h-[100vh] text-center text-gray-500">Загрузка...</div>;
  if (error) return <div className="p-8  w-[100%] h-[100vh] text-center text-red-500 font-medium">Ошибка: {error}</div>;

  return (
<div className="w-full mx-auto p-6 font-sans text-sm text-[#24292f]">
      
      {/* 1. ВЕРХНИЙ БЛОК: Имя репозитория и кнопки действий */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 mb-5 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 flex-wrap">
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img src={`https://github.com/${username}.png`} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl text-[#0969da] hover:underline cursor-pointer">{username}</span>
            <span className="text-xl text-gray-400">/</span>
            <span className="font-bold text-xl text-[#0969da] hover:underline cursor-pointer">{repoName}</span>
            <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-full font-medium text-gray-500 bg-white">
              Public
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            forked from <span className="text-[#0969da] hover:underline cursor-pointer">Diyor-Khasanov/team-work</span>
          </p>
        </div>

        {/* Группа кнопок справа */}
        <div className="flex items-center space-x-2 flex-wrap text-xs font-semibold text-gray-700">
          <button className="flex items-center space-x-1 bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 shadow-sm">
            <Pin size={14} className="text-gray-500" />
            <span>Pin</span>
          </button>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button className="flex items-center space-x-1 bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-l-md hover:bg-gray-50">
              <Eye size={14} className="text-gray-500" />
              <span>Watch</span>
              <span className="bg-gray-200 px-1.5 py-0.2 rounded-full text-[10px] text-gray-600">0</span>
            </button>
            <button className="bg-[#f6f8fa] border-y border-r border-gray-300 px-2 py-1.5 rounded-r-md hover:bg-gray-50 text-[10px]">▼</button>
          </div>

          <div className="inline-flex rounded-md shadow-sm">
            <button className="flex items-center space-x-1 bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-l-md hover:bg-gray-50">
              <GitBranch size={14} className="text-gray-500" />
              <span>Fork</span>
              <span className="bg-gray-200 px-1.5 py-0.2 rounded-full text-[10px] text-gray-600">0</span>
            </button>
            <button className="bg-[#f6f8fa] border-y border-r border-gray-300 px-2 py-1.5 rounded-r-md hover:bg-gray-50 text-[10px]">▼</button>
          </div>

          <div className="inline-flex rounded-md shadow-sm">
            <button className="flex items-center space-x-1 bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-l-md hover:bg-gray-50">
              <Star size={14} className="text-gray-500" />
              <span>Star</span>
              <span className="bg-gray-200 px-1.5 py-0.2 rounded-full text-[10px] text-gray-600">0</span>
            </button>
            <button className="bg-[#f6f8fa] border-y border-r border-gray-300 px-2 py-1.5 rounded-r-md hover:bg-gray-50 text-[10px]">▼</button>
          </div>
        </div>
      </div>

      {/* 2. ДВУХКОЛОНОЧНЫЙ МАКЕТ */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        {/* ЛЕВАЯ (ОСНОВНАЯ) КОЛОНКА — 80% */}
        <div className="w-full lg:w-[80%] flex-shrink-0">
          
          {/* Панель управления ветками и файлами */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center space-x-3 text-xs">
              <button className="flex items-center space-x-1 bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-md font-semibold text-gray-700 shadow-sm">
                <GitBranch size={14} />
                <span>main</span>
                <span className="text-[10px] text-gray-400">▼</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-500">
                <GitBranch size={14} />
                <span className="font-bold text-gray-800">1</span>
                <span>Branch</span>
                <span className="font-bold text-gray-800 ml-2">0</span>
                <span>Tags</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Go to file"
                  className="bg-[#f6f8fa] border border-gray-300 rounded-md px-3 py-1.5 w-44 focus:outline-none focus:border-[#0969da] focus:bg-white"
                />
                <span className="absolute right-2.5 top-1.5 text-[9px] px-1.5 py-0.5 border border-gray-300 rounded text-gray-400 bg-white">T</span>
              </div>
              <button className="bg-[#f6f8fa] border border-gray-300 px-3 py-1.5 rounded-md font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                Add file ▼
              </button>
              <button className="bg-[#1f883d] text-white px-3 py-1.5 rounded-md font-semibold shadow-sm hover:bg-[#1a7f37] flex items-center space-x-1">
                <span>{"<>"} Code</span>
                <span className="text-[10px]">▼</span>
              </button>
            </div>
          </div>

          {/* Информационная плашка Fork-коммитов */}
          <div className="flex items-center justify-between border border-gray-200 bg-[#ddf4ff]/30 text-xs px-4 py-2.5 rounded-lg mb-4 text-[#24292f]">
            <div>
              This branch is <span className="font-semibold text-[#0969da] hover:underline cursor-pointer">8 commits behind</span> <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-600">Diyor-Khasanov/team-work:main</span>.
            </div>
            <div className="flex space-x-2">
              <button className="bg-white border border-gray-300 px-2.5 py-1 rounded-md font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                Contribute ▼
              </button>
              <button className="bg-white border border-gray-300 px-2.5 py-1 rounded-md font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                🔄 Sync fork ▼
              </button>
            </div>
          </div>

          {/* Таблица структуры репозитория */}
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            
            {/* Детали последнего коммита */}
            <div className="flex justify-between items-center px-4 py-3 bg-[#f6f8fa] border-b border-gray-300 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-orange-100 overflow-hidden">
                  <img src={`https://github.com/murodjon-afk.png`} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-gray-800 hover:underline cursor-pointer">murodjon-afk</span>
                <span className="text-gray-700">second commit</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-mono text-[11px] text-gray-400 hover:text-[#0969da] cursor-pointer">3ffda00</span>
                <span>· last month</span>
                <span className="font-semibold text-gray-700 hover:text-[#0969da] cursor-pointer flex items-center gap-1">
                  🔄 2 Commits
                </span>
              </div>
            </div>

            {/* Рендеринг списка файлов */}
            <div className="divide-y divide-gray-200">
              {files.map((file) => (
                <div
                  key={file.sha}
                  className="flex justify-between items-center px-4 py-2.5 hover:bg-[#f6f8fa] transition-colors text-xs"
                >
                  {/* Иконка и Название */}
                  <div className="flex items-center space-x-3 w-1/3 min-w-[150px]">
                    {file.type === 'dir' ? (
                      <Folder size={16} className="text-[#54aeff] fill-[#54aeff]" />
                    ) : (
                      <FileText size={16} className="text-gray-400" />
                    )}
                    <span className="hover:underline cursor-pointer text-gray-800 font-normal truncate">
                      {file.name}
                    </span>
                  </div>

                  {/* Описание коммита */}
                  <div className="w-1/2 text-gray-600 truncate px-2">
                    {file.name === 'src' ? 'second commit' : 'initial commit'}
                  </div>

                  {/* Время коммита */}
                  <div className="w-24 text-right text-gray-400 whitespace-nowrap">
                    last month
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full  mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-sm font-sans text-[15px] text-[#24292f] antialiased">
      {/* Шапка компонента */}
      <div className="flex items-center justify-between px-4 border-b border-gray-200 h-12">
        {/* Левая сторона: Вкладка README */}
        <div className="relative flex items-center h-full gap-2 px-1 text-sm font-semibold text-gray-800 border-b-2 border-[#fd8c73] cursor-pointer">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span>README</span>
        </div>

        {/* Правая сторона: Кнопки действий */}
        <div className="flex items-center gap-4 text-gray-500">
          <button className="hover:text-blue-600 transition-colors" title="Edit file">
            <Pencil className="w-4 h-4" />
          </button>
          <button className="hover:text-blue-600 transition-colors" title="Table of contents">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="p-8 space-y-6 leading-relaxed">
        {/* Абзац 1 */}
        <p>
          This is a{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] underline hover:text-[#0969da]"
          >
            Next.js
          </a>{' '}
          project bootstrapped with{' '}
          <code className="bg-[#afb8c1]/20 px-[6px] py-[2px] rounded text-sm font-mono text-[#24292f]">
            create-next-app
          </code>
          .
        </p>

        {/* Заголовок "Getting Started" с линией снизу */}
        <div className="border-b border-gray-200 pb-2 mt-8">
          <h2 className="text-2xl font-semibold text-[#24292f] tracking-tight">
            Getting Started
          </h2>
        </div>

        {/* Абзац 2 */}
        <p>First, run the development server:</p>

        {/* Блок кода с кнопкой копирования */}
        <div className="relative group bg-[#f6f8fa] border border-gray-200 rounded-md p-5 font-mono text-[13.6px] text-[#24292f] leading-6">
          <pre className="overflow-x-auto">
{`npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev`}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition shadow-sm"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Абзац 3 */}
        <p>
          Open{' '}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] underline"
          >
            http://localhost:3000
          </a>{' '}
          with your browser to see the result.
        </p>

        {/* Абзац 4 */}
        <p>
          You can start editing the page by modifying{' '}
          <code className="bg-[#afb8c1]/20 px-[6px] py-[2px] rounded text-sm font-mono text-[#24292f]">
            app/page.tsx
          </code>
          . The page auto-updates as you edit the file.
        </p>

        {/* Абзац 5 */}
        <p>
          This project uses{' '}
          <a
            href="https://nextjs.org/docs/app/building-your-application/optimizing/fonts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#afb8c1]/20 px-[6px] py-[2px] rounded text-sm font-mono text-[#0969da] underline hover:text-[#0969da]"
          >
            next/font
          </a>{' '}
          to automatically optimize and load{' '}
          <a
            href="https://vercel.com/font"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0969da] underline"
          >
            Geist
          </a>
          , a new font family for Vercel.
        </p>
      </div>
    </div>
        </div>

       {/* ПРАВАЯ КОЛОНКА (ABOUT И ДОП. СВЕДЕНИЯ) — 20% */}
        <div className="w-full lg:w-[20%] flex-shrink-0 flex flex-col space-y-5 text-xs text-gray-600">
          
          {/* Раздел: About */}
          <div className="pb-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-gray-900">About</h3>
              <span className="text-gray-400 cursor-pointer hover:text-gray-600">⚙️</span>
            </div>
            <div className="flex items-center space-x-2 text-[#0969da] font-medium hover:underline cursor-pointer mb-3">
              <LinkIcon size={14} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">team-work-muro1.vercel.app</span>
            </div>
            <div className="space-y-2.5 text-gray-500 font-normal">
              <div className="flex items-center space-x-2"><FileText size={14} /> <span>Readme</span></div>
              <div className="flex items-center space-x-2"><Activity size={14} /> <span>Activity</span></div>
              <div className="flex items-center space-x-2"><Star size={14} /> <span>0 stars</span></div>
              <div className="flex items-center space-x-2"><Eye size={14} /> <span>0 watching</span></div>
              <div className="flex items-center space-x-2"><GitBranch size={14} /> <span>0 forks</span></div>
            </div>
          </div>

          {/* Раздел: Releases */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Releases</h3>
            <p className="text-gray-500 mb-1">No releases published</p>
            <span className="text-[#0969da] hover:underline cursor-pointer font-medium text-[11px]">Create a new release</span>
          </div>

          {/* Раздел: Deployments */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
              Deployments <span className="bg-gray-200 px-1.5 py-0.2 rounded-full text-[10px] text-gray-700">2</span>
            </h3>
            <div className="space-y-2 font-normal">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                <span className="font-semibold text-gray-800">Preview</span>
                <span className="text-gray-400">last month</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                <span className="font-semibold text-gray-800">Production</span>
                <span className="text-gray-400">last month</span>
              </div>
            </div>
          </div>

          {/* Раздел: Packages */}
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">Packages</h3>
            <p className="text-gray-500 mb-1">No packages published</p>
            <span className="text-[#0969da] hover:underline cursor-pointer font-medium text-[11px]">Publish your first package</span>
          </div>


  {/* Contributors */}
<div className="border-t border-gray-200 pt-5 ml-2">
  <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-1 mb-4">
    Contributors
    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[11px] text-gray-600">
      {contributors.length}
    </span>
  </h3>

  {contributors.slice(0, 5).map((user) => (
    <div
      key={user.id}
      className="flex items-center gap-3 mb-3 cursor-pointer hover:text-[#0969da]"
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-8 h-8 rounded-full border"
      />

      <span className="text-sm font-medium">
        {user.login}
      </span>
    </div>
  ))}
</div>

{/* Languages */}
<div className="border-t border-gray-200 pt-5 ml-2">
  <h3 className="font-semibold text-sm text-gray-900 mb-4">
    Languages
  </h3>

  <div className="w-full h-2 rounded-full overflow-hidden flex">
    {languageList.map((lang) => (
      <div
        key={lang.name}
        style={{
          width: `${lang.percent}%`,
          backgroundColor: lang.color,
        }}
      />
    ))}
  </div>

  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
    {languageList.map((lang) => (
      <div
        key={lang.name}
        className="flex items-center gap-2 text-[13px]"
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: lang.color,
          }}
        />

        <span className="text-gray-900">
          {lang.name}
        </span>

        <span className="text-gray-500">
          {lang.percent}%
        </span>
      </div>
    ))}
  </div>
</div>

        </div> 


      </div>
    </div>
  );
};

export default RepoCode;