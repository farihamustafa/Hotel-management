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
      primary: "#850b11		", 
      hoverbutton:"#404040",
      secondary: "#5A5A5A",//colour for button
      light: "#FAFAFA", 
  },
},
  plugins: [
    flowbite.plugin(),
  ],
}

