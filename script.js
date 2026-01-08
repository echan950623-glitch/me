document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lenis 平滑滾動設定 ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Typed.js 打字機設定 ---
    const typed = new Typed('#typed-text', {
        strings: ['前端工程師。', '台科大學生。', '自由接案者。', '問題解決者。'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });

    // --- 手機選單與導航邏輯 ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const logo = document.querySelector('.logo');

    // 1. 漢堡按鈕開關
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // 2. 導覽列連結點擊處理 (含修復首頁連結)
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 判斷是否為錨點連結 (#開頭)
            if (href.startsWith('#')) {
                e.preventDefault(); // 阻止瀏覽器預設跳轉
                
                // 關閉手機選單
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');

                // 修正：如果 href 只是 "#"，就滾動到 0 (最上面)
                if (href === '#') {
                    lenis.scrollTo(0);
                } else {
                    // 否則滾動到指定的 ID (例如 #about)
                    lenis.scrollTo(href);
                }
            }
            // 如果是 mailto 或外部連結，維持預設行為
        });
    });
    

    // 3. Logo 點擊回頂端
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(0);
    });
});