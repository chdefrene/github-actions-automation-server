const {obtainRefreshToken} = require("./authorize");
const {requestAuthorization} = require("./authorize");
const readline = require('readline');

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Response data
let code;

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
                `${refreshToken}\n\n`
            )
        })
        .catch(error => console.log(error));
});
