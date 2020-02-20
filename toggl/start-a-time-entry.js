const fetch = require('node-fetch');
const core = require("@actions/core");
const authHeader = require('./auth-header');

/*
 Start a time entry

 API documentation:
 https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#start-a-time-entry
 */
async function startATimeEntry() {
    const url = 'https://www.toggl.com/api/v8/time_entries/start';
    const data = {
        "time_entry": {
            "description": "Auto-added timer entry",
            "wid": core.getInput('toggl_workspace_id'),
            "pid": core.getInput('toggl_project_id'),
            "created_with": "Github actions"
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(data)
    });

    return await response.json();
}

startATimeEntry()
    .then(json => {
        // core.debug(json);
        console.log(json);
    })
    .catch(error => {
        // core.setFailed(error.message);
        console.log(error.message);
    });
