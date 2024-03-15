const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    chromeWebSecurity: false,
  },

  "env": {
    "users": {
        "test_user": {"username": "ARNALDO.TAVORA@N4IT.PT", "password" : "S0puKIVeCNHxDRW"},
    }
},

  viewportWidth: 1920,
  viewportHeight: 1080,
  "numTestsKeptInMemory": 0,
  "video": false,
  "defaultCommandTimeout": 10000,
});
