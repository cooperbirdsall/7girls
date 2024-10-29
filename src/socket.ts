import io from 'socket.io-client';

const hostname: string = window.location.hostname;
// const port = process.env.PORT || 8000;

//const socket = io.connect(`http://${hostname}:${port}`);
const socket = io(`https://${hostname}`);

export default socket;