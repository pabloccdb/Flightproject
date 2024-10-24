const axios = require('axios');
const { getAccessToken } = require('./auth'); // Ajusta la ruta al archivo donde está tu función

async function searchOffers(origin, destination, departureDate, returnDate) {
    const accessToken = await getAccessToken();

    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: 1,
            nonStop: true,
            currencyCode: 'USD'
        }
    });

    const offers = response.data.data.map(offer => ({
        flight_number: offer.itineraries[0].segments[0].number,
        origin: offer.itineraries[0].segments[0].departure.iataCode,
        destination: offer.itineraries[0].segments[0].arrival.iataCode,
        airline: offer.itineraries[0].segments[0].carrierCode,
        price: offer.price.total
    }));
    return offers;
}

async function searchAdvancedOffers(origin, destination, departureDate, returnDate, cabinClass = 'ECONOMY', maxStops = 1) {
    const accessToken = await getAccessToken();

    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: 1,
            travelClass: cabinClass,
            max: maxStops,
            currencyCode: 'USD'
        }
    });
    const flightOffers = response.data.data.map(offer => ({
        flightNumber: offer.itineraries[0].segments[0].number,
        price: offer.price.total,
        origin: offer.itineraries[0].segments[0].departure.iataCode,
        destination: offer.itineraries[0].segments[0].arrival.iataCode,
        airline: offer.itineraries[0].segments[0].carrierCode
    }));

    return flightOffers;
}

module.exports = { searchAdvancedOffers, searchOffers };
