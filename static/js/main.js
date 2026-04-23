        // Theme Toggle Logic
        const themeBtn = document.getElementById('theme-btn');
        const root = document.documentElement;
        
        if(localStorage.getItem('theme') === 'dark') {
            root.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
        }

        themeBtn.addEventListener('click', () => {
            if (root.getAttribute('data-theme') === 'light') {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
            } else {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeBtn.innerHTML = '<span id="theme-icon">🌙</span> Dark Mode';
            }
        });

        // Interactive Bear Logic
        const bear = document.getElementById('bear');
        const pupils = document.getElementById('pupils');
        const pupilLeft = document.getElementById('pupil-left');
        const pupilRight = document.getElementById('pupil-right');
        const mouthNormal = document.getElementById('mouth-normal');
        const mouthSurprised = document.getElementById('mouth-surprised');
        const eyeBgs = document.querySelectorAll('.eye-bg');

        document.addEventListener('mousemove', (e) => {
            const bearRect = bear.getBoundingClientRect();
            // Calculate center of bear
            const bearX = bearRect.left + bearRect.width / 2;
            const bearY = bearRect.top + bearRect.height / 2;

            const angle = Math.atan2(e.clientY - bearY, e.clientX - bearX);
            const distance = Math.min(8, Math.hypot(e.clientX - bearX, e.clientY - bearY) / 15);

            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;

            pupils.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });

        // Hover effect to surprise bear
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                mouthNormal.style.opacity = '0';
                mouthSurprised.style.opacity = '1';
                eyeBgs.forEach(bg => {
                    bg.style.transition = 'r 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    bg.setAttribute('r', '18');
                });
                pupilLeft.setAttribute('r', '4');
                pupilRight.setAttribute('r', '4');
            });
            
            card.addEventListener('mouseleave', () => {
                mouthNormal.style.opacity = '1';
                mouthSurprised.style.opacity = '0';
                eyeBgs.forEach(bg => {
                    bg.setAttribute('r', '14');
                });
                pupilLeft.setAttribute('r', '6');
                pupilRight.setAttribute('r', '6');
            });
        });
        
        // RNN Card Arrow dynamic color update
        const rnnCard = document.querySelector('.card[href*="RNN"]') || cards[4];
        const arrowPoly = document.querySelector('.arrow-poly');
        
        const updateArrowColor = () => {
            if(rnnCard.matches(':hover')) {
                const rootStyles = getComputedStyle(document.documentElement);
                arrowPoly.setAttribute('fill', rootStyles.getPropertyValue('--accent').trim());
            } else {
                const rootStyles = getComputedStyle(document.documentElement);
                arrowPoly.setAttribute('fill', rootStyles.getPropertyValue('--text-muted').trim());
            }
        };

        if (rnnCard) {
            rnnCard.addEventListener('mouseenter', updateArrowColor);
            rnnCard.addEventListener('mouseleave', updateArrowColor);
        }

        // Update on theme switch too
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    updateArrowColor();
                }
            });
        });
        observer.observe(root, { attributes: true });
