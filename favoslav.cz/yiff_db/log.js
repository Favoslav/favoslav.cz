const access_token = new URLSearchParams(window.location.search).get('access_token');
const token_type = new URLSearchParams(window.location.search).get('token_type');

//!Fetches user data
const userResult = request('https://discord.com/api/users/@me', {
    headers: {
        authorization: `${token_type} ${access_token}`,
    },
});
const userResultData = userResult.body.json();

// if (userResultData === 553946762289610785) {
//     console.log('yes')
// }