import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { AnalogyBanner } from './components/AnalogyBanner';
import { TabMenu1AppsScript } from './components/TabMenu1AppsScript';
import { TabMenu2Database } from './components/TabMenu2Database';
import { TabMenu3Deployment } from './components/TabMenu3Deployment';
import { TabMenu4PromptsAndTools } from './components/TabMenu4PromptsAndTools';
import { GlossaryModal } from './components/GlossaryModal';
import { Toast } from './components/Toast';
import { Sparkles, ArrowRight, ArrowLeft, BookOpen, Heart, ShieldCheck, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('apps-script');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(25);

  const handleCopyText = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(title);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Scroll to top when changing tab
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getNextTab = (): { id: TabType; title: string } | null => {
    switch (activeTab) {
      case 'apps-script':
        return { id: 'database', title: '메뉴 2: AI 스튜디오 & 데이터베이스 (시트 vs 파이어베이스)' };
      case 'database':
        return { id: 'deployment', title: '메뉴 3: 내 웹앱 세상에 공개하기 (GitHub & Vercel)' };
      case 'deployment':
        return { id: 'prompts-tools', title: '메뉴 4: 프롬프트 보물창고 & 실습 도우미' };
      case 'prompts-tools':
        return null;
    }
  };

  const getPrevTab = (): { id: TabType; title: string } | null => {
    switch (activeTab) {
      case 'apps-script':
        return null;
      case 'database':
        return { id: 'apps-script', title: '메뉴 1: 앱스 스크립트 자동화 웹앱' };
      case 'deployment':
        return { id: 'database', title: '메뉴 2: AI 스튜디오 & 데이터베이스' };
      case 'prompts-tools':
        return { id: 'deployment', title: '메뉴 3: GitHub & Vercel 안전 배포' };
    }
  };

  const nextTabInfo = getNextTab();
  const prevTabInfo = getPrevTab();

  return (
    <div className="min-h-screen bg-stone-50/60 text-stone-900 flex flex-col selection:bg-amber-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        progressPercent={progressPercent}
      />

      {/* Analogy Quick Reference Banner */}
      <AnalogyBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'apps-script' && (
          <TabMenu1AppsScript onCopyText={handleCopyText} />
        )}

        {activeTab === 'database' && (
          <TabMenu2Database onCopyText={handleCopyText} />
        )}

        {activeTab === 'deployment' && (
          <TabMenu3Deployment onCopyText={handleCopyText} />
        )}

        {activeTab === 'prompts-tools' && (
          <TabMenu4PromptsAndTools
            onCopyText={handleCopyText}
            onUpdateProgress={(pct) => setProgressPercent(pct)}
          />
        )}

        {/* Chapter Navigation Pagination Strip */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTabInfo ? (
            <button
              onClick={() => handleTabChange(prevTabInfo.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs sm:text-sm font-semibold text-stone-700 shadow-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전: {prevTabInfo.title}</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextTabInfo ? (
            <button
              onClick={() => handleTabChange(nextTabInfo.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs sm:text-sm font-bold text-white shadow-xs transition ml-auto"
            >
              <span>다음: {nextTabInfo.title}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          ) : (
            <button
              onClick={() => handleTabChange('apps-script')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm font-bold text-white shadow-xs transition ml-auto"
            >
              <Compass className="w-4 h-4" />
              <span>첫 메뉴로 다시 돌아가기</span>
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-16 py-8 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-stone-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>초보자를 위한 AI 웹앱 & 데이터베이스 입문 가이드</span>
            </div>
            <p className="text-stone-500">
              직접 코딩하지 않고 AI에게 말로 시켜서 완성하는 바이브 코딩(Vibe Coding) 실전 교과서
            </p>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Google Apps Script</span>
            <span>·</span>
            <span>Google Sheets & Firestore</span>
            <span>·</span>
            <span>GitHub & Vercel</span>
          </div>
        </div>
      </footer>

      {/* Floating Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Copy Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
