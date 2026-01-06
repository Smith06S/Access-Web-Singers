# Premium Piano Store - Accessible Website

## Project Overview

This project is an accessible website for Premium Piano Store, showcasing high-quality grand pianos with a focus on web accessibility and best practices.

**Product**: Premium Grand Piano - A musical instrument combining traditional craftsmanship with modern precision.

## Site Structure

The website consists of 4 main pages:

### 1. **Home** (`index.html`)
- Hero banner with showroom image
- Call-to-action button linking to product page
- Navigation to all site sections

### 2. **Product** (`product.html`)
- **Accessible carousel**: 6 images with keyboard navigation
- **Video with captions**: History of the Piano with .vtt subtitle file and transcript
- **Definition list**: Technical piano terminology with anchor link from footer

### 3. **Contact** (`contact.html`)
- Complete form with validation:
  - First name, last name
  - Date of birth
  - Email and phone 
  - Preferred contact time with radio buttons
  - Message textarea
- Real-time JavaScript validation with clear error messages
- Confirmation modal
- Success notification after submission

### 4. **About** (`about.html`)
- Company history and values
- Image of the entrance

## Accessibility Features

### Keyboard Navigation
- All interactive elements accessible via keyboard 
- Logical tab order throughout the site
- Visible focus indicators on all focusable elements

### ARIA & Semantic HTML
- Proper landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`)
- ARIA labels for screen readers
- `<article>`, `<section>`, `<figure>`
- Heading hierarchy 

### Forms
- Every input has a corresponding `<label>`
- `<fieldset>` and `<legend>` for grouped inputs
- Help text for expected formats
- Error messages with `role="alert"` and `aria-live="polite"`
- Native HTML5 `required` attribute 

### Modal Accessibility
- Only elements within modal are focusable
- Escape key closes modal
- Focus returns to triggering element after close
- `aria-modal="true"` and `aria-hidden` management

### Carousel Accessibility
- Keyboard controls
- Manual navigation 
- Status updates announced to screen readers

### Video Accessibility
- Captions with `<track kind="captions">` and .vtt file
- Text transcript dynamically loaded from .vtt file using JavaScript
- Transcript displayed in expandable `<details>` element
- Controls visible and keyboard-accessible

### Color Contrast
- All text meets WCAG standards 
- Button colors: `#008060` with white text 

### Images
- Descriptive `alt` text for all images
- Width and height attributes prevent layout shift

## Technologies Used

- **HTML5**
- **CSS**
- **Vanilla JavaScript**
- **WebVTT**

## Project Structure

```
Access-Web-Singers/
├── index.html              
├── product.html            
├── contact.html            
├── about.html              
├── style.css            
├── script.js   
├── homeLighthouse.pdf  
├── productLighthouse.pdf    
├── aboutLighthouse.pdf   
├── contactLighthouse.pdf                
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── shop.webp
│   │   ├── piano_front.webp
│   │   ├── piano_side.webp
│   │   ├── piano_back.webp
│   │   ├── piano_closed.webp
│   │   ├── piano_buttons.webp
│   │   ├── piano_decoration.webp
│   │   ├── piano_leftButtons.webp
│   │   ├── aboutWave.png
│   │   ├── contactWave.png
│   │   ├── indexWave.png
│   │   └── productWave.png
│   └── video/
│       ├── The History of the Piano...mp4
│       └── The History of the Piano...vtt
└── README.md              
```

## How to Launch the Website

This is a static website that doesn't require any build process or server installation.

**Note:** To view the video transcript feature (which loads dynamically from the .vtt file), you must use a local server due to browser security restrictions.

### Option 1: Open Directly
Simply open `index.html` in your web browser by double-clicking the file.

**Limitation:** Video transcript won't load when opening files directly.

### Option 2: Using a Local Server (Recommended)
For full functionality including video transcript:

1. **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Using VS Code:**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Using Node.js:**
   ```bash
   npx http-server
   ```

## Testing & Validation

### Lighthouse Scores (Target: >90)
- **Performances**: >90
- **Accessibility**: >90
- **Best Practices**: >90
- **SEO**: >90

### WAVE Report

index.html

![alt text](/assets/images/indexWave.png)


product.html

![alt text](/assets/images/productWave.png)


about.html

![alt text](/assets/images/aboutWave.png)


contact.html

![alt text](/assets/images/contactWave.png)

### W3C Validation
- HTML validated with no errors

### Browser Testing
Tested and working on:
- Chrome
- Firefox
