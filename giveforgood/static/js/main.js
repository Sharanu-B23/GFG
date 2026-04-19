function initializeSite() {

    const isHomePage = document.body.dataset.isHome === 'true';
    const nav = document.getElementById('main-nav');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- MOBILE MENU TOGGLE LOGIC ---
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                nav.classList.add('scrolled');
            } else {
                if (window.scrollY <= 50 && isHomePage) {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }

    // --- DEFINE NAVBAR FUNCTIONS ---
    function setNavScrolled() {
        if (nav) nav.classList.add('scrolled');
    }

    function setNavTop() {
        if (mobileMenu && mobileMenu.classList.contains('active')) return;
        if (nav) nav.classList.remove('scrolled');
    }

    // --- RUN NAVBAR LOGIC ---
    if (isHomePage) {
        setNavTop(); 
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                setNavScrolled();
            } else {
                setNavTop();
            }
        });
        
        // Counter Logic 
        const counter = document.getElementById('counter');
        if (counter) {
           const target = +counter.getAttribute('data-target');
           const duration = 2000;
           let start = 0;
           const updateCounter = (timestamp) => {
               if (!start) start = timestamp;
               const progress = timestamp - start;
               let current = Math.min(Math.floor(progress / duration * target), target);
               counter.innerText = current.toLocaleString('en-US') + "+";
               if (current < target) {
                   requestAnimationFrame(updateCounter);
               } else {
                   counter.innerText = target.toLocaleString('en-US') + "+";
               }
           };
           requestAnimationFrame(updateCounter);
        }

    } else {
        setNavScrolled(); 
    }
}

function runWhenReady() {
    initializeSite();
}
runWhenReady();