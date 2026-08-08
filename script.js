/* =========================================================
   OMAR ELSERGANY — PREMIUM PORTFOLIO
   script.js
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       HELPERS
    ===================================================== */
    const $ = (selector, parent = document) =>
        parent.querySelector(selector);
    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];
    /* =====================================================
       PRELOADER
    ===================================================== */
    const preloader = $("#preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader?.classList.add("hide");
        }, 900);
    });
    /* =====================================================
       CURRENT YEAR
    ===================================================== */
    const year = $("#year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
    /* =====================================================
       HEADER SCROLL
    ===================================================== */
    const header = $(".header");
    const handleHeader = () => {
        if (window.scrollY > 30) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleHeader);
    handleHeader();
    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */
    const progress = $(".scroll-progress span");
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;
        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;
        if (progress) {
            progress.style.width = `${percentage}%`;
        }
    };
    window.addEventListener("scroll", updateProgress);
    /* =====================================================
       MOBILE MENU
    ===================================================== */
    const mobileMenu = $(".mobile-menu");
    const menuBtn = $(".menu-btn");
    const mobileClose = $(".mobile-close");
    const openMobileMenu = () => {
        mobileMenu?.classList.add("open");
        document.body.style.overflow = "hidden";
    };
    const closeMobileMenu = () => {
        mobileMenu?.classList.remove("open");
        document.body.style.overflow = "";
    };
    menuBtn?.addEventListener("click", openMobileMenu);
    mobileClose?.addEventListener("click", closeMobileMenu);
    $$(".mobile-menu a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */
    const sections = $$("section[id]");
    const navLinks = $$(".nav-link");
    const updateActiveNav = () => {
        const current = window.scrollY + 180;
        let currentId = "";
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (
                current >= top &&
                current < top + height
            ) {
                currentId = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", updateActiveNav);
    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId =
                link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target =
                document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
    /* =====================================================
       TYPING EFFECT
    ===================================================== */
    const typingElement = $(".typing-text");
    const roles = [
        "Full Stack Web Developer",
        "Frontend Developer",
        "Creative Web Developer",
        "JavaScript Developer",
        "UI/UX Enthusiast",
        "Future Cybersecurity Specialist"
    ];
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typingSpeed = 85;
    const deletingSpeed = 45;
    const pauseAfterTyping = 1600;
    function typeRole() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];
        if (!deleting) {
            characterIndex++;
            typingElement.textContent =
                currentRole.substring(0, characterIndex);
            if (characterIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeRole, pauseAfterTyping);
                return;
            }
        } else {
            characterIndex--;
            typingElement.textContent =
                currentRole.substring(0, characterIndex);
            if (characterIndex === 0) {
                deleting = false;
                roleIndex =
                    (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(
            typeRole,
            deleting ? deletingSpeed : typingSpeed
        );
    }
    typeRole();
    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */
    const revealElements = $$(".reveal");
    const revealObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.12
            }
        );
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    /* =====================================================
       SKILL BARS
    ===================================================== */
    const skillBars = $$(".skill-bar span");
    const skillObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const bar = entry.target;
                    const width =
                        bar.dataset.width ||
                        bar.getAttribute("data-width");
                    if (width) {
                        bar.style.width = width;
                    }
                    skillObserver.unobserve(bar);
                });
            },
            {
                threshold: .5
            }
        );
    skillBars.forEach(bar => {
        const originalWidth =
            bar.style.width;
        if (
            originalWidth &&
            !bar.dataset.width
        ) {
            bar.dataset.width = originalWidth;
        }
        bar.style.width = "0%";
        skillObserver.observe(bar);
    });
    /* =====================================================
       COUNTERS
    ===================================================== */
    const counters = $$(".counter");
    const animateCounter = element => {
        const target =
            Number(
                element.dataset.target ||
                element.textContent
            );
        let current = 0;
        const duration = 1500;
        const startTime = performance.now();
        const update = currentTime => {
            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );
            const eased =
                1 - Math.pow(1 - progress, 3);
            current =
                Math.floor(target * eased);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };
        requestAnimationFrame(update);
    };
    const counterObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    animateCounter(entry.target);
                    counterObserver.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: .7
            }
        );
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    /* =====================================================
       PROJECT FILTER
    ===================================================== */
    const filters = $$(".filter");
    const projects = $$(".project-card");
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(item =>
                item.classList.remove("active")
            );
            filter.classList.add("active");
            const category =
                filter.dataset.filter;
            projects.forEach(project => {
                const projectCategory =
                    project.dataset.category;
                if (
                    category === "all" ||
                    projectCategory === category
                ) {
                    project.classList.remove("hide");
                    setTimeout(() => {
                        project.style.opacity = "1";
                        project.style.transform =
                            "translateY(0)";
                    }, 10);
                } else {
                    project.style.opacity = "0";
                    project.style.transform =
                        "translateY(15px)";
                    setTimeout(() => {
                        project.classList.add("hide");
                    }, 250);
                }
            });
        });
    });
    /* =====================================================
       BACK TO TOP
    ===================================================== */
    const backToTop = $(".back-to-top");
    const handleBackToTop = () => {
        if (window.scrollY > 700) {
            backToTop?.classList.add("show");
        } else {
            backToTop?.classList.remove("show");
        }
    };
    window.addEventListener(
        "scroll",
        handleBackToTop
    );
    backToTop?.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
    /* =====================================================
       THEME TOGGLE
    ===================================================== */
    const themeToggle = $("#themeToggle");
    const savedTheme =
        localStorage.getItem("omar-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
    const updateThemeIcon = () => {
        if (!themeToggle) return;
        const icon =
            $("i", themeToggle);
        if (!icon) return;
        icon.className =
            document.body.classList.contains("light")
                ? "fa-solid fa-moon"
                : "fa-solid fa-sun";
    };
    updateThemeIcon();
    themeToggle?.addEventListener(
        "click",
        () => {
            document.body.classList.toggle("light");
            localStorage.setItem(
                "omar-theme",
                document.body.classList.contains("light")
                    ? "light"
                    : "dark"
            );
            updateThemeIcon();
            showToast(
                document.body.classList.contains("light")
                    ? "Light mode activated"
                    : "Dark mode activated"
            );
        }
    );
    /* =====================================================
       CUSTOM ACCENT COLOR
    ===================================================== */
    const accentPicker = $("#accentPicker");
    const savedAccent =
        localStorage.getItem("omar-accent");
    if (savedAccent) {
        document.documentElement.style.setProperty(
            "--accent",
            savedAccent
        );
        if (accentPicker) {
            accentPicker.value = savedAccent;
        }
    }
    accentPicker?.addEventListener(
        "input",
        event => {
            const color =
                event.target.value;
            document.documentElement.style.setProperty(
                "--accent",
                color
            );
            localStorage.setItem(
                "omar-accent",
                color
            );
        }
    );
    /* =====================================================
       SETTINGS PANEL
    ===================================================== */
    const settingsPanel = $(".settings-panel");
    const settingsButton = $("#settingsButton");
    const settingsClose = $(".settings-close");
    settingsButton?.addEventListener(
        "click",
        () => {
            settingsPanel?.classList.toggle("open");
        }
    );
    settingsClose?.addEventListener(
        "click",
        () => {
            settingsPanel?.classList.remove("open");
        }
    );
    /* =====================================================
       CURSOR
    ===================================================== */
    const cursorDot = $(".cursor-dot");
    const cursorRing = $(".cursor-ring");
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    document.addEventListener(
        "mousemove",
        event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (cursorDot) {
                cursorDot.style.left =
                    `${mouseX}px`;
                cursorDot.style.top =
                    `${mouseY}px`;
            }
        }
    );
    function animateCursor() {
        ringX += (mouseX - ringX) * .14;
        ringY += (mouseY - ringY) * .14;
        if (cursorRing) {
            cursorRing.style.left =
                `${ringX}px`;
            cursorRing.style.top =
                `${ringY}px`;
        }
        requestAnimationFrame(
            animateCursor
        );
    }
    animateCursor();
    $$("a, button, input, textarea, .project-card")
        .forEach(element => {
            element.addEventListener(
                "mouseenter",
                () => {
                    document.body.classList.add(
                        "cursor-hover"
                    );
                }
            );
            element.addEventListener(
                "mouseleave",
                () => {
                    document.body.classList.remove(
                        "cursor-hover"
                    );
                }
            );
        });
    /* =====================================================
       PARALLAX HERO
    ===================================================== */
    const heroVisual = $(".hero-visual");
    document.addEventListener(
        "mousemove",
        event => {
            if (!heroVisual) return;
            if (window.innerWidth < 900) return;
            const x =
                (window.innerWidth / 2 -
                    event.clientX) / 60;
            const y =
                (window.innerHeight / 2 -
                    event.clientY) / 60;
            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;
        }
    );
    /* =====================================================
       TOAST
    ===================================================== */
    const toast = $(".toast");
    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        const messageElement =
            $(".toast-message", toast);
        if (messageElement) {
            messageElement.textContent =
                message;
        }
        toast.classList.add("show");
        clearTimeout(toastTimeout);
        toastTimeout =
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2800);
    }
    window.showToast = showToast;
    /* =====================================================
       CONTACT FORM
    ===================================================== */
    const contactForm = $(".contact-form");
    contactForm?.addEventListener(
        "submit",
        event => {
            event.preventDefault();
            const name =
                $("#name")?.value.trim();
            const email =
                $("#email")?.value.trim();
            const message =
                $("#message")?.value.trim();
            if (!name || !email || !message) {
                showToast(
                    "Please fill in all required fields."
                );
                return;
            }
            showToast(
                "Message prepared successfully!"
            );
            contactForm.reset();
        }
    );
    /* =====================================================
       CHARACTER COUNTER
    ===================================================== */
    const messageInput = $("#message");
    const charCounter = $("#charCounter");
    messageInput?.addEventListener(
        "input",
        () => {
            const length =
                messageInput.value.length;
            if (charCounter) {
                charCounter.textContent =
                    `${length}/1000`;
            }
        }
    );
    /* =====================================================
       COMMAND PALETTE
    ===================================================== */
    const commandOverlay =
        $(".command-overlay");
    const commandInput =
        $("#commandInput");
    const commandItems =
        $$(".command-item");
    const commandButton =
        $("#commandButton");
    const commandClose =
        $(".command-close");
    function openCommandPalette() {
        commandOverlay?.classList.add("open");
        setTimeout(() => {
            commandInput?.focus();
        }, 100);
    }
    function closeCommandPalette() {
        commandOverlay?.classList.remove("open");
        if (commandInput) {
            commandInput.value = "";
        }
        commandItems.forEach(item => {
            item.style.display = "";
        });
    }
    commandButton?.addEventListener(
        "click",
        openCommandPalette
    );
    commandClose?.addEventListener(
        "click",
        closeCommandPalette
    );
    commandOverlay?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                commandOverlay
            ) {
                closeCommandPalette();
            }
        }
    );
    commandInput?.addEventListener(
        "input",
        () => {
            const query =
                commandInput.value
                    .toLowerCase()
                    .trim();
            commandItems.forEach(item => {
                const text =
                    item.textContent
                        .toLowerCase();
                item.style.display =
                    text.includes(query)
                        ? ""
                        : "none";
            });
        }
    );
    commandItems.forEach(item => {
        item.addEventListener(
            "click",
            () => {
                const target =
                    item.dataset.target;
                closeCommandPalette();
                if (target) {
                    const element =
                        document.querySelector(
                            target
                        );
                    element?.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    });
    /* =====================================================
       KEYBOARD SHORTCUTS
    ===================================================== */
    document.addEventListener(
        "keydown",
        event => {
            /* CMD/CTRL + K */
            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                openCommandPalette();
            }
            /* ESC */
            if (event.key === "Escape") {
                closeCommandPalette();
                mobileMenu?.classList.remove(
                    "open"
                );
                settingsPanel?.classList.remove(
                    "open"
                );
            }
        }
    );
    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */
    const canvas = $("#particles");
    if (canvas) {
        const ctx =
            canvas.getContext("2d");
        let particles = [];
        const particleCount =
            window.innerWidth < 700
                ? 35
                : 75;
        function resizeCanvas() {
            canvas.width =
                window.innerWidth;
            canvas.height =
                window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener(
            "resize",
            resizeCanvas
        );
        class Particle {
            constructor() {
                this.x =
                    Math.random() *
                    canvas.width;
                this.y =
                    Math.random() *
                    canvas.height;
                this.size =
                    Math.random() * 1.8 + .3;
                this.speedX =
                    (Math.random() - .5) * .35;
                this.speedY =
                    (Math.random() - .5) * .35;
                this.opacity =
                    Math.random() * .5 + .1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (
                    this.x < 0 ||
                    this.x > canvas.width
                ) {
                    this.speedX *= -1;
                }
                if (
                    this.y < 0 ||
                    this.y > canvas.height
                ) {
                    this.speedY *= -1;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle =
                    `rgba(139,92,246,${this.opacity})`;
                ctx.fill();
            }
        }
        function createParticles() {
            particles = [];
            for (
                let i = 0;
                i < particleCount;
                i++
            ) {
                particles.push(
                    new Particle()
                );
            }
        }
        function connectParticles() {
            for (
                let a = 0;
                a < particles.length;
                a++
            ) {
                for (
                    let b = a + 1;
                    b < particles.length;
                    b++
                ) {
                    const dx =
                        particles[a].x -
                        particles[b].x;
                    const dy =
                        particles[a].y -
                        particles[b].y;
                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );
                    if (distance < 115) {
                        const opacity =
                            (1 - distance / 115) *
                            .08;
                        ctx.beginPath();
                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );
                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );
                        ctx.strokeStyle =
                            `rgba(139,92,246,${opacity})`;
                        ctx.lineWidth = .5;
                        ctx.stroke();
                    }
                }
            }
        }
        function animateParticles() {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
            particles.forEach(
                particle => {
                    particle.update();
                    particle.draw();
                }
            );
            connectParticles();
            requestAnimationFrame(
                animateParticles
            );
        }
        createParticles();
        animateParticles();
    }
    /* =====================================================
       TILT EFFECT
    ===================================================== */
    $$(".project-card, .tool-card, .service-card")
        .forEach(card => {
            card.addEventListener(
                "mousemove",
                event => {
                    if (window.innerWidth < 800)
                        return;
                    const rect =
                        card.getBoundingClientRect();
                    const x =
                        event.clientX -
                        rect.left;
                    const y =
                        event.clientY -
                        rect.top;
                    const rotateX =
                        ((y - rect.height / 2) /
                            rect.height) *
                        -5;
                    const rotateY =
                        ((x - rect.width / 2) /
                            rect.width) *
                        5;
                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;
                }
            );
            card.addEventListener(
                "mouseleave",
                () => {
                    card.style.transform = "";
                }
            );
        });
    /* =====================================================
       COPY EMAIL
    ===================================================== */
    const emailLinks =
        $$("[data-copy-email]");
    emailLinks.forEach(link => {
        link.addEventListener(
            "click",
            async event => {
                event.preventDefault();
                const email =
                    link.dataset.copyEmail;
                try {
                    await navigator.clipboard.writeText(
                        email
                    );
                    showToast(
                        "Email copied to clipboard!"
                    );
                } catch {
                    showToast(email);
                }
            }
        );
    });
    /* =====================================================
       PROJECT MODALS
    ===================================================== */
    const modalOverlay =
        $(".modal-overlay");
    const modalClose =
        $(".modal-close");
    const modalTitle =
        $(".modal-title");
    const modalDescription =
        $(".modal-description");
    $$(".project-open").forEach(button => {
        button.addEventListener(
            "click",
            event => {
                event.preventDefault();
                const card =
                    button.closest(
                        ".project-card"
                    );
                if (!card) return;
                const title =
                    card.dataset.title ||
                    $(".project-content h3", card)
                        ?.textContent ||
                    "Project";
                const description =
                    card.dataset.description ||
                    $(".project-content p", card)
                        ?.textContent ||
                    "Project details.";
                if (modalTitle) {
                    modalTitle.textContent =
                        title;
                }
                if (modalDescription) {
                    modalDescription.textContent =
                        description;
                }
                modalOverlay?.classList.add(
                    "open"
                );
            }
        );
    });
    function closeModal() {
        modalOverlay?.classList.remove(
            "open"
        );
    }
    modalClose?.addEventListener(
        "click",
        closeModal
    );
    modalOverlay?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                modalOverlay
            ) {
                closeModal();
            }
        }
    );
    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */
    $$(".btn-primary").forEach(button => {
        button.addEventListener(
            "mousemove",
            event => {
                if (window.innerWidth < 800)
                    return;
                const rect =
                    button.getBoundingClientRect();
                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;
                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;
                button.style.transform =
                    `translate(${x * .12}px,
                               ${y * .12}px)`;
            }
        );
        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform = "";
            }
        );
    });
    /* =====================================================
       KONAMI EASTER EGG
    ===================================================== */
    const secretCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a"
    ];
    let secretIndex = 0;
    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key ===
                secretCode[secretIndex]
            ) {
                secretIndex++;
                if (
                    secretIndex ===
                    secretCode.length
                ) {
                    secretIndex = 0;
                    showToast(
                        "🚀 OMAR MODE ACTIVATED!"
                    );
                    document.body.style.animation =
                        "pulse .5s ease 3";
                }
            } else {
                secretIndex = 0;
            }
        }
    );
    /* =====================================================
       REDUCE MOTION SUPPORT
    ===================================================== */
    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
    if (prefersReducedMotion.matches) {
        document.documentElement.style
            .scrollBehavior = "auto";
        $$(".reveal").forEach(element => {
            element.classList.add("visible");
        });
    }
    /* =====================================================
       INITIALIZATION
    ===================================================== */
    updateProgress();
    updateActiveNav();
    handleBackToTop();
    console.log(
        "%c OMAR ELSERGANY ",
        "background:#8b5cf6;color:white;font-size:20px;font-weight:bold;padding:10px;"
    );
    console.log(
        "%c Full Stack Web Developer Portfolio ",
        "color:#06b6d4;font-size:14px;font-weight:bold;"
    );
});