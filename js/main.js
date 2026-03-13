/**
 * GW코리아 홈페이지 - 메인 JavaScript
 * Golden Principles 준수: 작은 함수, 경계 검증, 불변성
 */

'use strict';

// =========================================
// 다국어 (한/영) 번역 사전
// =========================================
const I18N = {
  ko: {
    /* 네비 */
    'nav.about':     '회사소개',
    'nav.brand':     'GW×ACT',
    'nav.services':  '서비스',
    'nav.portfolio': '시공사례',
    'nav.sim':       '수익계산',
    'nav.contact':   '무료 상담 신청',
    'nav.lang':      'EN',
    /* 히어로 슬라이드 1 */
    'hero.badge':    'GW × ACT · 건축과 에너지의 유기적 결합',
    'hero.title':    '건물,<br>스스로 <span>에너지가</span><br>되다',
    'hero.desc':     '설계 첫날부터 태양광이 건물의 일부입니다 — 1,000kW 기준 월 수익 2,000만원 · 투자회수 2.2년',
    'hero.cta1':     '✦ GW × ACT 이야기',
    'hero.cta2':     '📞 무료 상담',
    /* 히어로 통계 바 */
    'stat.mw':       '704MW',
    'stat.mw.label': '태양광 누적 설치',
    'stat.co':       '1,800개사',
    'stat.co.label': '전기절감 계약',
    'stat.site':     '400+',
    'stat.site.label':'ACT 시공 현장',
    'stat.pay':      '2.2년',
    'stat.pay.label': '평균 투자회수',
    /* 브랜드 스토리 */
    'label.brand':   'GW × ACT STORY',
    'title.brand':   '<span>건축과 에너지,</span><br>원래 하나입니다',
    'desc.brand':    '"태양광은 건물 다 짓고 나서 얹는 것"이라는 편견을 깨뜨립니다.<br>GW의 에너지 설계와 ACT의 구조 기술이 설계 첫날부터 하나로 움직입니다.',
    /* 서비스 섹션 */
    'label.services':'SERVICES',
    'title.services':'GW코리아 <span>3대 핵심 서비스</span>',
    'desc.services': '건축·태양광·전기절감을 하나로 — 설계부터 완공, 사후 관리까지 GW코리아가 책임집니다.',
    /* 서비스 카드 */
    'svc.act.title':  'ACT System 건축',
    'svc.act.sub':    'Advanced Construction Technology · 건설신기술 631호',
    'svc.act.desc':   'Steel 구조 대비 공사비 20% 절감, 강관 내 콘크리트 충전 합성 구조.',
    'svc.act.f1':     'Steel 구조 대비 공사비 <strong>20% 이상 절감</strong>',
    'svc.act.f2':     '기둥 면적 <strong>40% 이상 감소</strong> → 사용 면적 증가',
    'svc.act.f3':     '층고 절감 H형강 대비 <strong>20% 이상</strong>',
    'svc.act.f4':     '내화 인증 · 국토해양부 신기술 인증',
    'svc.act.link':   'ACT 상세보기 →',
    'svc.solar.title':'태양광 발전 시스템',
    'svc.solar.sub':  '자가소비형 · 임대형(PPA) · RPS · 누적 704MW',
    'svc.solar.desc': '설계 단계부터 태양광을 건물과 일체화. 지붕 하자 없이 발전 효율을 극대화합니다.',
    'svc.solar.f1':   '1,000kW 기준 월 수익 <strong>2,000만원</strong>',
    'svc.solar.f2':   '투자 회수 <strong>약 2.2년</strong>',
    'svc.solar.f3':   '20년 누적 수익 <strong>최대 65억원</strong>',
    'svc.solar.f4':   'RE100 · 탄소중립 인증 지원',
    'svc.solar.link': '태양광 상세보기 →',
    'svc.geno.title': 'Genovation 전기절감',
    'svc.geno.sub':   '한전 약관 분석 · 무료 진단 · 성공 보수 방식',
    'svc.geno.desc':  '2015년부터 1,800개 기업의 전기요금을 절감. 진단·공사 무료, 절감 확인 후 수수료.',
    'svc.geno.f1':    '기본료 최대 <strong>33.3% 절감</strong>',
    'svc.geno.f2':    '사용요금 최대 <strong>30.7% 절감</strong>',
    'svc.geno.f3':    '진단·공사 <strong>완전 무료</strong>',
    'svc.geno.f4':    '절감 없으면 비용 없음',
    'svc.geno.link':  '전기절감 상세보기 →',
    /* 임팩트 카운터 단위 */
    'bs.imp.u2':'톤', 'bs.imp.u3':'그루', 'bs.imp.u4':'개사',
    /* ACT 비교 카드 */
    'mc.pc.tag':'PC 구조',
    'mc.pc.1':'대형·중량 부재 → 양중 부하 증가', 'mc.pc.2':'내진 구조 구현 어려움',
    'mc.pc.3':'접합부 강성 확보 어려움', 'mc.pc.4':'공사비 비율 <strong>약 82%</strong>',
    'mc.st.tag':'Steel 구조',
    'mc.st.1':'강축·약축 → 양중 시 휨 발생', 'mc.st.2':'좌굴에 취약 → 보강 부재 필요',
    'mc.st.3':'내화 마감 필요 (추가 비용)', 'mc.st.4':'공사비 비율 <strong>100% (기준)</strong>',
    'mc.act.1':'폐합 박스형 단면 → 비틀림·처짐 저항 우수', 'mc.act.2':'강재+콘크리트 합성 → 부재 단면 축소',
    'mc.act.3':'내화 인증 획득 · 별도 마감 불필요', 'mc.act.4':'공사비 비율 <strong>약 78% (22% 절감)</strong>',
    /* ACT 핵심 기술 */
    'tech.1.badge':'핵심기술 01', 'tech.1.h3':'ACT Column <em>충전형 합성기둥</em>',
    'tech.1.p':'열연강판을 냉간절곡·성형한 4개 단위부재를 용접조립 후 강관 내부에 고강도 콘크리트를 충전한 신형상 CFT 기둥입니다.',
    'tech.1.l1':'기둥 면적 <strong>40% 이상 감소</strong> → 건물 사용 면적 증가',
    'tech.1.l2':'H형강 대비 설치 중량 <strong>80% 이상 감소</strong>',
    'tech.1.l3':'약축이 없는 각형 단면 → 좌굴 안정성 우수',
    'tech.1.l4':'수직·수평 다이어프램 방식 선택 적용',
    'tech.2.badge':'핵심기술 02', 'tech.2.h3':'AU Girder <em>강합성보</em>',
    'tech.2.p':'역U형+U형 성형강판으로 된 박스형 보로, 보 일부가 슬래브 속으로 들어가는 세미슬림플로어 형성. 휨강도·강성이 뛰어납니다.',
    'tech.2.l1':'H형강 대비 층고 <strong>20% 이상 절감</strong>',
    'tech.2.l2':'폐쇄형 단면 → 처짐량 대폭 감소 (무동바리 작업)',
    'tech.2.l3':'A-CAP이 안전발판 역할 → 시공성·안전성 향상',
    'tech.2.l4':'Deep deck 적용 시 Sub-beam 제거 가능',
    /* 효과 배너 */
    'eff.1':'Steel 대비 공사비', 'eff.2':'기둥 단면적 감소', 'eff.3':'층고 절감 (유효고 증가)', 'eff.4':'국내 시공 현장',
    /* ACT 시공 단계 */
    'act.s1':'<span>STEP 01</span>ACT 기둥 설치', 'act.s2':'<span>STEP 02</span>AU 보 설치', 'act.s3':'<span>STEP 03</span>데크플레이트 · 철근 배근', 'act.s4':'<span>STEP 04</span>콘크리트 동시 타설',
    /* 태양광 사업 방식 카드 */
    'biz.self.h':'자가소비형', 'biz.self.p':'생산한 전기를 직접 사용해 전기료를 절감. 정부 지원금 570만원/kW 수령 가능.',
    'biz.self.key':'적용 단가 150원/kWh · 지원금 570,000원/kW',
    'biz.ppa.badge':'💰 가장 높은 수익', 'biz.ppa.h':'PPA (전력판매계약)',
    'biz.ppa.p':'한전 대신 제3자에게 전력을 직접 판매. RE100·탄소중립 인증 지원.',
    'biz.ppa.key':'거래 단가 149원/kWh · RE100 인증',
    'biz.rps.h':'RPS (의무공급)', 'biz.rps.p':'발전사업자로 등록 후 SMP+REC 수익. 장기 안정적 수익 구조.',
    'biz.rps.key':'SMP 기준 120원/kWh · 장기 계약',
    /* 태양광 케이스 스터디 */
    'sol.case.label':'Case Study · 케이디에프 태양광발전소',
    'sol.case.h3':'충남 보령 2,239kW<br><span>월 수익 2,000만원 · 투자회수 2.2년</span>',
    'sol.case.note':'※ 자솔라 710Wp 모듈 적용 · 건물지원 자가소비형 · 1,100,000원/kW 설치 단가 기준',
    'sol.e1':'발전 용량', 'sol.e2':'모듈 수량', 'sol.e3':'설치 면적', 'sol.e4':'월간 발전량',
    'sol.e5':'월간 수익', 'sol.e6':'연간 수익', 'sol.e7':'투자 회수', 'sol.e8':'20년 누적',
    /* 솔라루프 특징 */
    'srf.1.h':'볼트 완전 무노출', 'srf.1.p':'기존 방식과 달리 체결 볼트가 외부로 전혀 노출되지 않아 완벽한 방수 및 미관을 동시에 확보합니다.',
    'srf.2.h':'지붕 하자 Zero', 'srf.2.p':'설계 단계부터 건물 구조와 일체화 시공. 후설치 방식의 지붕 손상 문제를 원천 차단합니다.',
    'srf.3.h':'20년 품질 보증', 'srf.3.p':'자재부터 시공까지 GW코리아가 책임. 20년간 발전 효율 보증 및 A/S 지원을 제공합니다.',
    'srf.4.h':'RE100 · 탄소중립 인증', 'srf.4.p':'PPA 방식 적용 시 RE100 달성 인증 지원. ESG 경영 강화 및 글로벌 납품 요건 충족.',
    /* Geno 케이스 스터디 */
    'gen.case.label':'Case Study · (주)셀바이오',
    'gen.case.h3':'연간 절감 <span>최대 5,844만원</span><br>20년 누적 6.8억 절감',
    'gen.case.note':'※ 절감금액은 예상치이며 실사 후 확정. 사용량에 따라 증감될 수 있습니다.',
    'gen.e1':'기존 월 전기요금', 'gen.e2':'월 절감 금액', 'gen.e3':'연간 최소 절감', 'gen.e4':'연간 최대 절감',
    'gen.e5':'20년 누적 절감', 'gen.e6':'투자비 회수', 'gen.e7':'컨설팅 비용', 'gen.e8':'공사 비용',
    /* 슬라이드 2~5 */
    's2.badge':'누적 실적 704MW', 's2.title':'공장 지붕이<br><span>발전소</span>가<br>됩니다', 's2.desc':'옥상 태양광 설치로 전기료 절감 + 발전 수익을 동시에', 's2.cta1':'🏭 시공사례 보기', 's2.cta2':'📋 제안서 요청',
    's3.badge':'솔라루프 패널 · 특화 시공', 's3.title':'볼트 한 개도<br>노출되지 않는<br><span>완벽한 시공</span>', 's3.desc':'설계 단계부터 일체화 · 지붕 하자 Zero · 20년 보증', 's3.cta1':'☀️ 서비스 상세보기', 's3.cta2':'📞 무료 상담',
    's4.badge':'ACT System · 건설신기술 631호', 's4.title':'건축부터<br><span>태양광까지</span><br>한 번에', 's4.desc':'Steel 구조 대비 공사비 20% 절감 · 400개+ 현장 적용', 's4.cta1':'🏗️ ACT 시스템 보기', 's4.cta2':'📞 무료 상담',
    's5.badge':'Genovation · 전기절감 컨설팅', 's5.title':'전기요금<br><span>최대 33%</span><br>절감 보장', 's5.desc':'1,800개 기업 달성 · 무료 진단 · 성공 보수 방식', 's5.cta1':'⚡ Genovation 보기', 's5.cta2':'📋 무료 진단 신청',
    /* 히어로 통계 바 em 라벨 */
    'stat.em1':'태양광 누적 실적', 'stat.em2':'전기절감 계약', 'stat.em3':'ACT 시공 현장', 'stat.em4':'평균 투자 회수',
    /* 브랜드 스토리 WHY 카드 */
    'bs.w1.h':'기존 방식의 문제', 'bs.w1.p':'건물 완공 후 태양광을 \'추가 설치\'하면 지붕 방수 훼손, 구조 보강 비용, 이중 공사비가 발생합니다. 미관도 무너집니다.', 'bs.w1.tag':'기존 방식 — 건축 따로 · 태양광 따로',
    'bs.w2.h':'GW × ACT의 해법', 'bs.w2.p':'설계 첫 단계부터 ACT 구조와 GW 솔라루프를 통합 설계합니다. 볼트 한 개도 노출되지 않는 일체형 시공으로 건물과 에너지가 동시에 완성됩니다.', 'bs.w2.tag':'GW × ACT — 설계부터 하나',
    'bs.w3.h':'고객이 얻는 것', 'bs.w3.p':'공사비 22% 절감 + 지붕 하자 Zero + 월 발전 수익 + 전기요금 33% 절감 + RE100 인증. 건물이 스스로 돈을 벌어오는 자산이 됩니다.', 'bs.w3.tag':'결과 — 스스로 에너지가 되는 건물',
    /* 브랜드 가치 패널 */
    'bs.v1.h':'Technology · ACT 구조 기술', 'bs.v1.p':'건설신기술 631호 충전형 합성구조 — Steel 대비 22% 절감, 기둥 단면 40% 감소, 층고 20% 확보',
    'bs.v2.h':'Energy · GW 솔라루프', 'bs.v2.p':'볼트 완전 무노출 방수 일체형 시공 — 누적 704MW, 20년 보증, RE100·탄소중립 인증 지원',
    'bs.v3.h':'Savings · Genovation', 'bs.v3.p':'한전 약관 분석 무료 절감 컨설팅 — 1,800개사 달성, 기본료 33%·사용요금 30% 절감, 투자비 0원',
    /* 임팩트 카운터 */
    'bs.imp.title':'🌿 GW × ACT가 만들어낸 환경 임팩트',
    'bs.imp.l1':'태양광 누적 설치 용량', 'bs.imp.l2':'연간 CO₂ 저감 추정', 'bs.imp.l3':'소나무 환산 (30년 기준)', 'bs.imp.l4':'전기절감 계약 기업',
    /* 서비스 상세 — ACT */
    'det.act.label':'건설신기술 631호 · 국내 400개+ 현장',
    'det.act.title':'ACT System <span>건축공법</span>',
    'det.act.desc':'강관 내부에 고강도 콘크리트를 충전한 강합성구조 — Steel 구조 대비 공사비 20% 절감, PC 구조 대비 기둥 중량 80% 감소',
    'det.act.sub1':'시공 4단계 프로세스', 'det.act.sub2':'실제 시공 현장',
    /* 서비스 상세 — 태양광 */
    'det.sol.label':'누적 704MW · 자가형 · PPA · RPS',
    'det.sol.title':'태양광 발전 <span>시스템</span>',
    'det.sol.desc':'설계 단계부터 건물과 일체화된 솔라루프 시공 — 지붕 하자 ZERO, 1,000kW 기준 월 수익 2,000만원, 투자 회수 2.2년',
    'det.sol.sub1':'솔라루프 <em>혁신 공법</em>', 'det.sol.sub2':'주요 시공 현장',
    /* 서비스 상세 — Genovation */
    'det.gen.label':'Since 2015 · 누적 계약 1,800개사 · 400억 절감 달성',
    'det.gen.title':'Genovation <span>전기절감 컨설팅</span>',
    'det.gen.desc':'한전 약관 분석으로 기본료 최대 33%, 사용요금 최대 30% 절감 — 진단·공사 무료, 절감 확인 후 수수료',
    'det.gen.sub1':'8단계 컨설팅 프로세스', 'det.gen.sub2':'현장 진단 · 컨설팅',
    /* Genovation 방법 카드 */
    'gen.m1.h':'기본료 최대 33.3% 절감',
    'gen.m1.p':'한전 약관에 의한 전기사용패턴 분석으로 최적 계약 종별·용량을 재설정. 매월 고정으로 나가는 기본료를 대폭 낮춥니다.',
    'gen.m1.tag':'최대 절감률 33.3%',
    'gen.m2.h':'사용요금 최대 30.7% 절감',
    'gen.m2.p':'사회복지시설·장애인복지법·중소기업지원법 등 한전 각종 감면 혜택을 발굴·적용. 기업이 놓치고 있는 혜택을 되찾아드립니다.',
    'gen.m2.tag':'최대 절감률 30.7%',
    'gen.m3.h':'완전 무료 · 성공 보수',
    'gen.m3.p':'컨설팅 비용 전액 무료, 공사비 전액 지노베이션 부담. 절감 금액이 확인된 후 절감액의 50%를 60개월(5년) 동안 수수료로 지불.',
    'gen.m3.tag':'절감 없으면 비용 없음',
    /* Genovation 8단계 */
    'cp.1':'고객사 최초 미팅', 'cp.2':'컨설팅 설문지 작성', 'cp.3':'1차 제안 미팅', 'cp.4':'컨설팅 약정 체결',
    'cp.5':'기술팀 현장 실사', 'cp.6':'최종 절감 방안 제시', 'cp.7':'한전 서류 접수', 'cp.8':'한전 실사 · 최종 승인',
    /* 프로세스 5단계 */
    'ps.1.t':'무료 상담', 'ps.1.d':'현장 특성 파악<br>최적 솔루션 제안',
    'ps.2.t':'현장 진단', 'ps.2.d':'전기 사용 패턴<br>구조 현황 분석',
    'ps.3.t':'맞춤 제안서', 'ps.3.d':'수익 시뮬레이션<br>ROI 분석 제공',
    'ps.4.t':'시공 진행', 'ps.4.d':'건축·태양광<br>전기 통합 시공',
    'ps.5.t':'사후 관리', 'ps.5.d':'발전량 모니터링<br>지속 절감 관리',
    /* 비교 섹션 */
    'label.compare':  'WHY GW',
    'title.compare':  '일반 건물 vs <span>GW 통합 솔루션</span>',
    /* 포트폴리오 */
    'label.portfolio':'PORTFOLIO',
    'title.portfolio':'주요 <span>시공 사례</span>',
    'desc.portfolio': '전국 각지에서 GW코리아와 함께 에너지 비용을 절감한 고객사의 실제 시공 사례입니다.',
    'filter.all':     '전체',
    'filter.solar':   '태양광',
    'filter.act':     'ACT건축',
    'filter.geno':    '전기절감',
    /* 수익 시뮬레이터 */
    'label.sim':      'REVENUE SIMULATOR',
    'title.sim':      '내 공장·건물 <span>예상 수익</span> 계산',
    'desc.sim':       '간단한 입력으로 태양광 수익과 전기절감액을 즉시 확인하세요.',
    'sim.input.title':'📊 설치 조건 입력',
    'sim.result.title':'💰 예상 수익 결과',
    'sim.capacity':   '설치 용량 (kW)',
    'sim.usage':      '월 전기 사용량 (kWh)',
    'sim.biztype':    '사업 방식',
    'sim.biz.self':   '자가소비형 (절전)',
    'sim.biz.ppa':    'PPA (직거래)',
    'sim.biz.rps':    'RPS (의무공급)',
    'sim.btn':        '📈 수익 계산하기',
    'sim.monthly':    '월간 예상 수익',
    'sim.yearly':     '연간 예상 수익',
    'sim.payback':    '투자회수 기간',
    'sim.geno':       '에너지 절감 추가 효과',
    'sim.total20':    '20년 누적 수익',
    'sim.note':       '※ 일평균 발전시간 3.5시간, 전기단가 150원/kWh 기준 추정치입니다.',
    /* 프로세스 */
    'label.process':  'OUR PROCESS',
    'title.process':  'GW코리아와 함께하는 <span>5단계</span>',
    /* 고객 후기 */
    'label.testi':    'CLIENT REVIEWS',
    'title.testi':    '실제 고객이 <span>경험한 변화</span>',
    'desc.testi':     '"이 팀이 아니면 안 된다"는 확신 — 계약 고객사들의 실제 목소리입니다.',
    /* 문의 폼 */
    'label.contact':  'FREE CONSULTATION',
    'title.contact':  '지금 무료<br>상담 신청',
    'desc.contact':   '전문가가 현장을 방문하여 맞춤형 수익 분석을 직접 제공합니다. 상담은 완전 무료입니다.',
    'form.title':     '📋 무료 상담 신청',
    'form.name':      '성함 *',
    'form.phone':     '연락처 *',
    'form.company':   '회사명',
    'form.service':   '관심 서비스 *',
    'form.location':  '부지 위치',
    'form.bldtype':   '건물 유형',
    'form.area':      '지붕(부지) 면적',
    'form.bill':      '월 전기요금',
    'form.message':   '문의 내용',
    'form.submit':    '🚀 무료 상담 신청하기',
    /* 공통 버튼 */
    'btn.consult':    '무료 상담 신청',
    'btn.more':       '자세히 보기',
    'btn.portfolio':  '🏭 시공사례 보기',
    'btn.proposal':   '📋 제안서 요청',
    /* 푸터 */
    'footer.svc':     '서비스',
    'footer.co':      '회사',
    'footer.support': '고객지원',
    'footer.copy':    '© 2025 (주)지더블유 GW CO.,LTD. All rights reserved.',
    /* 비교표 */
    'cmp.h1': '구분', 'cmp.h2': '일반 건물', 'cmp.h3': 'GW 통합 솔루션',
    'cmp.r1.l': '에너지 공급', 'cmp.r1.b': '100% 한전 구매 (매년 인상)', 'cmp.r1.g': '태양광 자가발전 + 최소 구매',
    'cmp.r2.l': '전기요금 관리', 'cmp.r2.b': '관리 부재 (낭비 발생)', 'cmp.r2.g': 'Genovation 실시간 최적화 (추가 30% 절감)',
    'cmp.r3.l': '태양광 시공', 'cmp.r3.b': '후설치 → 지붕 하자, 이중 공사비', 'cmp.r3.g': '설계 단계부터 일체형 시공',
    'cmp.r4.l': '월 고정 비용', 'cmp.r4.b': '100% 지출 (소멸성)', 'cmp.r4.g': '발전 수익 + 절감액 (자산 가치 상승)',
    'cmp.r5.l': '건축 공사비', 'cmp.r5.b': 'Steel 구조 기준 100%', 'cmp.r5.g': 'ACT System 약 78% (22% 절감)',
    'cmp.r6.l': 'RE100 대응', 'cmp.r6.b': '<span class="icon-x">✗</span> 대응 어려움', 'cmp.r6.g': '<span class="icon-check">✓</span> 재생에너지 구매 인증 지원',
    'cmp.r7.l': '관리 창구', 'cmp.r7.b': '건축·태양광·전기 각각 개별 관리', 'cmp.r7.g': 'GW코리아 원스톱 통합 관리',
    /* 고객 후기 */
    'testi.1.txt': '"건물 설계 단계부터 태양광을 함께 고려한다는 발상 자체가 달랐습니다. 완공 후 지붕 하자나 방수 문제가 전혀 없고, 매달 발전 수익까지 들어오니 공장이 자산이 된 느낌입니다."',
    'testi.1.name': '경기 수원 · 제조업 공장주', 'testi.1.detail': '설치 용량 850kW · 월 수익 약 1,700만원',
    'testi.2.txt': '"전기요금이 매달 280만원씩 줄었습니다. 진단도 무료, 공사도 무료라서 처음엔 의심했는데 실제로 청구서를 받아보니 확연히 차이가 났습니다. 투자 없이 절감한다는 게 진짜였습니다."',
    'testi.2.name': '(주)셀바이오 · 바이오 제조', 'testi.2.detail': 'Genovation 컨설팅 · 연간 절감 최대 5,844만원',
    'testi.3.txt': '"타 업체는 \'후설치\'만 얘기했는데 GW는 신축 설계 단계부터 ACT 공법과 태양광을 묶어서 제안했습니다. 공사비도 Steel 대비 20% 이상 절감됐고, 결과물이 훨씬 깔끔합니다."',
    'testi.3.name': '충남 보령 · 물류창고 신축', 'testi.3.detail': 'ACT System + 태양광 2,239kW 통합 시공',
    'testi.4.txt': '"RE100 인증이 필요해서 알아보던 중 GW를 만났습니다. PPA 방식으로 추가 투자 없이 재생에너지 비율을 높일 수 있었고, ESG 보고서에도 명확하게 반영됐습니다."',
    'testi.4.name': '경기 남부 · 글로벌 납품 제조사', 'testi.4.detail': 'PPA 방식 · RE100 달성 · ESG 경영 강화',
    /* 파트너 */
    'partner.label': '함께한 기업들',
    /* 연락처 항목 */
    'ci.tel.label': '대표 전화', 'ci.mobile.label': '담당자 직통', 'ci.fax.label': '팩스',
    'ci.hq.label': '본사', 'ci.branch.label': '영업지사',
    'ci.hours.label': '운영시간', 'ci.hours.val': '평일 09:00 – 18:00',
    /* 푸터 */
    'footer.brand.p': '건축·태양광·Genovation으로 건물을 에너지 수익 자산으로 만들어 드립니다.',
    /* 케이스스터디 값 */
    'sol.v2': '3,110장', 'sol.v5': '2,000만원', 'sol.v6': '2억 4천만원', 'sol.v7': '2.2년', 'sol.v8': '64.7억원',
    'gen.v1': '1억 5,342만원', 'gen.v2': '285만원', 'gen.v3': '3,420만원', 'gen.v4': '5,844만원',
    'gen.v5': '684,101,071원', 'gen.v6': '0개월', 'gen.v7': '전액 무료',
    /* 포트폴리오 카드 */
    'pf.s1.tag': '태양광 · 자가형', 'pf.s1.title': '대형 공장 지붕 태양광 발전소', 'pf.s1.loc': '📍 수도권', 'pf.s1.note': '국가 인허가 완료 · 솔라루프 일체형 시공 · RE100 인증',
    'pf.s2.tag': '태양광 · 솔라루프', 'pf.s2.title': '솔라루프 설치 방식 비교 현장', 'pf.s2.loc': '📍 경기 남부', 'pf.s2.note': '볼트 무노출 완벽 방수 · 20년 보증 · 발전 효율 극대화',
    'pf.s3.tag': '태양광 · RPS', 'pf.s3.title': '케이디에프 태양광 발전소', 'pf.s3.loc': '📍 충남 보령', 'pf.s3.note': '모듈 3,110장 · 자솔라 710Wp · 투자회수 2.2년 · 20년 수익 64.7억',
    'pf.s4.tag': '태양광 · 지붕 리뉴얼', 'pf.s4.title': 'LSIS 공장 지붕 리뉴얼 2MW', 'pf.s4.loc': '📍 국내', 'pf.s4.note': '시공 전 → 자재 양중 → 솔라루프 설치 → 태양광 완공 6단계',
    'pf.s5.tag': '태양광 · 자가형', 'pf.s5.title': '한국세큐리트 자가소비형 제안', 'pf.s5.loc': '📍 제안 완료', 'pf.s5.note': 'RE100 · 탄소중립 대응 · 자가발전 전환 솔루션',
    'pf.s6.tag': '태양광 · 대규모', 'pf.s6.title': '대규모 태양광 발전 단지', 'pf.s6.loc': '📍 국내', 'pf.s6.note': '국가 예정 승인 완료 · 단지형 발전소 설계 최적화',
    'pf.s7.tag': '태양광 · 건축 일체형', 'pf.s7.title': '신축 공장 태양광 일체형 시공', 'pf.s7.loc': '📍 경기권', 'pf.s7.note': '착공 단계부터 태양광 설계 반영 · 구조 보강 불필요',
    'pf.a1.tag': 'ACT Down System', 'pf.a1.title': 'ACT Down System 역타공법', 'pf.a1.loc': '📍 도심지 건설현장', 'pf.a1.cap': '공기 단축 + 공사비 절감<span>역타 공사 전문</span>', 'pf.a1.note': 'H형강 대비 물량 1/3 · 역레이커 삭제 · 도심지 민원 최소화',
    'pf.a2.tag': 'ACT System · 물류창고', 'pf.a2.title': '대형 신축 물류창고', 'pf.a2.loc': '📍 경기·충청권', 'pf.a2.cap': '공사비 78%<span>Steel 대비 22% 절감</span>', 'pf.a2.note': 'ACT Column + AU Girder 풀 적용 · 내화 인증 · 층고 20% 절감',
    'pf.a3.tag': 'ACT System · 공장', 'pf.a3.title': '다층 산업시설 · 공장 건물', 'pf.a3.loc': '📍 전국', 'pf.a3.cap': '기둥 단면 40%↓<span>사용 면적 극대화</span>', 'pf.a3.note': '폐쇄형 박스 단면 · 비틀림·처짐 저항 우수 · 무동바리 시공',
    'pf.a4.tag': 'ACT System · 준공', 'pf.a4.title': '복합 산업시설 준공 현장', 'pf.a4.loc': '📍 전국 400개+', 'pf.a4.cap': '설치 중량 80%↓<span>PC 구조 대비</span>', 'pf.a4.note': '국토해양부 신기술 · 구조기술사회 인증 · 내화 인증 동시 보유',
    'pf.g1.tag': '전기절감 · 무료진단', 'pf.g1.title': '(주)셀바이오 전기요금 절감', 'pf.g1.loc': '📍 컨설팅 완료', 'pf.g1.cap': '연간 5,844만원<span>절감 달성</span>', 'pf.g1.note': '20년 누적 6.8억 절감 · 투자비 회수 0개월 · 무료 공사',
    'pf.g2.tag': '전기절감 · 약관 분석', 'pf.g2.title': '중소 제조업체 기본료 절감', 'pf.g2.loc': '📍 경남 김해권', 'pf.g2.cap': '기본료 33%↓<span>한전 약관 재계약</span>', 'pf.g2.note': '최적 계약 종별 재설정 · 사용 패턴 분석 · 절감 즉시 적용',
    'pf.g3.tag': '전기절감 · 누적 1,800개사', 'pf.g3.title': '누적 1,800개사 절감 달성', 'pf.g3.loc': '📍 전국', 'pf.g3.cap': '400억원<span>누적 절감 달성</span>', 'pf.g3.note': 'SK계열사 MOU · 경남매일신문 외 1,800개 기업 컨설팅 완료',
  },
  en: {
    /* 네비 */
    'nav.about':     'About',
    'nav.brand':     'GW×ACT',
    'nav.services':  'Services',
    'nav.portfolio': 'Projects',
    'nav.sim':       'ROI Calc',
    'nav.contact':   'Free Consult',
    'nav.lang':      '한국어',
    /* 히어로 슬라이드 1 */
    'hero.badge':    'GW × ACT · Architecture & Energy, Unified',
    'hero.title':    'Buildings That<br><span>Generate Energy</span><br>Themselves',
    'hero.desc':     'Solar is part of the building from day one — 1,000kW: ₩20M/mo · 2.2yr payback',
    'hero.cta1':     '✦ GW × ACT Story',
    'hero.cta2':     '📞 Free Consult',
    /* 히어로 통계 바 */
    'stat.mw':       '704MW',
    'stat.mw.label': 'Solar Installed',
    'stat.co':       '1,800+',
    'stat.co.label': 'Energy Contracts',
    'stat.site':     '400+',
    'stat.site.label':'ACT Sites',
    'stat.pay':      '2.2yr',
    'stat.pay.label': 'Avg. Payback',
    /* 브랜드 스토리 */
    'label.brand':   'GW × ACT STORY',
    'title.brand':   '<span>Architecture & Energy</span><br>Were Always One',
    'desc.brand':    'We break the myth that "solar comes after the building is done."<br>GW energy design and ACT structural tech work as one from day one.',
    /* 서비스 섹션 */
    'label.services':'SERVICES',
    'title.services':'GW Korea\'s <span>3 Core Services</span>',
    'desc.services': 'Construction · Solar · Energy Saving — GW Korea covers it all, from design to completion.',
    /* 서비스 카드 */
    'svc.act.title':  'ACT System Construction',
    'svc.act.sub':    'Advanced Construction Technology',
    'svc.act.desc':   '20% lower construction cost vs Steel, composite structure with concrete-filled steel tube.',
    'svc.act.f1':     'New Construction Tech #631',
    'svc.act.f2':     'Cost savings over 20%',
    'svc.act.f3':     'Integrated solar design',
    'svc.act.link':   'ACT Details →',
    'svc.solar.title':'Solar Power System',
    'svc.solar.sub':  'Solar Power Generation',
    'svc.solar.desc': 'Optimal revenue structure with Self-Use, PPA, or RPS models.',
    'svc.solar.f1':   '1,000kW: ₩20M/month revenue',
    'svc.solar.f2':   '2.2-year investment payback',
    'svc.solar.f3':   'SolarRoof — zero roof defects',
    'svc.solar.link': 'Solar Details →',
    'svc.geno.title': 'Genovation Energy Saving',
    'svc.geno.sub':   'Energy Cost Reduction',
    'svc.geno.desc':  'Reduce both base charge and usage fee through KEPCO tariff analysis.',
    'svc.geno.f1':    'Free diagnosis & installation',
    'svc.geno.f2':    'Up to 33% base charge reduction',
    'svc.geno.f3':    'Fee only after confirmed savings',
    'svc.geno.link':  'Genovation Details →',
    /* 슬라이드 2~5 */
    's2.badge':'704MW Installed', 's2.title':'Your Factory Roof<br>Becomes a <span>Power Plant</span>', 's2.desc':'Cut electricity costs + earn generation revenue at the same time', 's2.cta1':'🏭 View Projects', 's2.cta2':'📋 Request Proposal',
    's3.badge':'SolarRoof · Specialized Installation', 's3.title':'Not a Single Bolt<br>Exposed —<br><span>Perfect Finish</span>', 's3.desc':'Integrated from design · Zero roof defects · 20-year warranty', 's3.cta1':'☀️ Service Details', 's3.cta2':'📞 Free Consult',
    's4.badge':'ACT System · New Construction Tech #631', 's4.title':'Construction &<br><span>Solar Together</span>,<br>All at Once', 's4.desc':'20% lower cost vs Steel · 400+ sites completed', 's4.cta1':'🏗️ ACT System', 's4.cta2':'📞 Free Consult',
    's5.badge':'Genovation · Energy Cost Consulting', 's5.title':'Up to <span>33%</span><br>Electricity<br>Cost Reduction', 's5.desc':'1,800 companies · Free diagnosis · Success-fee model', 's5.cta1':'⚡ Genovation', 's5.cta2':'📋 Free Diagnosis',
    /* 히어로 통계 바 em 라벨 */
    'stat.em1':'Solar Installed', 'stat.em2':'Energy Contracts', 'stat.em3':'ACT Sites', 'stat.em4':'Avg. Payback',
    /* 브랜드 스토리 WHY 카드 */
    'bs.w1.h':'The Problem', 'bs.w1.p':'Adding solar after completion causes roof waterproofing damage, structural reinforcement costs, and double construction expenses. Aesthetics suffer too.', 'bs.w1.tag':'Old Way — Build First, Solar Later',
    'bs.w2.h':'GW × ACT Solution', 'bs.w2.p':'ACT structure and GW SolarRoof are integrated from the first design stage. Not a single bolt is exposed — building and energy are completed simultaneously.', 'bs.w2.tag':'GW × ACT — One from Day One',
    'bs.w3.h':'What Clients Gain', 'bs.w3.p':'22% construction savings + zero roof defects + monthly generation income + 33% electricity reduction + RE100 certification. The building earns money on its own.', 'bs.w3.tag':'Result — A Building That Generates Energy',
    /* 브랜드 가치 패널 */
    'bs.v1.h':'Technology · ACT Structure', 'bs.v1.p':'New Construction Tech #631 composite structure — 22% savings vs Steel, 40% smaller column cross-section, 20% more floor height',
    'bs.v2.h':'Energy · GW SolarRoof', 'bs.v2.p':'Fully concealed waterproof integrated installation — 704MW installed, 20-year warranty, RE100 & carbon neutral certification support',
    'bs.v3.h':'Savings · Genovation', 'bs.v3.p':'Free KEPCO tariff consulting — 1,800 companies, 33% base charge reduction, 30% usage fee reduction, zero investment required',
    /* 임팩트 카운터 */
    'bs.imp.title':'🌿 Environmental Impact Created by GW × ACT',
    'bs.imp.l1':'Solar Capacity Installed', 'bs.imp.l2':'Annual CO₂ Reduction', 'bs.imp.l3':'Equivalent Pine Trees (30yr)', 'bs.imp.l4':'Energy Saving Contracts',
    /* 서비스 상세 — ACT */
    'det.act.label':'New Construction Tech #631 · 400+ Sites Nationwide',
    'det.act.title':'ACT System <span>Construction Method</span>',
    'det.act.desc':'Composite structure with high-strength concrete-filled steel tubes — 20% lower cost vs Steel, 80% lighter columns vs PC structure',
    'det.act.sub1':'4-Stage Construction Process', 'det.act.sub2':'Actual Construction Sites',
    /* 서비스 상세 — 태양광 */
    'det.sol.label':'704MW Installed · Self-Use · PPA · RPS',
    'det.sol.title':'Solar Power <span>System</span>',
    'det.sol.desc':'SolarRoof integrated from design stage — Zero roof defects, 1,000kW: ₩20M/mo revenue, 2.2-year payback',
    'det.sol.sub1':'SolarRoof <em>Innovation</em>', 'det.sol.sub2':'Key Installation Sites',
    /* 서비스 상세 — Genovation */
    'det.gen.label':'Since 2015 · 1,800 Contracts · ₩40B Savings Achieved',
    'det.gen.title':'Genovation <span>Energy Consulting</span>',
    'det.gen.desc':'Up to 33% base charge & 30% usage fee reduction via KEPCO tariff analysis — free diagnosis & installation, fee only after savings confirmed',
    'det.gen.sub1':'8-Step Consulting Process', 'det.gen.sub2':'Site Diagnosis & Consulting',
    /* Genovation 방법 카드 */
    'gen.m1.h':'Base Charge Cut Up to 33.3%',
    'gen.m1.p':'Optimal contract type and capacity reset via KEPCO tariff & usage pattern analysis. Drastically reduces your fixed monthly base charge.',
    'gen.m1.tag':'Up to 33.3% Reduction',
    'gen.m2.h':'Usage Fee Cut Up to 30.7%',
    'gen.m2.p':'We uncover and apply KEPCO exemptions — welfare facilities, SME support laws, disability laws — recovering benefits your business has been missing.',
    'gen.m2.tag':'Up to 30.7% Reduction',
    'gen.m3.h':'Completely Free · Success Fee Only',
    'gen.m3.p':'Zero consulting fees, zero construction costs — all borne by Genovation. Once savings are confirmed, 50% of savings are paid as a fee over 60 months.',
    'gen.m3.tag':'No Savings = No Cost',
    /* Genovation 8단계 */
    'cp.1':'Initial Client Meeting', 'cp.2':'Consulting Survey', 'cp.3':'1st Proposal Meeting', 'cp.4':'Contract Signing',
    'cp.5':'On-site Inspection', 'cp.6':'Final Savings Plan', 'cp.7':'KEPCO Filing', 'cp.8':'KEPCO Approval',
    /* 프로세스 5단계 */
    'ps.1.t':'Free Consult', 'ps.1.d':'Site assessment<br>& solution proposal',
    'ps.2.t':'Site Diagnosis', 'ps.2.d':'Power usage pattern<br>& structure analysis',
    'ps.3.t':'Custom Proposal', 'ps.3.d':'Revenue simulation<br>& ROI analysis',
    'ps.4.t':'Construction', 'ps.4.d':'Integrated build:<br>architecture & solar',
    'ps.5.t':'Aftercare', 'ps.5.d':'Generation monitoring<br>& ongoing savings',
    /* 서비스 카드 (en 추가분) */
    'svc.act.sub':    'Advanced Construction Technology · New Tech #631',
    'svc.act.f1':     '20%+ cost savings vs Steel structure',
    'svc.act.f2':     '40%+ column area reduction → more usable space',
    'svc.act.f3':     '20%+ floor-height saving vs H-beam',
    'svc.act.f4':     'Fire certified · Government new tech certified',
    'svc.solar.sub':  'Self-Use · PPA · RPS · 704MW Installed',
    'svc.solar.f1':   '1,000kW: <strong>₩20M/mo</strong> revenue',
    'svc.solar.f2':   '<strong>~2.2yr</strong> investment payback',
    'svc.solar.f3':   'Up to <strong>₩6.5B</strong> cumulative over 20 years',
    'svc.solar.f4':   'RE100 & carbon neutrality certification',
    'svc.geno.sub':   'KEPCO Tariff Analysis · Free Diagnosis · Success Fee',
    'svc.geno.f1':    'Up to <strong>33.3%</strong> base charge reduction',
    'svc.geno.f2':    'Up to <strong>30.7%</strong> usage fee reduction',
    'svc.geno.f3':    'Free diagnosis & <strong>zero construction cost</strong>',
    'svc.geno.f4':    'No savings = no fee',
    /* 임팩트 카운터 단위 */
    'bs.imp.u2':'t', 'bs.imp.u3':'', 'bs.imp.u4':'+',
    /* ACT 비교 카드 */
    'mc.pc.tag':'PC Structure',
    'mc.pc.1':'Heavy members → increased crane load', 'mc.pc.2':'Difficult seismic design',
    'mc.pc.3':'Weak joint rigidity', 'mc.pc.4':'Cost ratio: <strong>~82%</strong>',
    'mc.st.tag':'Steel Structure',
    'mc.st.1':'Weak-axis bending during lifting', 'mc.st.2':'Buckling risk → extra bracing required',
    'mc.st.3':'Fireproofing required (extra cost)', 'mc.st.4':'Cost ratio: <strong>100% (baseline)</strong>',
    'mc.act.1':'Closed box section → superior torsion & deflection resistance',
    'mc.act.2':'Steel + concrete composite → reduced member size',
    'mc.act.3':'Fire certified · no extra finishing needed',
    'mc.act.4':'Cost ratio: <strong>~78% (22% savings)</strong>',
    /* ACT 핵심 기술 */
    'tech.1.badge':'Core Tech 01', 'tech.1.h3':'ACT Column <em>Filled Composite Column</em>',
    'tech.1.p':'Four cold-formed steel plates welded into a tube, then filled with high-strength concrete — a new-form CFT column.',
    'tech.1.l1':'40%+ column area reduction → more usable floor space',
    'tech.1.l2':'80%+ weight reduction vs H-beam',
    'tech.1.l3':'Square section without weak axis → excellent buckling stability',
    'tech.1.l4':'Vertical & horizontal diaphragm options available',
    'tech.2.badge':'Core Tech 02', 'tech.2.h3':'AU Girder <em>Composite Beam</em>',
    'tech.2.p':'Box beam from inverted-U + U steel plates, partially embedded into slab for a semi-slim floor. Exceptional flexural strength and stiffness.',
    'tech.2.l1':'20%+ floor-height saving vs H-beam',
    'tech.2.l2':'Closed section → dramatically reduced deflection (no shoring)',
    'tech.2.l3':'A-CAP doubles as safety scaffold → improved workability & safety',
    'tech.2.l4':'Sub-beam elimination possible with deep deck',
    /* 효과 배너 */
    'eff.1':'Cost vs Steel', 'eff.2':'Column area reduction', 'eff.3':'Floor height savings', 'eff.4':'Project sites',
    /* ACT 시공 단계 */
    'act.s1':'<span>STEP 01</span>ACT Column Install', 'act.s2':'<span>STEP 02</span>AU Beam Install', 'act.s3':'<span>STEP 03</span>Deck Plate & Rebar', 'act.s4':'<span>STEP 04</span>Concrete Pour',
    /* 태양광 사업 방식 카드 */
    'biz.self.h':'Self-Consumption', 'biz.self.p':'Use generated power to cut electricity bills. Gov. subsidy ₩5.7M/kW available.',
    'biz.self.key':'₩150/kWh tariff · ₩570,000/kW subsidy',
    'biz.ppa.badge':'💰 Highest Revenue', 'biz.ppa.h':'PPA (Power Purchase Agreement)',
    'biz.ppa.p':'Sell power directly to third parties instead of KEPCO. Supports RE100 & carbon neutrality.',
    'biz.ppa.key':'₩149/kWh trade rate · RE100 certification',
    'biz.rps.h':'RPS (Mandatory Supply)', 'biz.rps.p':'Earn SMP+REC revenue as a registered power generator. Stable long-term income.',
    'biz.rps.key':'SMP ₩120/kWh · Long-term contract',
    /* 태양광 케이스 스터디 */
    'sol.case.label':'Case Study · KDF Solar Power Plant',
    'sol.case.h3':'Boryeong 2,239kW<br><span>₩20M/mo · 2.2yr payback</span>',
    'sol.case.note':'※ Jasolar 710Wp modules · Building-integrated self-use · ₩1,100,000/kW cost basis',
    'sol.e1':'Capacity', 'sol.e2':'Modules', 'sol.e3':'Area', 'sol.e4':'Monthly Gen.',
    'sol.e5':'Monthly Revenue', 'sol.e6':'Annual Revenue', 'sol.e7':'Payback', 'sol.e8':'20yr Total',
    /* 솔라루프 특징 */
    'srf.1.h':'Zero Bolt Exposure', 'srf.1.p':'No fastening bolts exposed externally — perfect waterproofing and clean aesthetics simultaneously.',
    'srf.2.h':'Zero Roof Defects', 'srf.2.p':'Integrated with building structure from design stage. Eliminates all roof damage risks from post-installation methods.',
    'srf.3.h':'20-Year Warranty', 'srf.3.p':'GW Korea is fully responsible from materials to installation. 20-year generation efficiency guarantee and after-sales service.',
    'srf.4.h':'RE100 & Carbon Neutral', 'srf.4.p':'RE100 certification support with PPA model. Strengthens ESG management and meets global supply requirements.',
    /* Geno 케이스 스터디 */
    'gen.case.label':'Case Study · Cellbio Co., Ltd.',
    'gen.case.h3':'Annual Savings <span>Up to ₩58.4M</span><br>₩680M cumulative over 20 years',
    'gen.case.note':'※ Savings are estimates; confirmed after on-site inspection. May vary by usage.',
    'gen.e1':'Current Monthly Bill', 'gen.e2':'Monthly Savings', 'gen.e3':'Min. Annual Savings', 'gen.e4':'Max. Annual Savings',
    'gen.e5':'20yr Cumulative', 'gen.e6':'Investment Recovery', 'gen.e7':'Consulting Fee', 'gen.e8':'Construction Fee',
    /* 비교 섹션 */
    'label.compare':  'WHY GW',
    'title.compare':  'Conventional vs <span>GW Integrated Solution</span>',
    /* 포트폴리오 */
    'label.portfolio':'PORTFOLIO',
    'title.portfolio':'<span>Real</span> Project Portfolio',
    'desc.portfolio': 'Actual project cases from clients across Korea who reduced energy costs with GW Korea.',
    'filter.all':     'All',
    'filter.solar':   'Solar',
    'filter.act':     'ACT',
    'filter.geno':    'Energy',
    /* 수익 시뮬레이터 */
    'label.sim':      'REVENUE SIMULATOR',
    'title.sim':      'How Much Can <span>Your Building</span> Earn?',
    'desc.sim':       'Get an instant estimate of solar revenue and energy savings with a few inputs.',
    'sim.input.title':'📊 System Parameters',
    'sim.result.title':'💰 Estimated Revenue',
    'sim.capacity':   'System Capacity (kW)',
    'sim.usage':      'Monthly Usage (kWh)',
    'sim.biztype':    'Business Model',
    'sim.biz.self':   'Self-Consumption',
    'sim.biz.ppa':    'PPA (Direct Trade)',
    'sim.biz.rps':    'RPS (Grid Supply)',
    'sim.btn':        '📈 Calculate Revenue',
    'sim.monthly':    'Monthly Revenue',
    'sim.yearly':     'Annual Revenue',
    'sim.payback':    'Payback Period',
    'sim.geno':       'Additional Energy Savings',
    'sim.total20':    '20-Year Total Revenue',
    'sim.note':       '※ Based on 3.5hr/day solar hours, ₩150/kWh tariff. Estimates only.',
    /* 프로세스 */
    'label.process':  'OUR PROCESS',
    'title.process':  '<span>5 Steps</span> with GW Korea',
    /* 고객 후기 */
    'label.testi':    'CLIENT REVIEWS',
    'title.testi':    'What Our Clients <span>Experienced</span>',
    'desc.testi':     '"No other team could do this" — real voices from our clients.',
    /* 문의 폼 */
    'label.contact':  'FREE CONSULTATION',
    'title.contact':  'Get Your Free<br>Consultation',
    'desc.contact':   'Our experts visit your site to provide a customized revenue analysis. Completely free.',
    'form.title':     '📋 Request Free Consultation',
    'form.name':      'Name *',
    'form.phone':     'Phone *',
    'form.company':   'Company',
    'form.service':   'Interested Service *',
    'form.location':  'Site Location',
    'form.bldtype':   'Building Type',
    'form.area':      'Roof / Site Area',
    'form.bill':      'Monthly Electricity Bill',
    'form.message':   'Message',
    'form.submit':    '🚀 Request Free Consultation',
    /* 공통 버튼 */
    'btn.consult':    'Free Consultation',
    'btn.more':       'Learn More',
    'btn.portfolio':  '🏭 View Projects',
    'btn.proposal':   '📋 Request Proposal',
    /* 푸터 */
    'footer.svc':     'Services',
    'footer.co':      'Company',
    'footer.support': 'Support',
    'footer.copy':    '© 2025 GW CO.,LTD. All rights reserved.',
    /* 비교표 */
    'cmp.h1': 'Category', 'cmp.h2': 'Conventional', 'cmp.h3': 'GW Integrated Solution',
    'cmp.r1.l': 'Energy Supply', 'cmp.r1.b': '100% KEPCO purchase (annual increases)', 'cmp.r1.g': 'Solar self-generation + minimal grid purchase',
    'cmp.r2.l': 'Electricity Mgmt.', 'cmp.r2.b': 'Unmanaged (waste occurs)', 'cmp.r2.g': 'Genovation real-time optimization (+30% extra)',
    'cmp.r3.l': 'Solar Installation', 'cmp.r3.b': 'Post-install → roof defects, double cost', 'cmp.r3.g': 'Integrated from design stage',
    'cmp.r4.l': 'Monthly Fixed Cost', 'cmp.r4.b': '100% expenditure (sunk cost)', 'cmp.r4.g': 'Generation revenue + savings (asset growth)',
    'cmp.r5.l': 'Construction Cost', 'cmp.r5.b': 'Steel structure: 100% (baseline)', 'cmp.r5.g': 'ACT System: ~78% (22% savings)',
    'cmp.r6.l': 'RE100 Readiness', 'cmp.r6.b': '<span class="icon-x">✗</span> Difficult to achieve', 'cmp.r6.g': '<span class="icon-check">✓</span> Renewable energy certification support',
    'cmp.r7.l': 'Management', 'cmp.r7.b': 'Separate vendors for each service', 'cmp.r7.g': 'GW Korea one-stop integrated management',
    /* 고객 후기 */
    'testi.1.txt': '"The concept of integrating solar from the building design stage itself was different. No roof defects or waterproofing issues after completion, and monthly generation revenue makes the factory feel like a true asset."',
    'testi.1.name': 'Suwon, Gyeonggi · Factory Owner', 'testi.1.detail': '850kW installed · ~₩17M/month revenue',
    'testi.2.txt': '"Electricity bills dropped by ₩2.8M every month. Free diagnosis, free installation — I was skeptical at first, but when the invoice arrived the difference was clear. Zero-investment savings were real."',
    'testi.2.name': 'Cellbio Co., Ltd. · Bio Manufacturer', 'testi.2.detail': 'Genovation consulting · Max ₩58.4M annual savings',
    'testi.3.txt': '"Other companies only talked about post-installation. GW proposed integrating ACT construction and solar from the new-build design stage. Construction costs were 20%+ lower vs Steel, and the result looks much cleaner."',
    'testi.3.name': 'Boryeong, Chungnam · Logistics Warehouse', 'testi.3.detail': 'ACT System + Solar 2,239kW integrated',
    'testi.4.txt': '"We were looking for RE100 certification and found GW. With PPA, we increased our renewable energy ratio without extra investment, clearly reflected in our ESG report."',
    'testi.4.name': 'Southern Gyeonggi · Global Parts Manufacturer', 'testi.4.detail': 'PPA model · RE100 certified · ESG enhanced',
    /* 파트너 */
    'partner.label': 'Our Partners',
    /* 연락처 항목 */
    'ci.tel.label': 'Tel.', 'ci.mobile.label': 'Direct', 'ci.fax.label': 'Fax',
    'ci.hq.label': 'HQ', 'ci.branch.label': 'Branch',
    'ci.hours.label': 'Hours', 'ci.hours.val': 'Mon–Fri 09:00–18:00',
    /* 푸터 */
    'footer.brand.p': 'Making buildings into energy-generating assets through construction, solar, and Genovation.',
    /* 케이스스터디 값 */
    'sol.v2': '3,110 pcs', 'sol.v5': '₩20M', 'sol.v6': '₩240M', 'sol.v7': '2.2 yr', 'sol.v8': '₩6.47B',
    'gen.v1': '₩153.4M', 'gen.v2': '₩2.85M', 'gen.v3': '₩34.2M', 'gen.v4': '₩58.4M',
    'gen.v5': '₩684M', 'gen.v6': '0 months', 'gen.v7': 'Free',
    /* 포트폴리오 카드 */
    'pf.s1.tag': 'Solar · Self-Use', 'pf.s1.title': 'Large Factory Roof Solar Power Plant', 'pf.s1.loc': '📍 Seoul Metro Area', 'pf.s1.note': 'Gov. permit complete · SolarRoof integrated · RE100 certified',
    'pf.s2.tag': 'Solar · SolarRoof', 'pf.s2.title': 'SolarRoof Installation Method Comparison', 'pf.s2.loc': '📍 Southern Gyeonggi', 'pf.s2.note': 'Zero bolt exposure · 20-yr warranty · Max generation efficiency',
    'pf.s3.tag': 'Solar · RPS', 'pf.s3.title': 'KDF Solar Power Plant', 'pf.s3.loc': '📍 Boryeong, Chungnam', 'pf.s3.note': 'Jasolar 710Wp · 3,110 modules · 2.2yr payback · ₩6.47B over 20yr',
    'pf.s4.tag': 'Solar · Roof Renewal', 'pf.s4.title': 'LSIS Factory Roof Renewal 2MW', 'pf.s4.loc': '📍 Domestic', 'pf.s4.note': '6 stages: pre-work → material lift → SolarRoof install → completion',
    'pf.s5.tag': 'Solar · Self-Use', 'pf.s5.title': 'Hansol Security Self-Consumption Proposal', 'pf.s5.loc': '📍 Proposal Complete', 'pf.s5.note': 'RE100 · Carbon neutral · Self-generation transition solution',
    'pf.s6.tag': 'Solar · Large-Scale', 'pf.s6.title': 'Large-Scale Solar Power Complex', 'pf.s6.loc': '📍 Domestic', 'pf.s6.note': 'Gov. pre-approval complete · Optimized complex-type plant design',
    'pf.s7.tag': 'Solar · Building-Integrated', 'pf.s7.title': 'New Factory Solar Integrated Construction', 'pf.s7.loc': '📍 Gyeonggi Region', 'pf.s7.note': 'Solar design from groundbreaking · No structural reinforcement needed',
    'pf.a1.tag': 'ACT Down System', 'pf.a1.title': 'ACT Down System Reverse Excavation', 'pf.a1.loc': '📍 Urban Construction Site', 'pf.a1.cap': 'Faster schedule + cost reduction<span>Reverse excavation specialist</span>', 'pf.a1.note': '1/3 volume vs H-beam · No reverse raker · Minimal urban complaints',
    'pf.a2.tag': 'ACT System · Warehouse', 'pf.a2.title': 'Large New Logistics Warehouse', 'pf.a2.loc': '📍 Gyeonggi/Chungcheong', 'pf.a2.cap': 'Cost 78%<span>22% savings vs Steel</span>', 'pf.a2.note': 'ACT Column + AU Girder full · Fire certified · 20% floor height gain',
    'pf.a3.tag': 'ACT System · Factory', 'pf.a3.title': 'Multi-Story Industrial Facility', 'pf.a3.loc': '📍 Nationwide', 'pf.a3.cap': 'Column area 40%↓<span>Max. usable space</span>', 'pf.a3.note': 'Closed box section · Superior torsion resistance · No shoring required',
    'pf.a4.tag': 'ACT System · Completion', 'pf.a4.title': 'Complex Industrial Facility Completion', 'pf.a4.loc': '📍 400+ Sites Nationwide', 'pf.a4.cap': 'Install weight 80%↓<span>vs PC structure</span>', 'pf.a4.note': 'Gov. new tech · Structural engineers certified · Fire certified',
    'pf.g1.tag': 'Energy · Free Diagnosis', 'pf.g1.title': 'Cellbio Electricity Cost Reduction', 'pf.g1.loc': '📍 Consulting Complete', 'pf.g1.cap': '₩58.4M/yr<span>savings achieved</span>', 'pf.g1.note': '₩680M over 20yr · 0-month payback · Free construction',
    'pf.g2.tag': 'Energy · Tariff Analysis', 'pf.g2.title': 'SME Base Charge Reduction', 'pf.g2.loc': '📍 Gimhae, Gyeongnam', 'pf.g2.cap': 'Base charge 33%↓<span>KEPCO tariff renegotiation</span>', 'pf.g2.note': 'Optimal contract reset · Usage pattern analysis · Immediate savings',
    'pf.g3.tag': 'Energy · 1,800+ Companies', 'pf.g3.title': '1,800+ Companies Savings Achieved', 'pf.g3.loc': '📍 Nationwide', 'pf.g3.cap': '₩40B<span>cumulative savings</span>', 'pf.g3.note': 'SK Group MOU · 1,800 companies consulting complete',
  }
};

// =========================================
// 한/영 전환
// =========================================
function initLang() {
  const saved = localStorage.getItem('gw-lang') || 'ko';
  applyLang(saved);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="lang-toggle"]');
    if (!btn) return;
    const current = document.documentElement.getAttribute('data-lang') || 'ko';
    applyLang(current === 'ko' ? 'en' : 'ko');
  });
}

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'ko'; // #28
  localStorage.setItem('gw-lang', lang);
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // placeholder 별도 처리
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
}

// =========================================
// 네비게이션
// =========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!navbar) return;

  // 스크롤 시 그림자 추가
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // 모바일 햄버거 토글
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // 메뉴 링크 클릭 시 닫기
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }
}

// =========================================
// 스크롤 애니메이션
// =========================================
function initScrollAnimation() {
  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

// =========================================
// 숫자 카운트업 애니메이션
// =========================================
function animateCount(el, target, duration) {
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString('ko-KR');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          if (!isNaN(target)) animateCount(entry.target, target, 1800);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

// =========================================
// 수익 시뮬레이터
// =========================================
const RATE_PER_KWH = 150; // 원/kWh (전기 단가 기준)
const DAILY_SUN_HOURS = 3.5; // 일평균 발전 시간
const DAYS_PER_MONTH = 30.4;
const INVEST_PER_KW = 1_100_000; // 원/kW (설치 단가)
const SUBSIDY_PER_KW = 570_000;  // 원/kW (정부 지원금)

/**
 * 수익 계산 (자가소비형 기준)
 * @param {number} capacityKw - 설치 용량 (kW)
 * @param {number} usageKwh - 월 전기 사용량 (kWh)
 * @param {string} bizType - 사업 방식
 * @returns {{ monthly, yearly, payback, genoSaving, total20 }}
 */
function calcRevenue(capacityKw, usageKwh, bizType) {
  const monthlyGen = capacityKw * DAILY_SUN_HOURS * DAYS_PER_MONTH;
  let monthlyRevenue;

  if (bizType === 'self') {
    monthlyRevenue = Math.min(monthlyGen, usageKwh) * RATE_PER_KWH;
  } else if (bizType === 'ppa') {
    monthlyRevenue = monthlyGen * 149; // PPA 거래 단가
  } else {
    monthlyRevenue = monthlyGen * 120; // RPS SMP 기준
  }

  const yearlyRevenue = monthlyRevenue * 12;
  const investCost = capacityKw * (INVEST_PER_KW - (bizType === 'self' ? SUBSIDY_PER_KW : 0));
  const payback = investCost > 0 ? (investCost / yearlyRevenue).toFixed(1) : '-';
  const genoSaving = usageKwh * RATE_PER_KWH * 0.30 * 12; // 30% 절감 가정
  const total20 = (yearlyRevenue + genoSaving) * 20;

  return { monthly: monthlyRevenue, yearly: yearlyRevenue, payback, genoSaving, total20 };
}

function formatKRW(n) {
  if (n >= 1_0000_0000) return (n / 1_0000_0000).toFixed(1) + '억';
  if (n >= 1_000_0000) return (n / 1_000_0000).toFixed(0) + '만';
  return Math.round(n).toLocaleString('ko-KR');
}

function initSimulator() {
  const capacityInput = document.getElementById('capacity');
  const usageInput = document.getElementById('usage');
  const capacityVal = document.getElementById('capacityVal');
  const usageVal = document.getElementById('usageVal');
  const calcBtn = document.getElementById('calcBtn');
  if (!calcBtn) return;

  // 슬라이더 실시간 표시
  if (capacityInput && capacityVal) {
    capacityInput.addEventListener('input', () => {
      capacityVal.textContent = parseInt(capacityInput.value).toLocaleString('ko-KR') + ' kW';
    });
  }
  if (usageInput && usageVal) {
    usageInput.addEventListener('input', () => {
      usageVal.textContent = parseInt(usageInput.value).toLocaleString('ko-KR') + ' kWh';
    });
  }

  calcBtn.addEventListener('click', () => {
    const capacity = parseInt(document.getElementById('capacity')?.value || '1000', 10);
    const usage = parseInt(document.getElementById('usage')?.value || '100000', 10);
    const bizType = document.getElementById('bizType')?.value || 'self';

    if (isNaN(capacity) || isNaN(usage) || capacity <= 0) {
      showToast('올바른 값을 입력해주세요.');
      return;
    }

    const result = calcRevenue(capacity, usage, bizType);

    setText('monthlyRevenue', formatKRW(result.monthly) + '원');
    setText('yearlyRevenue', formatKRW(result.yearly) + '원');
    setText('payback', result.payback + '년');
    setText('genoSaving', formatKRW(result.genoSaving) + '원');
    setText('total20', formatKRW(result.total20) + '원');

    const unitEl = document.querySelector('#resultMonthly .result-card-unit');
    if (unitEl) unitEl.textContent = '월간 예상 (전기요금 기준)';
  });
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// =========================================
// 히어로 슬라이더
// =========================================
function initSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  // 도트 생성
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', (i + 1) + '번 슬라이드');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(idx) {
    const old = current;
    slides[old].classList.remove('active');
    slides[old].classList.add('prev-slide');
    setTimeout(() => slides[old].classList.remove('prev-slide'), 1000);

    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, 5000);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

  // 터치 스와이프
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  // 마우스 오버 시 정지
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', () => {
    if (!sliderPaused) startAuto();
  });

  // #26: 일시정지 이벤트 처리
  let sliderPaused = false;
  document.addEventListener('slider-toggle-pause', (e) => {
    sliderPaused = e.detail.paused;
    sliderPaused ? stopAuto() : startAuto();
  });

  startAuto();
}

// =========================================
// 포트폴리오 필터
// =========================================
function initPortfolioFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      // #22: 필터 결과 접근성 알림
      const grid = document.querySelector('.portfolio-grid');
      if (grid) {
        grid.setAttribute('aria-label', visibleCount + '개 프로젝트 표시 중');
      }
    });
  });
}

// =========================================
// 문의 폼 처리
// =========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name     = document.getElementById('fname')?.value.trim() || '';
    const phone    = document.getElementById('fphone')?.value.trim() || '';
    const service  = document.getElementById('fservice')?.value || '';
    const company  = document.getElementById('fcompany')?.value.trim() || '';
    const location = document.getElementById('flocation')?.value.trim() || '';
    const bldtype  = document.getElementById('fbldtype')?.value || '';
    const area     = document.getElementById('farea')?.value.trim() || '';
    const bill     = document.getElementById('fbill')?.value.trim() || '';
    const message  = document.getElementById('fmessage')?.value.trim() || '';

    // #83: 허니팟 스팸 체크
    if (isSpamSubmission()) { form.reset(); return; }

    // #85: Rate limiting
    if (isRateLimited()) {
      showToast('잠시 후 다시 시도해주세요.');
      return;
    }

    if (!name) { showToast('성함을 입력해주세요.'); return; }
    if (!phone || !/^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/.test(phone)) {
      showToast('연락처를 올바르게 입력해주세요. (예: 010-1234-5678)');
      return;
    }
    if (!service) { showToast('관심 서비스를 선택해주세요.'); return; }

    // #86: 개인정보 동의 확인
    const privacyCheck = document.getElementById('fprivacy');
    if (privacyCheck && !privacyCheck.checked) {
      showToast('개인정보처리방침에 동의해주세요.');
      return;
    }

    // #84: 입력값 sanitize
    const safeData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      company: sanitizeInput(company),
      service,
      location: sanitizeInput(location),
      bldtype,
      area: sanitizeInput(area),
      bill: sanitizeInput(bill),
      message: sanitizeInput(message),
    };

    // 수집 데이터 (실제 서비스에서는 서버로 전송)
    console.info('[GW 상담신청]', safeData);
    showToast('✅ 상담 신청이 완료되었습니다! 1영업일 내 연락드리겠습니다.');
    form.reset();
  });
}

// =========================================
// 토스트 알림
// =========================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// =========================================
// 부드러운 앵커 스크롤
// =========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 70; // 네비바 높이
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// =========================================
// 다크 모드 토글
// =========================================
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('gw-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 저장된 설정 또는 시스템 설정 적용
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('gw-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('gw-theme', 'dark');
    }
  });
}

// =========================================
// #46: 스크롤 진행 표시바
// =========================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// =========================================
// #47: 네비게이션 활성 상태 (스크롤 기반)
// =========================================
function initNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('nav-active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '-70px 0px -50% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// =========================================
// #28: 언어 전환 시 html lang 속성 변경
// =========================================
function updateHtmlLang(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
}

// =========================================
// #87: 쿠키 동의 배너
// =========================================
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  if (!banner || !acceptBtn) return;

  if (!localStorage.getItem('gw-cookie-consent')) {
    banner.style.display = 'flex';
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('gw-cookie-consent', 'true');
    banner.style.display = 'none';
  });
}

// =========================================
// #26: 슬라이더 일시정지
// =========================================
function initSliderPause() {
  const pauseBtn = document.getElementById('sliderPause');
  if (!pauseBtn) return;
  // 슬라이더의 일시정지는 initSlider에서 처리하되,
  // 버튼 클릭 이벤트를 여기서 연결
  pauseBtn.addEventListener('click', () => {
    const isPaused = pauseBtn.getAttribute('aria-pressed') === 'true';
    pauseBtn.setAttribute('aria-pressed', String(!isPaused));
    pauseBtn.textContent = isPaused ? '⏸' : '▶';
    // 전역 이벤트로 알림
    document.dispatchEvent(new CustomEvent('slider-toggle-pause', { detail: { paused: !isPaused } }));
  });
}

// =========================================
// #83: 폼 스팸 방지 (허니팟 확인)
// =========================================
function isSpamSubmission() {
  const honeypot = document.getElementById('fwebsite');
  return honeypot && honeypot.value.length > 0;
}

// =========================================
// #84: 입력값 Sanitize
// =========================================
function sanitizeInput(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// =========================================
// #85: Rate Limiting (폼)
// =========================================
const formSubmitTimes = [];
function isRateLimited() {
  const now = Date.now();
  formSubmitTimes.push(now);
  // 최근 1분 내 3회 이상이면 제한
  const recentSubmits = formSubmitTimes.filter(t => now - t < 60000);
  return recentSubmits.length > 3;
}

// =========================================
// #74: 햄버거 애니메이션 토글
// =========================================
function initHamburgerAnimation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
  });
  // 메뉴 링크 클릭 시 닫기
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
    });
  });
}

// =========================================
// 초기화
// =========================================
function init() {
  initTheme();
  initLang();
  initNavbar();
  initHamburgerAnimation();
  initSlider();
  initSliderPause();
  initScrollAnimation();
  initCountUp();
  initSimulator();
  initPortfolioFilter();
  initContactForm();
  initSmoothScroll();
  initScrollProgress();
  initNavActiveState();
  initCookieBanner();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
