require('dotenv').config()
const okta = require('@okta/okta-sdk-nodejs');
const client = new okta.Client({
  orgUrl: process.env.REACT_APP_OKTA_URL,
  token: process.env.REACT_APP_OKTA_TOKEN
});
module.exports = client;