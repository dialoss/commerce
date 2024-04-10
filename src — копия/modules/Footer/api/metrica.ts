//@ts-nocheck

const api = 'y0_AgAAAABukr7nAArhjQAAAADy71owRDIlq5olSkmKtlXfYwQvCqZy-rk';
let url = 'https://api-metrika.yandex.net/stat/v1/data';

const params = {
    'date1': '2020-01-01',
    'id': 96968383,
    'metrics': 'ym:pv:pageviews',
    'dimensions': 'ym:pv:URLPath',
}
url += '?' + (new URLSearchParams(params)).toString();

export function request() {
    return fetch(url, {
        headers: {
            "Authorization": "OAuth " + api,
        }
    }).then(r => r.json()).then(d => d);
}