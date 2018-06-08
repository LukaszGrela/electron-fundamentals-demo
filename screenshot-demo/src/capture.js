const path = require('path');
const fs = require('fs');
const electron = require("electron");
const { ipcRenderer: ipc, desktopCapturer, screen } = electron;

const getMainSource = (desktopCapturer, screen, done) => {
  const options = {types:['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize};
  desktopCapturer.getSources(options, (error, sources) => {
    if(error) return console.log('Cannot capture screen:', error);

    const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';

    done(sources.filter(isMainSource)[0]);

  })
}
const writeScreenshot = (png, toPath) => {
  fs.writeFile(toPath, png, err => {
    if(err) return console.log('Failed to write screen:', err);
  })
}
const onCapture = (_, targetPath) => {
  
  getMainSource(desktopCapturer, screen, source => {
    console.log(source);
    const png = source.thumbnail.toPNG();
    const filePath = path.join(targetPath, `${new Date().getTime()}.png`);

    writeScreenshot(png, filePath);
  });
}

ipc.on('capture', onCapture);