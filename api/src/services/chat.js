import socketEvents from "../config/socket-events";
import Message from "../models/Message";
import messageType from "../models/message-type";

let rooms = null;

function join(socket, data) {
    socket.join(data.roomId, e => {
        if (e) {
            console.error(e);
        } else {
            console.info(`user ${data.userId} joined room ${data.roomId}`);
        }
    });
}

function leave(socket, data) {
    socket.leave(data.roomId, e => {
        if (e) {
            console.error(e);
        } else {
            console.info(`user ${data.userId} left room ${data.roomId}`);
        }
    });
}

async function messageSent(socket, message) {
    const m = await Message.create({
        userId: message.userId,
        roomId: message.roomId,
        content: message.content,
        type: message.type
    });

    const formatted = await m.getFormattedMessage();
    rooms.to(message.roomId).emit(socketEvents.newMessage, formatted);
}

function disconnect(socket) {
}

function connection(socket) {
    socket.on(socketEvents.join, data => join(socket, data));
    socket.on(socketEvents.messageSent, async message => messageSent(socket, message));
    socket.on(socketEvents.leave, data => leave(socket, data));
    socket.on('disconnect', () => disconnect(socket));
}

export default {
    configure: server => {
        rooms = server.of('/rooms');
        rooms.on('connection', socket => connection(socket));
    }
}