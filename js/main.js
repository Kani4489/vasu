// Config will be loaded globally. We can check if it exists on window, otherwise use defaults.
const getCONFIG = () => window.CONFIG || { bakeryName: "Vasu Bakery", tagline: "Baked with Love", whatsappNumber: "919876543210" };

// Setup common elements (Navbar, Footer, WhatsApp floating button)
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    renderWhatsAppBtn();
    setupCartBadge();
    animateOnScroll();
});

function renderNavbar() {
    const config = getCONFIG();
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-bakery py-3">
        <div class="container">
            <a class="navbar-brand navbar-brand-bakery d-flex align-items-center" href="index.html">
                <img src="images/logo.webp" alt="${config.bakeryName} Logo" width="40" height="40" class="me-2 rounded-circle" onerror="this.src='https://placehold.co/80/E4D0D0/5C3E35?text=VB'">
                <span>${config.bakeryName}</span>
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3 active" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3" href="products.html">Products</a></li>
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3" href="seasonal.html">Seasonal</a></li>
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3" href="promotions.html">Offers</a></li>
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link nav-link-bakery px-3" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3 mt-3 mt-lg-0">
                        <a class="btn btn-bakery d-flex align-items-center" href="cart.html">
                            <i class="bi bi-cart3 me-2"></i>Cart
                            <span class="badge bg-danger rounded-circle ms-2" id="cart-badge-count" style="display:none;">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
    
    const bodyStart = document.body;
    bodyStart.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Set active class on navbar depending on route
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link-bakery').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function renderFooter() {
    const config = getCONFIG();
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <h4 class="text-cream mb-3">${config.bakeryName}</h4>
                    <p class="text-light-brown mb-4">${config.tagline}</p>
                    <div class="d-flex gap-3 fs-4">
                        <a href="${config.instagram}" target="_blank" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                        <a href="${config.facebook}" target="_blank" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6">
                    <h5 class="text-cream mb-3">Quick Links</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="index.html">Home</a></li>
                        <li class="mb-2"><a href="products.html">Our Products</a></li>
                        <li class="mb-2"><a href="seasonal.html">Seasonal Specials</a></li>
                        <li class="mb-2"><a href="promotions.html">Promotions</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-cream mb-3">Customer Support</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="about.html">About Us</a></li>
                        <li class="mb-2"><a href="contact.html">Contact Us</a></li>
                        <li class="mb-2"><a href="order-cancellation.html">Cancel Order</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-cream mb-3">Our Bakery</h5>
                    <p class="text-light-brown mb-2"><i class="bi bi-geo-alt me-2"></i>${config.address}</p>
                    <p class="text-light-brown mb-2"><i class="bi bi-telephone me-2"></i>${config.contactPhone}</p>
                    <p class="text-light-brown mb-2"><i class="bi bi-envelope me-2"></i>${config.contactEmail}</p>
                </div>
            </div>
            <hr class="my-4 bg-light-brown opacity-25">
            <div class="row">
                <div class="col-md-6 text-center text-md-start text-light-brown small">
                    &copy; ${new Date().getFullYear()} ${config.bakeryName}. All rights reserved.
                </div>
                <div class="col-md-6 text-center text-md-end text-light-brown small mt-2 mt-md-0">
                    Built for local business &bull; Hosted on Netlify
                </div>
            </div>
        </div>
    </footer>`;
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function renderWhatsAppBtn() {
    const config = getCONFIG();
    const btnHTML = `
    <a href="https://wa.me/${config.whatsappNumber}?text=Hi! I want to order some delicious items from ${config.bakeryName}." class="whatsapp-float pulse-badge" target="_blank" aria-label="Contact us on WhatsApp">
        <i class="bi bi-whatsapp"></i>
    </a>`;
    document.body.insertAdjacentHTML('beforeend', btnHTML);
}

export function setupCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;
    
    const cart = JSON.parse(localStorage.getItem('bakery_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

function animateOnScroll() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.scroll-animate').forEach(el => {
            el.classList.add('animate-fade-in-up');
        });
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 }); // Lower threshold to trigger sooner
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}
