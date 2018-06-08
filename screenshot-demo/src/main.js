const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, globalShortcut } = electron;

/* electron-builder */
let win;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 320,
    height: 240,
    show: !false
  });
  win.loadURL(`file://${__dirname}/capture.html`);
  win.on('close', _ => {
    win = null;
  });
  globalShortcut.register('Ctrl+Alt+Shift+D', _ => {
    win.webContents.send('capture', app.getPath('pictures'));
  });
});

app.on("will-quit", _ => {});
