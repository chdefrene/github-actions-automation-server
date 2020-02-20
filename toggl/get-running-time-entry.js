const fetch = require('node-fetch');
const authHeader = require('./auth-header');

/*
 Get running time entry

 API documentation:
 https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-running-time-entry
 */
async function getRunningTimeEntry() {
    const url = 'https://www.toggl.com/api/v8/time_entries/current';

    const response = await fetch(url, {
        method: 'GET',
        headers: authHeader
    });

    return await response.json();
}

module.exports.getRunningTimeEntry = getRunningTimeEntry;
