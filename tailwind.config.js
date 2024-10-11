/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,htm,js}"],
  theme: {
    screens: {
      "xxs": "320px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        aquaPlus: "#00D1FF",
        aquaDark: "#00242C",
        "aquaDark-medium": "#005062"
      },
      fontFamily: {
        "Space_Grotesk-bold": "Space_Grotesk-bold",
        "DarkerGrotesque-Bold": "DarkerGrotesque-Bold",
        "Space_Grotesk-medium": "Space_Grotesk-medium",
        "DM-sans": "DM-sans",
        "DM-sans-medium": "DM-sans-medium",
        "DM-sans-bold": "DMSans-Bold",
      },
    },
  },
  plugins: [],
}

