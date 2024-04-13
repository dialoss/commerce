import {create, templateFiles} from "./pages/PageEditor"

let pages = [
    'alexg',
    'albo',
    'ditrix',
    'dazer',
    'koctt',
    'виктор21',
    'ditrix',
    'keenet',
    'andreyastro',
    'victorovich',
    'dazertripod',
    'kotkatripod',
    'zimin-e',
    'kadirov',
    'chromat',
    'gukovp',
    'alext',
    'osharove',
    'chingachguk1977',
    'ruslans',
    'dark',
    'alexdark',
    'nesterova',
    'олег-вдовин',
    'volodin',
    'kasatkin-a',
    'олег-санкин',
    'вадим-л',
    'nikiforovm',
]

pages = ["lht-20-120",
    "mt-120-110",
    "mt-120",
    "mt-120d-nema23",
    "mt-120f",
    "mt-17-100lhn",
    "mt-180",
    "mt-20-100lhn-1",
    "mt-20-100lhn",
    "mt-218",
    "mt-90l2",
    "mt-90m",
    "mt120x2",
    "mt14-100lhn",
    "mt25-100lhn",]


window.gen = (file) => {
    const data = require("./info/" + file + '.json');

    let rows = []
    for (const it of data.slice(1)) {
        let r;
        if (typeof it === 'string') {
            r = {
                "cells": [
                    {
                        "size": 12,
                        "plugin": 'textPlugin',
                        data: {
                            "showDate": false,
                            "date": "",
                            html: it
                        }
                    }
                ]
            }
        } else if (it.length > 0) {
            r = templateFiles(it, false).rows[0];
        }
        if (r) rows.push(r)
    }
    let d = create({rows});
    // window.app.editor.set(d)
    return d
}

window.start = () => {
    for (const f of pages) {
        try {
            let d = window.gen(f);
            window.api.request({
                path: '/test/',
                body: JSON.stringify({page: f, data: d}),
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}