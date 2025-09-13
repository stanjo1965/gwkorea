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
  console.log('Environment variables:', {
    EMAIL_USER: process.env.EMAIL_USER ? '설정됨' : '설정 안됨',
    EMAIL_PASS: process.env.EMAIL_PASS ? '설정됨' : '설정 안됨',
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? '설정됨' : '설정 안됨'
  });

  if (!process.env.EMAIL_PASS) {
    console.error('EMAIL_PASS 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ success: false, message: '이메일 설정이 완료되지 않았습니다.' });
  }

  try {
    // 간단한 응답으로 테스트
    console.log('상담 신청 데이터:', { name, phone, email, company, message });
    
    // TODO: 실제 이메일 전송 로직은 나중에 추가
    res.status(200).json({ 
      success: true, 
      message: '상담 신청이 성공적으로 접수되었습니다.',
      data: { name, phone, email, company, message }
    });
  } catch (error) {
    console.error('처리 중 오류:', error);
    res.status(500).json({ success: false, message: '처리 중 오류가 발생했습니다.', error: error.message });
  }
}
