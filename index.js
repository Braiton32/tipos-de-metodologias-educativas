const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// ESTO DEBE IR ARRIBA
app.set('trust proxy', true); 

app.use(express.static('public'));

app.get('/', (req, res) => {
    // Prueba con estas dos opciones si req.ip falla
    const ip = req.headers['x-forwarded-for'] || req.ip;
    console.log("IP DETECTADA:", ip);
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Tu web está lista en http://localhost:${port}`);
});