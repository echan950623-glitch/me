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

    // 2. 導覽列連結點擊處理 (含 RWD 偏移修正)
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 判斷是否為錨點連結 (#開頭)
            if (href.startsWith('#')) {
                e.preventDefault(); 
                
                // 關閉手機選單
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');

                if (href === '#') {
                    // 回到最頂端
                    lenis.scrollTo(0);
                } else {
                    // 滾動到指定區塊，並設定偏移量 (Offset)
                    // -80 是為了扣掉導覽列的高度，避免標題被擋住
                    // 如果覺得距離還是不夠，可以改成 -100
                    lenis.scrollTo(href, { offset: -80 });
                }
            }
        });
    });

    // 3. Logo 點擊回頂端
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(0);
    });
});
