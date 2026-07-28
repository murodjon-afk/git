'use client'
import { useState, useEffect } from "react"

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  private: boolean;
  updated_at: string;
  html_url: string;
}

const Repositories = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Состояния для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReposAndProfile = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem("github_user");

        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setTotalRepos(userData.public_repos || 0);
        }

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${itemsPerPage}&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
            cache: "no-store",
          }
        );

        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: Repo[] = await responseToJSON(reposResponse);
        setRepos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReposAndProfile();
  }, [currentPage]); // Перезапускать при смене страницы

  const responseToJSON = async (res: Response) => {
    return await res.json();
  };

  const totalPages = Math.ceil(totalRepos / itemsPerPage) || 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLanguageColor = (lang: string | null) => {
    if (!lang) return 'bg-gray-400';
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-[#f1e05a]',
      TypeScript: 'bg-[#3178c6]',
      HTML: 'bg-[#e34c26]',
      CSS: 'bg-[#563d7c]',
      Python: 'bg-[#3572A5]',
    };
    return colors[lang] || 'bg-gray-400';
  };

  // Генерация массива номеров страниц для отображения
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1.5 mx-1 text-sm rounded-lg transition-colors ${
            currentPage === i
              ? "bg-[#0969da] text-white font-semibold"
              : "text-[#24292f] hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-[85%] mx-auto p-4 font-sans text-[#1f2328]">
      {/* Шапка страницы */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My repositories</h1>
        <button className="bg-[#1f883d] hover:bg-[#1a7f37] text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition">
          New repository
        </button>
      </div>

      {/* Поисковая строка */}
      <div className="flex items-center border border-[#d0d7de] rounded-md px-3 py-1.5 mb-4 bg-white shadow-sm">
        <span className="text-sm text-[#8250df] bg-[#8250df]/10 px-1.5 py-0.5 rounded font-mono mr-2">owner:@me</span>
        <input type="text" className="w-full text-sm outline-none bg-transparent" placeholder="Find a repository..." />
        <button className="text-gray-400 hover:text-gray-600 ml-2">×</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 16 16"><path d="M10.68 11.74a6 6 0 1 1 1.06-1.06l3.28 3.28a.75.75 0 1 1-1.06 1.06l-3.28-3.28zm-4.68 0.76a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"/></svg>
      </div>

      {/* Контейнер списка */}
      <div className="border border-[#d0d7de] rounded-md bg-white">
        <div className="flex justify-between items-center px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de] rounded-t-md text-sm">
          <span className="font-semibold">{totalRepos} repositories</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 border border-[#d0d7de] px-3 py-1 bg-white rounded-md font-medium text-xs hover:bg-[#f3f4f6]">
              Sort: Relevance <span className="text-[10px]">▼</span>
            </button>
          </div>
        </div>

        {/* Список репозиториев */}
        <div className="divide-y divide-[#d0d7de]">
          {repos.map((repo) => (
            <div key={repo.id} className="p-5 flex justify-between items-center hover:bg-[#f6f8fa]/30 transition-colors">
              <div className="flex flex-col gap-1.5 max-w-[70%]">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[20px] font-semibold text-[#0969da] hover:underline break-all">
                    {repo.full_name}
                  </a>
                  <span className="text-xs font-medium text-[#57606a] border border-[#d0d7de] px-2 py-0.5 rounded-full bg-white">
                    {repo.private ? 'Private' : 'Public'}
                  </span>
                </div>

                {repo.description && (
                  <p className="text-sm text-[#57606a] mt-1 pr-4 line-clamp-2">{repo.description}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-[#57606a] mt-2 flex-wrap">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#57606a]" fill="currentColor" viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zM12.5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></svg>
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#57606a]" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694z"/></svg>
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>

              <div className="w-[155px] h-[30px] hidden md:block opacity-80">
                <svg className="w-full h-full" viewBox="0 0 155 30" fill="none">
                  <path d="M0 25 C30 25, 60 22, 90 22 C120 22, 140 15, 155 15" stroke="#2da44e" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Пагинация (блок по референсу) */}
      <div className="flex justify-center items-center mt-6 py-2 select-none">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className={`flex items-center text-sm px-3 py-1.5 transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0969da] hover:bg-gray-100 rounded-lg"
          }`}
        >
          <span className="mr-1.5">&lt;</span> Previous
        </button>

        <div className="flex items-center mx-2">
          {renderPageNumbers()}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className={`flex items-center text-sm px-3 py-1.5 transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0969da] hover:bg-gray-100 rounded-lg"
          }`}
        >
          Next <span className="ml-1.5">&gt;</span>
        </button>
      </div>
    </div>
  )
}

export default Repositories;