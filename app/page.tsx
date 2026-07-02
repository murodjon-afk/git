import React from 'react';
import Image from 'next/image';
import GitHubLanding  from "./components/home/second";
import GitHubWorkflowSection from "./components/home/third";
import GitHubScalesSection from "./components/home/fourth";
import GitHubFooterHero from "./components/home/fifth";
export default function GitHubHero() {
  return (
    <>
    <div className="relative min-h-screen w-screen max-w-full bg-[#050714] text-white font-sans overflow-hidden flex flex-col">
      
      {/* 1. ЗАДНИЙ ФОН НА ВСЮ ШИРИНУ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/b2.webp"
          alt="GitHub BG"
          fill
          priority
          className="object-cover object-bottom w-full h-full"
        />
        {/* Градиентное затемнение для читаемости навигации */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050714]/50 via-transparent to-transparent" />
      </div>

      {/* 2. HEADER (ШАПКА САЙТА) */}
      <header className="relative z-10 w-full px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between text-[14px]">
        {/* Левая часть: Лого + Меню */}
        <div className="flex items-center gap-6">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="fill-white hover:opacity-70 cursor-pointer transition-opacity">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 2.81c-.68.003-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <nav className="hidden lg:flex items-center gap-4 text-[#ffffffec]">
            {['Platform', 'Solutions', 'Resources', 'Open Source', 'Enterprise', 'Pricing'].map((item) => (
              <button key={item} className="flex items-center gap-1 hover:text-[#ffffff99] transition-colors font-light py-2">
                {item}
                <svg className="opacity-50 mt-0.5" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </nav>
        </div>

        {/* Правая часть: Поиск + Авторизация */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-[#24292f]/40 border border-[#30363d] rounded-md px-3 py-1.5 w-64 justify-between text-[#7d8590] cursor-pointer hover:border-[#8b949e] transition-colors">
            <span className="text-xs font-light">Search or jump to...</span>
            <span className="border border-[#30363d] px-1.5 py-0.5 rounded text-[10px] bg-[#161b22]">/</span>
          </div>

          <button className="hover:text-[#ffffff99] transition-colors font-light">Sign in</button>
          <button className="border border-white/80 hover:border-white rounded-md px-3 py-1.5 transition-all font-medium text-sm">Sign up</button>
        </div>
      </header>

      {/* 3. HERO CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-20 md:pt-28 text-center px-4 w-full">
        
        {/* Заголовок */}
        <h1 className="text-4xl sm:text-6xl md:text-[76px] font-medium tracking-tight text-white leading-[1.05] max-w-[1000px]">
          The future of building <br /> happens together
        </h1>

        {/* Подзаголовок */}
        <p className="mt-6 text-base sm:text-lg md:text-[21px] text-[#8b949e] max-w-3xl font-light leading-relaxed tracking-wide">
          Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.
        </p>

        {/* ИСПРАВЛЕННЫЙ БЛОК ФОРМЫ ПО РЕФЕРЕНСУ */}
         <form 
          className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch justify-center gap-3 z-10 py-4"
        >
          {/* Общая белая плашка для инпута и зеленой кнопки */}
          <div className="flex-1 bg-white rounded-lg p-1.5 flex flex-col sm:flex-row items-center gap-2 shadow-lg">
            <input 
              type="email"
        
              placeholder="Enter your email"
              required
              className="w-full bg-transparent px-4 py-3 text-sm text-black placeholder-[#57606a] font-sans font-medium focus:outline-none"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto whitespace-nowrap bg-[#1f883d] hover:bg-[#1a7732] active:bg-[#186c2e] text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200 shadow-md"
            >
              Sign up for GitHub
            </button>
          </div>

          {/* Правая черная кнопка "Try GitHub Copilot" */}
          <button 
            type="button"
            className="w-full sm:w-auto bg-transparent border border-[#30363d] hover:border-[#8b949e] text-white text-sm font-semibold px-7 py-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
          >
            Try GitHub Copilot
          </button>
        </form>

      </main>

    </div>
    <GitHubLanding></GitHubLanding>
    <GitHubWorkflowSection></GitHubWorkflowSection>
    <GitHubScalesSection></GitHubScalesSection>
    <GitHubFooterHero></GitHubFooterHero>
    </>
  );
}