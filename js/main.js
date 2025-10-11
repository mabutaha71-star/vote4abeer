// ===================================
// Abeer Annab Campaign Website - Main JavaScript
// ===================================

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMobile = document.querySelector('.nav-mobile');
    const scrollProgress = document.getElementById('scroll-progress');
    const langButtons = document.querySelectorAll('.lang-btn');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // ===================================
    // Smooth Scrolling Navigation
    // ===================================
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMobile.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    function toggleMobileMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMobile.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }

    function initMobileMenu() {
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
            
            // Close menu when clicking mobile nav links
            const mobileNavLinks = navMobile.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMobile.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                });
            });
        }
    }

    // ===================================
    // Scroll Progress Indicator
    // ===================================
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    }

    // ===================================
    // Header Shadow on Scroll
    // ===================================
    function updateHeaderShadow() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ===================================
    // Active Navigation State
    // ===================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav links
                document.querySelectorAll(`nav a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }

    // ===================================
    // Scroll Animations with Intersection Observer
    // ===================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all elements with fade-in class and policy blocks
        const animatedElements = document.querySelectorAll('.fade-in, .policy-block');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===================================
    // Multi-Language Support
    // ===================================
    let currentLanguage = 'en';
    let translations = {};

    // Embedded translations to avoid CORS issues with file:// protocol
    const translationsData = {
        "en": {
            "nav": { "candidateName": "Abeer Annab", "home": "Home", "about": "About", "priorities": "Priorities", "getInvolved": "Get Involved", "voteInfo": "Vote Info", "contact": "Contact" },
            "hero": { "electionBanner": "Malden General Election – Tuesday, November 4, 2025 • Polls open 7:00 AM – 8:00 PM", "name": "Abeer Annab", "position": "For Malden School Committee — Ward 4", "tagline": "Strong schools. Inclusive communities. Real results." },
            "cta": { "volunteer": "Volunteer", "donate": "Donate" },
            "priorities": { "title": "Priorities" },
            "policies": { "title": "Policies", "policy1": { "title": "Fully Funded, Student-First Schools", "body": "Malden is navigating a serious fiscal crunch. I will fight for fully funded public schools and work to avoid educator layoffs." }, "policy2": { "title": "Cell Phones: A Balanced, Community-Driven Approach", "body": "A statewide bell-to-bell cell-phone policy is moving forward; local communities will shape implementation." } },
            "voteInfo": { "title": "Vote Info", "preliminary": { "title": "Preliminary Election", "eligibility": "Only registered voters in Wards 4 and 6 vote in the preliminary election." }, "general": { "title": "General Election", "date": "Tuesday, November 4, 2025", "hours": "Polls open: 7:00 AM – 8:00 PM" }, "resources": "If you need a mail-in ballot or want to find your polling location, contact the Malden City Clerk or visit the Secretary of the Commonwealth's website.", "links": { "secretary": "Secretary of the Commonwealth", "clerk": "Malden City Clerk" } }
        },
        "es": {
            "nav": { "candidateName": "Abeer Annab", "home": "Inicio", "about": "Acerca de", "priorities": "Prioridades", "getInvolved": "Participa", "voteInfo": "Información de Voto", "contact": "Contacto" },
            "hero": { "electionBanner": "Elección General de Malden – Martes, 4 de noviembre de 2025 • Las urnas abren de 7:00 AM a 8:00 PM", "name": "Abeer Annab", "position": "Para el Comité Escolar de Malden — Distrito 4", "tagline": "Escuelas fuertes. Comunidades inclusivas. Resultados reales." },
            "cta": { "volunteer": "Voluntario", "donate": "Donar" },
            "priorities": { "title": "Prioridades" },
            "policies": { "title": "Políticas", "policy1": { "title": "Escuelas totalmente financiadas y centradas en los estudiantes", "body": "Malden está atravesando una grave crisis fiscal. Lucharé por escuelas públicas totalmente financiadas." }, "policy2": { "title": "Teléfonos móviles: un enfoque equilibrado", "body": "Una política estatal bell-to-bell está en marcha; las comunidades locales darán forma a la implementación." } },
            "voteInfo": { "title": "Información de Voto", "preliminary": { "title": "Elección Preliminar", "eligibility": "Solo los votantes registrados en los Distritos 4 y 6 votan en la elección preliminar." }, "general": { "title": "Elección General", "date": "Tuesday, November 4, 2025", "hours": "Las urnas abren: 7:00 AM – 8:00 PM" }, "resources": "Si necesita una boleta por correo o desea encontrar su lugar de votación, comuníquese con el Secretario Municipal de Malden o visite el sitio web del Secretario del Commonwealth.", "links": { "secretary": "Secretary of the Commonwealth", "clerk": "Malden City Clerk" } }
        },
        "ar": {
            "nav": { "candidateName": "عبير عناب", "home": "الرئيسية", "about": "نبذة عني", "priorities": "الأولويات", "getInvolved": "شارك معنا", "voteInfo": "معلومات التصويت", "contact": "اتصل بنا" },
            "hero": { "electionBanner": "الانتخابات العامة في مالدن – الثلاثاء 4 نوفمبر 2025 • مراكز الاقتراع مفتوحة من 7:00 صباحاً إلى 8:00 مساءً", "name": "عبير عناب", "position": "للجنة المدارس في مالدن — الدائرة 4", "tagline": "مدارس قوية. مجتمعات شاملة. نتائج حقيقية." },
            "cta": { "volunteer": "تطوع", "donate": "تبرع" },
            "priorities": { "title": "الأولويات" },
            "policies": { "title": "السياسات", "policy1": { "title": "مدارس ممولة بالكامل وتركز على الطلاب", "body": "تواجه مالدن أزمة مالية خطيرة. سأدافع عن تمويل المدارس العامة بالكامل." }, "policy2": { "title": "الهواتف المحمولة: نهج متوازن", "body": "هناك سياسة من \"الجرس إلى الجرس\" قيد التقدم؛ ستشكل المجتمعات المحلية كيفية التنفيذ." } },
            "voteInfo": { "title": "معلومات التصويت", "preliminary": { "title": "الانتخابات التمهيدية", "eligibility": "فقط الناخبون المسجلون في الدوائر 4 و 6 يصوتون في الانتخابات التمهيدية." }, "general": { "title": "الانتخابات العامة", "date": "الثلاثاء، 4 نوفمبر 2025", "hours": "مراكز الاقتراع مفتوحة: 7:00 صباحاً – 8:00 مساءً" }, "resources": "إذا كنت بحاجة إلى بطاقة اقتراع بالبريد أو تريد العثور على موقع الاقتراع الخاص بك، اتصل بكاتب مدينة مالدن أو قم بزيارة موقع أمين الكومنولث.", "links": { "secretary": "أمين الكومنولث", "clerk": "كاتب مدينة مالدن" } }
        },
        "zh": {
            "nav": { "candidateName": "阿比尔·安纳卜", "home": "首页", "about": "关于", "priorities": "优先事项", "getInvolved": "参与其中", "voteInfo": "投票信息", "contact": "联系方式" },
            "hero": { "electionBanner": "莫尔登市大选 – 2025年11月4日 星期二 • 投票站开放时间：上午7:00 – 晚上8:00", "name": "阿比尔·安纳卜", "position": "莫尔登学校委员会 — 第4选区", "tagline": "强大的学校。包容的社区。真实的成果。" },
            "cta": { "volunteer": "志愿者", "donate": "捐款" },
            "priorities": { "title": "优先事项" },
            "policies": { "title": "政策", "policy1": { "title": "为学生优先、充分资助的学校", "body": "Malden 正在经历财政压力。我将争取为公立学校提供充分资金。" }, "policy2": { "title": "手机：平衡的方案", "body": "全州范围的铃响到铃响政策正在推进，地方社区将决定如何实施。" } },
            "voteInfo": { "title": "投票信息", "preliminary": { "title": "初选", "eligibility": "只有第4和第6选区的注册选民在初选中投票。" }, "general": { "title": "大选", "date": "2025年11月4日星期二", "hours": "投票站开放时间：上午7:00 – 晚上8:00" }, "resources": "如果您需要邮寄选票或想找到您的投票站位置，请联系莫尔登市书记员或访问联邦秘书网站。", "links": { "secretary": "联邦秘书", "clerk": "莫尔登市书记员" } }
        }
    };
    

    function loadLanguage(lang) {
        try {
            // Use embedded translations instead of fetch to avoid CORS issues
            if (!translationsData[lang]) {
                throw new Error(`Translation data not found for language: ${lang}`);
            }
            
            translations = translationsData[lang];
            currentLanguage = lang;
            
            // Apply translations to DOM
            applyTranslations();
            
            // Update HTML lang and dir attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
            
            // Store language preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Update active language button
            updateLanguageButtons(lang);
            
        } catch (error) {
            console.error('Error loading language:', error);
            // Fallback to English if language fails to load
            if (lang !== 'en') {
                loadLanguage('en');
            }
        }
    }

    function applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getNestedTranslation(key);
            
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    function getNestedTranslation(key) {
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    function updateLanguageButtons(lang) {
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function initLanguageSwitcher() {
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                loadLanguage(lang);
            });
        });
        
        // Load saved language or default to English
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        loadLanguage(savedLanguage);
    }

    // ===================================
    // Analytics Event Tracking
    // ===================================
    function initAnalytics() {
        // Track donate button clicks
        const donateButtons = document.querySelectorAll('.btn-donate');
        donateButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'donate_click', {
                        'event_category': 'engagement',
                        'event_label': 'ActBlue Donation'
                    });
                }
            });
        });
        
        // Track social media clicks
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.getAttribute('aria-label');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'social_click', {
                        'event_category': 'engagement',
                        'event_label': platform
                    });
                }
            });
        });
        
        // Track volunteer button clicks
        const volunteerButtons = document.querySelectorAll('.btn-primary');
        volunteerButtons.forEach(btn => {
            if (btn.textContent.includes('Volunteer') || btn.getAttribute('data-translate') === 'cta.volunteer') {
                btn.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'volunteer_click', {
                            'event_category': 'engagement',
                            'event_label': 'Volunteer Sign-up'
                        });
                    }
                });
            }
        });
    }

    // ===================================
    // Community Gallery Slider
    // ===================================
    function initGallerySlider() {
        const slider = document.getElementById('gallerySlider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.gallery-slide');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        const dots = document.querySelectorAll('.dot');
        
        let currentSlide = 0;
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 seconds
        
        function updateSlider(index) {
            // Update slider position
            slider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            updateSlider(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider(prev);
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, autoplayDelay);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual navigation
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                startAutoplay();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
                stopAutoplay();
                startAutoplay();
            });
        });
        
        // Pause autoplay on hover
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', stopAutoplay);
            galleryContainer.addEventListener('mouseleave', startAutoplay);
        }
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                stopAutoplay();
                startAutoplay();
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard events when gallery is in view
            const gallerySection = document.getElementById('community');
            if (!gallerySection) return;
            
            const rect = gallerySection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isInView) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    stopAutoplay();
                    startAutoplay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    stopAutoplay();
                    startAutoplay();
                }
            }
        });
        
        // Start autoplay
        startAutoplay();
        
        // Initialize first slide
        updateSlider(0);
    }

    // ===================================
    // Scroll Event Listener (Throttled)
    // ===================================
    let scrollTimeout;
    function handleScroll() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateScrollProgress();
                updateHeaderShadow();
                updateActiveNavLink();
                scrollTimeout = null;
            }, 10);
        }
    }

    // ===================================
    // Initialize All Features
    // ===================================
    function init() {
        // Initialize smooth scrolling
        initSmoothScroll();
        
        // Initialize mobile menu
        initMobileMenu();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize language switcher
        initLanguageSwitcher();
        
        // Initialize analytics tracking
        initAnalytics();
        
        // Initialize community gallery slider
        initGallerySlider();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Initial calls
        updateScrollProgress();
        updateHeaderShadow();
        updateActiveNavLink();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Close mobile menu on resize to desktop
                if (window.innerWidth >= 768 && navMobile.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }, 250);
        });
    }

    // ===================================
    // Run on DOM Content Loaded
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();