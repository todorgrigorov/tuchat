import io from 'socket.io-client';

import apiRoutes from '../config/api-routes';

const socket = io(`${apiRoutes.SOCKETS_ADDRESS}${apiRoutes.ROOMS}`, {
    transports: ['websocket']
});

export default {
    instance: socket,
}