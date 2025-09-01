# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static HTML/CSS/JavaScript website for the "Getting My Cheese Back On My Cracker Foundation" - a non-profit focused on mental health and wellness in Black and Brown communities. The project serves as design inspiration for a future Webflow build targeting investors and sponsors.

## Development Commands
This is a static website project with no build process. Development is done by:
- Opening `index.html` directly in a browser for testing
- Making changes to HTML, CSS, and JavaScript files directly
- No package managers, build tools, or test frameworks are used

## Project Structure
```
COMC/
├── index.html           # Main HTML file with complete website structure
├── css/                 # CSS files (currently empty - styles need to be created)
│   ├── styles.css      # Main stylesheet
│   └── components.css  # Component-specific styles
├── js/                  # JavaScript files (currently empty - scripts need to be created)
│   ├── main.js         # Main functionality including navigation
│   └── carousel.js     # Hero carousel functionality
├── images/             # Image assets (currently empty)
├── assets/             # Additional assets (currently empty)
├── README.md           # Project documentation
├── PLAN.md            # Detailed development plan and design strategy
└── TODO.md            # Task tracking and development phases
```

## Key Architecture Details

### Hero Carousel System
The main feature is a 3-slide hero carousel with:
- Auto-advance every 6 seconds
- Pauses on user interaction
- Navigation dots and arrows
- Mobile swipe support
- Slides: Mission → Action → Impact

### Brand Guidelines
- **Primary Orange**: #FF9500
- **Deep Charcoal**: #222222
- **Warm White**: #F9F6F2
- **Rich Brown**: #3E2723
- **Soft Gold**: #FFCC80
- **Gentle Teal**: #009688

### Content Strategy
- **Target Audience**: Investors/sponsors (primary), community members (secondary)
- **Tone**: Warm, professional, credible, impact-focused
- **4-Tiered Approach**: Advocate → Build → Partner → Remove Barriers

## Current Development Status
The HTML structure is complete with semantic markup for:
- Responsive navigation with mobile hamburger menu
- Hero carousel with 3 slides
- Impact metrics section
- Strategic overview (4-tiered approach)
- Trust & momentum section with featured events
- Comprehensive footer with newsletter signup

**Missing Implementation:**
- CSS files are referenced but don't exist yet
- JavaScript files are referenced but don't exist yet
- Image assets need to be added
- Carousel functionality needs implementation

## Design Requirements
- Mobile-first responsive design
- WCAG accessibility compliance
- Clean, semantic HTML structure suitable for Webflow recreation
- Professional presentation balancing community warmth with investor credibility

## External Dependencies
- Google Fonts: Inter and Playfair Display
- Font Awesome 6.4.0 for icons
- Uses Unsplash images as placeholders in HTML

## Reference Website
Current foundation website: https://cheeseonmycracker.com/