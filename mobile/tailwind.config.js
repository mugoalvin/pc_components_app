/** @type {import('tailwindcss').Config} */
export const content = ['./app/**/*.{js,jsx,ts,tsx}'];
export const presets = [require('nativewind/preset')];
export const theme = {
  extend: {
    fontFamily: {
      josefin_sans: ["JosefinSans_400Regular"],
      josefin_sans_bold: ["JosefinSans_700Bold"],
      zain: ["Zain_400Regular"],
      zain_bold: ["Zain_800ExtraBold"]
    }
  },
};
export const plugins = [];