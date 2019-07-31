require('dotenv').config()
const okta = require('@okta/okta-sdk-nodejs');
const client = new okta.Client({
  orgUrl: process.env.URI_OKTA,
  token: process.env.OKTA_TOKEN
});
module.exports = client;