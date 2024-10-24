const axios = require('axios');
const qs = require('qs');

async function getAccessToken() {
    const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
    const AMADEUS_API_TOKEN = process.env.AMADEUS_API_TOKEN;

    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_TOKEN
    });

    try {
        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token
    } catch (error) {
        console.error('Error al obtener el token de acceso:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { getAccessToken };
