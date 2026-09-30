import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, BookOpen, Wrench, Shield, CheckSquare, Save, RotateCcw, AlertTriangle, Lightbulb, ExternalLink } from 'lucide-react';
import { THREE_COMMANDMENTS, EMERGENCY_ERROR_PROMPTS } from '../data/guideData';
import { UserProjectNote } from '../types';

interface TabMenu4PromptsAndToolsProps {
  onCopyText: (text: string, title: string) => void;
  onUpdateProgress: (percent: number) => void;
}

export const TabMenu4PromptsAndTools: React.FC<TabMenu4PromptsAndToolsProps> = ({
  onCopyText,
  onUpdateProgress
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Interactive Prompt Assembler State
  const [appType, setAppType] = useState('원데이 클래스 / 사내 세미나 참가 신청 & 자동 안내 센터');
  const [dbChoice, setDbChoice] = useState('구글 스프레드시트 (Google Sheets)');
  const [aiChoice, setAiChoice] = useState('Gemini AI가 입력 내용을 분석하고 따뜻한 맞춤 피드백 작성');
  const [themeChoice, setThemeChoice] = useState('깔끔하고 세련된 비즈니스 스타일');
  const [includeVercelSecurity, setIncludeVercelSecurity] = useState(true);
  const [includeLoadingState, setIncludeLoadingState] = useState(true);

  // 2. Local Storage Practice Notes State
  const initialNote: UserProjectNote = {
    projectName: '세미나 참가 신청 및 자동 안내 센터',
    repoUrl: 'https://github.com/myusername/my-first-ai-app',
    deployedUrl: 'https://my-first-ai-app.vercel.app',
    databaseType: 'sheets',
    selectedAiType: 'Gemini 2.5 Flash',
    checklist: {
      promptCreated: true,
      codeGenerated: false,
      githubPushed: false,
      envVarSafe: false,
      vercelDeployed: false,
      sharedWithFriends: false
    },
    notes: '• 구글 시트에 "세미나 참가 신청 및 자동 안내 센터" 만들고 지메일 연동하기\n• Vercel에 배포할 때 GEMINI_API_KEY 환경 변수 꼭 등록할 것!',
    lastUpdated: new Date().toLocaleDateString('ko-KR')
  };

  const [projectNote, setProjectNote] = useState<UserProjectNote>(() => {
    try {
      const saved = localStorage.getItem('vibe_coding_user_note');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialNote;
  });

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Calculate Progress based on checklist
  useEffect(() => {
    const values = Object.values(projectNote.checklist);
    const completedCount = values.filter(Boolean).length;
    const pct = Math.round((completedCount / values.length) * 100);
    onUpdateProgress(pct);
  }, [projectNote.checklist, onUpdateProgress]);

  const handleSaveNotes = () => {
    try {
      const updated = {
        ...projectNote,
        lastUpdated: new Date().toLocaleDateString('ko-KR')
      };
      setProjectNote(updated);
      localStorage.setItem('vibe_coding_user_note', JSON.stringify(updated));
      setSavedStatus('브라우저에 안전하게 저장되었습니다!');
      setTimeout(() => setSavedStatus(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChecklistToggle = (key: keyof UserProjectNote['checklist']) => {
    setProjectNote((prev) => {
      const next = {
        ...prev,
        checklist: {
          ...prev.checklist,
          [key]: !prev.checklist[key]
        },
        lastUpdated: new Date().toLocaleDateString('ko-KR')
      };
      try {
        localStorage.setItem('vibe_coding_user_note', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleCopy = (id: string, text: string, title: string) => {
    onCopyText(text, title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate Assembled Prompt in Realtime
  const assembledPrompt = `너는 웹앱 전문 개발자이자 친절한 코딩 멘토야.
코딩을 모르는 초보자도 그대로 복사해서 완성할 수 있도록 아래 사양에 맞춘 웹앱을 만들어줘.

[내가 만들 웹앱 개요]
1. 주제 및 주요 기능: ${appType}
2. 데이터 저장소(DB): ${dbChoice}
3. 인공지능(AI) 결합: ${aiChoice}
4. UI/UX 디자인: ${themeChoice}
${includeLoadingState ? '5. 사용자 경험: 버튼 클릭 시 "처리 중..." 로딩 애니메이션 및 완료 토스트 알림 포함' : ''}
${includeVercelSecurity ? `6. [필수 보안 및 배포]:
   - 이 웹앱은 GitHub에 올려 Vercel로 무료 배포할 예정이야.
   - API 키나 비밀 토큰은 절대 코드 파일에 직접 적지 말고, 환경 변수(process.env 또는 Vite import.meta.env)를 사용하도록 안전하게 작성해줘.
   - Vercel 배포 시 대시보드의 Environment Variables에 어떤 Key 이름과 값을 넣어야 하는지 명확히 안내해줘.` : ''}

[초보자 맞춤 안내 요청]
- 코드를 어떤 파일(파일명 명시)에 나누어 복사해야 하는지 1, 2, 3 단계로 알려줘.
- 어려운 전문 용어 대신 초보자의 눈높이에서 친절하게 설명해줘.`;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-stone-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wide uppercase">
              <span>메뉴 4 · 나만의 프롬프트 조립 & 실습 노트</span>
              <span className="text-amber-300">/</span>
              <span className="text-stone-500 font-normal">Interactive Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
              프롬프트 보물창고 & 실습 도우미
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              원하는 기능과 데이터베이스를 클릭만 하면 <strong>완성형 프롬프트</strong>가 뚝딱 만들어지는 조립기와, <strong>AI 코딩 실패를 99% 줄여주는 3계명</strong>, 내 실습 기록용 메모장입니다.
            </p>
          </div>
          <div className="bg-white border border-amber-200 px-4 py-3 rounded-xl shadow-xs shrink-0 text-center sm:text-right">
            <span className="text-xs text-stone-500 block">진행 상태</span>
            <span className="text-sm font-bold text-amber-900">
              실습 체크리스트 자동 저장 중
            </span>
          </div>
        </div>
      </div>

      {/* 1. 나만의 프롬프트 조립기 (인터랙티브 기능) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">인터랙티브 도구</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                나만의 프롬프트 조립기
              </h3>
            </div>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">실시간 프롬프트 생성</span>
        </div>

        {/* Builder Option Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Feature Option */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">1. 원하는 기능</label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            >
              <option>원데이 클래스 / 사내 세미나 참가 신청 & 자동 안내 센터</option>
              <option>실시간 익명 건의함 & 공감 투표 웹앱</option>
              <option>오늘 하루 감성 일기 & 따뜻한 AI 위로장</option>
              <option>동아리 회원 명부 & 출석 체크 웹앱</option>
              <option>실시간 질문 방명록 (새로고침 없는 피드)</option>
              <option>나만의 영어 단어 퀴즈 생성 웹앱</option>
            </select>
          </div>

          {/* Database Option */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">2. 저장소(DB) 선택</label>
            <select
              value={dbChoice}
              onChange={(e) => setDbChoice(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            >
              <option>구글 스프레드시트 (Google Sheets) - 눈으로 직접 보기 쉬움</option>
              <option>파이어베이스 (Firebase Firestore) - 새로고침 없는 실시간</option>
              <option>브라우저 로컬 저장 (LocalStorage) - 서버 없이 내 브라우저에만 저장</option>
              <option>데이터베이스 없이 순수 AI 문답 기능만 구현</option>
            </select>
          </div>

          {/* AI Option */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">3. Google Gemini AI 사용 여부</label>
            <select
              value={aiChoice}
              onChange={(e) => setAiChoice(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            >
              <option>Gemini AI가 입력 내용을 분석하고 따뜻한 맞춤 피드백 작성</option>
              <option>Gemini AI가 긴 글을 3줄로 핵심 요약해주기</option>
              <option>Gemini AI가 실시간으로 객관식 퀴즈 3문제를 생성해주기</option>
              <option>AI 연동 없이 순수 기능(입력, 저장, 조회)만 작동</option>
            </select>
          </div>

          {/* Theme Option */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">4. 디자인 스타일</label>
            <select
              value={themeChoice}
              onChange={(e) => setThemeChoice(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            >
              <option>깔끔하고 산뜻한 파스텔톤 & 둥근 카드 디자인</option>
              <option>세련되고 모던한 다크 모드 (어두운 배경 + 네온 포인트)</option>
              <option>군더더기 없는 미니멀 모노톤 (흰색/회색의 깔끔함)</option>
              <option>귀엽고 아기자기한 스티커 & 노트 메모장 스타일</option>
            </select>
          </div>

          {/* Toggle Switches */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVercelSecurity}
                onChange={(e) => setIncludeVercelSecurity(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
              />
              <span className="text-stone-700 font-medium">
                Vercel 환경 변수(API 키 안전 금고) 지시문 자동 포함 (권장)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLoadingState}
                onChange={(e) => setIncludeLoadingState(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
              />
              <span className="text-stone-700 font-medium">
                제출 중 로딩 애니메이션 지시 포함
              </span>
            </label>
          </div>
        </div>

        {/* Realtime Output Card */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>실시간 완성된 AI 프롬프트 (그대로 복사해서 사용하세요)</span>
            </div>
            <button
              onClick={() => handleCopy('assembled-prompt', assembledPrompt, '완성형 프롬프트가 복사되었습니다!')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg shadow-xs transition"
            >
              {copiedId === 'assembled-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>프롬프트 원클릭 복사</span>
            </button>
          </div>

          <div className="bg-stone-900 text-stone-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-stone-800 shadow-inner">
            {assembledPrompt}
          </div>
        </div>
      </section>

      {/* 2. AI 코딩 실패 줄이는 초보자 3계명 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            AI 코딩 실패 줄이는 초보자 3계명
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THREE_COMMANDMENTS.map((item) => (
            <div
              key={item.number}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mb-2">
                  {item.number}
                </span>
                <h4 className="font-bold text-stone-900 text-sm mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-700">
                  <strong className="text-emerald-700 block mb-0.5">실천 방법:</strong>
                  {item.action}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="truncate mr-2 font-mono">"{item.examplePrompt}"</span>
                <button
                  onClick={() => handleCopy(item.number, item.examplePrompt, `${item.number} 예시 문구가 복사되었습니다!`)}
                  className="text-stone-700 hover:text-stone-900 font-semibold shrink-0"
                >
                  복사
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Error Prompts List */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4 mt-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h4 className="font-bold text-sm sm:text-base text-stone-900">
                긴급 상황! '빨간 에러 탈출 마법 주문 5선' (원클릭 복사)
              </h4>
            </div>
            <span className="text-xs text-stone-400">에러 발생 시 즉시 복사</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMERGENCY_ERROR_PROMPTS.map((err) => (
              <div
                key={err.id}
                className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-xs text-stone-900">{err.title}</h5>
                  </div>
                  <p className="text-[11px] text-stone-500 mb-2">{err.situation}</p>
                </div>
                <button
                  onClick={() => handleCopy(err.id, err.prompt, `"${err.title}" 해결 프롬프트가 복사되었습니다!`)}
                  className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-lg transition"
                >
                  {copiedId === err.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>해결 프롬프트 복사</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 로컬 실습 메모장 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">나만의 실습 기록장</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                내 프로젝트 관리 & 실습 메모장 (브라우저 자동 저장)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveNotes}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-xs transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>메모 저장하기</span>
            </button>
          </div>
        </div>

        {savedStatus && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{savedStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Project Info & Checklist (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">내 프로젝트 이름</label>
                <input
                  type="text"
                  value={projectNote.projectName}
                  onChange={(e) => setProjectNote((p) => ({ ...p, projectName: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                  placeholder="예: 우리 반 AI 신청서"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">데이터베이스 유형</label>
                <select
                  value={projectNote.databaseType}
                  onChange={(e) => setProjectNote((p) => ({ ...p, databaseType: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                >
                  <option value="sheets">구글 스프레드시트</option>
                  <option value="firebase">파이어베이스 Firestore</option>
                  <option value="local">브라우저 로컬 저장</option>
                  <option value="none">DB 없음</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">GitHub 저장소 주소</label>
                <input
                  type="text"
                  value={projectNote.repoUrl}
                  onChange={(e) => setProjectNote((p) => ({ ...p, repoUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono"
                  placeholder="https://github.com/myname/my-app"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Vercel 배포 완료 링크</label>
                <input
                  type="text"
                  value={projectNote.deployedUrl}
                  onChange={(e) => setProjectNote((p) => ({ ...p, deployedUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono text-indigo-700"
                  placeholder="https://my-app.vercel.app"
                />
              </div>
            </div>

            {/* Step-by-Step Checklist */}
            <div className="pt-2">
              <label className="font-bold text-stone-800 text-xs block mb-2">
                단계별 완료 체크리스트 (클릭하여 체크)
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'promptCreated', label: '1. 나만의 프롬프트 조립 & 기획 완료' },
                  { key: 'codeGenerated', label: '2. AI 채팅창에 보내서 코드 파일 받기 완료' },
                  { key: 'githubPushed', label: '3. GitHub 새 저장소 만들고 코드 업로드 완료' },
                  { key: 'envVarSafe', label: '4. [필수] Vercel Environment Variables에 API 키 등록 완료' },
                  { key: 'vercelDeployed', label: '5. Vercel 배포(Deploy) 성공 및 정상 작동 확인' },
                  { key: 'sharedWithFriends', label: '6. 완성된 웹 주소 친구들에게 공유하기!' }
                ].map((item) => {
                  const isChecked = projectNote.checklist[item.key as keyof UserProjectNote['checklist']];
                  return (
                    <label
                      key={item.key}
                      onClick={() => handleChecklistToggle(item.key as keyof UserProjectNote['checklist'])}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="w-4 h-4 text-emerald-600 rounded border-stone-300"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Freeform Scratchpad (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-stone-800 text-xs">
                  자유 실습 메모 & 아이디어 (새로고침해도 보존됨)
                </label>
                <span className="text-[11px] text-stone-400">
                  최근 저장: {projectNote.lastUpdated}
                </span>
              </div>
              <textarea
                rows={12}
                value={projectNote.notes}
                onChange={(e) => setProjectNote((p) => ({ ...p, notes: e.target.value }))}
                placeholder="여기에 복사해둘 프롬프트나 나만의 기능 아이디어, 추가할 사항을 자유롭게 적어두세요."
                className="w-full p-3.5 border border-stone-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
              />
            </div>

            <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 flex items-center justify-between">
              <span>작성한 내용은 컴퓨터 브라우저 로컬 저장소에 안전하게 유지됩니다.</span>
              <button
                type="button"
                onClick={() => {
                  if (confirm('메모장을 기본값으로 초기화하시겠습니까?')) {
                    setProjectNote(initialNote);
                    localStorage.removeItem('vibe_coding_user_note');
                  }
                }}
                className="text-stone-400 hover:text-stone-600 text-[11px] underline"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
