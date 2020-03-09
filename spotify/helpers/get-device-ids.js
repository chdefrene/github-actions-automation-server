const fetch = require('node-fetch');
const {obtainAccessToken} = require("./authorize");
require('./secrets');

/**
 * Get a list of all Spotify client devices (the app must be open on the device)
 *
 * @returns A list of name + id pairs
 */
async function getDevices() {
    const url = 'https://api.spotify.com/v1/me/player/devices';

    const accessToken = await obtainAccessToken().catch(error => error);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.devices.map(device => {
            return {
                name: device.name,
                id: device.id
            };
        }));
    } else {
        console.log(response.statusText);
    }
}


getDevices();
