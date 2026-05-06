/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
    corePlugins: {
    container: false, // disables Tailwind container plugin entirely
  },
  plugins: [],
}

