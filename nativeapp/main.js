const { app, BrowserWindow } = require('electron')
const { start, registerEvent, broadcast } = require('@jeffriggle/ipc-bridge-server')
const { createSocket } = require('dgram')

function setupUDPListener() {
    const client = createSocket('udp4')

    client.on('message', (message, info) => {
        console.log(`Got Message ${message} from ${info.address}:${info.port}`)
        broadcast('newMessage', JSON.parse(message.toString()))
    })

    registerEvent('sendChatMessage', (event, message) => {
        client.send(Buffer.from(JSON.stringify({ type: 2, message })), 4000, 'localhost', err => {
            if (err) {
                console.log(`Failed to send message ${err}`)
            } else {
                console.log('Message sent')
            }
        })
    })

    registerEvent('newMessage', (event, message) => {
        client.send(Buffer.from(JSON.stringify({ type: 1 })), 4000, 'localhost', err => {
            if (err) {
                console.log(`Failed to get messages ${err}`);
            }
        })
    })

    start()
}

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('build/index.html')
  setupUDPListener()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
