const token = 'BQCNVAE7LimSSs7NMUQjNMVqbBA5Udy_WlQO6aPU1YUV6t4yEq4Ntb3UoSxfGWCDtoqxWCQ4QxnqRp57UsQ2mGbBDUcg21Zii5do80UfzAiIVERj1cnIebkCuDmeuJ3Ry-geBIwesDDfFwWSHGiwPLj2mht3ltIR1Z6BIr18jXY6WbaHlCnvCn_x-pBhne0rXCvVU0-NrGEopH7iNzgH3qbcQwRamjHwcxZM-WJZJoI2rljxbLPs5GJLRMJebcg5jU0wbA';

clicked = () =>{
    alert('clicked');
}

async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
}

const topTracks = await getTopTracks();
console.log(
    topTracks?.map(
        ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);