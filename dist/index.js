"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
// Inicializa la aplicación Express
const app = (0, express_1.default)();
const port = 3000;
// Crea un servidor HTTP
const server = http_1.default.createServer(app);
// Configura Socket.IO
const io = new socket_io_1.Server(server, {
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
