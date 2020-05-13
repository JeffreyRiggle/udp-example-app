const { client } = require('@jeffriggle/ipc-bridge-client');
let chatArea, input, sendbutton;

function setup() {
    chatArea = document.createElement('div');
    chatArea.style = 'display: flex; flex: 1 1 auto; flex-direction: column; border: 1px solid black;';
    input = document.createElement('input');
    sendbutton = document.createElement('button');
    sendbutton.innerText = 'send message';

    sendArea = document.createElement('div');
    sendArea.style = 'flex: 0 0 auto;';
    sendArea.appendChild(input);
    sendArea.appendChild(sendbutton);

    sendbutton.onclick = () => {
        client.sendMessage('sendChatMessage', input.value);
        input.value = '';
    }

    client.subscribeEvent('newMessage', (messages) => {
        messages.forEach(message => {
            const newMessage = document.createElement('div');
            newMessage.innerText = message;
            chatArea.appendChild(newMessage);
        });
    });

    const app = document.getElementById('app');
    app.appendChild(chatArea);
    app.appendChild(sendArea);
}

if (client.available) {
    setup();
} else {
    client.on(client.availableChanged, setup);
}