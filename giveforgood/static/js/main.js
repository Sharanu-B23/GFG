/*
This function will contain ALL of our site's logic.
*/
function initializeSite() {

    // --- GRAB ALL ELEMENTS ---
    const isHomePage = document.body.dataset.isHome === 'true';
    const nav = document.getElementById('main-nav');
    const navLogo = document.getElementById('nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const donateBtn = document.getElementById('nav-donate-btn');
    const navPartnerLogo = document.getElementById('nav-partner-logo');

    // --- DEFINE NAVBAR FUNCTIONS ---
    function setNavScrolled() {
        if (nav) nav.classList.add('bg-white', 'shadow-md');
        if (nav) nav.classList.remove('bg-transparent');
        if (navLogo) navLogo.classList.add('text-blue-600');
        if (navLogo) navLogo.classList.remove('text-white');
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
        if (nav) nav.classList.remove('bg-white', 'shadow-md');
        if (nav) nav.classList.add('bg-transparent');
        if (navLogo) navLogo.classList.add('text-white');
        if (navLogo) navLogo.classList.remove('text-blue-600');
        if (donateBtn) {
            donateBtn.classList.add('text-yellow-400', 'hover:text-yellow-300');
            donateBtn.classList.remove('bg-rose-500', 'text-white', 'hover:bg-rose-600');
        }
        navLinks.forEach(link => {
            link.classList.add('text-white', 'hover:text-gray-200');
            link.classList.remove('text-gray-700', 'hover:text-blue-Next');
        });
        if (navPartnerLogo) navPartnerLogo.classList.add('hidden');
    }

    // --- RUN NAVBAR LOGIC ---
    if (isHomePage) {
        setNavTop(); // Set initial transparent state
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                setNavScrolled();
            } else {
                setNavTop();
            }
        });
        
        // --- !! UPDATED COUNTER LOGIC !! ---
        const counter = document.getElementById('counter');
        if (counter) {
            const target = +counter.getAttribute('data-target'); // Get 500000
            const duration = 2000; // Animation duration in ms (2 seconds)
            let start = 0;

            const updateCounter = (timestamp) => {
                if (!start) start = timestamp; // Set start time
                const progress = timestamp - start;
                let current = Math.min(Math.floor(progress / duration * target), target);
                
                // Format with commas (e.g., 500,000)
                counter.innerText = current.toLocaleString('en-US');

                if (current < target) {
                    requestAnimationFrame(updateCounter); // Continue animation
                } else {
                    counter.innerText = target.toLocaleString('en-US'); // Ensure it ends exactly
                }
            };

            // ** THIS IS THE CHANGE **
            // We removed the 'IntersectionObserver' and now
            // just call the animation function directly.
            requestAnimationFrame(updateCounter);
        }
        // --- END OF COUNTER LOGIC ---

    } else {
        // This is not the homepage
        setNavScrolled(); // Set solid navbar immediately
    }
}

/*
  This "loader" logic remains the same.
  It waits for the page to be ready, then runs initializeSite().
*/
function runWhenReady() {
    // We check for 'Swiper' only if it's the homepage (even though it's removed)
    // This logic is still safer. If you've removed Swiper, this is still fine.
    const isHomePage = document.body.dataset.isHome === 'true';
    
    // Check if Swiper is used and loaded, or just run the site
    if (isHomePage) {
        // Check if Swiper exists OR if we don't need it
        if (typeof Swiper !== 'undefined' || !document.querySelector('.heroSwiper')) {
             initializeSite();
        } else {
             // If Swiper is needed but not loaded, wait
             setTimeout(runWhenReady, 100);
        }
    } else {
        // Not the homepage, no need to wait for Swiper
        initializeSite();
    }
}

// Start the check
runWhenReady();