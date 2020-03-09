const fetch = require('node-fetch');

/**
 * Transfer Spotify playback to the selected device.
 *
 * @returns A message detailing the outcome of the operation
 */
async function transferPlayback() {
    const url = 'https://api.spotify.com/v1/me/player';
    const data = {
        device_ids: [
            process.env.DEVICE_ID
        ],
        play: true
    };

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
    });

    return (response.status === 204) ? "😊" : "😢";
}

module.exports = {
    transferPlayback
};
