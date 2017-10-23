'use strict'

import {app, BrowserWindow} from 'electron'
const path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 判断副窗体是否打开
global.__flag = false
let mainWindow, subWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 320,
    height: 480,
    center: false,
    useContentSize: true,
    resizable: true,
    frame: false,
    icon: path.join(__static, '/favicon.ico')
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', () => {
    if (subWindow) {
      subWindow.close()
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 监听主窗体移动
  mainWindow.on('move', () => {
    if (subWindow) {
      // 副窗体跟随主窗体
      subWindow.setPosition(mainWindow.getPosition()[0] + mainWindow.getSize()[0] + 5, mainWindow.getPosition()[1])
    }
  })

  // 监听主窗口获取焦点
  mainWindow.on('focus', () => {
    if (subWindow) {
      // 展示窗口但是不获得焦点
      subWindow.setAlwaysOnTop(true)
    }
  })
  // 监听主窗口失去焦点
  mainWindow.on('blur', () => {
    if (subWindow) {
      // 展示窗口但是不获得焦点
      subWindow.setAlwaysOnTop(false)
    }
  })
  // 监听主窗口最小化
  mainWindow.on('minimize', () => {
    if (subWindow) {
      // 展示窗口但是不获得焦点
      subWindow.minimize()
    }
  })
  // 监听主窗口最小化恢复
  mainWindow.on('restore', () => {
    if (subWindow) {
      // 展示窗口但是不获得焦点
      subWindow.restore()
    }
  })

  // use this to open dev tools manualy to debug
  // mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})

let flag = false
const modalPath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#/sub'
  : `file://${__dirname}/index.html#sub`
ipc.on('open-subWindow', (event) => {
  flag = !flag
  if (flag) {
    if (!subWindow) {
      subWindow = new BrowserWindow({
        width: 720,
        height: 720,
        x: mainWindow.getPosition()[0] + mainWindow.getSize()[0] + 5,
        y: mainWindow.getPosition()[1],
        useContentSize: true,
        resizable: false,
        frame: false,
        icon: path.join(__static, '/favicon.ico')
      })
      subWindow.setSkipTaskbar(true)
      subWindow.on('close', () => {
        flag = false
        subWindow = null
        mainWindow.setAlwaysOnTop(false)
      })
      subWindow.loadURL(modalPath)
      // 监听主窗口获取焦点
      subWindow.on('focus', () => {
        if (mainWindow) {
          // 展示窗口但是不获得焦点
          mainWindow.setAlwaysOnTop(true)
        }
      })
      // 监听主窗口失去焦点
      subWindow.on('blur', () => {
        if (mainWindow) {
          // 展示窗口但是不获得焦点
          mainWindow.setAlwaysOnTop(false)
        }
      })
    } else {
      subWindow.show()
    }
  } else {
    subWindow.hide()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
