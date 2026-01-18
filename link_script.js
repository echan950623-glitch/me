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

    // --- 主題切換功能 ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 從localStorage讀取保存的主題設置，如果沒有則默認為深色模式
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // 應用保存的主題
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    // 主題切換函數
    function toggleTheme() {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        
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