const electron = require("electron");
const path = require('path');

const { app, BrowserWindow, Tray, Menu } = electron;

/* electron-builder */
let win;

let tray = null
app.on('ready', () => {
  tray = new Tray(path.join('src','favicon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  win = new BrowserWindow({
    width: 640,
    height: 480
  });
});