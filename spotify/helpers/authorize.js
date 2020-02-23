/*
 Authorization Code Flow

 Execute this file in order to obtain a refresh token.
 Store this as a github repository secret named `GITHUB_REFRESH_TOKEN`.

 This flow consists of 3 steps:
 1) Request authorization to access data.
 2) User is prompted to log in and confirm the authorization.
 3) Request access and refresh tokens for API access.

 API documentation:
 https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
 */

const {URL, URLSearchParams} = require('url');
const crypto = require("crypto");
const readline = require('readline');
const fetch = require('node-fetch');

/* ====================================================== /
    Set client credentials here locally. DO NOT UPLOAD!
/ ====================================================== */
const clientId = '';
const clientSecret = '';
/* ===================================================== */

// Request data
const redirect_uri = 'https://spotify.com';
const state = crypto.randomBytes(20).toString('hex');
const scope = [
    'user-read-playback-state',
    'user-modify-playback-state'
].join(',');

// Response data
let code;

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/**
 * Request authorization.
 *
 * @returns The authorization URL the user should open in their browser.
 */
async function requestAuthorization() {
    const url = new URL('https://accounts.spotify.com/authorize');
    const queryParams = {
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirect_uri,
        state: state,
        scope: scope
    };

    url.search = new URLSearchParams(queryParams).toString();

    return url.href;
}

/**
 * Request refresh token.
 *
 * @param code
 * @returns The refresh token
 */
async function obtainRefreshToken(code) {
    const url = 'https://accounts.spotify.com/api/token';
    const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
    };

    const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const json = await response.json();

    return json['refresh_token'];
}


requestAuthorization()
    .then(url => {
        console.log(
            "Authorization token requested successfully!" +
            "\n\nNext steps:" +
            "\nOpen the below URL. You may need to log in with your Spotify account." +
            "\nOnce completed, copy the current URl (ctrl+L + ctrl+C), then paste it into the prompt.\n");
        console.log(url);
        console.log("");
    })
    .then(() => {
        prompt.question('Paste URL here:\n>>> ', (url) => {
            code = new URL(url).searchParams.get('code');
            prompt.close();
        });
    })
    .catch(error => console.log(error));

prompt.on('close', () => {
    obtainRefreshToken(code)
        .then(refreshToken => {
            console.log("");
            console.log(
                `Et voilà! Your new refresh token is:\n` +
                `${refreshToken}\n\n` +
                `Now, copy the token and save it as a secret called SPOTIFY_REFRESH_TOKEN in the Github repo.`
            )
        })
        .catch(error => console.log(error));
});
