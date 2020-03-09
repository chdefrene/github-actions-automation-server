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
const fetch = require('node-fetch');
require('./secrets');

// Request data
const redirect_uri = 'https://spotify.com';
const state = crypto.randomBytes(20).toString('hex');
const scope = [
    'user-read-playback-state',
    'user-modify-playback-state'
].join(',');


/**
 * Request authorization.
 *
 * @returns The authorization URL the user should open in their browser.
 */
async function requestAuthorization() {
    const url = new URL('https://accounts.spotify.com/authorize');
    const queryParams = {
        client_id: process.env.CLIENT_ID,
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
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
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

/**
 * Request an access token with a previously obtained refresh token.
 *
 * @returns The access token
 */
async function obtainAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: process.env.REFRESH_TOKEN,
        redirect_uri: 'https://spotify.com'
    };

    const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const json = await response.json();

    return json['access_token'];
}

module.exports = {
    requestAuthorization,
    obtainRefreshToken,
    obtainAccessToken
};
