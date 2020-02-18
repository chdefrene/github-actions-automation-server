const url = 'https://www.toggl.com/api/v8/time_entries/start';
const api_token = process.env.TOGGL_API_TOKEN
const body = {
	"time_entry": {
		"description": "Auto-added timer entry",
		"wid": process.env.TOGGL_WORKSPACE_ID,
		"pid": process.env.TOGGL_PROJECT_ID,
		"created_with": "Github actions"
	}
}

const response = fetch(url, {method: 'POST', })