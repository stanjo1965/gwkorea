const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, email, company, message } = req.body;

  if (!name || !phone || !email || !company) {
    return res.status(400).json({ success: false, message: '필수 입력 항목을 모두 채워주세요.' });
  }

  // 환경변수 확인
  if (!process.env.EMAIL_PASS) {
    console.error('EMAIL_PASS 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ success: false, message: '이메일 설정이 완료되지 않았습니다.' });
  }

  try {
    // 이메일 전송을 위한 트랜스포터 설정 (네이버 메일 서버 사용)
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,  // 네이버 SMTP 포트 465 사용 (SSL)
      secure: true,  // 465 포트는 SSL 사용
      auth: {
        user: process.env.EMAIL_USER || 'chaoboy1@naver.com',
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,  // TLS 인증서 검증 무시
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'chaoboy1@naver.com',
      to: process.env.RECIPIENT_EMAIL || 'sangkeun.jo@gmail.com',
      subject: `[GW코리아] 새로운 상담 신청: ${company} - ${name}`,
      html: `
        <h2>GW코리아 상담 신청</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>회사명:</strong> ${company}</p>
        <p><strong>문의사항:</strong> ${message || '없음'}</p>
        <hr>
        <p><small>신청 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('이메일 전송 성공:', { name, company, email });
    
    res.status(200).json({ 
      success: true, 
      message: '상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
    });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    res.status(500).json({ 
      success: false, 
      message: '이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      error: error.message 
    });
  }
}
