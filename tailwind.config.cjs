/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        fullbanner: "url('/src/assets/images/homepage_banner.jpg')",
      },
      colors: {
        p1: "#FDBF52",
        p2: "#FFFAE7",
        p3: "#573605",
        s1: "#927858",
        s2: "#FCDBA3",
        n1: "#ffffff",
        n6: "#78797d",
        nav: "rgba(255, 250, 231, 0.85)",
      },
      borderRadius: {
        btn: "1.25rem",
      },
    },
    fontFamily: {
      rocknroll: ["RocknRoll One", "sans-serif"],
      notosans: ["Noto Sans TC", "sans-serif"],
    },
  },
  plugins: [],
};
