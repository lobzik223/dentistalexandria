// Hero section animations
document.addEventListener('DOMContentLoaded', () => {
    const heroInfoItems = document.querySelectorAll('.hero-info-item');
    const heroImages = document.querySelectorAll('.hero-images img');
    
    // Animate info items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    heroInfoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    heroImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
        }, 300 + index * 200);
    });
    
    // Preload images
    const imageUrls = [
        'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('mobile-active');
        
        // Animate hamburger
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (!isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Handling
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        
        // Reset form
        this.reset();
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #50c878;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Header Form Button
const headerFormBtn = document.getElementById('headerFormBtn');
const formModal = document.getElementById('formModal');
const modalBody = document.getElementById('modalBody');

if (headerFormBtn && formModal) {
    headerFormBtn.addEventListener('click', () => {
        openFormModal();
    });
}

function openFormModal() {
    if (modalBody) {
        modalBody.innerHTML = `
            <h2>Записаться на прием</h2>
            <form id="modalForm">
                <input type="text" name="name" placeholder="Ваше имя" required>
                <input type="tel" name="phone" placeholder="Телефон" required>
                <input type="email" name="email" placeholder="Email">
                <select name="service" required>
                    <option value="">Выберите услугу</option>
                    <option value="consultation">Консультация</option>
                    <option value="treatment">Лечение</option>
                    <option value="implant">Имплантация</option>
                </select>
                <textarea name="message" placeholder="Ваше сообщение" rows="4"></textarea>
                <button type="submit" class="btn-primary">Отправить заявку</button>
            </form>
        `;
        
        const modalForm = document.getElementById('modalForm');
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Спасибо! Ваша заявка принята.');
                closeFormModal();
            });
        }
    }
    
    formModal.classList.add('active');
    formModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeFormModal() {
    formModal.classList.remove('active');
    formModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

const modalClose = document.querySelector('.modal-close');
if (modalClose) {
    modalClose.addEventListener('click', closeFormModal);
}

if (formModal) {
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeFormModal();
        }
    });
}

// Accessibility Features

// Font Size Controls
const increaseFont = document.getElementById('increaseFont');
const decreaseFont = document.getElementById('decreaseFont');

if (increaseFont) {
    increaseFont.addEventListener('click', () => {
        document.body.classList.remove('font-small');
        document.body.classList.add('font-large');
        localStorage.setItem('fontSize', 'large');
    });
}

if (decreaseFont) {
    decreaseFont.addEventListener('click', () => {
        document.body.classList.remove('font-large');
        document.body.classList.add('font-small');
        localStorage.setItem('fontSize', 'small');
    });
}

// High Contrast Mode
const highContrast = document.getElementById('highContrast');

if (highContrast) {
    highContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isActive = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isActive);
    });
}

// Screen Reader / Text to Speech
const speakPage = document.getElementById('speakPage');

if (speakPage && 'speechSynthesis' in window) {
    speakPage.addEventListener('click', () => {
        const text = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    });
}

// Load Saved Preferences
window.addEventListener('DOMContentLoaded', () => {
    const fontSize = localStorage.getItem('fontSize');
    const highContrastMode = localStorage.getItem('highContrast');
    
    if (fontSize === 'large') {
        document.body.classList.add('font-large');
    } else if (fontSize === 'small') {
        document.body.classList.add('font-small');
    }
    
    if (highContrastMode === 'true') {
        document.body.classList.add('high-contrast');
    }
});

// Phone Input Mask
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        if (value.length > 0) {
            if (value.length <= 1) {
                value = `+7 (${value}`;
            } else if (value.length <= 4) {
                value = `+7 (${value.slice(1)}`;
            } else if (value.length <= 7) {
                value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`;
            } else if (value.length <= 9) {
                value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`;
            } else {
                value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
            }
        }
        e.target.value = value;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .info-card, .advantage-item, .review-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav.mobile-active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: var(--shadow);
            padding: 20px;
        }
        
        .nav.mobile-active .nav-list {
            flex-direction: column;
            gap: 15px;
        }
    }
`;
document.head.appendChild(style);
