"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./middleware/logger"));
// import cookieParser from 'cookie-parser';
const asyncHandler = require("express-async-handler");
const app = (0, express_1.default)();
const Port = 5000;
// app.use(cookieParser);
app.get('/', (req, res) => {
    logger_1.default.log('info', 'Hello from logger , Home Route Hit');
    //return res.cookie('name' , 'harsh').send('Cookie-Parser');
    res.status(200).send("Home Page");
});
app.get('/error', (req, res) => {
    logger_1.default.log('error', "Error Occur 'error' route hit");
    return res.status(404).send("Error Occur");
});
const server = app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});
const socketIo = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Allow any origin.
    },
});
socketIo.on('connection', (socket) => {
    console.log('New user connected');
    // For Validation Purpose.
    //const token = socket.handshake.auth.token;
    // try{
    //     Validating the user token
    //     if(token.username != 'harsh'){
    //         throw Error('Validation Token Failed');
    //     }
    // }
    // catch(error){
    //     console.log("User disconnected" + error)
    //     socket.disconnect(true)
    // }
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('sendMessage', (message, name) => {
        socketIo.emit('message', message, name); // Broadcast the message to all connected clients
    });
});
// To run mysql on container , First start the container
// docker exec -it mysql mysql -u root -p
// To Create a .sql file from db. > exporting
// docker exec ae6f9d2f2a47 /usr/bin/mysqldump -u root --password=harsh Media > MySQL_Backup/AllBackup.sql;
// To Dump only structure (Schema) > exporting
// docker exec ae6f9d2f2a47 /usr/bin/mysqldump --no-data -u root --password=harsh Media > MySQL_Backup/database_structure.sql;
// Importing the sql file in a db. < importing
// docker exec -i ae6f9d2f2a47 mysql -uroot -pharsh Media_Backup < MySQL_Backup/dump.sql;
// To run local mysql without docker
// mysql -h localhost -u root -pharsh
