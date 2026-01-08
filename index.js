const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);

app.use(express.static('public'));

app.get('/', (req, res) => {
    const userIP = req.ip;
    const fecha = new Date().toLocaleString();
    
    console.log(`[${fecha}] Nueva visita desde la IP: ${userIP}`);

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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