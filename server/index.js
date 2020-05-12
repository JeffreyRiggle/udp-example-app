const { createSocket } = require('dgram');
const { addChatMessage, getChatMessages } = require('./chat');

const server = createSocket('udp4');

server.on('error', (error) => {
    console.log(`Server error ${error}`);
    server.close();
    process.exit(1);
});

server.on('message', (message, info) => {
    const req = JSON.parse(message.toString());

    let res;

    if (req.type === 1) {
        res = getChatMessages(req.sequence || 0);
    } else if (req.type === 2) {
        res = addChatMessage(req.message);
    } else {
        res = {
            error: `unknown message ${req.type}`
        };
    }

    server.send(JSON.stringify(res), info.port);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server is accepting messages on ${address.address}:${address.port}`);
});

server.bind(4000);
