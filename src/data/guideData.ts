import { AnalogyItem, PromptTemplate } from '../types';

export const CORE_ANALOGIES: AnalogyItem[] = [
  {
    id: 'db',
    term: 'Database (DB)',
    koreanTerm: '데이터베이스',
    analogy: '웹앱이 꺼져도 글이 지워지지 않는 [전자 사물함]',
    emoji: '🗄️',
    description: '웹사이트를 새로고침하거나 브라우저를 닫아도 사용자가 남긴 신청서, 글, 투표 내용이 안전하게 저장되는 영구 보관 장소입니다.',
    whyItMatters: 'DB가 없으면 페이지를 새로고침할 때마다 모든 입력 내용이 감쪽같이 증발합니다.'
  },
  {
    id: 'api-key',
    term: 'API Key',
    koreanTerm: 'API 키',
    analogy: '내 똑똑한 인공지능 비서에게 문을 열어주는 [비밀 열쇠]',
    emoji: '🔑',
    description: 'Google AI Studio 같은 거대 AI 두뇌를 내 웹앱에 연결할 때 "이 사람은 정당한 사용자입니다"라고 증명하는 고유한 암호 문자열입니다.',
    whyItMatters: '이 열쇠를 GitHub 등 인터넷에 공개하면 남들이 내 열쇠로 무단 사용하여 계정이 정지되거나 요금이 부과될 수 있습니다.'
  },
  {
    id: 'github',
    term: 'GitHub',
    koreanTerm: '깃허브',
    analogy: '언제든 꺼내보고 되돌릴 수 있는 [내 작업물 클라우드 보관함]',
    emoji: '📦',
    description: '내가 AI와 함께 만든 HTML, JavaScript, React 코드 파일들을 인터넷 클라우드에 안전하게 백업해두는 전 세계 개발자들의 공용 서랍장입니다.',
    whyItMatters: '컴퓨터가 고장 나도 코드가 안전하며, Vercel 같은 배포 서비스와 바로 연결할 수 있습니다.'
  },
  {
    id: 'vercel',
    term: 'Vercel',
    koreanTerm: '버셀',
    analogy: '내 방 컴퓨터 속 코드를 전 세계에 보여주는 [무료 인터넷 가게 오픈]',
    emoji: '🚀',
    description: '내 컴퓨터 안에서만 열리던 웹사이트를 버튼 클릭 한 번으로 `내프로젝트.vercel.app` 형태의 전 세계 누구나 접속 가능한 실제 인터넷 주소로 만들어주는 서비스입니다.',
    whyItMatters: '복잡한 서버 설치나 월 몇만 원의 서버 비용 없이, 초보자도 1분 만에 100% 무료로 웹사이트를 오픈할 수 있습니다.'
  },
  {
    id: 'apps-script',
    term: 'Google Apps Script (GAS)',
    koreanTerm: '구글 앱스 스크립트',
    analogy: '구글 시트와 지메일을 알아서 일하게 만드는 [전용 자동화 비서]',
    emoji: '🤖',
    description: '구글 문서, 스프레드시트, 지메일을 서로 이어주어 버튼 클릭 한 번으로 데이터를 시트에 기록하고 자동으로 메일까지 발송해주는 구글의 내장 자동화 도구입니다.',
    whyItMatters: '별도 서버나 복잡한 백엔드 없이 구글 계정만 있으면 완벽한 설문/신청서 자동화 웹앱을 무료로 만들 수 있습니다.'
  },
  {
    id: 'env-var',
    term: 'Environment Variables (.env)',
    koreanTerm: '환경 변수',
    analogy: '비밀 열쇠를 전단지에 인쇄하지 않고 [금고에 따로 넣어두는 번호표]',
    emoji: '🛡️',
    description: '비밀 API 키나 개인 정보를 코드 파일에 직접 적지 않고, Vercel 같은 배포 서버의 안전한 설정 창에만 보관하는 비밀 저장 기법입니다.',
    whyItMatters: 'GitHub에 코드를 공개해도 내 비밀 열쇠는 절대 노출되지 않도록 지켜주는 방패입니다.'
  }
];

export const APPS_SCRIPT_PROMPTS: PromptTemplate[] = [
  {
    id: 'gas-seminar-signup',
    title: '프로젝트: 원데이 클래스 / 사내 세미나 참가 신청 및 자동 안내 센터 (전체 통합 프롬프트)',
    category: '앱스 스크립트 실무',
    summary: '웹 화면에서 참가자 정보(이름, 이메일, 참석 세션, 사전 질문)를 받아 시트에 저장하고, 접수 즉시 참가 확정권과 장소/준비물 안내 메일을 지메일로 발송하는 자동화 웹앱',
    prompt: `너는 구글 앱스 스크립트(Google Apps Script) 실무 자동화 전문 개발자야.
코딩을 전혀 모르는 실무자도 그대로 복사해 쓸 수 있도록 '원데이 클래스 / 사내 세미나 참가 신청 및 자동 안내 센터' 웹앱을 만들어줘.

[내가 만들고 싶은 업무 자동화 기능]
1. 온라인 신청 창구 화면 (index.html):
   - 모바일과 PC 모두에서 깔끔하게 열리는 세련된 반응형 UI (Tailwind CSS 적용)
   - 입력받을 필수 항목:
     * 참가자 이름
     * 참가자 이메일 주소 (안내장 발송용)
     * 참석 희망 세션 선택 (예: [세션 A] 생성형 AI 업무 자동화 실전, [세션 B] 바이브 코딩으로 1일 1웹앱 만들기, [세션 C] 노코드 데이터베이스 구축)
     * 강사님께 남기는 사전 질문 (선택 사항)
   - [참가 신청 확정하기] 버튼 및 제출 시 스피너 로딩 효과
   - 완료 시 "참가 신청이 확정되었습니다! 입력하신 메일로 입장 안내장을 발송했습니다" 성공 알림 표시

2. 구글 스프레드시트 자동 누적 (Code.gs):
   - 스프레드시트의 맨 아래 행에 [접수일시, 이름, 이메일, 선택세션, 사전질문, 등록상태]를 순서대로 자동 기록
   - 시트에 헤더 제목줄이 없으면 자동으로 예쁘게 생성해줄 것

3. 지메일(Gmail) 맞춤 확정 안내장 자동 발송:
   - 신청 데이터가 시트에 저장되는 즉시, 신청자의 이메일로 아래 내용이 담긴 정중하고 세련된 HTML 안내 메일 전송
     * 메일 제목: [참가 확정] {이름}님, 신청하신 세미나 등록이 정상 완료되었습니다.
     * 본문 내용: 선택한 세션명, 참가 일시, 오프라인 행사장 위치(또는 온라인 Zoom 링크), 필수 준비물 안내 및 사전 질문 접수 확인 문구

[출력 형식]
1. 구글 스프레드시트 메뉴 [확장 프로그램] -> [Apps Script]의 'Code.gs' 전체 코드
2. 파일 추가(+) 눌러서 만들 'index.html' 전체 코드
3. [배포] -> [새 배포]에서 액세스 권한을 '모든 사용자(Anyone)'로 설정하여 참가자 모집 링크를 얻는 초보자용 배포 가이드`,
    tags: ['세미나신청', '원데이클래스', '업무자동화', '지메일발송'],
    tips: [
      '구글 스프레드시트에서 [확장 프로그램] > [Apps Script]를 열고 Code.gs와 index.html을 생성하세요.',
      '배포 시 액세스 권한을 "모든 사용자(Anyone)"로 설정해야 로그인 없이도 외부 참가자나 사내 직원들이 신청서를 제출할 수 있습니다.',
      '사전 질문과 세션 선택 데이터를 구글 시트에 실시간으로 모아 강사님께 전달할 수 있습니다.'
    ]
  },
  {
    id: 'gas-prompt-1',
    title: '[프롬프트 1] 참가 신청 웹 화면 UI & 구글 시트 자동 저장 백엔드 요청',
    category: '1단계: 화면 & DB',
    summary: '신청자 정보와 참석 일정을 입력받아 구글 시트의 각 열에 깔끔히 누적하는 기본 웹앱 제작',
    prompt: `구글 앱스 스크립트로 동작하는 '세미나 / 원데이 클래스 온라인 신청 창구 웹앱'을 만들고 싶어.
1. 화면(index.html):
   - 참가자 이름, 이메일, 참석 세션(드롭다운), 사전 질문(텍스트영역)을 입력받는 깔끔하고 세련된 모바일 친화 폼
   - [참가 신청하기] 버튼 클릭 시 데이터를 구글 시트로 안전하게 전송
2. 스크립트(Code.gs):
   - doGet() 함수로 index.html 화면을 띄워줌
   - submitRegistration(formData) 함수로 현재 시트 맨 아래에 타임스탬프와 함께 신청자 데이터를 행으로 추가
초보자도 바로 복사해서 실행할 수 있도록 두 파일의 전체 코드를 주석과 함께 작성해줘.`,
    tags: ['프롬프트1', '화면구성', '시트누적']
  },
  {
    id: 'gas-prompt-2',
    title: '[프롬프트 2] 신청 완료 시 장소 안내 템플릿 메일 자동 발송 기능 추가 요청',
    category: '2단계: 자동 메일링',
    summary: '시트에 새 신청자가 들어오면, 신청자 이메일로 장소/준비물이 적힌 맞춤 안내 메일을 지메일로 즉시 발송',
    prompt: `방금 만든 Code.gs 코드에 "참가자 맞춤 확정 및 장소 안내 메일 자동 발송 기능"을 추가해줘.
사용자가 참가 신청을 완료하여 시트에 저장이 완료되면:
1. 신청자의 이메일 주소로 GmailApp.sendEmail을 사용해:
   - 제목: "[참가 확정] {이름}님, 세미나 참석 안내 및 입장권 안내"
   - 본문: 선택한 세션명, 행사장 위치(서울 역삼 테헤란로 123 세미나홀 B1 또는 온라인 링크), 준비물(개인 노트북, 필기도구), 사전 질문이 잘 접수되었다는 메시지 포함
2. 담당자(admin@company.com)에게도 "[새 세미나 참가자 접수] {이름} ({이메일})" 알림 메일 1통 전송
이메일 전송 중 일시적 오류가 나더라도 시트 저장은 취소되지 않도록 try-catch 예외 처리를 꼭 넣어줘.`,
    tags: ['프롬프트2', '지메일자동화', '안내메일발송']
  },
  {
    id: 'gas-step-3',
    title: '[프롬프트 3] 에러 발생 시 당황하지 않고 통째로 고쳐달라고 요청하기',
    category: '3단계: 오류 해결',
    summary: '권한 승인 에러나 화면이 뜨지 않을 때 에러 메시지를 복사해 AI에게 해결책 요구하기',
    prompt: `구글 앱스 스크립트 세미나 신청 웹앱을 테스트하는데 아래와 같은 에러가 발생했어.

[에러 내용 복사]
Exception: You do not have permission to call GmailApp.sendEmail...
(또는 Script function not found: doGet...)

이 에러가 왜 발생했는지 초보자의 눈높이에서 1문장으로 설명해주고,
1) 구글 앱스 스크립트 권한 승인 창(고급 -> 안전하지 않음으로 이동) 클릭 방법
2) 또는 코드에서 수정해야 할 부분을 바로 복사할 수 있게 전체 코드로 다시 고쳐줘.`,
    tags: ['프롬프트3', '에러해결', '권한승인']
  }
];

export const DATABASE_PROMPTS: PromptTemplate[] = [
  {
    id: 'proj-sheets',
    title: '프로젝트 A: 구글 시트 연동 카드 목록 웹앱',
    category: '구글 시트 연동',
    summary: '구글 시트를 백엔드 삼아 글을 남기고 등록된 글들을 카드 형태로 보여주는 웹앱',
    prompt: `너는 웹 프론트엔드 전문 개발자야.
데이터베이스로 '구글 스프레드시트'를 사용하는 초간단 방명록/게시판 웹앱을 만들어줘.

[조건]
1. 기술 스택: 순수 HTML, Tailwind CSS(CDN), Vanilla JavaScript (또는 단일 파일 React)
2. 구글 시트 연결: 구글 앱스 스크립트를 웹앱(JSON API)으로 배포한 URL을 통해 데이터를 읽고(GET) 쓰기(POST)
3. 기능:
   - 이름과 응원 한마디를 적고 [등록] 버튼을 누르면 구글 시트에 즉시 저장
   - 시트에 저장된 글 목록을 불러와서 예쁜 카드 그리드로 표시
   - 로딩 스피너와 등록 완료 토스트 알림 포함
4. 초보자용 가이드:
   - 구글 시트에 붙여넣을 Apps Script API 코드(doGet, doPost)도 함께 제공해줘.`,
    tags: ['구글시트', '사람이직접확인가능', '초간단']
  },
  {
    id: 'proj-firebase',
    title: '프로젝트 B: 파이어베이스 실시간 방명록 웹앱',
    category: '파이어베이스 연동',
    summary: '새로고침 없이 친구가 글을 쓰면 번개처럼 내 화면에 1초 만에 뜨는 실시간 웹앱',
    prompt: `너는 파이어베이스(Firebase) 전문가야.
새로고침(F5)을 누르지 않아도 다른 사람이 쓴 글이 실시간으로 쏙 나타나는 '실시간 방명록 웹앱'을 만들어줘.

[조건]
1. Firebase v9+ Firestore의 onSnapshot(실시간 리스너)을 사용할 것
2. UI/UX:
   - 모바일에서도 카카오톡처럼 친근한 말풍선 또는 카드 피드 디자인
   - 작성자 닉네임, 메시지 입력 폼, [메시지 남기기] 버튼
   - 작성 시각(몇 분 전, 방금 전) 표시
3. 파이어베이스 설정 안내:
   - Firebase 콘솔(console.firebase.google.com)에서 무료 프로젝트 만들고
   - Firestore 데이터베이스 '테스트 모드(test mode)'로 시작하는 방법
   - 발급받은 firebaseConfig 객체를 내 코드 어디에 넣어야 하는지 주석으로 꼼꼼히 표시해줘.`,
    tags: ['파이어베이스', '실시간새로고침없음', '번개속도']
  },
  {
    id: 'proj-gemini',
    title: '프로젝트 C: Gemini AI 결합 감성 일기 & 응원 웹앱',
    category: 'Gemini AI 연동',
    summary: '오늘 하루 일기를 적으면 Gemini 인공지능이 따뜻한 공감과 맞춤 조언을 건네는 힐링 웹앱',
    prompt: `Google AI Studio의 Gemini API를 연동한 '따뜻한 하루 일기 & AI 응원 웹앱'을 만들어줘.

[핵심 기능]
1. 오늘 있었던 일과 내 감정(기쁨, 지침, 설렘, 불안 중 선택)을 적고 [AI 비서에게 일기 보여주기] 버튼을 누름
2. Google Gemini API(@google/genai 또는 REST API)를 호출하여:
   - 사용자의 감정을 다정하게 위로하고
   - 내일을 위한 긍정적인 행동 1가지를 제안하는 따뜻한 답장을 받음
3. 중요 보안 요구사항:
   - API 키를 코드에 직접 적지 않고, Vercel 배포 시 환경 변수(process.env.GEMINI_API_KEY 또는 VITE_GEMINI_API_KEY)로 읽어오도록 안전하게 구성해줘.
   - 로컬 테스트용 .env.example 파일 예시도 함께 적어줘.`,
    tags: ['Gemini', '감성일기', 'API키보안']
  }
];

export const VERCEL_STEPS = [
  {
    step: 1,
    title: 'GitHub 가입 및 내 코드 올리기',
    subtitle: '내 작업물 보관함에 안전하게 백업하기',
    badge: '1단계',
    analogy: '내가 그린 그림을 클라우드 개인 사물함에 보관하기',
    checklist: [
      'github.com 접속 후 무료 회원가입',
      '[New repository] 클릭하여 새 저장소 만들기 (예: my-first-ai-app)',
      'Public(공개) 또는 Private(나만 보기) 선택',
      'AI에게 "내 코드를 GitHub에 올릴 거야. API 키가 노출되지 않도록 환경 변수(process.env)를 사용하는 코드로 바꿔줘" 요청하기',
      '컴퓨터의 소스 파일들을 [Upload files] 버튼으로 드래그하여 올리기 (.env 파일은 절대 올리지 말 것!)'
    ]
  },
  {
    step: 2,
    title: 'Vercel 가입 및 GitHub 연결',
    subtitle: '무료 인터넷 가게 1초 만에 오픈하기',
    badge: '2단계',
    analogy: '사물함에 든 그림을 전 세계 사람들이 구경할 수 있는 전시관에 걸기',
    checklist: [
      'vercel.com 접속 후 [Continue with GitHub] 버튼 클릭 (원클릭 자동 연동)',
      '로그인 완료 후 대시보드에서 [Add New...] 버튼 누르고 [Project] 선택',
      '방금 Step 1에서 만든 GitHub 저장소 이름 옆의 [Import] 버튼 클릭',
      'Framework Preset이 자동으로 감지되는 것 확인 (Vite, Next.js, Other 등)'
    ]
  },
  {
    step: 3,
    title: '[가장 중요!] Vercel에 비밀 열쇠(API 키) 숨겨두기',
    subtitle: 'Environment Variables(환경 변수) 안전 금고 설정',
    badge: '3단계 (보안)',
    analogy: '가게 문 앞에 비밀번호를 써붙이지 않고 주인 금고 안에만 넣어두기',
    checklist: [
      '배포 직전 Vercel 프로젝트 설정 화면에서 [Environment Variables] 메뉴 클릭하여 펼치기',
      'Key(이름) 칸에 코드에서 지정한 이름 입력 (예: GEMINI_API_KEY 또는 VITE_GEMINI_API_KEY)',
      'Value(값) 칸에 Google AI Studio에서 복사한 내 실제 API 키 붙여넣기',
      '[Add] 버튼 클릭하여 안전하게 금고에 등록된 것 확인'
    ]
  },
  {
    step: 4,
    title: '배포(Deploy) 누르고 친구들에게 링크 자랑하기',
    subtitle: '1분 만에 완성되는 나만의 실제 인터넷 주소',
    badge: '4단계',
    analogy: '가게 개업 테이프 컷팅하고 친구들에게 모바일 청첩장/초대장 보내기',
    checklist: [
      '화면 아래의 파란색 [Deploy] 버튼 클릭',
      '화면에서 폭죽 애니메이션이 터지며 약 30초~1분 뒤 배포 완료!',
      '완성된 나만의 도메인 주소(예: 내프로젝트.vercel.app) 클릭해서 정상 작동 확인',
      '카카오톡으로 친구들에게 주소를 보내 피드백 받기'
    ]
  }
];

export const THREE_COMMANDMENTS = [
  {
    number: '1계명',
    title: "한 번에 욕심내지 말고 '화면 -> 저장 -> 배포' 순서로 하나씩 해결하기",
    description: "초보자가 가장 많이 하는 실수는 첫 질문부터 '로그인도 되고 결제도 되고 AI도 답하고 디자인도 화려한 웹앱 만들어줘'라고 하는 것입니다. AI도 사람이 너무 많은 일을 한꺼번에 시키면 엉뚱한 코드를 뱉습니다.",
    action: "먼저 눈에 보이는 화면(버튼, 입력창)을 만들고 -> 그 다음 데이터 저장을 붙이고 -> 마지막에 Vercel로 배포하세요.",
    examplePrompt: "1단계: '신청서 입력 폼 화면 먼저 만들어줘. 저장 기능은 아직 안 붙여도 돼.'"
  },
  {
    number: '2계명',
    title: "빨간 에러가 나면 두려워하지 말고 에러 메시지를 통째로 복사해서 주기",
    description: "코딩을 하다 빨간 글씨(Error)가 뜨는 것은 실패가 아니라 '어디를 고쳐야 할지 컴퓨터가 친절하게 알려주는 보물 지도'입니다. 절대 당황해서 창을 끄지 마세요.",
    action: "브라우저 화면이나 F12 개발자 도구의 빨간색 영문 메시지를 드래그해서 그대로 AI에게 붙여넣으세요.",
    examplePrompt: "AI에게 보낼 말: '이런 에러가 떴어. 초보자도 이해할 수 있게 원인을 1문장으로 말해주고 고친 전체 코드를 줘: [에러 복사]'"
  },
  {
    number: '3계명',
    title: '프롬프트 끝에 항상 "초보자도 따라 할 수 있게 친절하게 설명해줘" 덧붙이기',
    description: "AI는 상대방의 수준을 모르면 현업 10년 차 개발자 기준으로 터미널 명령어(npm, git rebase, docker 등)를 쏟아내며 초보자를 멘붕에 빠뜨립니다.",
    action: "질문 맨 끝에 '코딩을 처음 해보는 중학생도 따라 할 수 있도록 어디에 무엇을 붙여넣어야 하는지 클릭 순서로 알려줘'라고 덧붙이세요.",
    examplePrompt: "마법 문구: '나는 코딩 초보자야. 전문 용어 쓰지 말고 파일 만드는 것부터 클릭 순서대로 번호 매겨서 알려줘.'"
  }
];

export const EMERGENCY_ERROR_PROMPTS = [
  {
    id: 'err-blank',
    title: '화면이 새하얗게만 나오고 아무것도 안 뜰 때',
    situation: '코드를 붙여넣었는데 브라우저에 빈 화면(White Screen)만 나타날 때',
    prompt: `웹페이지가 하얗게만 나오고 아무것도 표시되지 않아.
F12를 눌러 콘솔을 보니 아래 에러가 있어:
[여기에 F12 Console 에러 메시지 붙여넣기]

어디에서 오타가 났거나 파일 연결이 잘못되었는지 찾아서,
수정된 완전한 파일 코드를 다시 작성해줘.`
  },
  {
    id: 'err-cors',
    title: '구글 시트/API 연결 시 CORS 또는 권한 거부 에러',
    situation: '데이터를 보내거나 가져오려는데 빨간 글씨로 Network Error나 CORS 에러가 날 때',
    prompt: `구글 시트(또는 외부 API)로 데이터를 전송할 때 "CORS policy" 또는 "403 Forbidden" 에러가 발생해.
초보자 관점에서:
1. 구글 앱스 스크립트 배포 시 '웹 앱' 권한을 '모든 사용자(Anyone)'로 열어주는 방법
2. 자바스크립트 fetch 옵션(mode: 'no-cors' 등)에서 수정해야 할 점
을 알기 쉽게 3단계로 정리해서 고쳐줘.`
  },
  {
    id: 'err-env-undefined',
    title: 'Vercel에 배포했더니 API 키를 못 읽어서 undefined가 뜰 때',
    situation: '로컬에선 잘 되는데 Vercel 사이트에선 API 호출이 실패할 때',
    prompt: `내 웹앱을 Vercel에 배포했는데 API 키 값이 "undefined"로 나와서 AI 기능이 작동하지 않아.
- Vite 프로젝트라면 VITE_ 접두사가 필요한지
- Vercel의 Environment Variables에 등록한 이름과 코드의 변수명이 일치하는지
확인하고, 안전하게 API 키를 읽어오는 수정 코드를 작성해줘.`
  },
  {
    id: 'err-npm-build',
    title: 'Vercel 배포 도중 Command "npm run build" exited with 1 에러',
    situation: 'Deploy 버튼을 눌렀는데 빌드 로그에서 에러가 나며 배포가 실패할 때',
    prompt: `Vercel 배포 중 "npm run build exited with 1" 오류가 나며 배포가 실패했어.
Vercel 빌드 로그에 찍힌 에러 내용은 다음과 같아:
[여기에 빌드 로그 에러 내용 붙여넣기]

타입스크립트 타입 에러인지 패키지 누락인지 원인을 찾아서 고치는 방법을 알려줘.`
  },
  {
    id: 'err-gas-auth',
    title: '앱스 스크립트 실행 시 "확인되지 않은 앱" 경고창이 뜰 때',
    situation: '구글이 빨간 느낌표와 함께 위험하다고 겁을 줄 때',
    prompt: `구글 앱스 스크립트에서 [실행]을 눌렀더니 "Google에서 확인하지 않은 앱입니다"라는 무서운 경고 화면이 나타났어.
내가 직접 만든 스크립트인데, [고급]을 눌러서 [안전하지 않음으로 이동]을 클릭해 권한을 정상적으로 승인하는 방법을 초보자 눈높이에서 캡처 설명하듯 친절하게 알려줘.`
  }
];
