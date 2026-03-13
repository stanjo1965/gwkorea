/**
 * GW코리아 AI 상담사
 * - 다국어 지원 (한/영)
 * - 서비스 지식 기반 응답
 * - 다크모드 연동
 */

'use strict';

// =========================================
// 지식 기반 (Knowledge Base)
// =========================================
const GW_KB = {
  ko: {
    greeting: [
      '안녕하세요! 😊 GW코리아 AI 상담사입니다.\n태양광·ACT건축·전기절감에 관해 무엇이든 물어보세요.\n\n아래 주제를 선택하시거나 질문을 직접 입력해 주세요.',
    ],
    quickReplies: [
      { label: '☀️ 태양광 발전', key: 'solar' },
      { label: '🏗️ ACT 건축', key: 'act' },
      { label: '⚡ 전기요금 절감', key: 'genovation' },
      { label: '📋 무료 상담 신청', key: 'consult' },
      { label: '📞 연락처', key: 'contact' },
    ],
    solar: `☀️ **GW 태양광 발전 솔루션**

공장·창고 지붕을 수익 발전소로 만들어 드립니다!

📊 **수익 시뮬레이션 (1,000kW 기준)**
• 월 수익: 약 **2,000만원**
• 연 수익: 약 **2억 4,000만원**
• 투자 회수: **2.2년**
• 20년 누적 수익: 약 **64억 7,000만원**

🔧 **설치 유형 3가지**
• 자가소비형 — 전기요금 직접 절감
• PPA — 초기 투자 없는 수익 모델
• RPS — 신재생에너지 공급의무화 제도

✅ 누적 시공 실적: **704MW**

👉 무료 부지 분석·수익 설계를 받아보시겠습니까?`,

    solarQuick: [
      { label: '💰 수익 계산기', key: 'simulator' },
      { label: '📋 무료 상담', key: 'consult' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    act: `🏗️ **ACT System 건축**

건설신기술 631호 인증의 혁신 공법입니다.

💰 **기존 건축 대비 절감 효과**
• 공사비: **Steel 대비 22% 절감**
• 공기(공사기간): **30% 단축**
• 내진·내화 성능: 최고 등급

🔑 **핵심 특징**
• 역타공법 전문 — 지하·협소지 완벽 대응
• 공장·창고·물류센터 전문 시공
• 설계 → 시공 → 감리 원스톱 수행
• 태양광과 설계 첫날부터 통합 계획

✅ 건설신기술 631호 보유 기업

👉 설계 비용 분석을 무료로 받아보시겠습니까?`,

    actQuick: [
      { label: '📋 설계 상담 신청', key: 'consult' },
      { label: '📂 시공 사례 보기', key: 'portfolio' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    genovation: `⚡ **Genovation 전기절감 컨설팅**

전기요금 최대 33% 절감 — **100% 무료 컨설팅!**

📉 **검증된 절감 효과**
• 기본요금: 최대 **33% 절감**
• 사용요금: 최대 **30% 절감**
• 컨설팅 비용: **완전 무료**
• 초기 투자: **없음**, 즉시 적용

🔍 **어떻게 절감하나요?**
• 한전 약관 최적 계약종 재설정
• 사용 패턴 정밀 분석 및 재설계
• 역률·무효전력 개선
• 피크타임 관리 최적화

✅ 누적 절감 실적: **1,800개 기업 · 400억원**

👉 우리 회사 전기요금 진단을 무료로 받아보시겠습니까?`,

    genovationQuick: [
      { label: '🆓 무료 진단 신청', key: 'consult' },
      { label: '📂 절감 사례 보기', key: 'portfolio' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    consult: `📋 **무료 상담 신청**

전문 컨설턴트가 직접 연락드립니다!

👇 **지금 바로 신청하기**

✅ 태양광 수익 분석 (무료)
✅ 전기요금 절감 진단 (무료)
✅ ACT 건축 비용 설계 (무료)

📞 **즉시 연락 원하시면:**
Tel: **02-6914-6540**
Mobile: **010-5373-8724**
✉️ kygug09@naver.com

⏰ 운영시간: 평일 09:00~18:00`,

    consultQuick: [
      { label: '📝 상담 폼으로 이동', key: 'form' },
      { label: '📞 전화 연결', key: 'call' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    contact: `📞 **GW코리아 연락처**

🏢 **본사**
경기도 광명시 일직로 43
GIDC C동 2601호

🏢 **영업지사**
경기도 성남시 분당구 127번길 3-1, 2층

📞 Tel: **02-6914-6540**
📠 Fax: 02-6914-6541
📱 Mobile: **010-5373-8724**
✉️ kygug09@naver.com

⏰ 운영시간: 평일 09:00~18:00`,

    contactQuick: [
      { label: '📞 전화 연결', key: 'call' },
      { label: '✉️ 이메일 문의', key: 'email' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    portfolio: '포트폴리오 페이지로 안내해 드리겠습니다.\n👉 홈페이지 **시공사례** 섹션에서 태양광·ACT·전기절감 14개 사례를 확인하실 수 있습니다.',
    portfolioQuick: [
      { label: '📂 시공사례 보기', key: 'goto_portfolio' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    simulator: '수익 계산기로 안내해 드리겠습니다.\n👉 홈페이지 **수익 계산기** 섹션에서 부지 면적과 요금제를 입력하시면 예상 수익을 바로 확인하실 수 있습니다.',
    simulatorQuick: [
      { label: '🧮 계산기 바로가기', key: 'goto_sim' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    price: `💰 **비용 안내**

🌟 GW코리아의 모든 초기 상담은 **무료**입니다!

☀️ **태양광 설치 비용**
• kW당 약 80~120만원 (규모·지역 따라 상이)
• PPA 방식은 초기비용 **0원**
• 정부 지원 융자 활용 가능

🏗️ **ACT 건축**
• 기존 공법 대비 **22% 절감**
• 정확한 견적은 무료 설계 후 안내

⚡ **Genovation 전기절감**
• 컨설팅 비용: **완전 무료**
• 성과보수 방식 (절감 성과 발생 시만)

👉 정확한 견적은 무료 상담 신청 후 안내드립니다.`,

    priceQuick: [
      { label: '📋 무료 견적 신청', key: 'consult' },
      { label: '🔙 처음으로', key: 'back' },
    ],

    fallback: '죄송합니다, 정확한 답변을 드리기 어렵습니다. 😅\n\n전문 컨설턴트에게 직접 문의해 주세요:\n📞 **02-6914-6540**\n✉️ kygug09@naver.com\n\n아래 주제를 선택하시면 바로 안내해 드립니다.',
    fallbackQuick: [
      { label: '☀️ 태양광', key: 'solar' },
      { label: '🏗️ ACT 건축', key: 'act' },
      { label: '⚡ 전기절감', key: 'genovation' },
      { label: '📋 상담 신청', key: 'consult' },
    ],
  },

  en: {
    greeting: [
      'Hello! 😊 I\'m GW Korea\'s AI Consultant.\nAsk me anything about Solar Power, ACT Construction, or Energy Savings.\n\nSelect a topic below or type your question.',
    ],
    quickReplies: [
      { label: '☀️ Solar Power', key: 'solar' },
      { label: '🏗️ ACT Construction', key: 'act' },
      { label: '⚡ Energy Savings', key: 'genovation' },
      { label: '📋 Free Consultation', key: 'consult' },
      { label: '📞 Contact', key: 'contact' },
    ],
    solar: `☀️ **GW Solar Power Solutions**

Turn your factory or warehouse rooftop into a profitable power plant!

📊 **ROI Simulation (1,000kW System)**
• Monthly Revenue: ~**₩20M**
• Annual Revenue: ~**₩240M**
• Payback Period: **2.2 years**
• 20-Year Total Revenue: ~**₩6.47B**

🔧 **Three Installation Models**
• Self-Consumption — Direct electricity cost savings
• PPA — Zero upfront investment model
• RPS — Renewable Energy Portfolio Standard

✅ Cumulative Installations: **704MW**

👉 Would you like a free site analysis & profit plan?`,

    solarQuick: [
      { label: '💰 Profit Calculator', key: 'simulator' },
      { label: '📋 Free Consultation', key: 'consult' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    act: `🏗️ **ACT System Construction**

Certified New Construction Technology No. 631.

💰 **Cost Savings vs. Conventional Steel**
• Construction Cost: **22% Lower**
• Build Time: **30% Shorter**
• Seismic & Fire Resistance: Premium Grade

🔑 **Key Features**
• Top-down construction specialist — ideal for basement/tight sites
• Factory, warehouse & logistics center specialist
• Design → Construction → Supervision: One-stop service
• Solar integration from Day 1

✅ Holder of New Construction Technology No. 631

👉 Would you like a free cost design analysis?`,

    actQuick: [
      { label: '📋 Request Consultation', key: 'consult' },
      { label: '📂 View Portfolio', key: 'portfolio' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    genovation: `⚡ **Genovation Energy Savings Consulting**

Up to 33% electricity bill reduction — **100% Free Consulting!**

📉 **Proven Results**
• Base Charge: Up to **33% Reduction**
• Usage Charge: Up to **30% Reduction**
• Consulting Fee: **Completely Free**
• Initial Investment: **None** — Immediate savings

🔍 **How We Save You Money**
• Optimal KEPCO contract type selection
• Precise usage pattern analysis & redesign
• Power factor & reactive power improvement
• Peak-time management optimization

✅ Cumulative Results: **1,800+ companies · ₩40B saved**

👉 Would you like a free electricity bill diagnosis?`,

    genovationQuick: [
      { label: '🆓 Free Diagnosis', key: 'consult' },
      { label: '📂 View Cases', key: 'portfolio' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    consult: `📋 **Free Consultation**

Our specialist will contact you directly!

✅ Solar Profit Analysis (Free)
✅ Energy Savings Diagnosis (Free)
✅ ACT Construction Design (Free)

📞 **For immediate contact:**
Tel: **02-6914-6540**
Mobile: **010-5373-8724**
✉️ kygug09@naver.com

⏰ Hours: Mon–Fri 09:00–18:00`,

    consultQuick: [
      { label: '📝 Go to Contact Form', key: 'form' },
      { label: '📞 Call Now', key: 'call' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    contact: `📞 **GW Korea Contact**

🏢 **Head Office**
43 Iljik-ro, GIDC Building C, #2601
Gwangmyeong, Gyeonggi-do

🏢 **Sales Branch**
127beon-gil 3-1, Bundang-gu
Seongnam, Gyeonggi-do 2F

📞 Tel: **02-6914-6540**
📠 Fax: 02-6914-6541
📱 Mobile: **010-5373-8724**
✉️ kygug09@naver.com

⏰ Hours: Mon–Fri 09:00–18:00`,

    contactQuick: [
      { label: '📞 Call Now', key: 'call' },
      { label: '✉️ Email Us', key: 'email' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    portfolio: 'Let me guide you to our portfolio.\n👉 Check 14 project cases (Solar, ACT, Energy Savings) in the **Portfolio** section of our website.',
    portfolioQuick: [
      { label: '📂 View Portfolio', key: 'goto_portfolio' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    simulator: 'Let me guide you to the profit calculator.\n👉 Enter your site area and utility rate in the **Profit Calculator** section to get instant estimates.',
    simulatorQuick: [
      { label: '🧮 Open Calculator', key: 'goto_sim' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    price: `💰 **Pricing Guide**

🌟 All initial consultations at GW Korea are **completely free!**

☀️ **Solar Installation Cost**
• ~₩0.8M–1.2M per kW (varies by scale & region)
• PPA model: **Zero upfront cost**
• Government-backed financing available

🏗️ **ACT Construction**
• 22% lower than conventional methods
• Exact quote after free design review

⚡ **Genovation Energy Savings**
• Consulting: **Completely Free**
• Performance-based fee (only upon confirmed savings)

👉 Contact us for a precise free quote.`,

    priceQuick: [
      { label: '📋 Free Quote Request', key: 'consult' },
      { label: '🔙 Back to Start', key: 'back' },
    ],

    fallback: 'Sorry, I\'m not sure about that. 😅\n\nPlease contact our specialist directly:\n📞 **02-6914-6540**\n✉️ kygug09@naver.com\n\nOr select a topic below:',
    fallbackQuick: [
      { label: '☀️ Solar', key: 'solar' },
      { label: '🏗️ ACT', key: 'act' },
      { label: '⚡ Energy', key: 'genovation' },
      { label: '📋 Consult', key: 'consult' },
    ],
  },
};

// =========================================
// 인텐트 감지 (Intent Detection)
// =========================================
const INTENT_RULES = [
  {
    key: 'solar',
    ko: ['태양광', '태양', '솔라', 'solar', '발전', '패널', '지붕', 'ppa', 'rps', '재생', '704', 'mw', 'kw', '수익', '발전소'],
    en: ['solar', 'panel', 'rooftop', 'ppa', 'rps', 'power', '704', 'revenue', 'profit', 'renewable'],
  },
  {
    key: 'act',
    ko: ['act', '건축', '건설', '건물', '공사', '역타', '631', 'steel', '스틸', '공기', '내진', '공장', '창고', '물류'],
    en: ['act', 'construction', 'building', '631', 'steel', 'factory', 'warehouse', 'seismic'],
  },
  {
    key: 'genovation',
    ko: ['전기', '전기요금', '절감', '절약', 'genovation', '기본료', '사용요금', '한전', '약관', '1800', '400억', '피크'],
    en: ['electricity', 'energy', 'saving', 'genovation', 'kepco', 'bill', '1800', 'tariff'],
  },
  {
    key: 'price',
    ko: ['가격', '비용', '견적', '얼마', '금액', '돈', '투자', '예산', '평단가'],
    en: ['price', 'cost', 'quote', 'fee', 'budget', 'investment', 'how much'],
  },
  {
    key: 'consult',
    ko: ['상담', '신청', '문의', '무료', '연락', '상담사', '상담원', '전문가'],
    en: ['consult', 'inquiry', 'request', 'free', 'specialist', 'advisor'],
  },
  {
    key: 'contact',
    ko: ['연락처', '전화', '주소', '위치', '어디', '이메일', 'tel', 'fax', '메일'],
    en: ['contact', 'phone', 'address', 'location', 'email', 'tel', 'fax'],
  },
  {
    key: 'portfolio',
    ko: ['시공', '사례', '포트폴리오', '실적', '프로젝트', '설치 현장'],
    en: ['portfolio', 'project', 'case', 'installation', 'example'],
  },
];

function detectIntent(text, lang) {
  const lower = text.toLowerCase();
  const rules = INTENT_RULES;
  for (const rule of rules) {
    const keywords = lang === 'ko' ? rule.ko : rule.en;
    if (keywords.some(k => lower.includes(k.toLowerCase()))) {
      return rule.key;
    }
  }
  return null;
}

// =========================================
// 채팅 상태
// =========================================
const chatState = {
  isOpen: false,
  messages: [],
  typingTimer: null,
  history: [], // #63: 대화 이력
};

// #63: 대화 이력 저장/복원
function saveChatHistory() {
  try {
    const maxHistory = 50;
    const trimmed = chatState.history.slice(-maxHistory);
    localStorage.setItem('gw-chat-history', JSON.stringify(trimmed));
  } catch (e) { /* quota exceeded */ }
}

function loadChatHistory() {
  try {
    const saved = localStorage.getItem('gw-chat-history');
    if (saved) {
      chatState.history = JSON.parse(saved);
      return chatState.history;
    }
  } catch (e) { /* parse error */ }
  return [];
}


// =========================================
// 메시지 렌더링
// =========================================
function formatMessage(text) {
  // **bold**, 줄바꿈 처리
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function appendMessage(role, text, skipAnim) {
  const container = document.getElementById('gw-chat-messages');
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = `gw-chat-msg gw-chat-msg--${role}${skipAnim ? '' : ' gw-anim'}`;

  const bubble = document.createElement('div');
  bubble.className = 'gw-chat-bubble';
  bubble.innerHTML = formatMessage(text);
  wrap.appendChild(bubble);

  // #72: 봇 응답에 피드백 버튼 추가
  if (role === 'bot' && !skipAnim) {
    const feedback = document.createElement('div');
    feedback.className = 'gw-feedback';
    feedback.innerHTML = '<button class="gw-feedback-btn" data-vote="up" aria-label="도움이 됐어요">👍</button><button class="gw-feedback-btn" data-vote="down" aria-label="개선이 필요해요">👎</button>';
    feedback.querySelectorAll('.gw-feedback-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        feedback.querySelectorAll('.gw-feedback-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        // 피드백 기록
        console.info('[Chat Feedback]', btn.dataset.vote, text.substring(0, 50));
      });
    });
    wrap.appendChild(feedback);
  }

  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;

  // #63: 이력 저장
  chatState.history.push({ role, text, time: Date.now() });
  saveChatHistory();
}

function appendQuickReplies(replies) {
  const container = document.getElementById('gw-chat-messages');
  if (!container || !replies?.length) return;

  // 이전 quick reply 제거
  container.querySelectorAll('.gw-quick-replies').forEach(el => el.remove());

  const wrap = document.createElement('div');
  wrap.className = 'gw-quick-replies';

  replies.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'gw-quick-btn';
    btn.textContent = r.label;
    btn.dataset.key = r.key;
    btn.addEventListener('click', () => handleQuickReply(r.key, r.label));
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('gw-chat-messages');
  if (!container) return;
  removeTyping();
  const el = document.createElement('div');
  el.id = 'gw-typing';
  el.className = 'gw-chat-msg gw-chat-msg--bot';
  el.innerHTML = '<div class="gw-chat-bubble gw-typing-bubble"><span class="gw-dot"></span><span class="gw-dot"></span><span class="gw-dot"></span></div>';
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  document.getElementById('gw-typing')?.remove();
}

// =========================================
// 응답 로직
// =========================================
function getLang() {
  return document.documentElement.getAttribute('data-lang') || document.documentElement.lang || 'ko';
}

function getKB() {
  return GW_KB[getLang()] || GW_KB.ko;
}

function updatePlaceholder() {
  const input = document.getElementById('gw-chat-input');
  const nameEl = document.getElementById('gw-chat-name');
  const statusEl = document.getElementById('gw-chat-status');
  if (!input) return;
  const lang = getLang();
  if (lang === 'en') {
    input.placeholder = 'Type your message...';
    if (nameEl) nameEl.textContent = 'GW AI Consultant';
    if (statusEl) statusEl.textContent = '● Online';
  } else {
    input.placeholder = '메시지를 입력하세요...';
    if (nameEl) nameEl.textContent = 'GW AI 상담사';
    if (statusEl) statusEl.textContent = '● 온라인';
  }
}

function respond(key) {
  const kb = getKB();
  removeTyping();
  const contentKey = key;
  const quickKey = key + 'Quick';
  const text = kb[contentKey] || kb.fallback;
  const quick = kb[quickKey] || kb.fallbackQuick;
  appendMessage('bot', text);
  setTimeout(() => appendQuickReplies(quick), 100);
}

function handleQuickReply(key, label) {
  // 이전 quick reply 제거
  document.querySelectorAll('.gw-quick-replies').forEach(el => el.remove());

  switch (key) {
    case 'back':
      appendMessage('user', label);
      showTyping();
      setTimeout(() => {
        removeTyping();
        const kb = getKB();
        appendMessage('bot', kb.greeting[0]);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 500);
      break;

    case 'form':
      appendMessage('user', label);
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const kb = getKB();
        const msg = getLang() === 'ko'
          ? '📋 상담 신청 폼으로 이동했습니다. 양식을 작성해 주시면 빠르게 연락드리겠습니다!'
          : '📋 Scrolled to the contact form. Please fill it out and we\'ll get back to you quickly!';
        appendMessage('bot', msg);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 600);
      break;

    case 'call':
      appendMessage('user', label);
      window.location.href = 'tel:0269146540';
      setTimeout(() => {
        const kb = getKB();
        const msg = getLang() === 'ko'
          ? '📞 전화 연결 중입니다. 02-6914-6540\n평일 09:00~18:00 운영합니다.'
          : '📞 Connecting call to 02-6914-6540\nAvailable Mon–Fri 09:00–18:00';
        appendMessage('bot', msg);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 600);
      break;

    case 'email':
      appendMessage('user', label);
      window.location.href = 'mailto:kygug09@naver.com';
      setTimeout(() => {
        const kb = getKB();
        const msg = getLang() === 'ko'
          ? '✉️ 이메일: kygug09@naver.com\n문의 내용을 작성해 주시면 빠르게 답변드리겠습니다!'
          : '✉️ Email: kygug09@naver.com\nWe\'ll reply as soon as possible!';
        appendMessage('bot', msg);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 600);
      break;

    case 'goto_portfolio':
      appendMessage('user', label);
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const kb = getKB();
        const msg = getLang() === 'ko'
          ? '📂 시공사례 섹션으로 이동했습니다!'
          : '📂 Scrolled to Portfolio section!';
        appendMessage('bot', msg);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 600);
      break;

    case 'goto_sim':
      appendMessage('user', label);
      document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const kb = getKB();
        const msg = getLang() === 'ko'
          ? '🧮 수익 계산기 섹션으로 이동했습니다!'
          : '🧮 Scrolled to Profit Calculator!';
        appendMessage('bot', msg);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 100);
      }, 600);
      break;

    default:
      appendMessage('user', label);
      showTyping();
      setTimeout(() => respond(key), 700);
      break;
  }
}

function handleUserInput(text) {
  if (!text.trim()) return;
  const input = document.getElementById('gw-chat-input');
  if (input) input.value = '';
  document.querySelectorAll('.gw-quick-replies').forEach(el => el.remove());

  appendMessage('user', text.trim());
  showTyping();

  const intent = detectIntent(text, getLang());
  const delay = 600 + Math.random() * 400;

  setTimeout(() => {
    if (intent) {
      respond(intent);
    } else {
      removeTyping();
      const kb = getKB();
      appendMessage('bot', kb.fallback);

      // #65: 상담원 연결 버튼 추가
      const container = document.getElementById('gw-chat-messages');
      if (container) {
        const agentBtn = document.createElement('button');
        agentBtn.className = 'gw-connect-agent';
        agentBtn.innerHTML = '📞 ' + (getLang() === 'ko' ? '상담원 직접 연결' : 'Connect to Agent');
        agentBtn.addEventListener('click', () => {
          window.location.href = 'tel:0269146540';
        });
        container.appendChild(agentBtn);
      }

      setTimeout(() => appendQuickReplies(kb.fallbackQuick), 100);
    }
  }, delay);
}

// =========================================
// 채팅창 토글
// =========================================
function openChat() {
  const win = document.getElementById('gw-chat-window');
  const badge = document.getElementById('gw-chat-badge');
  const iconOpen = document.querySelector('.gw-chat-icon-open');
  const iconClose = document.querySelector('.gw-chat-icon-close');
  if (!win) return;

  chatState.isOpen = true;
  win.style.display = 'flex';
  if (badge) badge.style.display = 'none';
  if (iconOpen) iconOpen.style.display = 'none';
  if (iconClose) iconClose.style.display = '';

  const container = document.getElementById('gw-chat-messages');
  if (container && container.children.length === 0) {
    updatePlaceholder();

    // #63: 이전 대화 이력 복원
    const history = loadChatHistory();
    if (history.length > 0) {
      history.forEach(msg => {
        appendMessage(msg.role, msg.text, true); // skipAnim=true
      });
      const kb = getKB();
      const resumeMsg = getLang() === 'ko'
        ? '이전 대화를 불러왔습니다. 계속 질문해 주세요!'
        : 'Previous conversation loaded. Feel free to continue!';
      appendMessage('bot', resumeMsg);
      setTimeout(() => appendQuickReplies(kb.quickReplies), 300);
    } else {
      // 첫 오픈: 인사말 + #70 FAQ 자동 추천
      setTimeout(() => {
        const kb = getKB();
        appendMessage('bot', kb.greeting[0]);
        setTimeout(() => appendQuickReplies(kb.quickReplies), 300);
      }, 300);
    }
  }

  // #30: 포커스 트랩 - 챗봇 내부에 포커스 유지
  const chatWin = document.getElementById('gw-chat-window');
  if (chatWin) {
    chatWin.addEventListener('keydown', trapFocus);
  }

  setTimeout(() => {
    const inp = document.getElementById('gw-chat-input');
    inp?.focus();
  }, 400);
}

// #30: 포커스 트랩 함수
function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const chatWin = document.getElementById('gw-chat-window');
  if (!chatWin) return;
  const focusable = chatWin.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

function closeChat() {
  const win = document.getElementById('gw-chat-window');
  const iconOpen = document.querySelector('.gw-chat-icon-open');
  const iconClose = document.querySelector('.gw-chat-icon-close');
  if (!win) return;
  chatState.isOpen = false;
  win.style.display = 'none';
  if (iconOpen) iconOpen.style.display = '';
  if (iconClose) iconClose.style.display = 'none';

  // #30: 포커스 트랩 해제
  win.removeEventListener('keydown', trapFocus);

  // 챗봇 토글 버튼으로 포커스 복귀
  document.getElementById('gw-chat-toggle')?.focus();
}

// =========================================
// 초기화
// =========================================
function initChat() {
  document.getElementById('gw-chat-toggle')?.addEventListener('click', () => {
    chatState.isOpen ? closeChat() : openChat();
  });
  document.getElementById('gw-chat-close')?.addEventListener('click', closeChat);

  document.getElementById('gw-chat-send')?.addEventListener('click', () => {
    const inp = document.getElementById('gw-chat-input');
    if (inp) handleUserInput(inp.value);
  });

  document.getElementById('gw-chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const inp = document.getElementById('gw-chat-input');
      if (inp) handleUserInput(inp.value);
    }
  });

  // 언어 변경 시 placeholder 업데이트
  const observer = new MutationObserver(() => updatePlaceholder());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-lang'] });

  // ESC로 챗봇 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatState.isOpen) {
      closeChat();
    }
  });

  // 뱃지 노출 (3초 후)
  setTimeout(() => {
    if (!chatState.isOpen) {
      const badge = document.getElementById('gw-chat-badge');
      if (badge) badge.style.display = '';
    }
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat);
} else {
  initChat();
}
