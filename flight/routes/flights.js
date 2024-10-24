const express = require('express');
const { searchAdvancedOffers, searchOffers } = require('../services/flights'); // Ajusta la ruta al archivo donde está tu función
const router = express.Router();


router.get('/flight-offer', async (req, res) => {
    const { origen, destino, fechaSalida, fechaRegreso } = req.query;

    if (!origen || !destino || !fechaSalida) {
        return res.status(400).json({ error: 'Faltan parámetros: origen, destino y fechaSalida son requeridos.' });
    }

    if (new Date(fechaSalida) == 'Invalid Date') {
        return res.status(400).json({ error: 'Fecha de salida inválida.' });
    }

    if (fechaRegreso && new Date(fechaRegreso) == 'Invalid Date') {
        return res.status(400).json({ error: 'Fecha de regreso inválida.' });
    }

    try {
        const offers = await searchOffers(origen, destino, fechaSalida, fechaRegreso);
        res.json(offers);
    } catch (error) {
        console.error('Error al buscar ofertas de vuelos:', error);
        res.status(500).json({ error: 'Error al buscar ofertas de vuelos', details: error.message });
    }
});

router.get('/advanced-offers', async (req, res) => {
    const { origen, destino, fechaSalida, fechaRegreso, cabinClass, maxStops } = req.query;
    
    const validCabinClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];

    if (!origen || !destino || !fechaSalida || !fechaRegreso) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: origen, destino, departureDate y returnDate.' });
    }

    if (new Date(fechaSalida) == 'Invalid Date') {
        return res.status(400).json({ error: 'Fecha de salida inválida.' });
    }

    if (fechaRegreso && new Date(fechaRegreso) == 'Invalid Date') {
        return res.status(400).json({ error: 'Fecha de regreso inválida.' });
    }
    let selectedCabinClass = cabinClass ? cabinClass.toUpperCase() : 'ECONOMY';
    if (!validCabinClasses.includes(selectedCabinClass)) {
        return res.status(400).json({ error: `cabinClass debe ser uno de los siguientes: ${validCabinClasses.join(', ')}` });
    }

    try {
        const flightOffers = await searchAdvancedOffers(origen, destino, fechaSalida, fechaRegreso, cabinClass, maxStops);
        res.json(flightOffers);
    } catch (error) {
        console.error('Error al buscar ofertas de vuelos:', error);
        res.status(500).json({ error: 'Error al buscar ofertas de vuelos', details: error.message });
    }
});

module.exports = router;
