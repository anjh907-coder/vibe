import React, { useState } from 'react';
import { Copy, Check, Sparkles, Send, FileSpreadsheet, Mail, ChevronRight, AlertTriangle, Play, HelpCircle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { APPS_SCRIPT_PROMPTS } from '../data/guideData';

interface TabMenu1AppsScriptProps {
  onCopyText: (text: string, title: string) => void;
}

export const TabMenu1AppsScript: React.FC<TabMenu1AppsScriptProps> = ({ onCopyText }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'prompt' | 'code-gs' | 'index-html'>('prompt');

  // Interactive Live Simulator State (Seminar / One-day Class)
  const [simName, setSimName] = useState('박서연 매니저');
  const [simEmail, setSimEmail] = useState('seoyeon.park@company.com');
  const [simSession, setSimSession] = useState('[세션 A] 생성형 AI 업무 자동화 실전 (오전 10:00)');
  const [simQuestion, setSimQuestion] = useState('비개발자도 실습 코드를 쉽게 따라갈 수 있을까요?');
  
  const [simRows, setSimRows] = useState([
    {
      time: '2026-09-29 16:20',
      name: '김태호 팀장',
      email: 'taeho.kim@techcorp.kr',
      session: '[세션 A] 생성형 AI 업무 자동화 실전',
      question: '구글 시트 연동 시 보안 설정 질문이 있습니다.',
      status: '확정 메일 발송됨'
    },
    {
      time: '2026-09-30 09:15',
      name: '이수진 대리',
      email: 'sujin.lee@startup.io',
      session: '[세션 B] 바이브 코딩으로 1일 1웹앱 만들기',
      question: 'Vercel 무료 배포 실습이 기대됩니다!',
      status: '확정 메일 발송됨'
    }
  ]);

  const [simEmailPreview, setSimEmailPreview] = useState<{
    to: string;
    name: string;
    session: string;
    question: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (id: string, text: string, title: string) => {
    onCopyText(text, title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName.trim() || !simEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newRow = {
        time: timeStr,
        name: simName,
        email: simEmail,
        session: simSession,
        question: simQuestion || '(사전 질문 없음)',
        status: '확정 메일 발송됨'
      };

      setSimRows((prev) => [newRow, ...prev]);
      setIsSubmitting(false);
      setSimEmailPreview({
        to: simEmail,
        name: simName,
        session: simSession,
        question: simQuestion || '없음'
      });
    }, 700);
  };

  const sampleCodeGs = `// [Code.gs] 구글 앱스 스크립트 - 세미나 참가 신청 & 자동 안내 비서
function doGet() {
  // 웹 브라우저로 접속했을 때 모바일 친화적 신청 화면(index.html)을 열어줍니다
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('원데이 클래스 & 세미나 참가 신청 센터')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitRegistration(formData) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 시트 첫 줄에 헤더(제목 행)가 없다면 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['접수일시', '참가자 성명', '이메일 주소', '신청 세션', '사전 질문', '등록 상태']);
      // 헤더 스타일링 (선택)
      sheet.getRange(1, 1, 1, 6).setBackground('#0f172a').setFontColor('#ffffff').setFontWeight('bold');
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm");
    
    // 구글 시트 맨 아래에 신청 데이터 한 줄 추가 (DB 전자 사물함 저장)
    sheet.appendRow([
      formattedDate,
      formData.name,
      formData.email,
      formData.session,
      formData.question || '없음',
      '참가확정'
    ]);

    // [야근 없는 자동화 비서] 신청자에게 맞춤 안내장 메일 지메일(Gmail)로 자동 발송
    if (formData.email) {
      var subject = '[참가 확정] ' + formData.name + '님, 신청하신 세미나 등록이 완료되었습니다.';
      var htmlBody = 
        '<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">' +
        '<h2 style="color: #0f172a; margin-top: 0;">🎉 참가 등록이 성공적으로 확정되었습니다!</h2>' +
        '<p style="color: #475569; font-size: 14px;">안녕하세요, <strong>' + formData.name + '</strong>님. 세미나 신청이 정상 접수되었습니다.</p>' +
        '<div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7;">' +
        '<p style="margin: 4px 0;"><strong>선택 세션:</strong> ' + formData.session + '</p>' +
        '<p style="margin: 4px 0;"><strong>행사 장소:</strong> 서울 강남구 테헤란로 123 AI 혁신센터 B1 대강당 (또는 온라인 Zoom 안내)</p>' +
        '<p style="margin: 4px 0;"><strong>준비물:</strong> 실습용 개인 노트북, 충전기, 필기도구</p>' +
        '<p style="margin: 4px 0;"><strong>남겨주신 사전 질문:</strong> ' + (formData.question || '없음') + '</p>' +
        '</div>' +
        '<p style="color: #64748b; font-size: 13px;">당일 원활한 진행을 위해 시작 10분 전까지 입장해 주시기 바랍니다.<br>행사 운영팀 드림.</p>' +
        '</div>';

      GmailApp.sendEmail(formData.email, subject, '', {
        htmlBody: htmlBody
      });
    }

    return { success: true, message: '참가 등록이 완료되었습니다! 입력하신 메일로 안내장이 전송되었습니다.' };
  } catch (error) {
    return { success: false, message: '오류가 발생했습니다: ' + error.toString() };
  }
}`;

  const sampleIndexHtml = `<!-- [index.html] 반응형 온라인 참가 신청 창구 웹 화면 -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <base target="_top">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>세미나 참가 신청 센터</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full border border-slate-200">
    <div class="mb-6">
      <span class="inline-block px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 rounded-md mb-2">실무 세미나 & 원데이 클래스</span>
      <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">참가 신청 및 등록 안내</h2>
      <p class="text-xs text-slate-500 mt-1">신청 즉시 구글 시트에 자동 기록되고, 장소와 준비물 안내 메일이 발송됩니다.</p>
    </div>

    <form id="regForm" onsubmit="handleFormSubmit(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">성명 / 직책 <span class="text-rose-500">*</span></label>
        <input type="text" id="name" required placeholder="예: 홍길동 팀장" class="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none">
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">이메일 주소 (참가 확정권 수신용) <span class="text-rose-500">*</span></label>
        <input type="email" id="email" required placeholder="name@company.com" class="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none">
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">참석 희망 세션 <span class="text-rose-500">*</span></label>
        <select id="session" class="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none">
          <option>[세션 A] 생성형 AI 업무 자동화 실전 (오전 10:00)</option>
          <option>[세션 B] 바이브 코딩으로 1일 1웹앱 만들기 (오후 14:00)</option>
          <option>[세션 C] 노코드 데이터베이스 & 대시보드 구축 (오후 16:30)</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">강사님께 남기는 사전 질문 (선택)</label>
        <textarea id="question" rows="3" placeholder="평소 궁금했던 업무 자동화 질문을 남겨주시면 강의 중 답변해 드립니다." class="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none"></textarea>
      </div>

      <button type="submit" id="btnSubmit" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2">
        <span>참가 신청 확정하기</span>
      </button>
    </form>

    <div id="resultBox" class="mt-4 hidden p-4 rounded-xl text-xs text-center"></div>
  </div>

  <script>
    function handleFormSubmit(e) {
      e.preventDefault();
      var btn = document.getElementById('btnSubmit');
      btn.innerText = '접수 처리 및 안내 메일 발송 중...';
      btn.disabled = true;

      var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        session: document.getElementById('session').value,
        question: document.getElementById('question').value
      };

      google.script.run
        .withSuccessHandler(function(res) {
          btn.innerText = '신청 완료';
          var resBox = document.getElementById('resultBox');
          resBox.className = 'mt-4 p-4 rounded-xl text-xs bg-emerald-50 border border-emerald-200 text-emerald-800';
          resBox.innerText = res.message;
          resBox.classList.remove('hidden');
        })
        .withFailureHandler(function(err) {
          btn.innerText = '참가 신청 확정하기';
          btn.disabled = false;
          alert('접수 중 오류가 발생했습니다: ' + err.message);
        })
        .submitRegistration(formData);
    }
  </script>
</body>
</html>`;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-stone-50 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wide uppercase">
              <span>대메뉴 1 · 실무형 업무 자동화</span>
              <span className="text-emerald-300">/</span>
              <span className="text-stone-500 font-normal">Google Apps Script</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
              앱스 스크립트: AI로 만드는 업무 자동화 웹앱
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              웹 화면에서 신청자 정보(이름, 이메일, 참석 세션, 사전 질문)를 받아 시트에 기록하고, 신청 완료 즉시 참가자에게 <strong>[참가 확정권 및 장소/준비물 안내] 메일을 지메일로 자동 쏘아주는 실무형 자동화</strong>를 구축합니다.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 px-4 py-3 rounded-xl shadow-xs shrink-0 text-center sm:text-right">
            <span className="text-xs text-stone-500 block">실습 프로젝트</span>
            <span className="text-sm font-bold text-emerald-950">
              원데이 클래스 & 사내 세미나 참가 센터
            </span>
          </div>
        </div>
      </div>

      {/* 1. 비유로 이해하기 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            비유로 이해하기: 웹앱과 앱스 스크립트
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-bold text-stone-900 text-base">웹앱 (Web App)</h4>
                <span className="text-xs text-emerald-700 font-medium">깔끔한 모바일 친화적 '온라인 신청서 창구'</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              참가자가 스마트폰이나 PC 브라우저로 접속해 이름, 참석 세션, 사전 질문을 입력하고 [신청하기] 버튼을 누르는 <strong>모바일 친화적인 온라인 접수 창구</strong>입니다.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h4 className="font-bold text-stone-900 text-base">앱스 스크립트 (Apps Script)</h4>
                <span className="text-xs text-emerald-700 font-medium">구글 시트와 지메일을 연결해 야근 없이 일하는 '내 전용 비서'</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              창구에서 신청서가 들어오면 <strong>구글 시트에 행을 착착 정리해 누적하고, 지메일로 장소/준비물이 적힌 맞춤 확정장을 즉시 전송</strong>하여 담당자의 반복 업무를 0으로 만들어주는 24시간 전용 자동화 비서입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. AI에게 시키는 3단계 프롬프트 작성법 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            AI에게 시키는 3단계 프롬프트 작성법
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600">
          초보자일수록 '화면/저장 $\rightarrow$ 자동 메일링 $\rightarrow$ 에러 해결' 순서로 나누어 요청해야 실수 없이 100% 동작하는 코드를 얻을 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  1단계
                </span>
                <span className="text-xs text-stone-400">화면과 DB</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1.5">
                "신청자 정보와 참석 일정을 입력받아 구글 시트의 각 열에 깔끔히 누적해줘."
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                이름, 이메일, 세션 선택, 사전 질문 입력 폼 화면을 만들고, 제출 시 구글 시트 맨 아래에 날짜와 함께 저장해 달라고 설명합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 font-mono bg-stone-50 p-2.5 rounded-lg">
              "신청자 정보와 세션을 입력받아 구글 시트 열에 누적해줘."
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  2단계
                </span>
                <span className="text-xs text-stone-400">자동 메일링</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1.5">
                "시트에 새 신청자가 들어오면, 신청자 이메일로 맞춤 안내 메일을 지메일로 즉시 발송해줘."
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                저장이 완료된 후 <code className="text-stone-800 bg-stone-100 px-1 py-0.5 rounded">GmailApp.sendEmail</code>을 사용해 행사장 주소, 시간, 준비물이 적힌 참가 확정 메일을 쏘도록 업그레이드를 요청합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 font-mono bg-stone-50 p-2.5 rounded-lg">
              "신청 완료 시 장소/준비물이 적힌 확인 메일을 발송해줘."
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  3단계
                </span>
                <span className="text-xs text-stone-400">오류 해결</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1.5">
                에러 메시지가 뜨면 당황하지 않고 통째로 복사해서 "이거 고쳐줘" 요청하기
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                권한 승인 에러나 오타가 발생하면 에러 내용을 그대로 복사해 AI에게 붙여넣고 "초보자도 따라 할 수 있게 고쳐줘"라고 요청하면 해결책을 줍니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 font-mono bg-stone-50 p-2.5 rounded-lg">
              "이런 에러가 떴어: [에러 내용]. 원인과 고친 코드를 줘."
            </div>
          </div>
        </div>
      </section>

      {/* 3. 바로 복사해서 쓰는 Apps Script 실무 프롬프트 템플릿 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              바로 복사해서 쓰는 Apps Script 실무 프롬프트 & 완성 코드
            </h3>
          </div>
        </div>

        {/* Tab Controls for Prompt / Code.gs / index.html */}
        <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCodeTab('prompt')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeCodeTab === 'prompt'
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white bg-stone-800'
                }`}
              >
                1. AI에게 보낼 전체 통합 프롬프트
              </button>
              <button
                onClick={() => setActiveCodeTab('code-gs')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeCodeTab === 'code-gs'
                    ? 'bg-emerald-500 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white bg-stone-800'
                }`}
              >
                2. Code.gs 실무 코드 미리보기
              </button>
              <button
                onClick={() => setActiveCodeTab('index-html')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeCodeTab === 'index-html'
                    ? 'bg-sky-400 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white bg-stone-800'
                }`}
              >
                3. index.html 화면 코드 미리보기
              </button>
            </div>

            <button
              onClick={() => {
                if (activeCodeTab === 'prompt') {
                  handleCopy('gas-prompt', APPS_SCRIPT_PROMPTS[0].prompt, '세미나 자동화 통합 프롬프트가 복사되었습니다!');
                } else if (activeCodeTab === 'code-gs') {
                  handleCopy('code-gs', sampleCodeGs, 'Code.gs 코드가 복사되었습니다!');
                } else {
                  handleCopy('index-html', sampleIndexHtml, 'index.html 코드가 복사되었습니다!');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white text-stone-900 hover:bg-stone-100 rounded-lg transition shadow-xs"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>원클릭 복사하기</span>
                </>
              )}
            </button>
          </div>

          {activeCodeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  ChatGPT, Claude, Gemini에 아래 프롬프트를 붙여넣으면 구글 스프레드시트와 지메일이 연동된 세미나 신청 센터 코드가 바로 완성됩니다.
                </span>
              </div>
              <pre className="text-xs sm:text-sm text-stone-200 bg-stone-950 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800 font-mono">
                {APPS_SCRIPT_PROMPTS[0].prompt}
              </pre>
            </div>
          )}

          {activeCodeTab === 'code-gs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                <span>
                  스프레드시트 <strong>[확장 프로그램] &gt; [Apps Script]</strong>를 누르고 <strong>Code.gs</strong>에 그대로 붙여넣는 백엔드 자동화 코드입니다.
                </span>
              </div>
              <pre className="text-xs sm:text-sm text-emerald-200 bg-stone-950 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800 font-mono">
                {sampleCodeGs}
              </pre>
            </div>
          )}

          {activeCodeTab === 'index-html' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-sky-300 bg-sky-950/40 p-2.5 rounded-lg border border-sky-800/40">
                <span>
                  Apps Script 좌측 <strong>[+] &gt; [HTML]</strong>을 눌러 <strong>index.html</strong>로 저장할 모바일 친화 반응형 화면 코드입니다.
                </span>
              </div>
              <pre className="text-xs sm:text-sm text-sky-200 bg-stone-950 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800 font-mono">
                {sampleIndexHtml}
              </pre>
            </div>
          )}
        </div>

        {/* Step-by-Step Prompt 1 & Prompt 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {APPS_SCRIPT_PROMPTS.slice(1).map((item) => (
            <div key={item.id} className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
                  {item.category}
                </span>
                <h5 className="font-bold text-xs text-stone-900 mb-1">{item.title}</h5>
                <p className="text-[11px] text-stone-500 mb-2 leading-relaxed">{item.summary}</p>
              </div>
              <button
                onClick={() => handleCopy(item.id, item.prompt, `${item.title} 복사 완료!`)}
                className="mt-2 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>프롬프트 복사</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 클릭 몇 번으로 배포하기 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            클릭 몇 번으로 배포하기: 링크 하나로 참가자 모집하기
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          코드를 붙여넣었다면 이제 <strong>사내 사우들이나 외부 신청자 누구나 접속할 수 있는 단독 인터넷 링크</strong>를 생성합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
            <div className="w-6 h-6 rounded-md bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-1">
              [배포] &gt; [새 배포] 클릭
            </h4>
            <p className="text-xs text-stone-600">
              Apps Script 우측 상단의 파란색 <strong>[배포]</strong> 버튼을 누르고 <strong>[새 배포]</strong>를 선택합니다.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
            <div className="w-6 h-6 rounded-md bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-1">
              유형 선택: [웹 앱]
            </h4>
            <p className="text-xs text-stone-600">
              좌측 톱니바퀴 아이콘 [유형 선택]에서 <strong>웹 앱 (Web App)</strong>을 클릭합니다.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-emerald-500 rounded-xl shadow-xs bg-emerald-50/20">
            <div className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-emerald-950 mb-1">
              액세스 권한: [모든 사용자]
            </h4>
            <div className="text-xs text-stone-700 space-y-1">
              <p>• 다음 사용자로 실행: <strong>나(내 계정)</strong></p>
              <p className="text-emerald-800 font-bold">• 액세스 권한: <strong>모든 사용자 (Anyone)</strong></p>
            </div>
            <span className="inline-block mt-2 text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              ★ 링크 하나로 누구나 참가 신청 가능!
            </span>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
            <div className="w-6 h-6 rounded-md bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              4
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-1">
              모집 링크 복사 및 공유
            </h4>
            <p className="text-xs text-stone-600">
              생성된 웹 앱 URL을 복사하여 사내 메신저나 SNS에 게시해 참가자 모집을 바로 시작하세요!
            </p>
          </div>
        </div>

        {/* Warning Callout for Permissions */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-950 font-bold block">
              처음 배포 시 "Google에서 확인하지 않은 앱입니다" 창이 뜨는 이유
            </strong>
            <p className="text-stone-600 leading-relaxed text-xs">
              내가 작성한 스크립트가 내 지메일로 참가자들에게 확인 메일을 발송할 권한을 부여받기 위해 구글이 보안상 묻는 단계입니다.
              파란색 <strong>[고급]</strong> 링크 클릭 $\rightarrow$ 아래의 <strong>[안전하지 않은 페이지로 이동]</strong> $\rightarrow$ <strong>[허용]</strong>을 차례로 클릭하면 10초 만에 정상 완료됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* ★ Interactive Live Simulator: "원데이 클래스 세미나 신청 & 메일 자동 발송 체험" */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900">
                인터랙티브 실무 시뮬레이터: 참가 신청 및 자동 안내 센터 체험
              </h4>
              <p className="text-xs text-stone-500">
                참가자 이름과 세션을 선택하고 제출해 보세요. 구글 시트에 행이 누적되고 참가자에게 확정 메일이 전송되는 과정을 실시간으로 확인합니다.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            실시간 연동 체험
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Seminar Form (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <span>🖥️</span> 온라인 참가 신청서 창구
              </span>
              <span className="text-[10px] text-stone-400 font-mono">script.google.com/macros/...</span>
            </div>

            <form onSubmit={handleSimSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  신청자 성명 / 직책 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="예: 박서연 매니저"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  이메일 주소 (입장권 수신) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={simEmail}
                  onChange={(e) => setSimEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  참석 세션 선택 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={simSession}
                  onChange={(e) => setSimSession(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option>[세션 A] 생성형 AI 업무 자동화 실전 (오전 10:00)</option>
                  <option>[세션 B] 바이브 코딩으로 1일 1웹앱 만들기 (오후 14:00)</option>
                  <option>[세션 C] 노코드 데이터베이스 & 대시보드 구축 (오후 16:30)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  사전 질문 (선택 사항)
                </label>
                <input
                  type="text"
                  value={simQuestion}
                  onChange={(e) => setSimQuestion(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="강사님께 미리 물어보고 싶은 점"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                {isSubmitting ? (
                  <span>시트 누적 & 확정 안내장 발송 중...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>참가 신청서 제출하기 (클릭!)</span>
                  </>
                )}
              </button>
            </form>

            {simEmailPreview && (
              <div className="mt-4 p-3.5 bg-white border-2 border-emerald-300 rounded-xl shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-1.5 mb-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>[자동 발송 메일함 수신 확인]</span>
                </div>
                <div className="text-[11px] text-stone-700 space-y-1">
                  <p><strong>수신인:</strong> {simEmailPreview.to} ({simEmailPreview.name}님)</p>
                  <p><strong>제목:</strong> [참가 확정] {simEmailPreview.name}님, 세미나 등록이 완료되었습니다.</p>
                  <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200 text-[10px] space-y-0.5">
                    <p className="font-semibold text-slate-800">📌 입장 안내장:</p>
                    <p>• 신청 세션: {simEmailPreview.session}</p>
                    <p>• 장소: 서울 테헤란로 123 세미나홀 B1</p>
                    <p>• 필수 준비물: 실습용 노트북, 필기도구</p>
                    <p>• 사전 질문 접수: "{simEmailPreview.question}"</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Google Sheets Realtime Table (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  실시간 누적 구글 스프레드시트 (총 {simRows.length}명 신청)
                </span>
                <span className="text-[11px] text-stone-500 font-mono">sheet.appendRow()</span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-lg">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-stone-900 text-white font-semibold">
                    <tr>
                      <th className="py-2 px-3">접수일시</th>
                      <th className="py-2 px-3">성명/직책</th>
                      <th className="py-2 px-3">이메일</th>
                      <th className="py-2 px-3">선택 세션</th>
                      <th className="py-2 px-3">사전 질문</th>
                      <th className="py-2 px-3">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {simRows.map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-emerald-50/60 font-medium' : 'hover:bg-stone-50'}>
                        <td className="py-2 px-3 text-stone-500 whitespace-nowrap">{row.time}</td>
                        <td className="py-2 px-3 text-stone-900 font-bold whitespace-nowrap">{row.name}</td>
                        <td className="py-2 px-3 text-stone-600">{row.email}</td>
                        <td className="py-2 px-3 text-sky-800 font-medium whitespace-nowrap">{row.session}</td>
                        <td className="py-2 px-3 text-stone-500 truncate max-w-[120px]">{row.question}</td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-3 text-xs text-stone-600">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>야근 없는 업무 자동화의 원리:</strong> 신청자가 창구에서 등록을 마치면 사람이 일일이 메일을 보내지 않아도 구글 시트 전자 사물함에 자동 누적되고, 지메일 비서가 맞춤형 안내장을 1초 만에 전송합니다.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
