'use strict';

global.ELog = require('electron-log');
const storage = require('./storage');
const config = require('./config');
const is = require('electron-is');
const api = require('./api');
const ipc = require('./ipc');
const fs = require('fs');

module.exports = () => {
  // 存储模块
  storage.setup();
  // 日志
  logger();
  // 抓取目录创建
  mkdir()
  // 自动更新
  const updateConfig = config.get('autoUpdate');
  if ((is.windows() && updateConfig.windows) || (is.macOS() && updateConfig.macOS)
    || (is.linux() && updateConfig.linux)) {
    const autoUpdater = require('./autoUpdater');
    autoUpdater.setup();
  }
  // electron业务模块
  api.setup();
  // ipc模块
  ipc.setup();
}

function mkdir() {
  if (!fs.existsSync('shotImg')) {
      fs.mkdirSync('shotImg');
  }
  if (!fs.existsSync('productImg')) {
      fs.mkdirSync('productImg');
  }
  if (!fs.existsSync('webpage')) {
      fs.mkdirSync('webpage');
  }
  if (!fs.existsSync('webpage/images')) {
    fs.mkdirSync('webpage/images');
}
}

function logger () {
  let logConfig = config.get('log');
  for (let transport in logConfig) {
    const configInfo = logConfig[transport];
    if (transport === 'file') {
      ELog.transports.file.level = configInfo.level;
      ELog.transports.file.file = configInfo.fileName;
      ELog.transports.file.fileName = configInfo.fileName;
      ELog.transports.file.format = configInfo.format;
      ELog.transports.file.maxSize = configInfo.maxSize;
    }
  }

  return true;
};
