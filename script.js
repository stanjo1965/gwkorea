// DOM 요소들
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const form = document.getElementById('consultationForm');

// 모바일 네비게이션 토글
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 메뉴 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 네비게이션 배경 변경
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// CTA 버튼 클릭 시 문의 섹션으로 스크롤
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    const offsetTop = contactSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// 보유자산 유형 텍스트 변환
function getAssetTypeText(value) {
    const assetTypes = {
        'factory': '공장/창고',
        'parking': '주차장',
        'land': '유휴부지',
        'building': '사무동/상가',
        'other': '기타'
    };
    return assetTypes[value] || value;
}

// 설치 의향 텍스트 변환
function getIntentionText(value) {
    const intentions = {
        'immediate': '즉시 진행',
        '3months': '3개월 내',
        '6months': '6개월 내',
        'considering': '검토 중'
    };
    return intentions[value] || value;
}

// 폼 제출 처리
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        assetType: formData.get('assetType'),
        intention: formData.get('intention'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // 유효성 검사
    if (!data.name || !data.phone || !data.assetType || !data.intention) {
        showNotification('필수 항목을 모두 입력해주세요.', 'error');
        return;
    }
    
    // 전화번호 형식 검사
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('올바른 전화번호 형식을 입력해주세요.', 'error');
        return;
    }
    
    // 로딩 상태 표시
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리 중...';
    submitButton.disabled = true;
    
    try {
        // Formspree를 사용한 자동 메일 전송
        const formData = new FormData();
        formData.append('access_key', 'YOUR_FORMSPREE_ACCESS_KEY'); // Formspree 액세스 키로 교체 필요
        formData.append('subject', `[상담신청] ${data.name}님의 태양광 상담 신청`);
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('company', data.company || '미입력');
        formData.append('assetType', getAssetTypeText(data.assetType));
        formData.append('intention', getIntentionText(data.intention));
        formData.append('message', data.message || '미입력');
        formData.append('timestamp', new Date().toLocaleString('ko-KR'));
        formData.append('reply_to', 'sangkeun.jo@gmail.com');
        
        // Formspree로 메일 전송
        const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ACCESS_KEY', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        
        if (result.success) {
            // 성공 처리
            showNotification('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
        
        // Google Analytics 이벤트 전송
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'consultation_form',
                value: 1
            });
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('오류가 발생했습니다. 다시 시도해주세요.', 'error');
    } finally {
        // 버튼 상태 복원
        const submitButton = form.querySelector('.submit-button');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// 숫자 카운터 애니메이션
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (target >= 100) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + 'MW';
        }
    }, 16);
}

// Intersection Observer를 사용한 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // 통계 숫자 애니메이션
            if (element.classList.contains('stat-number')) {
                const text = element.textContent;
                let target = 0;
                
                if (text.includes('1,000+')) {
                    target = 1000;
                } else if (text.includes('100MW')) {
                    target = 100;
                } else if (text.includes('52%')) {
                    target = 52;
                }
                
                if (target > 0) {
                    animateCounter(element, target);
                }
            }
            
            // 카드 애니메이션
            if (element.classList.contains('service-card') || 
                element.classList.contains('portfolio-item') ||
                element.classList.contains('benefit-card')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// 이미지 로딩 최적화
function optimizeImageLoading() {
    const images = document.querySelectorAll('.step-img');
    
    images.forEach(img => {
        // 이미지 로딩 실패 시 플레이스홀더 표시
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('step-placeholder')) {
                placeholder.style.display = 'flex';
            }
        });
        
        // 이미지 로딩 성공 시 플레이스홀더 숨김
        img.addEventListener('load', function() {
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('step-placeholder')) {
                placeholder.style.display = 'none';
            }
        });
        
        // 지연 로딩 (Intersection Observer 사용)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            imageObserver.observe(img);
        }
    });
}

// 페이지 로드 시 관찰 대상 요소들 등록
document.addEventListener('DOMContentLoaded', () => {
    // 이미지 로딩 최적화 초기화
    optimizeImageLoading();
    
    // 통계 숫자들
    document.querySelectorAll('.stat-number').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // 카드들
    document.querySelectorAll('.service-card, .portfolio-item, .benefit-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 스크롤 진행률 표시
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 스크롤 진행률 바 (선택사항)
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrollPercent}%;
            height: 3px;
            background: linear-gradient(90deg, #2E7D32, #4CAF50);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = `${scrollPercent}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// 페이지 로드 완료 시 초기화
window.addEventListener('load', () => {
    // Google Analytics 페이지뷰 전송
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // 초기 스크롤 위치 설정
    updateScrollProgress();
});

// 에러 처리
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // Google Analytics에 에러 전송
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// 추가 CSS 애니메이션을 위한 스타일 동적 추가
const additionalStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

// 스타일 시트에 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 무료상담 신청 폼 처리
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(consultationForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            };
            
            // 버튼 비활성화
            const submitButton = consultationForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('/api/consultation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showNotification('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.', 'success');
                    consultationForm.reset();
                } else {
                    showNotification(result.message || '상담 신청 중 오류가 발생했습니다.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('네트워크 오류가 발생했습니다. 다시 시도해주세요.', 'error');
            } finally {
                // 버튼 복원
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
});

// 알림 표시 함수
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}