const fetch = require('node-fetch');
const core = require("@actions/core");
const authHeader = require('./auth-header');
const { getRunningTimeEntry } = require('./get-running-time-entry');

/*
 Stop a time entry

 API documentation:
 https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#stop-a-time-entry
 */
async function stopATimeEntry(timeEntryId) {
    const url = `https://www.toggl.com/api/v8/time_entries/${timeEntryId}/stop`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: authHeader,
    });

    return await response.json();
}

getRunningTimeEntry()
    .then(json => {
        if (json.data) {
            const timeEntryId = json.data.id;
            return stopATimeEntry(timeEntryId);
        }
    })
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        // core.setFailed(error.message);
        console.log(error.message);
    });
