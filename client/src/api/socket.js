import io from 'socket.io-client';

let socket = null;
let projectRoomId = null;

const connect = () => {
    socket = io('/');
}

export function subscribe(roomId, callback) {
    if (!socket || !socket.connected) connect();
    socket.emit('CREATE ROOM', roomId);
    socket.on('UPDATE PROJECT', callback);
    projectRoomId = roomId;
}

export function unsubscribe(roomId) {
    if (!socket || !socket.connected) connect();
    socket.emit('LEAVE ROOM', roomId);
    socket.disconnect();
    projectRoomId = null;
}

export function getCurrentRoom() { return projectRoomId; }


export function emitProjectChanged(data) {
    if(!socket || !socket.connected) connect();
    socket.emit('PROJECT CHANGED', data, projectRoomId)
}