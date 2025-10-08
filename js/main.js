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
        
        // Observe all elements with fade-in class
        const animatedElements = document.querySelectorAll('.fade-in');
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
            "nav": {
                "candidateName": "Abeer Annab",
                "home": "Home",
                "about": "About",
                "priorities": "Priorities",
                "getInvolved": "Get Involved",
                "voteInfo": "Vote Info",
                "contact": "Contact"
            },
            "hero": {
                "electionBanner": "🗳️ Malden General Election – Tuesday, November 4, 2025 • Polls open 7:00 AM – 8:00 PM",
                "name": "Abeer Annab",
                "position": "For Malden School Committee — Ward 4",
                "tagline": "Strong schools. Inclusive communities. Real results."
            },
            "cta": {
                "volunteer": "Volunteer",
                "donate": "Donate",
                "learnMore": "Learn More"
            },
            "about": {
                "title": "About Abeer",
                "subtitle": "For Malden School Committee, Ward 4 — Dedicated to Every Student's Success",
                "bio": "Abeer Annab has lived in Malden for 25 years and has spent that time supporting local families and strengthening community ties. She is running for the Malden School Committee (Ward 4) to represent families, advocate for students, and tackle the real challenges facing Malden Public Schools. Abeer believes in transparent leadership and practical solutions.",
                "highlight1": "Student success — better curriculum, focused support, and programs that help students thrive.",
                "highlight2": "Mental health — more counselors, staff training, and stigma-free support.",
                "highlight3": "Address staffing shortages — quicker hiring, better retention, and more student-facing staff."
            },
            "priorities": {
                "title": "Priorities",
                "priority1": {
                    "title": "Academic Excellence for All Students",
                    "description": "Support academic excellence through strong curriculum, targeted interventions, and programs that engage every learner."
                },
                "priority2": {
                    "title": "Mental Health and Wellness",
                    "description": "Ensure schools provide accessible mental health resources, increase counselor staffing, and run regular awareness programs to remove stigma."
                },
                "priority3": {
                    "title": "Safe and Supportive Schools",
                    "description": "Strengthen safety measures, improve communication between families and schools, and create inclusive environments where all students can learn."
                },
                "priority4": {
                    "title": "Community and Family Engagement",
                    "description": "Increase parent involvement, expand language access, and ensure families can participate meaningfully in school decisions."
                },
                "priority5": {
                    "title": "Public Safety & City Collaboration",
                    "description": "Advocate for improved safety measures around schools, better lighting, and stronger partnerships between the district and city services."
                },
                "priority6": {
                    "title": "Affordability and Housing Stability",
                    "description": "Support policies that help families achieve housing stability and access basic needs, because students learn best when their homes are secure."
                },
                "priority7": {
                    "title": "Halal Meal Options & Recognition of Muslim Holidays",
                    "description": "Work toward consistent access to halal meals for Muslim students and recognizing Muslim holidays like Eid on the school calendar so students don't have to choose between faith and education."
                }
            },
            "community": {
                "title": "In The Community",
                "intro": "Working together with families, students, and community members to make Malden schools stronger."
            },
            "getInvolved": {
                "title": "Get Involved",
                "intro": "Join the campaign: volunteer, host a meet-and-greet, or help with phone banking. Small actions make a big difference.",
                "formTitle": "Sign Up to Help"
            },
            "voteInfo": {
                "title": "Vote Info",
                "preliminary": {
                    "title": "Preliminary Election",
                    "date": "Tuesday, September 16, 2025",
                    "eligibility": "Only registered voters in Wards 4 and 6 vote in the preliminary election."
                },
                "general": {
                    "title": "General Election",
                    "date": "Tuesday, November 4, 2025",
                    "hours": "Polls open: 7:00 AM – 8:00 PM"
                },
                "resources": "If you need a mail-in ballot or want to find your polling location, contact the Malden City Clerk or visit the Secretary of the Commonwealth's website.",
                "links": {
                    "secretary": "Secretary of the Commonwealth",
                    "clerk": "Malden City Clerk"
                }
            },
            "contact": {
                "title": "Contact",
                "email": "Email: info@abeerformalden.org",
                "phone": "Phone:"
            },
            "footer": {
                "disclaimer": "Paid for by the Committee to Elect Abeer Annab.",
                "copyright": "© 2025 Committee to Elect Abeer Annab."
            }
        },
        "es": {
            "nav": {
                "candidateName": "Abeer Annab",
                "home": "Inicio",
                "about": "Acerca de",
                "priorities": "Prioridades",
                "getInvolved": "Participa",
                "voteInfo": "Información de Voto",
                "contact": "Contacto"
            },
            "hero": {
                "electionBanner": "🗳️ Elección General de Malden – Martes, 4 de noviembre de 2025 • Las urnas abren de 7:00 AM a 8:00 PM",
                "name": "Abeer Annab",
                "position": "Para el Comité Escolar de Malden — Distrito 4",
                "tagline": "Escuelas fuertes. Comunidades inclusivas. Resultados reales."
            },
            "cta": {
                "volunteer": "Voluntario",
                "donate": "Donar",
                "learnMore": "Más Información"
            },
            "about": {
                "title": "Acerca de Abeer",
                "subtitle": "Para el Comité Escolar de Malden, Distrito 4 — Dedicada al Éxito de Cada Estudiante",
                "bio": "Abeer Annab ha vivido en Malden durante 25 años y ha dedicado ese tiempo a apoyar a las familias locales y fortalecer los lazos comunitarios. Se postula para el Comité Escolar de Malden (Distrito 4) para representar a las familias, abogar por los estudiantes y enfrentar los desafíos reales que enfrentan las Escuelas Públicas de Malden. Abeer cree en el liderazgo transparente y las soluciones prácticas.",
                "highlight1": "Éxito estudiantil — mejor currículo, apoyo enfocado y programas que ayuden a los estudiantes a prosperar.",
                "highlight2": "Salud mental — más consejeros, capacitación del personal y apoyo sin estigma.",
                "highlight3": "Abordar la escasez de personal — contratación más rápida, mejor retención y más personal de cara a los estudiantes."
            },
            "priorities": {
                "title": "Prioridades",
                "priority1": {
                    "title": "Excelencia Académica para Todos los Estudiantes",
                    "description": "Apoyar la excelencia académica a través de un currículo sólido, intervenciones específicas y programas que involucren a todos los estudiantes."
                },
                "priority2": {
                    "title": "Salud Mental y Bienestar",
                    "description": "Asegurar que las escuelas proporcionen recursos de salud mental accesibles, aumenten el personal de consejeros y realicen programas regulares de concientización para eliminar el estigma."
                },
                "priority3": {
                    "title": "Escuelas Seguras y Solidarias",
                    "description": "Fortalecer las medidas de seguridad, mejorar la comunicación entre las familias y las escuelas, y crear entornos inclusivos donde todos los estudiantes puedan aprender."
                },
                "priority4": {
                    "title": "Participación Comunitaria y Familiar",
                    "description": "Aumentar la participación de los padres, expandir el acceso a idiomas y asegurar que las familias puedan participar significativamente en las decisiones escolares."
                },
                "priority5": {
                    "title": "Seguridad Pública y Colaboración Municipal",
                    "description": "Abogar por medidas de seguridad mejoradas alrededor de las escuelas, mejor iluminación y asociaciones más fuertes entre el distrito y los servicios de la ciudad."
                },
                "priority6": {
                    "title": "Asequibilidad y Estabilidad de Vivienda",
                    "description": "Apoyar políticas que ayuden a las familias a lograr estabilidad de vivienda y acceso a necesidades básicas, porque los estudiantes aprenden mejor cuando sus hogares son seguros."
                },
                "priority7": {
                    "title": "Opciones de Comidas Halal y Reconocimiento de Festividades Musulmanas",
                    "description": "Trabajar hacia el acceso consistente a comidas halal para estudiantes musulmanes y reconocer festividades musulmanas como Eid en el calendario escolar para que los estudiantes no tengan que elegir entre fe y educación."
                }
            },
            "community": {
                "title": "En La Comunidad",
                "intro": "Trabajando juntos con familias, estudiantes y miembros de la comunidad para fortalecer las escuelas de Malden."
            },
            "getInvolved": {
                "title": "Participa",
                "intro": "Únete a la campaña: sé voluntario, organiza una reunión o ayuda con llamadas telefónicas. Las pequeñas acciones hacen una gran diferencia.",
                "formTitle": "Regístrate para Ayudar"
            },
            "voteInfo": {
                "title": "Información de Voto",
                "preliminary": {
                    "title": "Elección Preliminar",
                    "date": "Martes, 16 de septiembre de 2025",
                    "eligibility": "Solo los votantes registrados en los Distritos 4 y 6 votan en la elección preliminar."
                },
                "general": {
                    "title": "Elección General",
                    "date": "Martes, 4 de noviembre de 2025",
                    "hours": "Las urnas abren: 7:00 AM – 8:00 PM"
                },
                "resources": "Si necesita una boleta por correo o desea encontrar su lugar de votación, comuníquese con el Secretario Municipal de Malden o visite el sitio web del Secretario del Commonwealth.",
                "links": {
                    "secretary": "Secretario del Commonwealth",
                    "clerk": "Secretario Municipal de Malden"
                }
            },
            "contact": {
                "title": "Contacto",
                "email": "Correo: info@abeerformalden.org",
                "phone": "Teléfono:"
            },
            "footer": {
                "disclaimer": "Pagado por el Comité para Elegir a Abeer Annab.",
                "copyright": "© 2025 Comité para Elegir a Abeer Annab."
            }
        },
        "ar": {
            "nav": {
                "candidateName": "عبير عناب",
                "home": "الرئيسية",
                "about": "نبذة عني",
                "priorities": "الأولويات",
                "getInvolved": "شارك معنا",
                "voteInfo": "معلومات التصويت",
                "contact": "اتصل بنا"
            },
            "hero": {
                "electionBanner": "🗳️ الانتخابات العامة في مالدن – الثلاثاء 4 نوفمبر 2025 • مراكز الاقتراع مفتوحة من 7:00 صباحاً إلى 8:00 مساءً",
                "name": "عبير عناب",
                "position": "للجنة المدارس في مالدن — الدائرة 4",
                "tagline": "مدارس قوية. مجتمعات شاملة. نتائج حقيقية."
            },
            "cta": {
                "volunteer": "تطوع",
                "donate": "تبرع",
                "learnMore": "اعرف المزيد"
            },
            "about": {
                "title": "نبذة عن عبير",
                "subtitle": "للجنة المدارس في مالدن، الدائرة 4 — مكرسة لنجاح كل طالب",
                "bio": "عبير عناب عاشت في مالدن لمدة 25 عاماً وقضت ذلك الوقت في دعم العائلات المحلية وتعزيز الروابط المجتمعية. إنها تترشح للجنة المدارس في مالدن (الدائرة 4) لتمثيل العائلات والدفاع عن الطلاب ومعالجة التحديات الحقيقية التي تواجه مدارس مالدن العامة. تؤمن عبير بالقيادة الشفافة والحلول العملية.",
                "highlight1": "نجاح الطلاب — منهج أفضل، ودعم مركز، وبرامج تساعد الطلاب على الازدهار.",
                "highlight2": "الصحة النفسية — المزيد من المستشارين، وتدريب الموظفين، ودعم خالٍ من وصمة العار.",
                "highlight3": "معالجة نقص الموظفين — توظيف أسرع، واستبقاء أفضل، والمزيد من الموظفين المتعاملين مع الطلاب."
            },
            "priorities": {
                "title": "الأولويات",
                "priority1": {
                    "title": "التميز الأكاديمي لجميع الطلاب",
                    "description": "دعم التميز الأكاديمي من خلال منهج قوي وتدخلات مستهدفة وبرامج تشرك كل متعلم."
                },
                "priority2": {
                    "title": "الصحة النفسية والعافية",
                    "description": "ضمان توفير المدارس لموارد الصحة النفسية التي يسهل الوصول إليها، وزيادة عدد المستشارين، وإجراء برامج توعية منتظمة لإزالة وصمة العار."
                },
                "priority3": {
                    "title": "مدارس آمنة وداعمة",
                    "description": "تعزيز تدابير السلامة، وتحسين التواصل بين العائلات والمدارس، وخلق بيئات شاملة حيث يمكن لجميع الطلاب التعلم."
                },
                "priority4": {
                    "title": "المشاركة المجتمعية والعائلية",
                    "description": "زيادة مشاركة الآباء، وتوسيع الوصول اللغوي، وضمان قدرة العائلات على المشاركة بشكل هادف في قرارات المدرسة."
                },
                "priority5": {
                    "title": "السلامة العامة والتعاون مع المدينة",
                    "description": "الدفاع عن تحسين تدابير السلامة حول المدارس، وإضاءة أفضل، وشراكات أقوى بين المنطقة وخدمات المدينة."
                },
                "priority6": {
                    "title": "القدرة على تحمل التكاليف واستقرار الإسكان",
                    "description": "دعم السياسات التي تساعد العائلات على تحقيق استقرار الإسكان والوصول إلى الاحتياجات الأساسية، لأن الطلاب يتعلمون بشكل أفضل عندما تكون منازلهم آمنة."
                },
                "priority7": {
                    "title": "خيارات الوجبات الحلال والاعتراف بالأعياد الإسلامية",
                    "description": "العمل نحو الوصول المستمر إلى وجبات الحلال للطلاب المسلمين والاعتراف بالأعياد الإسلامية مثل العيد في التقويم المدرسي حتى لا يضطر الطلاب للاختيار بين الإيمان والتعليم."
                }
            },
            "community": {
                "title": "في المجتمع",
                "intro": "العمل معاً مع العائلات والطلاب وأفراد المجتمع لجعل مدارس مالدن أقوى."
            },
            "getInvolved": {
                "title": "شارك معنا",
                "intro": "انضم إلى الحملة: تطوع، استضف لقاءً، أو ساعد في الاتصالات الهاتفية. الأعمال الصغيرة تحدث فرقاً كبيراً.",
                "formTitle": "سجل للمساعدة"
            },
            "voteInfo": {
                "title": "معلومات التصويت",
                "preliminary": {
                    "title": "الانتخابات التمهيدية",
                    "date": "الثلاثاء، 16 سبتمبر 2025",
                    "eligibility": "فقط الناخبون المسجلون في الدوائر 4 و 6 يصوتون في الانتخابات التمهيدية."
                },
                "general": {
                    "title": "الانتخابات العامة",
                    "date": "الثلاثاء، 4 نوفمبر 2025",
                    "hours": "مراكز الاقتراع مفتوحة: 7:00 صباحاً – 8:00 مساءً"
                },
                "resources": "إذا كنت بحاجة إلى بطاقة اقتراع بالبريد أو تريد العثور على موقع الاقتراع الخاص بك، اتصل بكاتب مدينة مالدن أو قم بزيارة موقع أمين الكومنولث.",
                "links": {
                    "secretary": "أمين الكومنولث",
                    "clerk": "كاتب مدينة مالدن"
                }
            },
            "contact": {
                "title": "اتصل بنا",
                "email": "البريد الإلكتروني: info@abeerformalden.org",
                "phone": "الهاتف:"
            },
            "footer": {
                "disclaimer": "مدفوع من قبل اللجنة لانتخاب عبير عناب.",
                "copyright": "© 2025 اللجنة لانتخاب عبير عناب."
            }
        },
        "zh": {
            "nav": {
                "candidateName": "Abeer Annab",
                "home": "首页",
                "about": "关于",
                "priorities": "优先事项",
                "getInvolved": "参与其中",
                "voteInfo": "投票信息",
                "contact": "联系方式"
            },
            "hero": {
                "electionBanner": "🗳️ 莫尔登市大选 – 2025年11月4日星期二 • 投票站开放时间：上午7:00 – 晚上8:00",
                "name": "Abeer Annab",
                "position": "莫尔登学校委员会 — 第4选区",
                "tagline": "强大的学校。包容的社区。真实的成果。"
            },
            "cta": {
                "volunteer": "志愿者",
                "donate": "捐款",
                "learnMore": "了解更多"
            },
            "about": {
                "title": "关于 Abeer",
                "subtitle": "莫尔登学校委员会，第4选区 — 致力于每个学生的成功",
                "bio": "Abeer Annab 在莫尔登生活了25年，这段时间她一直支持当地家庭并加强社区联系。她竞选莫尔登学校委员会（第4选区）是为了代表家庭、为学生发声，并解决莫尔登公立学校面临的实际挑战。Abeer 相信透明的领导和实际的解决方案。",
                "highlight1": "学生成功 — 更好的课程、针对性支持和帮助学生茁壮成长的项目。",
                "highlight2": "心理健康 — 更多辅导员、员工培训和无污名化的支持。",
                "highlight3": "解决人员短缺 — 更快的招聘、更好的留用和更多面向学生的员工。"
            },
            "priorities": {
                "title": "优先事项",
                "priority1": {
                    "title": "为所有学生提供卓越的学术教育",
                    "description": "通过强大的课程、有针对性的干预措施和吸引每个学习者的项目来支持学术卓越。"
                },
                "priority2": {
                    "title": "心理健康与福祉",
                    "description": "确保学校提供可及的心理健康资源，增加辅导员人员配备，并定期开展宣传活动以消除污名化。"
                },
                "priority3": {
                    "title": "安全和支持性的学校",
                    "description": "加强安全措施，改善家庭与学校之间的沟通，并创建包容性环境，让所有学生都能学习。"
                },
                "priority4": {
                    "title": "社区和家庭参与",
                    "description": "增加家长参与，扩大语言访问，并确保家庭能够有意义地参与学校决策。"
                },
                "priority5": {
                    "title": "公共安全与城市合作",
                    "description": "倡导改善学校周边的安全措施、更好的照明以及学区与城市服务之间更强大的合作伙伴关系。"
                },
                "priority6": {
                    "title": "负担能力和住房稳定性",
                    "description": "支持帮助家庭实现住房稳定和获得基本需求的政策，因为学生在家庭安全时学习效果最好。"
                },
                "priority7": {
                    "title": "清真餐选项和承认穆斯林节日",
                    "description": "努力为穆斯林学生提供持续获得清真餐的途径，并在学校日历上承认像开斋节这样的穆斯林节日，这样学生就不必在信仰和教育之间做出选择。"
                }
            },
            "community": {
                "title": "在社区中",
                "intro": "与家庭、学生和社区成员共同努力，让莫尔登学校更强大。"
            },
            "getInvolved": {
                "title": "参与其中",
                "intro": "加入竞选活动：做志愿者、举办见面会或帮助电话拉票。小行动会产生大影响。",
                "formTitle": "注册帮助"
            },
            "voteInfo": {
                "title": "投票信息",
                "preliminary": {
                    "title": "初选",
                    "date": "2025年9月16日星期二",
                    "eligibility": "只有第4和第6选区的注册选民在初选中投票。"
                },
                "general": {
                    "title": "大选",
                    "date": "2025年11月4日星期二",
                    "hours": "投票站开放时间：上午7:00 – 晚上8:00"
                },
                "resources": "如果您需要邮寄选票或想找到您的投票站位置，请联系莫尔登市书记员或访问联邦秘书网站。",
                "links": {
                    "secretary": "联邦秘书",
                    "clerk": "莫尔登市书记员"
                }
            },
            "contact": {
                "title": "联系方式",
                "email": "电子邮件：info@abeerformalden.org",
                "phone": "电话："
            },
            "footer": {
                "disclaimer": "由选举 Abeer Annab 委员会支付。",
                "copyright": "© 2025 选举 Abeer Annab 委员会。"
            }
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