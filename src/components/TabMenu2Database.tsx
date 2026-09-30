import React, { useState } from 'react';
import { Copy, Check, Database, Key, Sparkles, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { DATABASE_PROMPTS } from '../data/guideData';

interface TabMenu2DatabaseProps {
  onCopyText: (text: string, title: string) => void;
}

export const TabMenu2Database: React.FC<TabMenu2DatabaseProps> = ({ onCopyText }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 3-Second DB Selector Quiz State
  const [quizAnswers, setQuizAnswers] = useState({
    speed: '',
    management: '',
    realtime: ''
  });

  const handleCopy = (id: string, text: string, title: string) => {
    onCopyText(text, title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDbRecommendation = () => {
    if (!quizAnswers.speed && !quizAnswers.management && !quizAnswers.realtime) {
      return null;
    }
    const scoreFirebase =
      (quizAnswers.speed === 'fast' ? 1 : 0) +
      (quizAnswers.realtime === 'yes' ? 2 : 0) +
      (quizAnswers.management === 'code' ? 1 : 0);

    const scoreSheets =
      (quizAnswers.speed === 'normal' ? 1 : 0) +
      (quizAnswers.realtime === 'no' ? 2 : 0) +
      (quizAnswers.management === 'excel' ? 2 : 0);

    if (scoreFirebase > scoreSheets) {
      return {
        type: 'firebase',
        name: '파이어베이스 (Firebase Firestore)',
        tagline: '실시간 채팅, 투표, 방명록에 최적화!',
        reason: '새로고침 없이 실시간으로 화면이 갱신되어야 하고 빠른 반응속도가 필요하다면 파이어베이스가 정답입니다.'
      };
    } else {
      return {
        type: 'sheets',
        name: '구글 스프레드시트 (Google Sheets)',
        tagline: '신청서, 건의함, 동아리 명단 관리에 최고!',
        reason: '관리자가 엑셀처럼 표를 직접 눈으로 보며 수정·삭제·인쇄하고 싶다면 구글 시트가 가장 쉽고 편합니다.'
      };
    }
  };

  const recommendation = getDbRecommendation();

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-sky-50 via-white to-stone-50 border border-sky-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 tracking-wide uppercase">
              <span>메뉴 2 · 데이터 영구 보관 & AI 두뇌 연결</span>
              <span className="text-sky-300">/</span>
              <span className="text-stone-500 font-normal">Database & Google AI Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
              AI 스튜디오 & 데이터베이스 (시트 vs 파이어베이스)
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              사용자가 남긴 글이 날아가지 않도록 안전하게 보관하는 <strong>'전자 사물함(DB)'</strong> 선택 기준과, 똑똑한 제미나이 AI의 문을 여는 <strong>'비밀 열쇠(API 키)'</strong>의 모든 것을 배웁니다.
            </p>
          </div>
          <div className="bg-white border border-sky-200 px-4 py-3 rounded-xl shadow-xs shrink-0 text-center sm:text-right">
            <span className="text-xs text-stone-500 block">핵심 원칙</span>
            <span className="text-sm font-bold text-sky-900">
              내 프로젝트에 딱 맞는 전자 사물함 고르기
            </span>
          </div>
        </div>
      </div>

      {/* 1. 초보자를 위한 3분 데이터베이스(DB) 특강 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            초보자를 위한 3분 데이터베이스(DB) 특강
          </h3>
        </div>

        {/* What is DB Analogy Box */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">🗄️</span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950">
                데이터베이스(DB)란? 웹앱이 꺼져도 글이 지워지지 않게 보관하는 [전자 사물함]
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                일반 자바스크립트 변수에 글을 담으면 웹브라우저 창을 닫거나 새로고침(F5)을 누르는 순간 모두 지워집니다.
                <strong>DB(데이터베이스)</strong>는 손님이 퇴근하고 웹사이트 문을 닫아도, 서버 클라우드 사물함 속에 꼼꼼하게 자물쇠를 걸어 보관해 두는 영구 저장 창고입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison: Google Sheets vs Firebase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Google Sheets Card */}
          <div className="bg-white border-2 border-emerald-500/80 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <h4 className="font-extrabold text-stone-900 text-base">구글 스프레드시트 (Google Sheets)</h4>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  초보자 추천 No.1
                </span>
              </div>

              <div className="text-xs font-medium text-emerald-900 bg-emerald-50 p-2.5 rounded-lg mb-3">
                "엑셀 표처럼 생겨서 사람이 눈으로 직접 보고 수정하기 최고!"
              </div>

              <ul className="space-y-2 text-xs text-stone-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>가장 큰 장점:</strong> 개발자가 아니어도 구글 시트 링크를 열어 표를 보고 직접 오타를 수정하거나 엑셀(XLSX)로 내려받을 수 있음</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>비용:</strong> 100% 완전 무료, 구글 계정만 있으면 즉시 시작</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>추천 프로젝트:</strong> 우리 반 신청서, 건의함, 설문조사, 동아리 명단 관리</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              💡 <strong>단점:</strong> 1초에 수백 명이 동시에 글을 쓰는 대규모 서비스나 실시간 채팅에는 속도가 조금 느릴 수 있습니다.
            </div>
          </div>

          {/* Firebase Card */}
          <div className="bg-white border-2 border-sky-500/80 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <h4 className="font-extrabold text-stone-900 text-base">파이어베이스 (Firebase Firestore)</h4>
                </div>
                <span className="text-xs font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                  실시간 앱 최강자
                </span>
              </div>

              <div className="text-xs font-medium text-sky-900 bg-sky-50 p-2.5 rounded-lg mb-3">
                "내가 글을 쓰면 새로고침 없이 친구 화면에 번개처럼 바로 뜨는 실시간 저장소!"
              </div>

              <ul className="space-y-2 text-xs text-stone-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>가장 큰 장점:</strong> 새로고침(F5)을 누르지 않아도 다른 사용자가 쓴 글이 0.1초 만에 카카오톡처럼 실시간으로 쏙 나타남</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>비용:</strong> 소규모 프로젝트는 넉넉한 평생 무료 요금제(Spark 플랜) 제공</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>추천 프로젝트:</strong> 실시간 채팅, 실시간 방명록, 실시간 투표, 라이브 퀴즈 대결</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              💡 <strong>단점:</strong> 데이터가 JSON 형태로 저장되므로, 엑셀 표처럼 비개발자가 한눈에 들여다보고 편집하기엔 조금 생소할 수 있습니다.
            </div>
          </div>
        </div>

        {/* Interactive 3-Second DB Selector Quiz */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧭</span>
              <h4 className="font-bold text-sm sm:text-base text-amber-300">
                내 프로젝트에는 어떤 사물함(DB)이 맞을까? (3초 판별기)
              </h4>
            </div>
            <span className="text-xs text-stone-400">선택 즉시 분석</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 mb-1.5 font-medium">Q1. 실시간 새로고침이 필요한가요?</label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, realtime: 'yes' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.realtime === 'yes'
                      ? 'bg-sky-600 border-sky-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  새로고침 없이 1초 만에 떠야 함 (채팅/투표)
                </button>
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, realtime: 'no' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.realtime === 'no'
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  천천히 들어가도 상관없음 (신청서/설문)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-300 mb-1.5 font-medium">Q2. 저장된 데이터를 어떻게 확인하고 싶나요?</label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, management: 'excel' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.management === 'excel'
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  엑셀/구글 시트처럼 눈으로 직접 보며 수정
                </button>
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, management: 'code' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.management === 'code'
                      ? 'bg-sky-600 border-sky-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  웹앱 화면 안에서만 깔끔하게 보이면 됨
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-300 mb-1.5 font-medium">Q3. 원하는 난이도는?</label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, speed: 'normal' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.speed === 'normal'
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  구글 계정만으로 5분 만에 끝내기
                </button>
                <button
                  type="button"
                  onClick={() => setQuizAnswers((p) => ({ ...p, speed: 'fast' }))}
                  className={`w-full text-left p-2 rounded-lg border transition ${
                    quizAnswers.speed === 'fast'
                      ? 'bg-sky-600 border-sky-400 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Firebase 콘솔 가입하고 진짜 DB 써보기
                </button>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="mt-4 p-4 rounded-xl bg-stone-800/90 border border-stone-700 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-400">당신을 위한 맞춤 추천 결과:</span>
                <span className="text-sm font-extrabold text-white">{recommendation.name}</span>
              </div>
              <p className="text-xs text-stone-300">{recommendation.reason}</p>
            </div>
          )}
        </div>
      </section>

      {/* 2. Google AI Studio와 API 키 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            Google AI Studio와 API 키 (비밀 열쇠 안전 수칙)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl">🧠</span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Google AI Studio</h4>
                <span className="text-xs text-sky-700 font-medium">똑똑한 제미나이(Gemini)의 두뇌를 빌려오는 곳</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              구글이 제공하는 최고 성능의 인공지능 모델(Gemini)을 내 웹앱과 연결할 수 있는 개발자 허브입니다.
              <code className="text-stone-800 bg-stone-100 px-1 py-0.5 rounded ml-1 font-mono">aistudio.google.com</code>에서 구글 아이디로 로그인하면 무료로 API 키를 클릭 한 번에 발급받을 수 있습니다.
            </p>
          </div>

          <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-xs bg-rose-50/20">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl">🔑</span>
              <div>
                <h4 className="font-bold text-rose-950 text-sm sm:text-base">API 키 (비밀 열쇠)</h4>
                <span className="text-xs text-rose-700 font-medium">내 인공지능 비서에게 문을 열어주는 비밀 마스터키</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              API 키는 집 열쇠와 같습니다. 이 키가 있어야 제미나이가 내 웹앱의 질문에 대답해 줍니다.
              <strong>[절대 주의!]</strong> 이 열쇠를 다른 사람에게 보여주거나 GitHub 같은 공개 웹사이트에 올리면, 해커들이 훔쳐가서 마음대로 사용하여 계정이 정지되거나 과금이 될 수 있습니다!
            </p>
          </div>
        </div>

        {/* Security Warning Box */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-stone-800 text-xs sm:text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-rose-950 font-bold block">
              초보자가 가장 많이 하는 아찔한 실수: 코드 파일 안에 API 키 그대로 적어두기!
            </strong>
            <p className="text-stone-600 leading-relaxed text-xs">
              <code className="bg-white px-1.5 py-0.5 rounded text-rose-800 border border-rose-200">const API_KEY = "AIzaSy..."</code>처럼 코드에 적어둔 채로 GitHub에 업로드하면 10초 만에 전 세계 봇들에게 털립니다.
              반드시 메뉴 3에서 배울 <strong>'Vercel 환경 변수(Environment Variables)'</strong>라는 안전 금고에 보관해야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 프로젝트별 AI 프롬프트 가이드 (원클릭 복사 제공) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            프로젝트별 AI 프롬프트 가이드 (원클릭 복사)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600">
          원하는 프로젝트 카드를 골라 [프롬프트 복사]를 누른 뒤, AI에게 그대로 보내보세요. 완성된 코드가 눈앞에 펼쳐집니다!
        </p>

        <div className="space-y-4">
          {DATABASE_PROMPTS.map((item, idx) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-sky-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{item.summary}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(item.id, item.prompt, `${item.title} 프롬프트가 복사되었습니다!`)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-xs transition shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>프롬프트 복사하기</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5">
                  <pre className="text-xs text-stone-700 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
                    {item.prompt}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-stone-400 mr-1">키워드:</span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
