/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screens: {
      xs: "478px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      signika: ["Signika"],
      varela: ["Varela Round"],
    },
    extend: {
      backgroundImage: {
        "desktop-header": "url('img/hero-potrait.jpg')",
      },
    },
  },
  plugins: [],
};
