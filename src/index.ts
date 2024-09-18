/** @format */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Inicializa la aplicación Express
const app = express();
const port = 80;

// Crea un servidor HTTP
const server = http.createServer(app);

// Configura Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Configura el endpoint root
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Maneja las conexiones de Socket.IO
io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('bus_locations', msg => {
    console.log('Received bus_locations:', msg);
    io.emit('bus_locations', msg); // Emitir a todos los clientes
  });
});


// Inicia el servidor
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
