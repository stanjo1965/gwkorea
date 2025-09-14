const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 이메일 전송을 위한 트랜스포터 설정 (네이버 메일 서버 사용)
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,  // 네이버 SMTP 포트 587 사용
  secure: false,  // 587 포트는 TLS 사용 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER || 'chaoboy1@naver.com',
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false  // TLS 인증서 검증 무시
  }
});

// 디버그용 로그
console.log('이메일 설정:', {
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  tls: 'STARTTLS',
  user: process.env.EMAIL_USER,
  pass: '비밀번호 설정됨',
  recipient: process.env.RECIPIENT_EMAIL || 'sangkeun.jo@gmail.com'
});

// 무료상담 신청 API
app.post('/api/consultation', async (req, res) => {
  try {
    const { name, phone, email, company, message } = req.body;

    // 이메일 내용 구성
    const mailOptions = {
      from: process.env.EMAIL_USER || 'chaoboy1@naver.com',
      to: process.env.RECIPIENT_EMAIL || 'sangkeun.jo@gmail.com',
      subject: '[무료상담 신청] (주)지더블유코리아',
      html: `
        <h2>무료상담 신청</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>회사명:</strong> ${company || '미입력'}</p>
        <p><strong>문의내용:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>신청일시: ${new Date().toLocaleString('ko-KR')}</small></p>
      `
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.' 
    });

  } catch (error) {
    console.error('이메일 전송 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.' 
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
