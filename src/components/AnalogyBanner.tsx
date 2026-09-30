import React, { useState } from 'react';
import { CORE_ANALOGIES } from '../data/guideData';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const AnalogyBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mainFour = CORE_ANALOGIES.slice(0, 4);

  return (
    <div className="bg-amber-50/70 border-b border-amber-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              💡
            </span>
            <span className="text-xs sm:text-sm font-bold text-stone-800">
              초보자를 위한 핵심 비유 4가지
            </span>
            <span className="text-stone-400 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-stone-600 hidden sm:inline">
              이 4개 비유만 알면 웹앱 개발과 배포의 80%가 이해됩니다!
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-100/60 hover:bg-amber-100 px-2 py-1 rounded-md transition-colors"
          >
            <span>{isOpen ? '비유 접기' : '비유 펼치기'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2.5 pt-2 border-t border-amber-200/50">
            {mainFour.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                      : 'border-amber-100 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {item.koreanTerm}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">({item.term})</span>
                  </div>
                  <div className="text-xs font-semibold text-amber-800 bg-amber-50/80 px-2 py-1 rounded-md mb-1.5 border border-amber-100">
                    = {item.analogy.replace(/\[|\]/g, '')}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500 bg-stone-50 p-2 rounded-md">
                      <strong className="text-stone-700 block mb-0.5">왜 중요할까요?</strong>
                      {item.whyItMatters}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
