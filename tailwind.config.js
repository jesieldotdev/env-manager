/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['M Plus 1', 'sans-serif'], // Fonte padrão para texto
        serif: ['Merriweather', 'serif'], // Fonte para títulos ou textos específicos
        mono: ['Fira Code', 'monospace'], // Fonte monoespaçada
        title: ['Fjalla One', 'sans-serif']
      },
    },
  },
  plugins: [],
}

