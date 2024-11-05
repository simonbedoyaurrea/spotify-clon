const CLIENT_ID = 'dabf4a2a81a342f681d38d524f4d24df';
const CLIENT_SECRET = 'f0c1b5d0d33f42d9bc2927ef1b2351fa';


export const getToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: 'grant_type=client_credentials',
        });

        const data = await response.json();
        return data.access_token;
} catch (error) {
    console.error('Error al obtener el token:', error);
}
};