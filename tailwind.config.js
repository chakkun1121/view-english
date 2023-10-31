/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#7aa1d6',
          hover: '#7a9ac7',
        },
        sea: {
          DEFAULT: '#003EE5',
          50: '#E8F1FE',
          100: '#C5D7FB',
          200: '#9DB7F9',
          300: '#7096F8',
          400: '#4979F5',
          500: '#0946F1',
          600: '#003EE5',
          700: '#0031D8',
          800: '#0024CE',
          900: '#0000BE',
          darken: {
            300: '#3F72F6',
            600: '#0030B2',
          },
        },
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(0, 1fr))',
      },
      fontSize: {
        'heading-L': [
          '36px',
          {
            lineHeight: 1.4,
            letterSpacing: '0.04em',
            fontWeight: 'Regular',
          },
        ],
        'heading-M': [
          '32px',
          {
            lineHeight: 1.5,
            letterSpacing: '0.04em',
            fontWeight: 'Regular',
          },
        ],
        'heading-S': [
          '28px',
          {
            lineHeight: 1.5,
            letterSpacing: '0.04em',
            fontWeight: 'Regular',
          },
        ],
        L: [
          // 通常の本文
          '16px',
          {
            lineHeight: 1.7,
            letterSpacing: '0.04em',
            fontWeight: 'Regular',
          },
        ],
        M: [
          '14px',
          {
            lineHeight: 1.7,
            letterSpacing: '0.04em',
            fontWeight: 'Regular',
          },
        ],
        button: [
          '16px',
          {
            lineHeight: 1.5,
            letterSpacing: '0.04em',
            fontWeight: 'Bold',
          },
        ],
      },
    },
  },
  plugins: [],
};
