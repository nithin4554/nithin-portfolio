document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // --- DYNAMIC THEMING ON SCROLL (Intersection Observer) ---
    const malaahaSection = document.getElementById('malaaha');
    const contactSection = document.getElementById('contact');
    
    if (malaahaSection) {
        const themeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When Malaaha section is in view (threshold 0.35)
                if (entry.isIntersecting) {
                    document.body.classList.add('theme-light-editorial');
                } else {
                    // Check if scroll position is above the Malaaha section
                    const rect = malaahaSection.getBoundingClientRect();
                    if (rect.top > window.innerHeight / 2) {
                        document.body.classList.remove('theme-light-editorial');
                    }
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: "-80px 0px -80px 0px" // Account for navbar height
        });
        
        themeObserver.observe(malaahaSection);
    }

    // --- MAKE SCENARIO SIMULATOR ---
    const btnRunMake = document.getElementById('btn-run-make');
    const makeConsole = document.getElementById('make-console');
    const nodes = {
        webhook: document.getElementById('node-webhook'),
        sheets: document.getElementById('node-sheets'),
        email: document.getElementById('node-email')
    };
    const connectors = document.querySelectorAll('.sim-connector');

    let simRunning = false;

    if (btnRunMake && makeConsole) {
        btnRunMake.addEventListener('click', () => {
            if (simRunning) return;
            simRunning = true;
            btnRunMake.disabled = true;
            btnRunMake.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running...`;

            // Reset nodes
            Object.values(nodes).forEach(node => {
                node.className = node.classList.contains('source') ? 'sim-node source' : 
                                 node.classList.contains('processing') ? 'sim-node processing' : 'sim-node destination';
                node.querySelector('.node-status').innerText = 'Pending';
            });
            nodes.webhook.querySelector('.node-status').innerText = 'Ready';
            connectors.forEach(conn => conn.classList.remove('running'));

            makeConsole.innerHTML = `<span class="console-line text-muted">// Starting scenario simulation...</span>`;

            // Step 1: Webhook active
            setTimeout(() => {
                nodes.webhook.classList.add('active');
                nodes.webhook.querySelector('.node-status').innerText = 'Running';
                appendConsoleLine('Info', 'Webhook listener triggered by lead webhook event.');
            }, 600);

            // Step 1 Complete -> Flow to Sheets
            setTimeout(() => {
                nodes.webhook.classList.remove('active');
                nodes.webhook.classList.add('success');
                nodes.webhook.querySelector('.node-status').innerText = 'Success';
                connectors[0].classList.add('running');
                appendConsoleLine('Info', 'Webhook data parsed: { "name": "Rohan Sharma", "email": "rohan@gmail.com", "interest": "Skincare Automation" }');
            }, 1800);

            // Step 2: Sheets active
            setTimeout(() => {
                connectors[0].classList.remove('running');
                nodes.sheets.classList.add('active');
                nodes.sheets.querySelector('.node-status').innerText = 'Writing...';
                appendConsoleLine('Sheets', 'Inserting new lead record to Sheet "Make_Outreach_Leads"...');
            }, 3000);

            // Step 2 Complete -> Flow to Email
            setTimeout(() => {
                nodes.sheets.classList.remove('active');
                nodes.sheets.classList.add('success');
                nodes.sheets.querySelector('.node-status').innerText = 'Success';
                connectors[1].classList.add('running');
                appendConsoleLine('Sheets', 'Row created: Row #218 saved (Rohan Sharma).');
            }, 4200);

            // Step 3: Email active
            setTimeout(() => {
                connectors[1].classList.remove('running');
                nodes.email.classList.add('active');
                nodes.email.querySelector('.node-status').innerText = 'Sending...';
                appendConsoleLine('Email', 'Compiling custom email body using templates...');
            }, 5400);

            // Step 3 Complete -> Success
            setTimeout(() => {
                nodes.email.classList.remove('active');
                nodes.email.classList.add('success');
                nodes.email.querySelector('.node-status').innerText = 'Sent';
                appendConsoleLine('Email', 'Outreach email successfully sent to rohan@gmail.com.');
                appendConsoleLine('System', 'Scenario finished successfully in 6.4 seconds.');
                
                // Reset button
                btnRunMake.disabled = false;
                btnRunMake.innerHTML = `<i class="fa-solid fa-play"></i> Run Scenario`;
                simRunning = false;
            }, 6800);
        });
    }

    function appendConsoleLine(source, message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const sourceColorClass = source === 'Sheets' ? 'text-sheets' : 
                                 source === 'Email' ? 'text-make' : 
                                 source === 'System' ? 'gradient-text' : 'text-muted';
        makeConsole.innerHTML += `<span class="console-line">[${timestamp}] <strong class="${sourceColorClass}">${source}:</strong> ${message}</span>`;
        makeConsole.scrollTop = makeConsole.scrollHeight;
    }

    // --- X TRENDS TO SCRIPT SIMULATOR ---
    const trendCards = document.querySelectorAll('.trend-mini-card');
    const scriptPreviewBox = document.getElementById('script-preview-box');

    if (trendCards.length && scriptPreviewBox) {
        trendCards.forEach(card => {
            card.addEventListener('click', () => {
                // Update active classes
                trendCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Get script content
                const rawScript = card.getAttribute('data-script');
                // Format newlines
                const formattedScript = rawScript.replace(/\\n/g, '<br>');

                // Simulate "generating" script
                scriptPreviewBox.innerHTML = `<span class="text-muted"><i class="fa-solid fa-spinner fa-spin"></i> Generating script ideas from trend...</span>`;
                
                setTimeout(() => {
                    scriptPreviewBox.innerHTML = formattedScript;
                }, 600);
            });
        });
    }

    // --- IPL VIDEO REEL SIMULATOR ---
    const reelSim = document.querySelector('.reel-simulator');
    const cricketThumb = document.getElementById('cricket-thumb');

    if (reelSim && cricketThumb) {
        // Toggle play state on hover
        reelSim.addEventListener('mouseenter', () => {
            reelSim.classList.add('playing');
        });

        reelSim.addEventListener('mouseleave', () => {
            reelSim.classList.remove('playing');
        });

        // Touch support for mobile devices
        cricketThumb.addEventListener('click', () => {
            reelSim.classList.toggle('playing');
        });
    }

    // --- MALAAHA 30 DAYS OF CONFIDENCE CALENDAR ---
    const calendarGrid = document.querySelector('.calendar-grid');
    const calendarPromptDisplay = document.getElementById('calendar-prompt-display');

    const prompts = [
        "Apply lotion with intentional strokes, focusing on feeling gratitude for your body. Share a skin-texture snap using #MalaahaConfidence.",
        "Stand in front of the mirror for 2 minutes and list three things you love about your skin's resilience.",
        "Take a warm bath or shower focusing purely on the sensory details: the water temperature, the scent of soap, the texture of your skin.",
        "Gentle exfoliation ritual. Imagine scrubbing away negative self-talk along with dead skin cells.",
        "Write a short letter of gratitude to your face for carrying your expressions through every joy and struggle.",
        "Hydrate intentionally. Drink a glass of water, visualizing it refreshing your skin cells from within.",
        "Touch your skin with kindness. Apply face oil using light circular massages, relaxing your jaw and forehead.",
        "Go makeup-free today. Let your pores breathe and take a photo celebrating your raw, beautiful skin.",
        "Reflexology ritual. Massage your feet with warm oil before bed, thanking them for carrying you all day.",
        "Observe your skin textures in sunlight. Realize that perfection is a myth; textures are natural and healthy.",
        "Practice breathing for 5 minutes. Feel the oxygen travel to your skin, bringing a natural glow.",
        "Pamper a specific part of your body you usually ignore or feel self-conscious about. Show it extra care today.",
        "Apply a soothing face mask. Lie down, close your eyes, and listen to a calming song with no screen distraction.",
        "List 3 body-related compliments that have nothing to do with size or shape.",
        "Dry brush ritual. Boost circulation and feel the tingling sensation of skin awakening.",
        "Ditch the body scale for today. Instead, measure how energized and comfortable you feel in your skin.",
        "Aromatic neck and shoulder massage. Release the tension we carry when we are stressed.",
        "Enjoy a piece of fruit or dark chocolate slowly, savoring how food nourishes your skin and senses.",
        "Stretch your body gently for 10 minutes. Feel the elasticity and strength of your muscles and skin.",
        "Moisturize your hands and massage each finger. Hands are our creative tools; thank them.",
        "Write down one skin myth you are letting go of today (e.g., 'pores should be invisible').",
        "Apply lip balm with care. Say a kind affirmation aloud about your voice and smile.",
        "Wear an outfit that makes you feel comfortable, not constrained. Let your body move freely.",
        "Bedtime relaxation. Use lavender-scented products and focus on the transition from day to rest.",
        "Create a small corner in your room dedicated to your daily care ritual. Keep it clean and inviting.",
        "Share a testimonial of a small ritual that changed your day. Tag a friend to share theirs.",
        "Write a poem or sentence describing your skin's journey over the years.",
        "Enjoy a warm cup of herbal tea. Let the steam open your skin's pores and clear your mind.",
        "Use a body oil right after the shower when your skin is damp to lock in deep, luxurious moisture.",
        "Look in the mirror, smile, and say: 'I am worthy of love, care, and confidence just as I am today.'"
    ];

    if (calendarGrid && calendarPromptDisplay) {
        // Build 30 days grid (show first 18 days for standard visual layout, or all 30)
        // Let's generate 18 days to keep it compact and clean, but indicate it goes to 30.
        const daysToShow = 18;
        for (let d = 1; d <= daysToShow; d++) {
            const dayBtn = document.createElement('button');
            dayBtn.className = d === 1 ? 'calendar-day-btn active' : 'calendar-day-btn';
            dayBtn.innerText = d;
            dayBtn.setAttribute('data-day', d);
            
            dayBtn.addEventListener('click', () => {
                // Remove active classes
                document.querySelectorAll('.calendar-day-btn').forEach(btn => btn.classList.remove('active'));
                dayBtn.classList.add('active');

                // Get prompt text
                const promptIndex = d - 1;
                const prompt = prompts[promptIndex] || prompts[0];

                calendarPromptDisplay.innerHTML = `
                    <span class="prompt-day-lbl">Day ${d}</span>
                    <p class="prompt-text">${prompt}</p>
                `;
            });
            calendarGrid.appendChild(dayBtn);
        }
    }

    // --- NIGHT-TIME RITUAL REEL PLAYBACK ---
    const btnPlaySkincare = document.getElementById('btn-play-skincare');
    const skincareReelSim = document.querySelector('.skincare-reel-sim');

    if (btnPlaySkincare && skincareReelSim) {
        btnPlaySkincare.addEventListener('click', () => {
            skincareReelSim.classList.toggle('playing');
            
            const isPlaying = skincareReelSim.classList.contains('playing');
            if (isPlaying) {
                btnPlaySkincare.innerHTML = `<i class="fa-solid fa-circle-pause"></i> Pause Audio & Glow`;
                // Play a subtle web audio synth chime for Google level web developer wow factor!
                playWebAudioTone();
            } else {
                btnPlaySkincare.innerHTML = `<i class="fa-solid fa-circle-play"></i> Play Sound & Affirmation`;
            }
        });
    }

    // Generate peaceful night ambient synth sounds using Web Audio API
    function playWebAudioTone() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Peaceful skincare ritual chords: F Major -> G Major -> C Major (spaced out notes)
            const playNote = (freq, startTime, duration) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.value = freq;
                
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.12, startTime + 0.5);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            const now = audioCtx.currentTime;
            // Play a soothing atmospheric arpeggio
            playNote(349.23, now, 3);       // F4
            playNote(440.00, now + 0.4, 3); // A4
            playNote(523.25, now + 0.8, 4); // C5
            playNote(659.25, now + 1.2, 4); // E5 (Fmaj7)
            
            playNote(392.00, now + 2.5, 3); // G4
            playNote(493.88, now + 2.9, 3); // B4
            playNote(587.33, now + 3.3, 4); // D5
            
        } catch (e) {
            console.log("Web Audio API not allowed/supported yet.");
        }
    }

    // --- MALAAHA SECTION TABS NAV ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Update buttons active
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update contents active
                tabContents.forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // --- TESTIMONIAL CAROUSEL ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevArrow = document.querySelector('.nav-arrow.prev');
    const nextArrow = document.querySelector('.nav-arrow.next');
    const indicators = document.querySelectorAll('.nav-indicators .indicator');
    
    let currentIndex = 0;

    if (testimonialCards.length && prevArrow && nextArrow) {
        const updateTestimonial = (index) => {
            // Remove active classes
            testimonialCards.forEach(card => card.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            // Set new active
            testimonialCards[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        };

        prevArrow.addEventListener('click', () => {
            let nextIdx = currentIndex - 1;
            if (nextIdx < 0) nextIdx = testimonialCards.length - 1;
            updateTestimonial(nextIdx);
        });

        nextArrow.addEventListener('click', () => {
            let nextIdx = currentIndex + 1;
            if (nextIdx >= testimonialCards.length) nextIdx = 0;
            updateTestimonial(nextIdx);
        });

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                updateTestimonial(idx);
            });
        });
    }

    // --- CONTACT FORM MOCK SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;
            formStatus.innerHTML = '';

            setTimeout(() => {
                // Show success
                formStatus.style.color = '#27c93f';
                if (document.body.classList.contains('theme-light-editorial')) {
                    formStatus.style.color = '#8e6d3c'; // Dark gold for warm theme
                }
                formStatus.innerText = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
                
                // Clear form
                contactForm.reset();

                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1800);
        });
    }
});
