const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'blue-500': '#3b82f6',
      'sky-50': '#f0f9ff'
    },
  },
  plugins: [],
});

