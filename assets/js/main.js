/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle','nav-menu');

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== THEME TOGGLE =====*/
const initializeTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (!themeToggle || !icon) return;

    // Get saved theme or system preference
    const getInitialTheme = () => {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            return prefersDarkScheme.matches ? 'dark' : 'light';
        } catch (e) {
            console.warn('Error accessing localStorage:', e);
            return prefersDarkScheme.matches ? 'dark' : 'light';
        }
    };

    // Apply initial theme
    const initialTheme = getInitialTheme();
    if (initialTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.add('bx-sun');
        icon.classList.remove('bx-moon');
    } else {
        document.body.classList.remove('dark-theme');
        icon.classList.add('bx-moon');
        icon.classList.remove('bx-sun');
    }

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update icon with transition
        icon.style.transition = 'transform 0.3s ease';
        icon.classList.toggle('bx-moon', !isDark);
        icon.classList.toggle('bx-sun', isDark);
        
        // Save theme preference
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('Error saving theme to localStorage:', e);
        }
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme', e.matches);
        icon.classList.toggle('bx-moon', !e.matches);
        icon.classList.toggle('bx-sun', e.matches);
        
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.warn('Error saving theme to localStorage:', e);
        }
    });
};

/*===== SKILL BARS ANIMATION =====*/
const skillBars = document.querySelectorAll('.skills__bar');
const skillPercentages = document.querySelectorAll('.skills__percentage');

function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        const percent = skillPercentages[index]?.innerText?.replace('%', '');
        if (percent) {
            bar.style.width = percent + '%';
        }
    });
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

// Initialize everything after DOM is loaded
window.addEventListener('load', () => {
    animateSkillBars();
    initializeTheme();
});