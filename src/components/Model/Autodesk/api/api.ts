//@ts-nocheck
export let token = '';

(function auth() {
    let details = {
        client_id: process.env.REACT_APP_AUTODESK_ID,
        client_secret: process.env.REACT_APP_AUTODESK_SECRET,
        grant_type: 'client_credentials',
        scope: 'data:read bucket:read'
    };
    let formBody = [];
    for (const property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://developer.api.autodesk.com/authentication/v1/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
    }).then(r => r.json()).then(data => {
        token = data.access_token;
    });
})();
