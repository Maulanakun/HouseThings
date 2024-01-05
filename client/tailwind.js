const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      // Add your custom styles here
    }),
  ],
};
