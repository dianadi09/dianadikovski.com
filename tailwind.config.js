/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: '#3D9E9E',
        purple: '#6B4FA0',
        purpleDeep: '#4A3570',
        plum: '#2A1F3D',
        terra: '#C4885A',
        terraInk: '#8A5228',
        tealInk: '#1F6B6B',
        card: '#FBF6EC',
        beige: '#F2E8D9',
        brown: '#2C2018',
        paper: '#F7F1E6',
        ink: '#2C2018'
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        sans: ['Assistant', 'system-ui', 'sans-serif'],
        hand: ['"Gveret Levin"', 'Assistant', 'sans-serif']
      },
      boxShadow: {
        print: '0 1px 2px rgba(44,32,24,0.12), 0 12px 32px -12px rgba(44,32,24,0.35)',
        frame: '0 2px 6px rgba(44,32,24,0.25)'
      }
    }
  },
  plugins: []
}
