// Form Validation and Modal Handling
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
            
            clearAllErrors();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim(); 
            let hasError = false;
            
            const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
            if (!namePattern.test(firstName)) {
                showError('firstName', 'Please enter a valid first name (letters, accents, spaces, hyphens, and apostrophes only).');
                hasError = true;
            }
            
            if (!namePattern.test(lastName)) {
                showError('lastName', 'Please enter a valid last name (letters, accents, spaces, hyphens, and apostrophes only).');
                hasError = true;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('email', 'Please enter a valid email address.');
                hasError = true;
            }
            
            const phonePattern = /^0[1-9](\s?\d{2}){4}$/;
            if (!phonePattern.test(phone)) {
                showError('phone', 'Please enter a valid phone number (format: 06 12 34 56 78).');
                hasError = true;
            }
            
            if (!hasError) {
                openModal();
            }
        });
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                closeModal();
                showSuccessMessage();
                contactForm.reset();
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                closeModal();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (confirmModal && confirmModal.style.display === 'flex') {
                    closeModal();
                }
            }
        });
        
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

    initCarousel();
    loadVideoTranscript();
});

// Carousel Initialization
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

    updateSlide(currentIndex);
}

// Error Handling
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

// Error Clearing
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

// Modal Handling
function openModal() {
    const confirmModal = document.getElementById('confirmModal');
    const mainContent = document.querySelector('main');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (confirmModal) {
        previousFocus = document.activeElement;
        
        confirmModal.style.display = 'flex';
        confirmModal.setAttribute('aria-hidden', 'false');
        
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
        
        if (confirmBtn) {
            confirmBtn.focus();
        }
        
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const confirmModal = document.getElementById('confirmModal');
    const mainContent = document.querySelector('main');
    
    if (confirmModal) {
        confirmModal.style.display = 'none';
        confirmModal.setAttribute('aria-hidden', 'true');
        
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
        
        if (previousFocus) {
            previousFocus.focus();
        }
        
        document.body.style.overflow = '';
    }
}

// Show Success Message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.focus();
        
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// Load Video Transcript from VTT file
function loadVideoTranscript() {
    const transcriptContainer = document.getElementById('videoTranscript');
    if (!transcriptContainer) return;

    const vttPath = 'assets/video/The History of the Piano From Harpsichords to Modern Masterpieces.vtt';
    
    fetch(vttPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load transcript');
            }
            return response.text();
        })
        .then(vttContent => {
            const transcript = parseVTT(vttContent);
            transcriptContainer.innerHTML = `<p>${transcript}</p>`;
        })
        .catch(error => {
            console.error('Error loading transcript:', error);
            transcriptContainer.innerHTML = '<p>Transcript unavailable.</p>';
        });
}

// Parse VTT file to extract text only
function parseVTT(vttContent) {
    const lines = vttContent.split('\n');
    const textLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines, WEBVTT header, cue numbers, and timestamp lines
        if (line === '' || 
            line === 'WEBVTT' || 
            /^\d+$/.test(line) || 
            /-->/.test(line)) {
            continue;
        }
        
        if (line) {
            textLines.push(line);
        }
    }
    
    return textLines.join(' ');
}
