const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "oigaea",
    baseUrl: 'https://sqlverifier-live-6e21ca0ed768.herokuapp.com/',
  },
});
