const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);

// Middleware para ver CUALQUIER petición que llegue
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`>>> Solicitud recibida desde IP: ${ip} a las ${new Date().toLocaleTimeString()}`);
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en puerto ${port}`);
});