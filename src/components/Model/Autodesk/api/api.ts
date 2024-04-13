//@ts-nocheck
export let token = '';

async function uploadModel(file) {
    let id = null;
    let name = encodeURIComponent(file.name);
    await fetch('https://developer.api.autodesk.com/oss/v2/buckets/dialoss133775/objects/' + name, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Disposition': name,
            'Content-Length': file.size,
        },
        body: file,
    }).then(r => r.json()).then(data => id = btoa(data.objectId).replaceAll('=', ''));
    return id;
}

function processModel(id) {
    fetch('https://developer.api.autodesk.com/modelderivative/v2/designdata/job', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "input": {
                "urn": id,
            },
            "output": {
                "formats": [
                    {
                        "type": "svf",
                        "views": ["2d", "3d"]
                    }
                ]
            }
        }),
    });
}

export async function uploadAutodeskFile(file) {
    const id = await uploadModel(file);
    processModel(id);
    console.log(id)
    return id;
}

(function auth() {
    let details = {
        client_id: process.env.REACT_APP_AUTODESK_ID,
        client_secret: process.env.REACT_APP_AUTODESK_SECRET,
        grant_type: 'client_credentials',
        scope: 'data:read data:write data:create bucket:create bucket:read'
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
        console.log(token)
    });
})();
