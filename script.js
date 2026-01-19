// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片轮播
    initImageSliders();
    
    // 初始化解说词标签页
    initCommentaryTabs();
    
    // 初始化响应式导航菜单
    initMobileNav();
    
    // 初始化平滑滚动
    initSmoothScroll();
});

// 图片轮播功能
function initImageSliders() {
    // 获取所有图片轮播容器
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('img');
        const prevBtn = slider.parentElement.querySelector('.prev-btn');
        const nextBtn = slider.parentElement.querySelector('.next-btn');
        let currentIndex = 0;
        let slideInterval;
        
        // 显示当前图片
        function showImage(index) {
            // 隐藏所有图片
            images.forEach(img => img.classList.remove('active'));
            // 显示当前图片
            images[index].classList.add('active');
            currentIndex = index;
        }
        
        // 下一张图片
        function nextImage() {
            let newIndex = currentIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            showImage(newIndex);
        }
        
        // 上一张图片
        function prevImage() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            }
            showImage(newIndex);
        }
        
        // 自动播放
        function startAutoPlay() {
            slideInterval = setInterval(nextImage, 5000);
        }
        
        // 停止自动播放
        function stopAutoPlay() {
            clearInterval(slideInterval);
        }
        
        // 事件监听
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextImage();
            startAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevImage();
            startAutoPlay();
        });
        
        // 鼠标悬停时停止自动播放
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // 开始自动播放
        startAutoPlay();
    });
}

// 解说词标签页功能
function initCommentaryTabs() {
    // 获取所有标签页容器
    const tabContainers = document.querySelectorAll('.commentary-tabs');
    
    tabContainers.forEach(tabContainer => {
        const tabBtns = tabContainer.querySelectorAll('.tab-btn');
        const tabPanels = tabContainer.nextElementSibling.querySelectorAll('.tab-panel');
        
        // 切换标签页
        function switchTab(tabId) {
            // 移除所有按钮的active类
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // 移除所有面板的active类
            tabPanels.forEach(panel => panel.classList.remove('active'));
            // 激活当前按钮和面板
            document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }
        
        // 事件监听
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
    });
}

// 响应式导航菜单功能
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 切换导航菜单
    function toggleNav() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // 点击汉堡菜单按钮
    hamburger.addEventListener('click', toggleNav);
    
    // 点击导航链接时关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const scrollPosition = offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 窗口滚动事件
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // 滚动时改变导航栏样式
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(45, 90, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(45, 90, 39, 1)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// 图片懒加载（可选）
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    }
}