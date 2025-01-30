const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      primary: "#a37d4c", 
      hoverbutton:"#967142",
      secondary: "#a37d4c",//colour for button
      light: "#FAFAFA", 
  },
},
  plugins: [
    flowbite.plugin(),
  ],
}

