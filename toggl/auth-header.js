/*
 From Toggl API documentation:

 `When using Basic Auth and API token, use the API token as username and string "api_token" as password.`

 Source: https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md#authentication
 */

const core = require("@actions/core");

const auth_credentials = `${core.getInput('toggl_api_token')}:api_token`;
const base64_credentials = Buffer.from(auth_credentials).toString('base64');

module.exports = {
    'Authorization': `Basic ${base64_credentials}`
};


