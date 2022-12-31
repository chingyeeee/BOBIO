/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        fullbanner: "url('/src/assets/images/homepage/homepage_banner.jpg')",
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
      fontSize: {
        sm: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        h3: [
          "1.75rem",
          {
            lineHeight: "2.25rem",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        h2: [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.05em",
            fontWeight: "700",
          },
        ],
        h1: [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.05em",
            fontWeight: "900",
          },
        ],
        "6xl": [
          "3.75rem",
          {
            lineHeight: "1",
            letterSpacing: "0.05em",
            fontWeight: "900",
          },
        ],
        "6xl": [
          "6rem",
          {
            lineHeight: "1",
            letterSpacing: "0.05em",
            fontWeight: "900",
          },
        ],
      },
    },
    fontFamily: {
      rocknroll: ["RocknRoll One", "sans-serif"],
      notosans: ["Noto Sans TC", "sans-serif"],
    },
    fontSize: {
      sm: [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.05em",
          fontWeight: "400",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "0.05em",
          fontWeight: "400",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
          letterSpacing: "0.05em",
          fontWeight: "400",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "0.05em",
          fontWeight: "500",
        },
      ],
      h3: [
        "1.75rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "0.05em",
          fontWeight: "500",
        },
      ],
      h2: [
        "2rem",
        {
          lineHeight: "2.5rem",
          letterSpacing: "0.05em",
          fontWeight: "700",
        },
      ],
      h1: [
        "2.25rem",
        {
          lineHeight: "2.5rem",
          letterSpacing: "0.05em",
          fontWeight: "900",
        },
      ],
    },
  },
  plugins: [],
};
