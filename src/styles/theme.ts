export const theme = {
  colors: {
    primary: '#ff6b87',      // Main pink
    secondary: '#ff91a4',    // Lighter pink
    tertiary: '#ffc1d8',     // Very light pink
    background: '#ffe6f0',   // Background pink
    accent: '#ffb3c7',       // Accent pink
    white: '#ffffff',
    text: '#ff6b87',
    textLight: '#ff91a4',
    shadow: 'rgba(255, 107, 135, 0.3)',
    shadowLight: 'rgba(255, 107, 135, 0.1)',
  },

  gradients: {
    primary: 'linear-gradient(135deg, #ffe6f0 0%, #ffc1d8 50%, #ffb3c7 100%)',
    hero: 'linear-gradient(135deg, #ffe6f0 0%, #ffc1d8 50%, #ffb3c7 100%)',
    imageSection: 'linear-gradient(135deg, #fff0f5 0%, #ffe6f0 50%, #ffc1d8 100%)',
    blessingsSection: 'linear-gradient(135deg, #ffe6f0 0%, #ffb3c7 50%, #ff91a4 100%)',
  },

  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    decorative: '"Kaisei HarunoUmi", serif',
  },

  borderRadius: {
    small: '10px',
    medium: '15px',
    large: '20px',
    extraLarge: '30px',
  },

  shadows: {
    soft: '0 4px 20px rgba(255, 107, 135, 0.15)',
    medium: '0 10px 30px rgba(255, 107, 135, 0.2)',
    strong: '0 15px 40px rgba(255, 107, 135, 0.3)',
  },

  animations: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 0.8,
      extraSlow: 1.2,
    },
    easing: {
      easeOut: [0.25, 0.46, 0.45, 0.94],
      easeInOut: [0.4, 0, 0.2, 1],
    },
  },

  breakpoints: {
    xs: '320px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1440px',
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
}

export type Theme = typeof theme