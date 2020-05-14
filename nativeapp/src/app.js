const { client } = require('@jeffriggle/ipc-bridge-client');
let chatArea, input, sendbutton;

function setup() {
    chatArea = document.createElement('div');
    chatArea.style = 'display: flex; flex: 1 1 auto; flex-direction: column; border: 1px solid black;';
    input = document.createElement('input');
    input.style = 'flex: 1 1 auto';
    sendbutton = document.createElement('button');
    sendbutton.innerText = 'send message';
    sendbutton.style = 'flex: 0 0 auto';

    sendArea = document.createElement('div');
    sendArea.style = 'flex: 0 0 auto; display: flex;';
    sendArea.appendChild(input);
    sendArea.appendChild(sendbutton);

    sendbutton.onclick = () => {
        client.sendMessage('sendChatMessage', input.value);
        input.value = '';
    }

    client.subscribeEvent('newMessage', (message) => {
        console.log('Got new message event');
        message.items.forEach(message => {
            const newMessage = document.createElement('div');
            const timeStamp = document.createElement('span');
            timeStamp.style = 'font-style: italic;';
            const tstamp = new Date(message.time);
            timeStamp.innerText = `${tstamp.toDateString()} - ${tstamp.toLocaleTimeString()}: `;
            const msg = document.createElement('span');
            msg.innerText = message.message;

            newMessage.appendChild(timeStamp);
            newMessage.appendChild(msg);
            chatArea.appendChild(newMessage);
        });
    });

    const app = document.getElementById('app');
    app.appendChild(chatArea);
    app.appendChild(sendArea);
    input.focus();
}

if (client.available) {
    setup();
} else {
    client.on(client.availableChanged, setup);
}