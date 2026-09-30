import React, { useState } from 'react';
import { Copy, Check, Rocket, ShieldCheck, Key, FolderGit2, Globe, ExternalLink, Lock, CheckCircle2, AlertTriangle, Sparkles, Plus, Eye, EyeOff, Trash2 } from 'lucide-react';
import { VERCEL_STEPS } from '../data/guideData';

interface TabMenu3DeploymentProps {
  onCopyText: (text: string, title: string) => void;
}

export const TabMenu3Deployment: React.FC<TabMenu3DeploymentProps> = ({ onCopyText }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Vercel Environment Variables Simulator
  const [simKey, setSimKey] = useState('GEMINI_API_KEY');
  const [simValue, setSimValue] = useState('');
  const [showSimValue, setShowSimValue] = useState(false);
  const [simEnvList, setSimEnvList] = useState<Array<{ id: string; key: string; val: string }>>([
    { id: '1', key: 'VITE_APP_TITLE', val: '우리 반 AI 신청서' }
  ]);
  const [simDeployState, setSimDeployState] = useState<'idle' | 'building' | 'deployed'>('idle');
  const [deployedDomain, setDeployedDomain] = useState('my-ai-project-2026.vercel.app');

  const handleCopy = (id: string, text: string, title: string) => {
    onCopyText(text, title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddEnv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simKey.trim() || !simValue.trim()) return;

    setSimEnvList((prev) => [
      ...prev,
      { id: Date.now().toString(), key: simKey.trim(), val: simValue.trim() }
    ]);
    setSimValue('');
  };

  const handleRemoveEnv = (id: string) => {
    setSimEnvList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTriggerDeploy = () => {
    setSimDeployState('building');
    setTimeout(() => {
      setSimDeployState('deployed');
    }, 2500);
  };

  const aiSafeEnvPrompt = `내 코드를 GitHub에 올려서 Vercel로 무료 배포할 계획이야.
코드 파일 안에 내 비밀 API 키(Google Gemini API Key 등)가 절대로 노출되지 않도록,
1. 코드에서 직접 하드코딩된 API 키를 제거하고
2. 환경 변수(Environment Variables: process.env.GEMINI_API_KEY 또는 Vite 환경의 import.meta.env.VITE_GEMINI_API_KEY)를 읽어와 동작하도록 리팩토링해줘.
3. 로컬 테스트를 위한 .env.example 파일 내용과, Vercel 대시보드에서 등록해야 할 Key 이름도 친절하게 알려줘.`;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-stone-50 border border-indigo-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 tracking-wide uppercase">
              <span>메뉴 3 · 안전한 무료 배포 실전</span>
              <span className="text-indigo-300">/</span>
              <span className="text-stone-500 font-normal">GitHub & Vercel Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
              내 웹앱 세상에 공개하기 (GitHub & Vercel)
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              초보자가 가장 많이 실수하는 <strong>"API 키 유출 방지"</strong>와 <strong>"평생 무료 웹사이트 주소 만들기"</strong>를 4단계로 완벽하게 마스터합니다.
            </p>
          </div>
          <div className="bg-white border border-indigo-200 px-4 py-3 rounded-xl shadow-xs shrink-0 text-center sm:text-right">
            <span className="text-xs text-stone-500 block">배포 완료 후 주소</span>
            <span className="text-sm font-bold text-indigo-900 font-mono">
              내프로젝트.vercel.app
            </span>
          </div>
        </div>
      </div>

      {/* 4 Steps Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {VERCEL_STEPS.map((s) => (
          <div
            key={s.step}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              s.step === 3
                ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-300/30 shadow-xs'
                : 'bg-white border-stone-200 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    s.step === 3
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  Step {s.step}
                </span>
                <span className="text-xs font-mono text-stone-400">0{s.step}/04</span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-900 mb-1">
                {s.title}
              </h4>
              <p className="text-xs text-stone-500 mb-3">{s.subtitle}</p>
              <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-100 mb-3">
                <span className="font-semibold text-stone-700">비유: </span>
                {s.analogy}
              </div>
            </div>
            <a
              href={`#step-${s.step}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2 border-t border-stone-100"
            >
              <span>자세히 보기</span>
              <span>↓</span>
            </a>
          </div>
        ))}
      </div>

      {/* STEP 1: GitHub 가입 및 내 코드 올리기 */}
      <section id="step-1" className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 1</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                GitHub 가입 및 내 코드 올리기 (내 작업물 보관함)
              </h3>
            </div>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">github.com</span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <p>
            GitHub는 내가 만든 코드 파일들을 인터넷에 백업해두는 <strong>클라우드 사물함</strong>입니다.
            회원가입은 무료이며, 웹 브라우저 화면에서 파일을 드래그해서 바로 올릴 수 있어 터미널 명령어를 몰라도 누구나 할 수 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block mb-1">1. 회원가입</strong>
              <p className="text-xs text-stone-500">github.com 접속 후 이메일로 1분 만에 가입</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block mb-1">2. New Repository</strong>
              <p className="text-xs text-stone-500">우측 상단 [+] &gt; [New repository] 클릭 후 저장소 이름 입력</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block mb-1">3. Upload files</strong>
              <p className="text-xs text-stone-500">[uploading an existing file] 링크를 눌러 코드 파일들 드래그</p>
            </div>
          </div>
        </div>

        {/* Essential AI Prompt for Environment Variables */}
        <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-700 shrink-0" />
              <strong className="text-xs sm:text-sm font-bold text-indigo-950">
                [가장 중요!] GitHub에 올리기 전, AI에게 반드시 요청해야 할 프롬프트
              </strong>
            </div>
            <button
              onClick={() => handleCopy('ai-env-prompt', aiSafeEnvPrompt, '환경 변수 안전 요청 프롬프트가 복사되었습니다!')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shrink-0"
            >
              {copiedId === 'ai-env-prompt' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>프롬프트 복사하기</span>
            </button>
          </div>
          <p className="text-xs text-stone-600">
            코드 안에 내 실제 비밀 API 키(AIzaSy...)가 그대로 적혀있다면 위험합니다. AI에게 아래 프롬프트를 보내 환경 변수 방식으로 코드를 먼저 정돈하세요.
          </p>
          <pre className="text-xs bg-white border border-indigo-200 p-3.5 rounded-lg font-mono text-stone-800 whitespace-pre-wrap">
            {aiSafeEnvPrompt}
          </pre>
        </div>

        {/* Beginner FAQ: Deploy from a branch vs GitHub Actions */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
              초보자 궁금증: "Deploy from a branch"와 "GitHub Actions"는 무엇이 다른가요?
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
            <div className="p-3.5 bg-white rounded-xl border border-amber-200">
              <span className="font-bold text-rose-700 block mb-1">
                ❌ Deploy from a branch (날재료 그대로 내놓기)
              </span>
              <p className="text-stone-600 mb-2">
                저장소에 올려둔 원본 파일(TypeScript <code className="text-stone-800 bg-stone-100 px-1 py-0.5 rounded font-mono">.tsx</code>)을 아무런 가공 없이 웹 브라우저에 그대로 던져줍니다.
              </p>
              <div className="p-2 bg-rose-50 rounded-lg text-rose-900 text-[11px]">
                <strong>왜 하얀 화면이 뜰까요?</strong> 브라우저(크롬 등)는 날달걀(TypeScript)을 직접 소화하지 못합니다. 반드시 오븐에 구워진 빵(순수 <code className="font-mono">.js</code>)만 먹을 수 있기 때문에 404나 문법 오류가 납니다.
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-amber-200">
              <span className="font-bold text-emerald-700 block mb-1">
                ✅ GitHub Actions (주방장이 구워서 내놓기)
              </span>
              <p className="text-stone-600 mb-2">
                코드를 올릴 때마다 깃허브의 로봇 주방장(클라우드 가상 컴퓨터)이 켜져서 <code className="text-stone-800 bg-stone-100 px-1 py-0.5 rounded font-mono">npm run build</code> 명령어를 대신 실행해 줍니다.
              </p>
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-900 text-[11px]">
                <strong>해결 원리:</strong> <code className="font-mono">.tsx</code>를 브라우저가 읽을 수 있는 순수한 <code className="font-mono">.js</code>와 <code className="font-mono">.html</code>로 완벽하게 요리한 <strong>결과물(dist 폴더)</strong>만 쏙 뽑아서 웹사이트로 띄워줍니다!
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-stone-700">
            <strong>🌟 그래서 가이드북에서 Vercel을 가장 추천하는 이유:</strong> GitHub Actions는 요리법 파일(<code className="font-mono">.github/workflows/deploy.yml</code>)을 직접 넣어줘야 하지만, <strong>Vercel</strong>은 저장소만 연결하면 주방장이 알아서 1초 만에 척척 구워주기 때문입니다!
          </div>
        </div>
      </section>

      {/* STEP 2: Vercel 가입 및 GitHub 연결 */}
      <section id="step-2" className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 2</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Vercel 가입 및 GitHub 연결 (무료 인터넷 가게 오픈)
              </h3>
            </div>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">vercel.com</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Vercel은 내 사물함(GitHub)에 저장된 코드를 자동으로 읽어와, 전 세계 누구나 24시간 접속할 수 있는 실제 웹사이트 주소로 만들어주는 무료 플랫폼입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
            <span className="text-xs font-bold text-stone-900 block mb-1">1. [Continue with GitHub] 클릭</span>
            <p className="text-xs text-stone-600">
              vercel.com 접속 후 [Sign Up] 또는 [Log In]에서 <strong>Continue with GitHub</strong>를 누르면 아이디/비밀번호 입력 없이 1초 만에 자동 연결 가입됩니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
            <span className="text-xs font-bold text-stone-900 block mb-1">2. [Import] 버튼 클릭</span>
            <p className="text-xs text-stone-600">
              로그인 후 메인 대시보드에서 <strong>[Add New...] &gt; [Project]</strong>를 누르면 내 GitHub 저장소 목록이 보입니다. 방금 만든 저장소 옆의 파란색 <strong>[Import]</strong>를 클릭하세요.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 3: Vercel에 비밀 열쇠 숨겨두기 (Environment Variables) */}
      <section id="step-3" className="bg-amber-50/50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-amber-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Step 3 · 가장 중요!</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Vercel에 비밀 열쇠(API 키) 숨겨두기 (Environment Variables)
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2.5 py-1 rounded-md">
            보안 필수 단계
          </span>
        </div>

        {/* Why it is needed Analogy */}
        <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <strong className="text-amber-950 font-bold block mb-1">왜 이 작업이 필요한가요?</strong>
          GitHub는 길거리 전단지처럼 누구나 코드를 열어볼 수 있는 곳입니다. 만약 전단지 한구석에 내 현관문 비밀번호를 적어두면 큰일 나겠죠?
          그래서 비밀 열쇠(API Key)는 GitHub 전단지에 적지 않고, <strong>Vercel이라는 안전한 디지털 금고(Environment Variables)</strong>에만 살짝 넣어두는 것입니다. 이렇게 하면 전 세계 사람들에게 내 웹사이트를 보여주면서도 내 열쇠는 절대 도난당하지 않습니다!
        </div>

        {/* 4-Step Setting Guide */}
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-stone-900">실제 Vercel 화면 설정 4단계:</h4>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <li className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">1. 메뉴 펼치기</span>
              <p className="text-stone-600">배포 전 Vercel 설정 화면에서 <strong>[Environment Variables]</strong>를 클릭해 펼칩니다.</p>
            </li>
            <li className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">2. Key 입력</span>
              <p className="text-stone-600">Key 칸에 <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">GEMINI_API_KEY</code>를 정확히 입력합니다.</p>
            </li>
            <li className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">3. Value 붙여넣기</span>
              <p className="text-stone-600">Google AI Studio에서 복사한 내 실제 API 키를 Value 칸에 붙여넣습니다.</p>
            </li>
            <li className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">4. [Add] 누르기</span>
              <p className="text-stone-600"><strong>[Add]</strong> 버튼을 누르면 안전하게 암호화되어 금고 목록에 등록됩니다!</p>
            </li>
          </ol>
        </div>

        {/* ★ Interactive Simulator: "Vercel 환경 변수 금고 등록 모의 체험" */}
        <div className="bg-white border border-amber-300 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span>🛡️</span> Vercel 환경 변수 설정 모의 시뮬레이터 (직접 실습해보기)
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              가상 연습 화면
            </span>
          </div>

          <form onSubmit={handleAddEnv} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
            <div className="sm:col-span-5">
              <label className="block text-stone-500 mb-1 font-medium">Key (변수 이름)</label>
              <input
                type="text"
                value={simKey}
                onChange={(e) => setSimKey(e.target.value)}
                placeholder="예: GEMINI_API_KEY"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-stone-500 mb-1 font-medium">Value (비밀 API 키 값)</label>
              <div className="relative">
                <input
                  type={showSimValue ? 'text' : 'password'}
                  value={simValue}
                  onChange={(e) => setSimValue(e.target.value)}
                  placeholder="AIzaSy... (내 비밀 키)"
                  className="w-full pl-3 pr-8 py-2 border border-stone-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSimValue(!showSimValue)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showSimValue ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 추가</span>
              </button>
            </div>
          </form>

          {/* List of simulated env vars */}
          <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-stone-50 px-3 py-2 border-b border-stone-200 text-stone-500 font-semibold flex items-center justify-between">
              <span>안전 금고에 등록된 환경 변수 목록 ({simEnvList.length}개)</span>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                <Lock className="w-3 h-3" /> 안전 암호화 보관 중
              </span>
            </div>
            <div className="divide-y divide-stone-100">
              {simEnvList.map((item) => (
                <div key={item.id} className="px-3 py-2 flex items-center justify-between hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-stone-800">{item.key}</span>
                    <span className="font-mono text-stone-400 text-[11px]">••••••••••••••••</span>
                  </div>
                  <button
                    onClick={() => handleRemoveEnv(item.id)}
                    className="text-stone-400 hover:text-rose-600 p-1 rounded"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEP 4: 배포(Deploy) 누르고 친구들에게 링크 자랑하기 */}
      <section id="step-4" className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 4</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                배포(Deploy) 누르고 친구들에게 링크 자랑하기!
              </h3>
            </div>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">1분 완성</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          환경 변수 등록까지 마쳤다면, 이제 맨 아래의 파란색 <strong>[Deploy]</strong> 버튼을 누르기만 하면 됩니다.
          약 30초~1분 동안 Vercel 컴퓨터가 코드를 빌드하고, 화면에 축하 폭죽이 터지며 나만의 공식 인터넷 도메인이 발급됩니다!
        </p>

        {/* Live Deploy Simulator Sandbox */}
        <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                배포 동작 모의 테스트
              </h4>
              <p className="text-xs text-stone-500">
                [Deploy 실행하기] 버튼을 눌러 Vercel 배포 완료 과정을 미리 체험해 보세요.
              </p>
            </div>

            <button
              onClick={handleTriggerDeploy}
              disabled={simDeployState === 'building'}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>
                {simDeployState === 'building' ? 'Vercel 클라우드 빌드 중...' : '가상 Deploy 실행하기'}
              </span>
            </button>
          </div>

          {simDeployState === 'building' && (
            <div className="p-4 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs space-y-1.5 animate-pulse">
              <p className="text-emerald-400">⚡ Vercel Build Engine Started...</p>
              <p>Cloning repository from GitHub...</p>
              <p>Injecting secure environment variables (GEMINI_API_KEY)...</p>
              <p className="text-amber-300">Generating optimized static bundle & edge routes...</p>
            </div>
          )}

          {simDeployState === 'deployed' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <strong className="text-sm font-bold">배포 성공! 나만의 웹앱이 오픈되었습니다!</strong>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono text-xs font-bold text-stone-900 truncate">
                  https://{deployedDomain}
                </span>
                <button
                  onClick={() => handleCopy('domain-copy', `https://${deployedDomain}`, '도메인 주소가 복사되었습니다!')}
                  className="ml-auto text-xs text-emerald-700 hover:text-emerald-900 font-medium px-2 py-1 rounded bg-emerald-50 border border-emerald-200"
                >
                  주소 복사
                </button>
              </div>
              <p className="text-xs text-emerald-800">
                이제 이 링크를 카카오톡 단체방이나 SNS에 보내 친구들에게 내 첫 AI 웹앱을 자랑할 수 있습니다!
              </p>
            </div>
          )}
        </div>

        {/* Automatic Redeployment tip */}
        <div className="p-4 rounded-xl bg-stone-100 text-stone-700 text-xs flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 font-bold block mb-0.5">
              꿀팁: 코드를 수정하면 다시 Vercel에서 배포 버튼을 눌러야 하나요?
            </strong>
            <span>
              아닙니다! GitHub에 수정된 코드 파일을 업로드(Commit)하기만 하면, Vercel이 1초 만에 감지하고 알아서 새 버전으로 <strong>자동 재배포(CI/CD)</strong>해 줍니다. 배포 주소는 그대로 유지됩니다.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
