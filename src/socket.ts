import io, { Socket } from 'socket.io-client';

const hostname: string = window.location.hostname;
const port = process.env.PORT || 8000;

interface MySocket extends Socket {
    userID?: string;
}

const socket: MySocket = io(`http://${hostname}:${port}`);
// const socket = io(`https://${hostname}`);


export default socket;