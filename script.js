
const sideMenuToggle = document.querySelector('header #header-wrapper .menu-toggle');
const sideMenu = document.querySelector('header #header-wrapper .menu');
const sideMenuClose = sideMenu.querySelector('.close');
const sideMenuLinks = sideMenu.querySelectorAll('a');
const scrollTracker = document.querySelector('#scroll-tracker');
const headerElement = document.querySelector('header');
const headerLinks = headerElement.querySelectorAll('nav a');
const pageSections = document.querySelectorAll('.page-section');


function showSideMenu() {
    sideMenu.classList.add("slide-in-from-left");
    sideMenu.classList.remove("slide-out-to-left");
}

function hideSideMenu() {
    sideMenu.classList.add("slide-out-to-left");
    sideMenu.classList.remove("slide-in-from-left");
}

sideMenuToggle.addEventListener('click', () => {
    sideMenuToggle.classList.toggle('active');
    if (sideMenuToggle.classList.contains('active')) {
        showSideMenu();
    }
    else {
        hideSideMenu();
    };
});

sideMenuClose.addEventListener('click', () => {
    sideMenuToggle.classList.remove('active');
    hideSideMenu();
});

sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenuToggle.classList.remove('active');
        hideSideMenu();
    });
});


document.body.addEventListener('click', (e) => {
    if (
        sideMenuToggle.classList.contains('active') &&
        !sideMenu.contains(e.target) &&
        !sideMenuToggle.contains(e.target)
    ) {
        sideMenuToggle.classList.remove('active');
        hideSideMenu();
    }
});


const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio < 1.0) {
            headerElement.classList.add('opaque-bg');
        }
        else {
            headerElement.classList.remove('opaque-bg');
        };
    });
}, {
    threshold: 1.0,
    rootMargin: '80px 0px 0px 0px'
});

scrollObserver.observe(scrollTracker);


const pageSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            headerLinks.forEach(link => {
                link.classList.remove('in-view');
                if (entry.target.id === link.getAttribute('href').substring(1)) {
                    link.classList.add('in-view');
                };
            });

            sideMenuLinks.forEach(link => {
                link.classList.remove('in-view');
                if (entry.target.id === link.getAttribute('href').substring(1)) {
                    link.classList.add('in-view');
                };
            });
        };
    });
}, { rootMargin: '0px 0px -50% 0px' });


pageSections.forEach(section => {
    pageSectionObserver.observe(section);
});
