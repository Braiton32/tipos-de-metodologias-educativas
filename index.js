const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 1. Configuración vital para Render
app.set('trust proxy', true); 

// 2. Archivos estáticos (CSS, JS del cliente)
app.use(express.static('public'));

// 3. Ruta principal con captura de IP
app.get('/', (req, res) => {
    // Intentamos obtener la IP de la cabecera que usa Render o la directa
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log("===============================");
    console.log("¡NUEVA VISITA DETECTADA!");
    console.log("IP DEL USUARIO:", ip);
    console.log("FECHA:", new Date().toLocaleString());
    console.log("===============================");

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Iniciar el servidor (Solo una vez)
app.listen(port, () => {
    console.log(`Servidor ejecutándose en puerto ${port}`);
});