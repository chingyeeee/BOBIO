const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        fullbanner: "url('/src/assets/images/homepage/homepage_banner.jpg')",
        joinusmobile: "url('/src/assets/images/homepage/join_us_mobile.png')",
        joinusloop:
          "url('/src/assets/images/homepage/join_us_loop_mobile.png')",
        joinus: "url('/src/assets/images/homepage/join_us.png')",
        member: "url('/src/assets/images/homepage/total_member.png')",
        donate: "url('/src/assets/images/homepage/total_donate.png')",
        purchase: "url('/src/assets/images/homepage/total_purchase.png')",
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
        cate: "rgba(253, 191, 82, 0.5)",
      },
      boxShadow: {
        lv1: "0 4px 4px rgba(87, 54, 5, 0.25)",
        ring: "0 0 0 8px rgba(87, 54, 5, 0.25)",
        active: "0 0 0 8px rgba(253, 191, 82, 0.5)",
        food: "0 4px 4px rgba(87, 54, 5, 0.25),0 0 0 8px #FDBF52,0 0 8px 8px rgba(253, 191, 82, 0.5)",
        line: "0 0 0px 1px rgba(253, 191, 82, 0.5)",
        "inner-circle": "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        btn: "1.875rem",
      },
      fontSize: {
        caption: [
          "0.875rem", //14px
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        normal: [
          "1rem", //16px
          {
            lineHeight: "1.5rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        lg: [
          "1.125rem", //18px
          {
            lineHeight: "1.75rem",
            letterSpacing: "0.05em",
            fontWeight: "400",
          },
        ],
        xl: [
          "1.5rem", //24px
          {
            lineHeight: "2rem",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        h3: [
          "1.75rem", //28px
          {
            lineHeight: "2.25rem",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        h2: [
          "2rem", //32px
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.05em",
            fontWeight: "700",
          },
        ],
        h1: [
          "2.25rem", //36px
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.05em",
            fontWeight: "900",
          },
        ],
        "5xl": [
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
      animation: {
        "scroll-down": "scroll-down 1.5s linear infinite",
        ringing: "ringing 1s linear infinite alternate",
        "scale-all": "scale-all 0.5s linear infinite alternate",
        "shake-lots-web": "shakeLotsWeb 0.5s linear infinite alternate",
        "shake-lots-mobile": "shakeLotsMobile 0.5s linear infinite alternate",
        "get-pome": "getPome 0.5s linear",
        "fadein-number": "1.8s ease-in fadeInNumber",
      },
      keyframes: {
        "scroll-down": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
        ringing: {
          "0%": { boxShadow: "0 0 0 8px rgba(253, 191, 82, 0.5)" },
          "100%": { boxShadow: "0 0 0 0px rgba(253, 191, 82, 0.5)" },
        },
        "scale-all": {
          "0%": { transform: "scale(.85)" },
          "100%": { transform: "scale(1.25)" },
        },
        shakeLotsWeb: {
          "0%": { transform: "rotate(-15deg) scale(1.25) translateY(2rem)" },
          "100%": { transform: "rotate(15deg) scale(1.25) translateY(2rem)" },
        },
        shakeLotsMobile: {
          "0%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(5deg)" },
        },
        getPome: {
          "0%": { left: "0", top: "5rem", right: "1.25rem" },
          "100%": { left: "0", top: "0", right: "0" },
        },
        fadeInNumber: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      width: {
        600: "37.5rem",
      },
      height: {
        600: "37.5rem",
      },
      translate: {
        290: "18.5rem",
      },
    },
    fontFamily: {
      rocknroll: ["RocknRoll One", "sans-serif"],
      notoserif: ["Noto Serif TC", "serif"],
    },
  },
  plugins: [],
});
