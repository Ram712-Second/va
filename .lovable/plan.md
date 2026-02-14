
# 💖 Valentine's Day App for Archa

A romantic, personalized Valentine's Day web experience with elegant animations, glassmorphism design, and interactive elements.

## Design & Theme
- **Colors**: Soft pink & rose gradients (pink-100 → rose-500 → pink-600)
- **Style**: Glassmorphism cards with frosted glass effect and subtle borders
- **Typography**: Elegant serif headings, clean sans-serif body text
- **Layout**: Mobile-first, fully responsive

## Sections

### 1. Hero Section
- Full-screen landing with animated gradient background
- "Happy Valentine's Day, Archa ❤️" heading with fade-in animation
- Subtitle and "Open My Heart" button that smooth-scrolls to the love letter
- Floating hearts animation in the background

### 2. Love Letter Section
- Beautiful glassmorphism card with the personalized apology/love message
- Fade-in reveal animation as user scrolls into view
- Decorative heart accents around the card

### 3. Romantic Quotes Section
- 5 quote cards displayed in a responsive grid
- Each card has a glassmorphism style with staggered entrance animations
- Hover scale effect on desktop, tap animation on mobile

### 4. Photo Gallery Section
- Responsive grid of romantic placeholder images (roses, sunsets, couples)
- Click/tap to open a full-screen modal preview
- Smooth zoom-in animation on modal open

### 5. Proposal Section
- Large animated "Will You Be My Valentine?" text
- **YES button**: Pink gradient, triggers confetti explosion, reveals thank-you message
- **NO button**: Moves slightly on hover/tap (small random shift), still clickable on mobile

### 6. Background Music
- Audio player for `love.mp3` (from public folder)
- Floating play/pause toggle button (fixed position)
- Starts muted (browser autoplay policy), loops, volume at 0.4

### 7. Extra Effects
- Continuously floating heart particles in the background (CSS animated)
- Smooth scroll behavior throughout the app
- Confetti burst (canvas-confetti) on YES button click

### New Dependencies
- **framer-motion** – for scroll animations and transitions
- **canvas-confetti** – for the confetti effect on the proposal section
