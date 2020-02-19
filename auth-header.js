/*
 From Toggl API documentation:

 `When using Basic Auth and API token, use the API token as username and string "api_token" as password.`

 Source: https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md#authentication
 */

const auth_credentials = `${process.env.TOGGL_API_TOKEN}:api_token`;
const base64_credentials = Buffer.from(auth_credentials).toString('base64');

module.exports = {
    'Authorization': `Basic ${base64_credentials}`
};


