/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        accent: '#F59E0B',
        soft: '#F3F4F6',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
        lg2: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
      },
      borderRadius: {
        card: '12px'
      }
    },
  },
  plugins: [],
}


