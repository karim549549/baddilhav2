/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gradient-start": "#FD297B",
        "gradient-middle": "#FF5864",
        "gradient-end": "#FF655B",

        // Theme colors for dark mode support
        "bg-primary": {
          DEFAULT: "#FFFFFF",
          dark: "#000000",
        },
        "bg-secondary": {
          DEFAULT: "#F9FAFB",
          dark: "#111827",
        },
        "bg-tertiary": {
          DEFAULT: "#F3F4F6",
          dark: "#1F2937",
        },
        "text-primary": {
          DEFAULT: "#111827",
          dark: "#F9FAFB",
        },
        "text-secondary": {
          DEFAULT: "#6B7280",
          dark: "#D1D5DB",
        },
        "text-tertiary": {
          DEFAULT: "#9CA3AF",
          dark: "#9CA3AF",
        },
        "border-primary": {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
        },
        "border-secondary": {
          DEFAULT: "#D1D5DB",
          dark: "#4B5563",
        },
        "card-primary": {
          DEFAULT: "#FFFFFF",
          dark: "#111827",
        },
        "card-secondary": {
          DEFAULT: "#F9FAFB",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
