import React from 'react';
import { BookOpen, Sparkles, Key, Database, Rocket, FolderGit2, Search, CheckCircle2 } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenGlossary: () => void;
  progressPercent: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenGlossary,
  progressPercent
}) => {
  const tabs: { id: TabType; label: string; number: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'apps-script',
      number: '메뉴 1',
      label: '앱스 스크립트 자동화 웹앱',
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
      desc: '구글 시트 & 지메일 비서'
    },
    {
      id: 'database',
      number: '메뉴 2',
      label: 'AI 스튜디오 & DB 입문',
      icon: <Database className="w-4 h-4 text-sky-600" />,
      desc: '시트 vs 파이어베이스'
    },
    {
      id: 'deployment',
      number: '메뉴 3',
      label: 'GitHub & Vercel 안전 배포',
      icon: <Rocket className="w-4 h-4 text-indigo-600" />,
      desc: 'API 키 숨기기 & 무료 도메인'
    },
    {
      id: 'prompts-tools',
      number: '메뉴 4',
      label: '프롬프트 보물창고 & 실습기',
      icon: <BookOpen className="w-4 h-4 text-amber-600" />,
      desc: '조립기 & 3계명 & 메모장'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Reading Progress Bar */}
      <div className="w-full bg-stone-100 h-1">
        <div
          className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 tracking-wider">
                  초보자를 위한 AI 바이브 코딩 가이드북
                </span>
                <span className="text-stone-300 text-xs">|</span>
                <span className="text-xs text-stone-500">직접 코딩하지 않고 AI에게 시키기</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                AI 웹앱 & 데이터베이스 입문 가이드
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              title="쉬운 일상 비유 사전 검색"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">비유 사전</span>
              <span className="sm:hidden">사전</span>
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>진행률: {progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* 4 Main Nav Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[210px] text-left px-3.5 py-2.5 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50/70 hover:bg-stone-100 text-stone-700 border-stone-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`text-[11px] font-semibold ${
                      isActive ? 'text-amber-300' : 'text-stone-500'
                    }`}
                  >
                    {tab.number}
                  </span>
                  <span className={isActive ? 'opacity-90' : 'opacity-70'}>{tab.icon}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">{tab.label}</div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isActive ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  {tab.desc}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
