document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lenis 平滑滾動 ---
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

    // --- 手機選單與導航邏輯 ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    // 1. 漢堡按鈕開關
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // 2. 導覽列連結邏輯
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 【重要】這裡的邏輯與首頁不同
            // 我們只攔截「純錨點」 (#開頭) 的連結進行平滑滾動
            // 如果 href 包含 "index.html" (如 index.html#about)，則不攔截，讓它正常跳轉回首頁
            if (href.startsWith('#')) {
                e.preventDefault(); 
                
                // 關閉手機選單
                navLinks.classList.remove('active');
                if(hamburger) hamburger.classList.remove('toggle');

                if (href === '#') {
                    lenis.scrollTo(0);
                } else {
                    // 滾動到本頁區塊 (#process, #pricing)
                    lenis.scrollTo(href, { offset: -80 });
                }
            }
        });
    });

    // --- 主題切換功能 ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const logoImg = document.querySelector('.logo img');
    const body = document.body;

    // 從localStorage讀取保存的主題設置，如果沒有則默認為深色模式
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // 應用保存的主題
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (logoImg) {
            logoImg.src = 'XunC_black_nobg.png';
        }
    }

    // 主題切換函數
    function toggleTheme() {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        
        // 切換logo圖片
        if (logoImg) {
            if (isLightMode) {
                logoImg.src = 'XunC_black_nobg.png'; // 淺色背景用黑色logo
            } else {
                logoImg.src = 'XunC_while_nobg.png'; // 深色背景用白色logo
            }
        }
        
        // 保存主題設置到localStorage
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }

    // 綁定切換按鈕事件
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});