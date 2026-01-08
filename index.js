const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuración para confiar en el proxy de Render
app.set('trust proxy', true); 

// Servir archivos estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Captura de IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("=== NUEVA VISITA ===");
    console.log("IP DETECTADA:", ip);
    console.log("====================");
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port}`);
});