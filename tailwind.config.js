/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    // Centraliza e dá padding responsivo ao container
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      // Paleta de cores customizada
      colors: {
        primary: {
          DEFAULT: '#7F56D9',
          light:   '#EDE5F8',
          dark:    '#5C3EA4',
        },
        secondary: '#F0F2F5',
      },
      // Bordas arredondadas
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Sombras customizadas (chaves com hífen precisam de aspas)
      boxShadow: {
        card:        '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover':'0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      // Fonte padrão
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Espaçamentos extras
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      // Breakpoints adicionais
      screens: {
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
