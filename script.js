// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate names (allow accents)
            const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
            if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
                alert('Please enter valid names (letters, accents, spaces, hyphens, and apostrophes only).');
                return;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Validate phone (French format)
            const phonePattern = /^0[1-9](\s?\d{2}){4}$/;
            if (!phonePattern.test(phone)) {
                alert('Please enter a valid phone number (format: 06 12 34 56 78).');
                return;
            }
            
            // If all validations pass
            showSuccessMessage();
            contactForm.reset();
        });
    }
});

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
