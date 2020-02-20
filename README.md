# github-actions-automation-server
Various automations running hosted on github actions

## Supported dispatch actions

| Event type                | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `get-running-time-entry`  | Returns the id of the currently running Toggl timer, or `null` if no timer is running. |
| `start-a-time-entry`      | Starts a timer running on toggl.com.                                                   |


### How to trigger the `repository_dispatch` event

[Github actions documentation](https://help.github.com/en/actions/reference/events-that-trigger-workflows#external-events-repository_dispatch)

[Github API documentation](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event)

Send a POST request to `https://api.github.com/repos/:owner/:repo/dispatches`

This will only trigger a workflow present on the *default* branch. Specifying a custom branch is not supported.

Remember to authenticate by adding this to the HTTP header:
```
Authorization: Bearer {{GITHUB_TOKEN}}
```

Include the following data:

```json
{
  "event_type": "A custom webhook event name (required)",
  "client_payload": {
    "extra (optional)": "key-value",
    "information": "that will be",
    "passed on": "to the workflow as input.",
    "note (1)": "GitHub stores input parameters as environment variables.",
    "note (2)": "Input ids with uppercase letters are converted to lowercase during runtime."
  }
}
```
