const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, Tray, Menu, clipboard, globalShortcut } = electron;

/* electron-builder */
let win;
let tray = null;

const STACK_SIZE = 8;
const ITEM_MAX_LENGTH = 20;

const checkClipboardForChange = (clipboard, onChange) => {
  let cache = clipboard.readText();
  setInterval(_ => {
    const latest = clipboard.readText();
    if (latest !== cache) {
      cache = latest;
      onChange(cache);
    }
  }, 500);
};
const addToStack = (item, stack) =>
  [item].concat(
    stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack
  );
const formatItem = item => {
  return item && item.length > ITEM_MAX_LENGTH + 3
    ? item.substr(0, ITEM_MAX_LENGTH) + "..."
    : item;
};
const formatMenuTemplateForStack = stack => {
  return stack.map((item,i) => ({
    label: `Copy: ${formatItem(item)}`,
    click: _ => clipboard.writeText(item),
    accelerator: `Cmd+Alt+${i + 1}`
  }));
};
const registerShortcuts = (globalShortcut, clipboard, stack) => {
  globalShortcut.unregisterAll();
  for (let i = 0; i < STACK_SIZE; i++) {
    globalShortcut.register(`Cmd+Alt+${i + 1}`, _ => {
      clipboard.writeText(stack[i]);
    });
  }
};
app.on("ready", () => {
  let stack = [];
  tray = new Tray(path.join("src", "favicon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "<Empty>", enabled: false }
  ]);
  tray.setToolTip("Clipboard Buffer Demo");
  tray.setContextMenu(contextMenu);

  checkClipboardForChange(clipboard, text => {
    stack = addToStack(text, stack);
    tray.setContextMenu(
      Menu.buildFromTemplate(formatMenuTemplateForStack(stack))
    );
    registerShortcuts(globalShortcut, clipboard, stack);
  });

  win = new BrowserWindow({
    width: 640,
    height: 480
  });
});

app.on('will-quit', _ => {
  globalShortcut.unregisterAll();
})