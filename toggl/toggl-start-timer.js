const fetch = require('node-fetch');

const authHeader = require('./auth-header');

/*
 Start a time entry

 API documentation:
 https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#start-a-time-entry
 */
async function startTimer() {
    const url = 'https://www.toggl.com/api/v8/time_entries/start';
    const data = {
        "time_entry": {
            "description": "Auto-added timer entry",
            "wid": process.env.TOGGL_WORKSPACE_ID,
            "pid": process.env.TOGGL_PROJECT_ID,
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

// startTimer()
//     .then(json => {
//         console.log(json);
//     })
//     .catch(err => {
//         console.log(err)
//     });