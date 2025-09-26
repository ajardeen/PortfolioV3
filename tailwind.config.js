// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'wiggle-slow': 'wiggle 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    }
  }
}