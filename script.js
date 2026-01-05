// Contact Form Validation with Modal and DOM Error Messages
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmModal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const mainContent = document.querySelector('main');
    let previousFocus = null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearAllErrors();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let hasError = false;
            
            // Validate first name (allow accents)
            const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
            if (!namePattern.test(firstName)) {
                showError('firstName', 'Please enter a valid first name (letters, accents, spaces, hyphens, and apostrophes only).');
                hasError = true;
            }
            
            // Validate last name
            if (!namePattern.test(lastName)) {
                showError('lastName', 'Please enter a valid last name (letters, accents, spaces, hyphens, and apostrophes only).');
                hasError = true;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('email', 'Please enter a valid email address.');
                hasError = true;
            }
            
            // Validate phone (French format)
            const phonePattern = /^0[1-9](\s?\d{2}){4}$/;
            if (!phonePattern.test(phone)) {
                showError('phone', 'Please enter a valid phone number (format: 06 12 34 56 78).');
                hasError = true;
            }
            
            // If validation passes, open confirmation modal
            if (!hasError) {
                openModal();
            }
        });
        
        // Confirm button in modal
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                closeModal();
                showSuccessMessage();
                contactForm.reset();
            });
        }
        
        // Cancel button in modal
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                closeModal();
            });
        }
        
        // Handle Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (confirmModal && confirmModal.style.display === 'flex') {
                    closeModal();
                }
            }
        });
        
        // Handle Enter key on modal buttons
        if (confirmModal) {
            confirmModal.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    if (document.activeElement === confirmBtn) {
                        confirmBtn.click();
                    } else if (document.activeElement === cancelBtn) {
                        cancelBtn.click();
                    }
                }
            });
        }
    }

    // Accessible carousel on product page
    initCarousel();
});

// Carousel logic
function initCarousel() {
    const carouselImage = document.getElementById('carouselImage');
    const carouselCaption = document.getElementById('carouselCaption');
    const status = document.getElementById('carouselStatus');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const carousel = document.querySelector('.carousel');

    if (!carouselImage || !carouselCaption || !status || !prevBtn || !nextBtn || !carousel) return;

    const slides = [
        {
            src: 'assets/images/piano_front.webp',
            alt: 'Front view of the Premium Grand Piano showing the keyboard and elegant finish',
            caption: 'Front view of the Premium Grand Piano'
        },
        {
            src: 'assets/images/piano_side.webp',
            alt: 'Side profile of the Premium Grand Piano showing its curved body',
            caption: 'Side profile showcasing the piano body'
        },
        {
            src: 'assets/images/piano_back.webp',
            alt: 'Rear view of the Premium Grand Piano with open lid supports',
            caption: 'Rear view with open lid supports'
        },
        {
            src: 'assets/images/piano_closed.webp',
            alt: 'Premium Grand Piano with the lid closed',
            caption: 'Piano with closed lid'
        },
        {
            src: 'assets/images/piano_buttons.webp',
            alt: 'Close-up of the Premium Grand Piano keyboard and controls',
            caption: 'Close-up of keyboard and controls'
        },
        {
            src: 'assets/images/piano_decoration.webp',
            alt: 'Decorative details on the Premium Grand Piano top board',
            caption: 'Decorative top board details'
        }
    ];

    let currentIndex = 0;
    let autoPlay = false;
    let timer = null;

    function updateSlide(index) {
        const slide = slides[index];
        carouselImage.src = slide.src;
        carouselImage.alt = slide.alt;
        carouselCaption.textContent = slide.caption;
        status.textContent = `Image ${index + 1} of ${slides.length}`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(currentIndex);
    }

    function stopAutoPlay() {
        autoPlay = false;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        showPrev();
        stopAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        showNext();
        stopAutoPlay();
    });

    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoPlay();
            showPrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoPlay();
            showNext();
        }
    });

    // Initialize
    updateSlide(currentIndex);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('input-error');
    }
    
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input[aria-invalid="true"]');
    
    errorMessages.forEach(function(error) {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    inputs.forEach(function(input) {
        input.removeAttribute('aria-invalid');
        input.classList.remove('input-error');
    });
}

function openModal() {
    const confirmModal = document.getElementById('confirmModal');
    const mainContent = document.querySelector('main');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (confirmModal) {
        // Store the current focus
        previousFocus = document.activeElement;
        
        // Show modal
        confirmModal.style.display = 'flex';
        confirmModal.setAttribute('aria-hidden', 'false');
        
        // Hide main content from screen readers
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
        
        // Focus on confirm button
        if (confirmBtn) {
            confirmBtn.focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const confirmModal = document.getElementById('confirmModal');
    const mainContent = document.querySelector('main');
    
    if (confirmModal) {
        // Hide modal
        confirmModal.style.display = 'none';
        confirmModal.setAttribute('aria-hidden', 'true');
        
        // Restore main content to screen readers
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
        
        // Restore previous focus
        if (previousFocus) {
            previousFocus.focus();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.focus();
        
        // Hide message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }
}
