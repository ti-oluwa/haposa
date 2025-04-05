const sideMenuToggle = document.querySelector('header #header-wrapper .menu-toggle');
const sideMenu = document.querySelector('header #header-wrapper .menu');
const sideMenuClose = sideMenu.querySelector('.close');
const sideMenuLinks = sideMenu.querySelectorAll('a');
const scrollTracker = document.querySelector('#scroll-tracker');
const headerElement = document.querySelector('header');
const headerLinks = headerElement.querySelectorAll('nav a');
const pageSections = document.querySelectorAll('.page-section');
const featureStatsSliders = document.querySelectorAll('.feature-details .stats .stat div');
const aboutStatsCards = document.querySelectorAll('.about-welcome-images .stat-card h3');
const contactForm = document.querySelector('#contact-us-form ');


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


const featureStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animated')) return;

            const statValue = parseInt(entry.target.dataset.statValue.trim());
            const statText = entry.target.parentElement.querySelector("p span:last-of-type");
            const statSlider = entry.target.querySelector("span");

            statSlider.style.width = statValue + "%";
            statText.style.width = statValue + "%";

            const sleepTime = 1000 / statValue;
            for (let i = 0; i <= statValue; i++) {
                setTimeout(() => {
                    statText.textContent = i + "%";
                }, sleepTime * i);
            };
            entry.target.classList.add('animated');
        };
    });
}, { rootMargin: '0px 0px -5% 0px' });


featureStatsSliders.forEach(statSlider => {
    featureStatsObserver.observe(statSlider);
});


// GSAP Feature Cards Staggering Effect
const featureCards = document.querySelectorAll('.feature-card');
gsap.set(featureCards, { opacity: 0, y: 50 });

ScrollTrigger.create({
    trigger: '.feature-cards',
    start: 'top 80%',
    onEnter: () => {
        gsap.to(featureCards, {
            opacity: 1,
            y: 0,
            stagger: 0.4,
            duration: 0.5,
            ease: 'power2.out',
        });
    },
});


const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animated')) return;

            const targetValue = parseInt(entry.target.dataset.targetValue);
            let currentValue = 0;

            const increment = Math.ceil(targetValue / 100); // Increment value for smooth animation
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(interval);
                }
                entry.target.innerHTML = `${currentValue} <i class="fas fa-plus"></i>`;
            }, 10);

            entry.target.classList.add('animated');
        }
    });
}, { rootMargin: '0px 0px -10% 0px' });

aboutStatsCards.forEach(statCard => {
    statCard.innerHTML = '0 <i class="fas fa-plus"></i>'; // Initialize with 0
    countUpObserver.observe(statCard);
});


// Smartsupp Chat Widget
var _smartsupp = _smartsupp || {};
_smartsupp.key = '125aae5b6f6d5cb4a749492802385580f3628906';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);



// Contact Form Validation
contactForm.addEventListener('submit', (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const contactFormButton = contactForm.querySelector('button[type="submit"]');
    contactFormButton.disabled = true;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        mode: 'same-origin',
        body: JSON.stringify(data),
    }

    fetch(contactForm.action, options).then((response) => {
        if (!response.ok) {
            contactFormButton.disabled = false;
            alert('Oops! An error occurred.');

        } else {
            contactForm.reset();
            contactFormButton.disabled = false;
            response.json().then((data) => {
                alert(data.message ?? data.detail ?? 'Thanks for contacting us!');
            });
        }
    }).catch((error) => {
        contactFormButton.disabled = false;
        alert('Oops! An error occurred.');
    });
});
