import { Server } from "socket.io";
import { User } from "./src/models/user.model.js";
import { Captain } from "./src/models/captain.model.js";

let io;

// function for initialize the socket

function initializeSocket(server) {

    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            
        }
    });

    // now is io pr event sunte h

    io.on('connection', (socket) => {
        console.log(`Client connected :${socket.id}`)

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id })
            }
            else if (userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await Captain.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

    });
}


const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

export {
    initializeSocket,
    sendMessageToSocketId
}