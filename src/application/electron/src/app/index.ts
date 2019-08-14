import { app, BrowserWindow, remote } from 'electron';
import { createTable, db } from "./db";
import initIPC from "./ipc";

let window : BrowserWindow | null = null;
const appPath = remote.app.getAppPath();

// tslint:disable-next-line
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
    window = new BrowserWindow({
        height: 768,
        width: 1024
    });

    // tslint:disable-next-line
    window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    window.on('closed', () => {
        window = null;
    });
    createTable();
    initIPC();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      db.close();
      app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});

