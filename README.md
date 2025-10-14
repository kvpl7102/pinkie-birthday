# 🎂 Pinkie Birthday Website

A beautiful, interactive birthday website with a pink anime-inspired design, featuring smooth animations and heartfelt blessings.

## ✨ Features

- **Pink Anime-Inspired Design** - Beautiful pink color scheme with anime aesthetic
- **Snap Scroll Layout** - Smooth scrolling between alternating photo and blessing sections
- **Interactive Animations** - Powered by Framer Motion for fluid, relaxing animations
- **Mobile Responsive** - Optimized for all devices and screen sizes
- **Image Slideshow** - Display cherished memories across different periods
- **Heartfelt Blessings** - Personal messages with elegant typography

## 🚀 Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Styled Components with custom theme
- **Animations:** Framer Motion
- **Deployment:** Optimized for Vercel/Netlify

## 📁 Project Structure

```
pinkie-birthday/
├── public/
│   └── images/                 # Photo albums organized by periods
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── globals.css        # Global styles and animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/            # Reusable components
│   │   ├── ImageSlideshow/    # Photo slideshow component
│   │   ├── BlessingsSection/  # Blessings display component
│   │   └── ScrollContainer/   # Scroll behavior component
│   ├── styles/
│   │   └── theme.ts           # Pink color palette and design tokens
│   └── data/
│       └── blessings.ts       # Personal blessing content
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📸 Adding Your Photos

1. Organize your photos in `public/images/` by time periods:
   ```
   public/images/
   ├── childhood/
   ├── recent/
   └── special-moments/
   ```

2. Update the image paths in your slideshow components

## 💕 Adding Blessings

Edit `src/data/blessings.ts` to add your personal messages and blessings.

## 🎨 Customization

- **Colors:** Modify `src/styles/theme.ts` for your preferred pink palette
- **Animations:** Adjust Framer Motion settings in components
- **Layout:** Customize section arrangements in `src/app/page.tsx`

## 📱 Mobile Optimization

The website is fully responsive with:
- Touch-friendly interactions
- Optimized image loading
- Smooth scroll performance on mobile devices

## 🚀 Deployment

Ready for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

## 💝 Made with Love

This project was created to celebrate someone special with a unique, interactive birthday experience that combines technology with heartfelt emotions.

---

*"May this year bring you as much happiness as you bring to everyone around you!"* ✨