const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const geoip = require('geoip-lite');
const axios = require('axios');
const TELEGRAM_TOKEN = '8202474930:AAH2Fjkbb48YI7iLbUIxrcOvJ-_Xqf-yF1k';
const TELEGRAM_CHAT_ID = '8105636057';

app.set('trust proxy', true);

// Middleware para ver CUALQUIER petición que llegue
app.use(async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip.includes(',')) ip = ip.split(',')[0].trim();

    const geo = geoip.lookup(ip);
    
    // Preparar el mensaje
    let mensaje = `🚀 *Nueva Visita en tu Web*\n`;
    mensaje += `🌐 *IP:* ${ip}\n`;
    
    if (geo) {
        mensaje += `📍 *Ubicación:* ${geo.city || 'Desconocida'}, ${geo.country}\n`;
        mensaje += `🗺️ [Ver en Google Maps](https://www.google.com/maps?q=${geo.ll[0]},${geo.ll[1]})`;
    } else {
        mensaje += `📍 *Ubicación:* Local o no detectada`;
    }

    // Enviar a Telegram de forma asíncrona (para no retrasar la carga de la web)
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje,
        parse_mode: 'Markdown'
    }).catch(err => console.log("Error enviando a Telegram:", err.message));

    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en puerto ${port}`);
});