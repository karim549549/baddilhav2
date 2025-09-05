/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#FD297B',
        'gradient-middle': '#FF5864',
        'gradient-end': '#FF655B',
      },
    },
  },
  plugins: [],
};
