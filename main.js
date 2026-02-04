// Snowflake Animation System
        function createSnowflakes() {
            const container = document.getElementById('snowflakes-container');
            const snowflakeCount = 50; // Number of snowflakes
            
            for (let i = 0; i < snowflakeCount; i++) {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                
                // Random size between 2px and 8px
                const size = Math.random() * 6 + 2;
                snowflake.style.width = `${size}px`;
                snowflake.style.height = `${size}px`;
                
                // Random starting position
                snowflake.style.left = `${Math.random() * 100}%`;
                snowflake.style.top = `${Math.random() * 100}%`;
                
                // Random opacity
                snowflake.style.opacity = Math.random() * 0.7 + 0.3;
                
                // Random animation duration and delay
                const duration = Math.random() * 10 + 10; // 10-20 seconds
                const delay = Math.random() * 5; // 0-5 seconds delay
                
                // Apply animations
                snowflake.style.animation = 
                    `snowfall ${duration}s linear ${delay}s infinite, 
                     sway ${Math.random() * 3 + 2}s ease-in-out ${delay}s infinite alternate`;
                
                container.appendChild(snowflake);
            }
        }
        
        // Remove snowflakes when theme changes to light (optional)
        function updateSnowflakesTheme() {
            const snowflakes = document.querySelectorAll('.snowflake');
            const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
            
            snowflakes.forEach(snowflake => {
                if (isLightTheme) {
                    snowflake.style.boxShadow = '0 0 8px rgba(33, 150, 243, 0.3)';
                } else {
                    snowflake.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                }
            });
        }
        
        // Initialize snowflakes
        document.addEventListener('DOMContentLoaded', () => {
            createSnowflakes();
        });
        
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update snowflake theme
            setTimeout(updateSnowflakesTheme, 100);
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        
        function setActiveNavLink() {
            const sections = document.querySelectorAll('section');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveNavLink);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') return;
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
        
        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Tawk.to Live Chat Functions
        function openChat() {
            if (typeof Tawk_API !== 'undefined') {
                Tawk_API.maximize();
            } else {
                window.open('https://t.me/FlashKiss_1337', '_blank');
            }
        }
        
        // Telegram Purchase Function
        function buyPlan(planName, price, duration) {
            const telegramUsername = '@FlashKiss_1337';
            const message = `Hello! I want to purchase PlusParser subscription.

Plan: ${planName}
Price: $${price}
Duration: ${duration}

Please provide payment details.`;
            
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${telegramUsername.replace('@', '')}?text=${encodedMessage}`;
            
            // Open Telegram with pre-filled message
            window.open(telegramUrl, '_blank');
            
            // Show confirmation message
            alert(`Opening Telegram to contact ${telegramUsername}\n\nYou will send this message:\n\n${message}`);
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            setActiveNavLink();
            
            // Add hover effects to cards
            document.querySelectorAll('.feature-card, .pricing-card, .blog-card, .why-item').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
            
            // Preload animations
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 100);
        });
        
        // DMCA Script
        const dmcaScript = document.createElement('script');
        dmcaScript.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
        document.body.appendChild(dmcaScript);
