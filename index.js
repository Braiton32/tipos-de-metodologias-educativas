const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const geoip = require('geoip-lite');

app.set('trust proxy', true);

// Middleware para ver CUALQUIER petición que llegue
app.use((req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip.includes(',')) ip = ip.split(',')[0].trim();

    const geo = geoip.lookup(ip);

    if (geo) {
        console.log(`>>> EL VISITANTE ESTÁ EN: ${geo.city}, ${geo.country}`);
        // geo.ll contiene [latitud, longitud] para ponerlo en un mapa
    }
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en puerto ${port}`);
});