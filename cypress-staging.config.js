const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "oigaea",
    baseUrl: 'https://sqlverifier-staging-08050d656f7a.herokuapp.com',
    env: {
      
      username: 'olga_su',
      password: 'olga_su',
    },
  },
});
