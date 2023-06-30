/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xs: { max: "479px" },
        // => @media (max-width: 479px) { ... }

        mlg: { min: "1023px" },
        // => @media (min-width: 1023px) { ... }

        mmd: { min: "767px" },
        // => @media (min-width: 767px) { ... }

        mxs: { min: "478px" },
        // => @media (min-width: 479px) { ... }

        //custom responsive
        hideEvent: { max: "900px" },
        hideMobileEvent: { min: "900px" },
        fixNavbar: { max: "1160px" },
      },
    },
  },
  plugins: [],
}
