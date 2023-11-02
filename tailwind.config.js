/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#7aa1d6',
          hover: '#7a9ac7',
        },
        forest: {
          DEFAULT: '#259D63',
          50: '#E6F5EC',
          100: '#C2E5D1',
          200: '#9BD4B5',
          300: '#71C598',
          400: '#51B883',
          500: '#2CAC6E',
          600: '#259D63',
          700: '#1D8B56',
          800: '#197A4B',
          900: '#115A36',
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
        sumi: {
          DEFAULT: '#1A1A1C',
          50: '#F8F8FB',
          100: '#F1F1F4',
          200: '#E8E8EB',
          300: '#D8D8DB',
          400: '#B4B4B7',
          500: '#949497',
          600: '#757578',
          700: '#626264',
          800: '#414143',
          900: '#1A1A1C',
        },
        sun: {
          DEFAULT: '#EC0000',
          50: '#FFE7E6',
          100: '#FFC8B8',
          200: '#FFA28B',
          300: '#FF7B5C',
          400: '#FF5838',
          500: '#FF4B36',
          600: '#FF220D',
          700: '#FA1606',
          800: '#EC0000',
          900: '#D50000',
        },
        wood: {
          DEFAULT: '#C16800',
          50: '#F8F1E0',
          100: '#EFDBB1',
          200: '#E5C47F',
          300: '#DCAC4D',
          400: '#D69C2B',
          500: '#D18D0F',
          600: '#CD820A',
          700: '#C87504',
          800: '#C16800',
          900: '#B65200',
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
};
