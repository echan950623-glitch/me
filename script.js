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
// 禁止右鍵
document.addEventListener('contextmenu', event => event.preventDefault());

// 禁止 F12 和 Ctrl+Shift+I 等快捷鍵
document.onkeydown = function(e) {
    if(event.keyCode == 123) { // F12
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
   return false;
    }
}