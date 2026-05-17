// =========================================
// 廖怡婷 Portfolio - 互動腳本
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguageToggle();
    initScrollEffects();
    initBackToTop();
    initSmoothScroll();
});

// ========== 導覽列 ==========
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // 滾動時改變導覽列樣式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 漢堡選單切換
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 點擊選單項目後關閉手機選單
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== 語言切換 ==========
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('.lang-text');
    let currentLang = 'zh';
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        langText.textContent = currentLang === 'zh' ? 'EN' : '中';
        
        // 更新所有有 data-zh / data-en 屬性的元素
        document.querySelectorAll('[data-zh][data-en]').forEach(el => {
            const newText = currentLang === 'zh' ? el.dataset.zh : el.dataset.en;
            // 處理含 HTML 的內容
            if (el.children.length > 0 && el.querySelector('.heart')) {
                // 保留 footer 的愛心圖示
                el.innerHTML = newText.replace('♥', '<span class="heart">♥</span>');
            } else {
                el.textContent = newText;
            }
        });
        
        // 切換 HTML lang 屬性
        document.documentElement.lang = currentLang === 'zh' ? 'zh-TW' : 'en';
    });
}

// ========== 滾動動畫效果 ==========
function initScrollEffects() {
    // 為所有 section 內的卡片元素加上 fade-in 類別
    const animatedElements = document.querySelectorAll(
        '.about-card, .timeline-item, .exp-item, .award-column, .certs-box, .skills-box, .contact-card'
    );
    
    animatedElements.forEach(el => el.classList.add('fade-in'));
    
    // 使用 Intersection Observer 偵測元素是否進入畫面
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 加上漸進延遲動畫
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ========== 回到頂端按鈕 ==========
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// ========== 平滑滾動 ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
