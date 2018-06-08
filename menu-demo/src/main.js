const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

/* electron-builder */
let win;

app.on("ready", _ => {
  win = new BrowserWindow({
    width: 640,
    height: 480
  });

  const name = app.getName();
  const template = [
    {
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: _ => {
            console.log('about')
          },
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          click: _ => {
            app.quit();
          },
          accelerator: 'Cmd+Q'
        },
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
