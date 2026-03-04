/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Quicksand", "sans-serif"],
    },

    fontSize: {
      /* Display */
      "display-3xl": ["3.75rem", { lineHeight: "4.5rem" }],
      "display-2xl": [
        "3rem",
        { lineHeight: "3.75rem", letterSpacing: "-0.02em" },
      ],
      "display-xl": [
        "2.5rem",
        { lineHeight: "3rem", letterSpacing: "-0.02em" },
      ],
      "display-lg": [
        "2.25rem",
        { lineHeight: "2.75rem", letterSpacing: "-0.02em" },
      ],
      "display-md": ["2rem", { lineHeight: "2.5rem" }],
      "display-sm": ["1.75rem", { lineHeight: "2.375rem" }],
      "display-xs": ["1.5rem", { lineHeight: "2.25rem" }],

      /* Text */
      xl: ["1.25rem", { lineHeight: "2.125rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      md: ["1rem", { lineHeight: "1.875rem" }],
      sm: ["0.875rem", { lineHeight: "1.75rem" }],
      xs: ["0.75rem", { lineHeight: "1.5rem" }],
    },

    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },

    extend: {
      colors: {
        /* Neutral */
        neutral: {
          25: "#FDFDFD",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E9EAEB",
          300: "#D5D7DA",
          400: "#A4A7AE",
          500: "#717680",
          600: "#535862",
          700: "#414651",
          800: "#252B37",
          900: "#181D27",
          950: "#0A0D12",
        },

        /* Primary */
        primary: {
          100: "#F6F9FE",
          200: "#D2E3FF",
          300: "#1C65DA",
          DEFAULT: "#1C65DA",
        },

        /* Accent */
        accent: {
          red: "#D9206E",
          green: "#079455",
          yellow: "#FDB022",
        },

        /* Base */
        base: {
          white: "#FFFFFF",
          black: "#000000",
        },
      },

      borderRadius: {
        none: "0px",
        xxs: "2px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
        full: "9999px",
      },

      // spacing: {
      //   none: "0px",
      //   xxs: "2px",
      //   xs: "4px",
      //   sm: "6px",
      //   md: "8px",
      //   lg: "12px",
      //   xl: "16px",
      //   "2xl": "20px",
      //   "3xl": "24px",
      //   "4xl": "32px",
      //   "5xl": "40px",
      //   "6xl": "48px",
      //   "7xl": "64px",
      //   "8xl": "80px",
      //   "9xl": "96px",
      //   "10xl": "128px",
      //   "11xl": "140px",
      // },
    },
  },
  plugins: [],
};
