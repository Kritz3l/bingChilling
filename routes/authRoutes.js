const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const querystring = require('querystring');

// this can be used as a seperate module
const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

const getHashParams = () => {
    const hashParams = {};
    let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.search.substring(1);

    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
}

router.get('/login', async (req, res) => {
    const scope =
        `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-library-modify
    user-library-read
    user-top-read
    playlist-read-private
    playlist-modify-public`;

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECTURI
        })
    );
});

router.get('/logged', async (req, res) => {
    const body = {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: process.env.REDIRECTURI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    }

    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: encodeFormData(body)
    })
        .then(response => response.json())
        .then(data => {
            const query = querystring.stringify(data);
            res.redirect(`${process.env.CLIENT_REDIRECTURI}?${query}`);
        });
});

module.exports = router;