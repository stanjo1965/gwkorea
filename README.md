# (주)지더블유코리아 공식 웹사이트

신재생에너지 Total Solution 전문기업 (주)지더블유코리아의 공식 웹사이트입니다.

## 주요 기능

- 회사 소개 및 핵심 강점
- 신재생에너지 서비스 소개
- 원스톱 서비스 프로세스
- 수익 혜택 및 실적 소개
- 무료상담 신청 (이메일 자동 발송)

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`env.example` 파일을 참고하여 `.env` 파일을 생성하고 다음 정보를 입력하세요:

```env
# 이메일 설정
EMAIL_USER=chaoboy1@naver.com
EMAIL_PASS=your_email_password_here
RECIPIENT_EMAIL=sangkeun.jo@gmail.com

# 서버 설정
PORT=3000
```

### 3. 서버 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

### 4. 웹사이트 접속

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 이메일 설정

무료상담 신청 기능을 사용하려면 네이버 메일 계정 설정이 필요합니다:

1. 네이버 메일 계정에서 "POP3/IMAP 설정" 활성화
2. 앱 비밀번호 생성 (2단계 인증 필요)
3. `.env` 파일의 `EMAIL_PASS`에 앱 비밀번호 입력

## 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email**: Nodemailer (네이버 SMTP)
- **Styling**: Custom CSS with Flexbox/Grid

## 파일 구조

```
├── industrial-landing.html    # 메인 페이지
├── industrial-styles.css      # 스타일시트
├── script.js                  # 클라이언트 JavaScript
├── server.js                  # 서버 코드
├── package.json               # 의존성 관리
├── env.example                # 환경변수 예시
└── images/                    # 이미지 파일들
```

## 문의

- **대표전화**: 055-294-2024
- **휴대폰**: 010-5373-8724
- **이메일**: kygug09@naver.com
- **주소**: 경남 창원시 마산회원구 구암서7길 10

## 라이선스

Copyright © 2024 (주)지더블유코리아. All rights reserved.