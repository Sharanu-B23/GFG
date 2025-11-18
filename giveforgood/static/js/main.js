function initializeSite() {

    // --- GRAB ALL ELEMENTS ---
    const isHomePage = document.body.dataset.isHome === 'true';
    const nav = document.getElementById('main-nav');
    const navLogo = document.getElementById('nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const donateBtn = document.getElementById('nav-donate-btn');
    const navPartnerLogo = document.getElementById('nav-partner-logo');
    
    // NEW MOBILE ELEMENTS
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- MOBILE MENU TOGGLE LOGIC ---
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Toggle background color of nav when menu is open
            if (!mobileMenu.classList.contains('hidden')) {
                nav.classList.add('bg-white');
                navLogo.classList.remove('text-white');
                navLogo.classList.add('text-blue-600');
                mobileBtn.classList.remove('text-white');
                mobileBtn.classList.add('text-gray-800');
            } else {
                // If we are at the top and close the menu, revert to transparent
                if (window.scrollY <= 50 && isHomePage) {
                    nav.classList.remove('bg-white');
                    navLogo.classList.add('text-white');
                    navLogo.classList.remove('text-blue-600');
                    mobileBtn.classList.add('text-white');
                    mobileBtn.classList.remove('text-gray-800');
                }
            }
        });
    }

    // --- DEFINE NAVBAR FUNCTIONS ---
    function setNavScrolled() {
        if (nav) nav.classList.add('bg-white', 'shadow-md');
        if (nav) nav.classList.remove('bg-transparent');
        if (navLogo) navLogo.classList.add('text-blue-600');
        if (navLogo) navLogo.classList.remove('text-white');
        
        // Handle Hamburger Color
        if (mobileBtn) {
            mobileBtn.classList.add('text-gray-800');
            mobileBtn.classList.remove('text-white');
        }

        if (donateBtn) {
            donateBtn.classList.add('bg-rose-500', 'text-white', 'hover:bg-rose-600');
            donateBtn.classList.remove('text-yellow-400', 'hover:text-yellow-300');
        }
        navLinks.forEach(link => {
            link.classList.add('text-gray-700', 'hover:text-blue-600');
            link.classList.remove('text-white', 'hover:text-gray-200');
        });
        if (navPartnerLogo) navPartnerLogo.classList.remove('hidden');
    }

    function setNavTop() {
        // Only revert if the mobile menu is CLOSED
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) return;

        if (nav) nav.classList.remove('bg-white', 'shadow-md');
        if (nav) nav.classList.add('bg-transparent');
        if (navLogo) navLogo.classList.add('text-white');
        if (navLogo) navLogo.classList.remove('text-blue-600');
        
        // Handle Hamburger Color
        if (mobileBtn) {
            mobileBtn.classList.add('text-white');
            mobileBtn.classList.remove('text-gray-800');
        }

        if (donateBtn) {
            donateBtn.classList.add('text-yellow-400', 'hover:text-yellow-300');
            donateBtn.classList.remove('bg-rose-500', 'text-white', 'hover:bg-rose-600');
        }
        navLinks.forEach(link => {
            link.classList.add('text-white', 'hover:text-gray-200');
            link.classList.remove('text-gray-700', 'hover:text-blue-600');
        });
        if (navPartnerLogo) navPartnerLogo.classList.add('hidden');
    }

    // ... (rest of your initializeSite function: run logic, counter, etc.) ...
    // Keep your existing code for: if (isHomePage) { ... } else { ... }
    
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
        
        // Counter Logic (Keep existing code)
        const counter = document.getElementById('counter');
        if (counter) {
           // ... (keep your existing counter code) ...
           const target = +counter.getAttribute('data-target');
           const duration = 2000;
           let start = 0;
           const updateCounter = (timestamp) => {
               if (!start) start = timestamp;
               const progress = timestamp - start;
               let current = Math.min(Math.floor(progress / duration * target), target);
               counter.innerText = current.toLocaleString('en-US');
               if (current < target) {
                   requestAnimationFrame(updateCounter);
               } else {
                   counter.innerText = target.toLocaleString('en-US');
               }
           };
           requestAnimationFrame(updateCounter);
        }

    } else {
        setNavScrolled(); 
    }
}

// ... (RunWhenReady function stays the same) ...
function runWhenReady() {
    initializeSite();
}
runWhenReady();