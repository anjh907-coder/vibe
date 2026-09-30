import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { CORE_ANALOGIES } from '../data/guideData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = CORE_ANALOGIES.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.koreanTerm.includes(searchTerm) ||
      item.analogy.includes(searchTerm) ||
      item.description.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                초보자를 위한 일상 비유 사전
              </h2>
              <p className="text-xs text-stone-500">
                어려운 개발 용어를 실생활 사물에 빗대어 쉽게 이해하세요
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-stone-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="용어 검색 (예: DB, API 키, GitHub, Vercel...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-sm">
              검색 결과가 없습니다.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-stone-200 hover:border-amber-300 bg-white transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                      {item.koreanTerm}
                      <span className="text-xs font-normal text-stone-400 ml-1.5 font-mono">
                        ({item.term})
                      </span>
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    비유: {item.analogy.replace(/\[|\]/g, '')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-stone-100 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg flex items-start gap-1.5">
                  <span className="font-bold text-stone-700 shrink-0">핵심 포인트:</span>
                  <span>{item.whyItMatters}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
