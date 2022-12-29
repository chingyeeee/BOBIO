/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        p1: "#FDBF52",
        p2: "#FFFAE7",
        p3: "#573605",
        s1: "#927858",
        s2: "#FCDBA3",
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
