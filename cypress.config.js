const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "oigaea",
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    env: {
      username: "olga_su",
      password: "olga_su",
      adminUsername: "admin_automation",
      adminPassword: "admin_automation",
      userToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbGdhX3N1IiwiZXhwIjoxNzEyNzcxNDkyLCJhdXRoIjoiUk9MRV9VU0VSX1NUVURFTlQiLCJpYXQiOjE3MTAxNzk0OTJ9.IiDz-7OEI66pBp8yu_xX24NrdWuijwRMDUw9ScVxcLYjZIpHAq_544GF3sy9eMs3VBG4auAGJxkOVQ1UA4sZiA"
    },
  },
});
