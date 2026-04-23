# Portfolio - React Vite

A modern portfolio website built with React and Vite featuring an interactive project timeline with smooth animations and a dark blue theme with greenish-white cursor glow effects.

## Features

- ✨ **Project Timeline** - Display your projects in a chronological timeline (recent to old)
- 🎨 **Dark Blue Theme** - Professional dark blue gradient background
- 🌿 **Greenish-White Glow** - Custom cursor with greenish glow effects and animated elements
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for optimal performance and hot module reloading
- 🔗 **GitHub Integration** - Direct links to GitHub repositories for each project

## Project Structure

```
src/
├── components/
│   ├── Timeline.jsx          # Main timeline component
│   └── ProjectCard.jsx       # Individual project card component
├── data/
│   └── projects.js           # Project data (edit to add your projects)
├── styles/
│   ├── Timeline.css          # Timeline styling
│   └── ProjectCard.css       # Project card styling
├── App.jsx                   # Main app component
├── App.css                   # App styles
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173/`.

## Customization

### 1. Update Your Projects

Edit `src/data/projects.js` to add your own projects:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Your project description",
    image: "https://your-image-url.com/image.jpg",
    github: "https://github.com/yourusername/your-repo",
    date: "2025-12"
  },
  // Add more projects...
];
```

**Fields:**
- `id`: Unique identifier (number)
- `title`: Project name
- `description`: Brief project description
- `image`: Project image URL (500x300px recommended)
- `github`: GitHub repository URL
- `date`: Date in YYYY-MM format (used for ordering)

### 2. Customize Colors

Edit `src/index.css` to change the color scheme:

- `#001a4d` - Dark blue background (primary)
- `#003366` - Dark blue background (secondary)
- `#90EE90` - Greenish-white accent color
- `#7BC67B` - Darker greenish accent

### 3. Modify Timeline Styling

Edit `src/styles/Timeline.css` to customize:
- Timeline line appearance
- Marker styles and animations
- Spacing and layout

### 4. Adjust Project Card Styling

Edit `src/styles/ProjectCard.css` to modify:
- Card appearance and animations
- Image effects
- Text styling and hover effects

## Color Palette

- **Primary Background**: `#001a4d` (Dark Navy Blue)
- **Secondary Background**: `#003366` (Navy Blue)
- **Accent Color**: `#90EE90` (Light Green - Pale Green)
- **Text Primary**: `#e0e0e0` (Light Gray)
- **Text Secondary**: `#c0c0c0` (Medium Gray)

## Typography

- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Heading Font Size**: 3.5rem (main title), 1.8rem (project title)
- **Body Font Size**: 1rem

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: All modern versions

## Deployment

### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

### Vercel
```bash
# Vercel will automatically detect and build the project
# Just push to your git repository
```

### GitHub Pages
Update `vite.config.js`:
```javascript
export default {
  base: '/repository-name/',
  // ... rest of config
}
```

## Dependencies

- **React**: UI library
- **Vite**: Build tool
- **lucide-react**: Icon library for GitHub icon

## Tips for Best Results

- Add 5-10 projects for a complete portfolio
- Use high-quality project images
- Keep descriptions concise (2-3 sentences)
- Update project dates to show your recent work first
- Test on mobile devices to ensure responsive design
- Replace image URLs in `src/data/projects.js` with your actual project screenshots
