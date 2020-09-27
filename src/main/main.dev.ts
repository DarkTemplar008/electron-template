/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {resolve} from 'path';
import {app, BrowserWindow, ipcMain, globalShortcut} from 'electron';
import {Bounding} from '../common/Geometry';
import ChannelName from '../common/MsgChannel.json';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

class MainApp {
  private mainWindow: BrowserWindow | null = null;
  private windows: (BrowserWindow | null)[] = [];

  public init() {
    app.on('ready', () => this.initImpl());
  }

  private initImpl() {
    this.initWindows();
    this.initIPC();
    if (process.env.NODE_ENV === 'development') {
      globalShortcut.register('Control+Shift+I', ()=>{
        for(let i in this.windows) {
          this.windows[i]?.webContents.openDevTools({mode: 'detach'});
        }
      });      
    }
  }

  public uninit() {
      for (let i in this.windows) {
        if (this.windows[i] !== this.mainWindow) {
          this.windows[i]?.setClosable(true);
          this.windows[i]?.close();          
        }
      }
      this.windows = [];
  }

  private initWindows() {
      this.mainWindow = this.createWindow(
          {x: 0, y: 0, width: 1460, height: 810}, 
          `file://${__dirname}/app.html`, 
          'dist/renderer.prod.js', 
          null
      );
      // this.mainWindow?.setIcon(resolve(__dirname, '../resources/icon.png'));
  }

  private createWindow(bounding: Bounding, 
                      url: string, 
                      jsUrl: string, 
                      parent: BrowserWindow | null, 
                      extraOptions: object = {}, 
                      center: boolean = true) : BrowserWindow | null{
      let {x, y, width, height} = bounding;

      let window = new BrowserWindow({
          show: false,
          width,
          height,
          frame: false,
          parent: parent as BrowserWindow,
          webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
          },
          ...extraOptions
      });

      if (!center) {
          window.setPosition(x, y);
      }

      window.loadURL(url);
      this.windows.push(window);
      return window;
  }

  private initIPC() {
      this.mainWindow?.webContents.on('did-finish-load', () => {
          if (process.env.START_MINIMIZED) {
              this.mainWindow?.minimize();
          } else {
              this.mainWindow?.show();
              this.mainWindow?.focus();
          }
          if (process.env.NODE_ENV === 'development') {
            this.mainWindow?.webContents.closeDevTools();
          }
        });
      
      this.mainWindow?.on('closed', () => {
          this.uninit();
      });

      app.on('window-all-closed', () => {
          if (process.platform !== 'darwin') {
            app.quit();
          }
      });
  }
}

new MainApp().init();
ipcMain.on(ChannelName["IPCChannelName"]["kAppExit"], ()=>app.quit());